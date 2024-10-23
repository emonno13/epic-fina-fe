import { ReloadOutlined } from '@ant-design/icons';
import { HTinyEditor } from '@components/shared/common-form-elements/h-tiny-editor';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Button } from 'antd';

export const EmailSchemaItemForm = (props: HFormProps): HFormItemProps[] => {
  const { form } = props;
  form?.setFieldsValue;
  return [
    createSchemaItem({
      Component: HTinyEditor,
      name: 'signature',
      label: (
        <>
          Signature
          <EmailSignatureDefaultButton form={form} />
        </>
      ),
      rules: [{ required: true, message: 'Signature is required!' }],
      colProps: { span: 24 },
    }),
  ];
};

const EmailSignatureDefaultButton = ({ form }) => {
  const getEmailSignatureDefault = async () => {
    const a = await httpRequester.getDataFromApi({
      url: endpoints.generateNodeEndpoint('/users/email-signature'),
    });
    if (!!a && !a?.error) {
      const content = a?.content || '';
      form?.setFieldsValue({
        signature: content,
      });
    }
  };

  return (
    <Button onClick={getEmailSignatureDefault} className="m-l-10">
      <ReloadOutlined />
      Reset default
    </Button>
  );
};
