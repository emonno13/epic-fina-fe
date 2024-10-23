import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { HSubForm } from '../../../../../schema-form/h-form';
import { createHDynamicSchemaFormItems } from '../../../../shared/common-form-elements/h-dynamic-form-items';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { ACTION_CODES, getGroupAction, getStatusProgress } from '../utils';

export const ProgressDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { form, initialValues } = props;
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Progress Name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('Progress Name')),
        },
      ],
      componentProps: {
        placeholder: t('', {
          en: 'Enter the Code',
          vn: 'Nhập mã tiến trình',
        }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Progress status'),
      name: 'status',
      componentProps: {
        placeholder: t('Progress status'),
        options: getStatusProgress(t),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Group action'),
      name: 'codeAction',
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(t('Group action')),
        },
      ],
      componentProps: {
        isLoadFirst: true,
        placeholder: t('Group action'),
        optionValues: getGroupAction(t),
        optionsConverter: (document) => {
          const codeActionValue = form?.getFieldsValue(['codeAction']);
          if (document?.value === codeActionValue.codeAction) {
            form?.setFieldsValue({
              ['actionsByGr@@ignore@@']: document?.actions,
            });
          }
          return document;
        },
        onChangeSelected: (document) => {
          form?.setFieldsValue({
            ['actionsByGr@@ignore@@']: document?.actions,
          });
          if (document?.value !== initialValues?.codeAction) {
            form?.setFieldsValue({ templateNotification: [] });
          } else {
            form?.resetFields(['templateNotification']);
          }
        },
      },
    }),
    createSchemaItem({
      Component: ShowActionByGroupAction,
      ignore: true,
      name: 'actionsByGr',
    }),
  ];
};

const ShowActionByGroupAction = ({ value }) => {
  const { t } = useHTranslation('admin-common');
  value = value?.filter((el) => {
    return el?.code !== ACTION_CODES.ACTION_NOT_START;
  });
  return (
    <HSubForm
      {...{
        schema: () => [
          createHDynamicSchemaFormItems({
            label: 'Notification',
            name: 'templateNotification',
            required: true,
            componentProps: {
              schemaItems: [
                createSchemaItem({
                  Component: HSelect,
                  colProps: { span: 5 },
                  name: 'templateCode',
                  className: 'm-r-5',
                  rules: [
                    {
                      required: true,
                      message: ValidationMessages.requiredMessage(
                        t('Template notification'),
                      ),
                    },
                  ],
                  componentProps: {
                    endpoint: 'templates/suggestion',
                    optionsConverter: (document) => {
                      document.value = document.code;
                      document.label = document.title;
                      return document;
                    },
                    showSearch: true,
                    placeholder: 'Template notification',
                  },
                }),
                createSchemaItem({
                  Component: HSelect,
                  colProps: { span: 5 },
                  name: 'actionCode',
                  rules: [
                    {
                      required: true,
                      message: ValidationMessages.requiredMessage(t('Action')),
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        const notifications: any[] = getFieldValue(
                          'templateNotification',
                        );
                        const isDuplicate = notifications.filter(
                          (item) => item?.actionCode === value,
                        );
                        if (!!isDuplicate && isDuplicate.length > 1) {
                          return Promise.reject(
                            `Action ${value} is duplicate!`,
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ],
                  componentProps: {
                    placeholder: 'Action',
                    optionValues: value,
                    showSearch: true,
                    optionsConverter: (document) => {
                      document.label = document?.code;
                      document.value = document?.code;
                      return document;
                    },
                  },
                }),
              ],
            },
          }),
        ],
      }}
    />
  );
};
