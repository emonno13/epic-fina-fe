import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import TextArea from 'antd/lib/input/TextArea';

export const RequestAccessPermissionDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: TextArea,
      name: 'requestContent',
      colProps: { span: 24 },
      label: 'Bạn muốn xin cấp quyền sử dụng khách hàng này?',
      componentProps: {
        placeholder: t('Leave message', { vn: 'Để lại lời nhắn' }),
      },
    }),
  ];
};
