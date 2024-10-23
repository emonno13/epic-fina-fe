import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import { Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { HForm } from '../../../../../../schema-form/h-form';
import { CustomerInformationSchemaForm } from './detail-product-pvi-schema-form';

export const CounsellingPviForm = (props: any) => {
  const { t } = useTranslation('common');
  const { product, setIsModalVisible, setWarning } = props;
  const currentUser = useCurrentUser();
  const [form] = useForm();
  const staffInfo = {
    fullName: currentUser?.fullName,
    email: currentUser?.emails?.[0]?.email,
    tel: currentUser?.tels?.[0]?.tel,
    address: currentUser?.address,
  };
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };
  return (
    <div className={'m-t-20'}>
      <Alert
        message="Rất tiếc gói bảo hiểm này chưa phù hợp với bạn. Vui lòng liên hệ FINA team tại 08 5749 8668 hoặc email tại insurance@fina.com.vn để được hỗ trợ.
				Xin vui lòng nhập thông tin chúng tôi sẽ thông báo lại cho họ khi có gói sản phẩm phù hợp."
        type="warning"
        closable
        onClose={onClose}
      />
      <HForm
        className={'m-t-15'}
        {...{
          endpoint: endpoints.endpointWithApiDomain('/tasks/public/insurance'),
          method: 'post',
          form,
          hiddenValues: {
            productId: product?.id,
            categoryId: product?.categoryId,
            type: TASK_TYPE.counselling,
          },
          initialValues: { staffInfo },
          onGotSuccess: () => {
            setIsModalVisible(false), setWarning(false);
          },
          schema: CustomerInformationSchemaForm,
        }}
      />
    </div>
  );
};
