import { Input } from 'antd';
import { Rate } from 'antd';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';
import { HSelect } from '../../../shared/common-form-elements/select';
import { USER_TYPES } from '../../../../types/organization';
import { useHTranslation } from '../../../../lib/i18n';
import { SEARCH_MODES } from '../../../../schema-form/features/search-form/schema';
import { ConverterUtils } from '../../../../lib/converter';
import { UserDetailShortSchema } from '../../crm/tasks/edit-form/includes-schema-form/user-detail-schema-from';


export const UserRatingDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return ([
    createSchemaItem({
      Component: HSelect,
      label: t('Staff', { vn: 'Nhân viên' }),
      name: 'userId',
      rules: [{
        message: t('Customer is required', { vn: 'Khách hàng là bắt buộc' }),
        required: true,
      }],
      componentProps: {
        showSearch: true,
        endpoint: 'users/suggestion',
        hiddenValues: { searchingRule: SEARCH_MODES.MULTIPLE, type: 'staff' },
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
        newItemOption: {
          formProps: {
            schema: UserDetailShortSchema,
            nodeName: 'users',
            hiddenValues: { type: USER_TYPES.customer },
            useDefaultMessage: true,
          },
        },
      },
    }),
    createSchemaItem({
      Component: Rate,
      name: 'rate',
      colProps: { span: 24 },
      label: t('Rate'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'message',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description'),
      },
    }),
  ]);
};
