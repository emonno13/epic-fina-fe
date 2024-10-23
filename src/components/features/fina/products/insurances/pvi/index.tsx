import { MESSAGE_TYPE } from '@constants/mobile-app';
import { MessageUtils } from '@lib/utils/message';
import { MobileUtils } from '@lib/utils/mobile';
import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { HForm } from '../../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../../schema-form/h-types';
import { PRODUCT_TYPE } from '../../utils';
import { PRODUCT_SOURCE } from '../constant';
import { CounsellingPviForm } from './counselling-pvi-form';
import { ViewProductPviManager } from './product-pvi-manager';

import '../../product.module.scss';

export const ProductPvi = (props: any) => {
  const { product, setIsModalVisible } = props;
  const [form] = useForm();
  const [warning, setWarning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [paymentLink, setPaymentLink] = useState('');

  return (
    <div>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain('/transactions/public/pvi'),
          method: 'post',
          form,
          hiddenValues: {
            productId: product?.id,
            type: PRODUCT_TYPE.INSURANCE,
            subType: PRODUCT_SOURCE.PVI,
          },
          hideControlButton: true,
          hideSubmitAndContinueButton: true,
          onGotSuccess: (res) => {
            const newPaymentLink = res.paymentInfo.url || '';
            setPaymentLink(newPaymentLink);
            if (MobileUtils.checkIsWebView()) {
              MessageUtils.postMessageToWebview(
                MESSAGE_TYPE.OPEN_OUTSIDE_BROWSER,
                newPaymentLink,
              );
            }
          },
          schema: (HFormProps) => [
            createSchemaItem({
              Component: ViewProductPviManager,
              componentProps: {
                HFormProps,
                warning,
                setWarning,
                steps,
                setSteps,
                paymentLink,
              },
            }),
          ],
        }}
      />
      {warning && (
        <Modal
          destroyOnClose={true}
          visible={warning}
          width={'80%'}
          footer={false}
          onCancel={() => {
            setWarning(false);
          }}
        >
          <CounsellingPviForm {...{ product, setIsModalVisible, setWarning }} />
        </Modal>
      )}
    </div>
  );
};
