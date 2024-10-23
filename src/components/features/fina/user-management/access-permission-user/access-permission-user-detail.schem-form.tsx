import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import TextArea from 'antd/lib/input/TextArea';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { REQUEST_ACCESS_USER_STATUSES } from './constan';

export const AccessPermissionUserDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  return [
    createSchemaItem({
      Component: TextArea,
      name: 'approvedContent',
      colProps: { span: 24 },
      label:
        documentDetail.status === REQUEST_ACCESS_USER_STATUSES.APPROVE
          ? 'Đồng ý cấp quyền sử dụng?'
          : 'Từ chối cấp quyền sử dụng?',
      componentProps: {
        placeholder: t('Leave message', { vn: 'Để lại lời nhắn' }),
      },
    }),
  ];
};
