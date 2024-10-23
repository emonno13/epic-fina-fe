import { HSelect } from '@components/shared/common-form-elements/select';
import { ConverterUtils } from '@lib/converter';
import {
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Divider, Input } from 'antd';
import { PhoneCall } from '../../../shared/stringee';

export const AccountSchema = (props: HFormProps): HFormItemProps[] => {
  const { initialValues, transport } = props;
  const { tels, emails } = initialValues as any;
  const { user } = transport;
  return [
    createSchemaItem({
      Component: Divider,
      className: 'm-b-0',
      componentProps: {
        orientation: 'left',
        children: 'User can use emails and tels below to login',
        plain: true,
      },
    }),
    createSchemaItem({
      Component: 'div',
      label: 'Tel(s)',
      colProps: { span: 18 },
      componentProps: {
        placeholder: 'Enter the tel number',
        children: tels?.map(({ tel }) => (
          <PhoneCall key={tel} {...{ phoneNumber: tel, userInfo: user }} />
        )),
      },
    }),
    createSchemaItem({
      Component: 'div',
      label: 'Email(s)',
      colProps: { span: 18 },
      componentProps: {
        placeholder: 'Enter the tel number',
        children: emails?.map(({ email }) => <div key={email}>{email}</div>),
      },
    }),
    createSchemaItem({
      Component: Divider,
      className: 'm-b-0',
      componentProps: {
        orientation: 'left',
        children: 'Password',
        plain: true,
      },
    }),
    createSchemaItem({
      Component: Input.Password,
      name: 'password',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 18 },
      label: 'Password',
      rules: [
        { required: true, message: 'Password is required' },
        () => ({
          validator(rule, value) {
            if (!value || value.length >= 8) {
              return Promise.resolve();
            }
            return Promise.reject('Password must be minimum 8 characters');
          },
        }),
      ],
      componentProps: {
        placeholder: 'Enter the password',
      },
    }),
    createSchemaItem({
      Component: Input.Password,
      colProps: { span: 18 },
      label: 'Re-password',
      name: 'rePassword',
      rules: [
        { required: true, message: 'Re-password is required' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              'The two passwords that you entered do not match!',
            );
          },
        }),
      ],
      componentProps: {
        placeholder: 'Re-enter the password',
      },
    }),
  ];
};

export const addTelAccountSchema = (props: HFormProps): HFormItemProps[] => {
  const { initialValues } = props;
  const id = initialValues?.id;
  const tels: any[] = initialValues?.tels || [];
  const setDocumentDetail = useSetDocumentDetail();
  const searchForm = useSearchForm();
  const handleDataReadyToSubmit = (data) => {
    tels.push(data);
    return {
      tels: [...tels],
    };
  };

  const handleGotSuccess = () => {
    setDocumentDetail({ ...initialValues });
    searchForm?.submit();
  };

  return [
    createSchemaItem({
      Component: HSelect,
      label: 'Phone Number',
      colProps: { span: 18 },
      name: 'tel',
      rules: [
        {
          message: 'Tel is required',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!!value || !!getFieldValue('email')) {
              return Promise.resolve();
            }
            return Promise.reject('Phone or email is required');
          },
        }),
      ],
      componentProps: {
        placeholder: 'Enter the tel number',
        options: ConverterUtils.getOrgItemContactOption(tels, 'tel', (item) => {
          return item?.tel;
        }),
        newItemOption: {
          formProps: {
            schema: newPhoneSchema,
            nodeName: `/users/${id}`,
            method: 'put',
            hidenvalue: { tels },
            onDataReadyToSubmit: handleDataReadyToSubmit,
            onGotSuccess: handleGotSuccess,
          },
          label: 'Add a number tel',
        },
      },
    }),
  ];
};

const newPhoneSchema = (props: HFormProps): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'tel',
      label: 'Phone number',
      rules: [{ required: true, message: 'The tel is required' }],
    }),
  ];
};

export const addEmailAccountSchema = (props: HFormProps): HFormItemProps[] => {
  const { initialValues } = props;
  const id = initialValues?.id;
  const emails: any[] = initialValues?.emails || [];
  const documentSelect = useSetDocumentDetail();
  const searchForm = useSearchForm();

  const handleDataReadyToSubmit = (data) => {
    emails.push(data);
    return {
      emails: [...emails],
    };
  };

  const handleGotSuccess = () => {
    documentSelect(initialValues);
    searchForm?.submit();
  };

  return [
    createSchemaItem({
      Component: HSelect,
      label: 'E-mail address',
      colProps: { span: 18 },
      name: 'email',
      rules: [
        {
          message: 'E-mail address is required',
          type: 'email',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!!value || !!getFieldValue('tel')) {
              return Promise.resolve();
            }
            return Promise.reject('Phone or email is required');
          },
        }),
      ],
      componentProps: {
        placeholder: 'Enter the email',
        options: ConverterUtils.getOrgItemContactOption(
          initialValues?.emails || [],
          'email',
          (item) => {
            return item?.email;
          },
        ),
        newItemOption: {
          formProps: {
            schema: newEmailSchema,
            nodeName: `/users/${id}`,
            method: 'put',
            hidenvalue: { emails },
            onDataReadyToSubmit: handleDataReadyToSubmit,
            onGotSuccess: handleGotSuccess,
          },
          label: 'Add a email',
        },
      },
    }),
  ];
};

const newEmailSchema = (props: HFormProps): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: Input,
      name: 'email',
      label: 'Email',
      rules: [
        { required: true, message: 'The email is required', type: 'email' },
      ],
    }),
  ];
};
