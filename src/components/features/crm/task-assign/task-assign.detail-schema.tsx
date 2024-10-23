import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { HInput } from '../../../shared/common-form-elements/h-input';

export const TaskAssignDetailSchema = (props: HFormProps): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: () => {
        return (
          <>
            Click <b>Lưu</b> để xác nhận bạn sẽ nhận nghiệm vu này. Sau khi xác
            nhận nhiệm vụ sẽ được chia sẻ cho bạn và có toàn quyền xú lý. Sau 30
            phút nếu bạn không xứ lý hệ thống sẽ thu hồi lại nghiệm vụ.
          </>
        );
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'status',
      hidden: true,
    }),
  ];
};
