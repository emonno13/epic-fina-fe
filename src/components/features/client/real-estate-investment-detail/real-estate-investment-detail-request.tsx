import {
  TASK_PRODUCT_TYPES,
  TASK_TYPE,
} from '@components/features/crm/tasks/utils';
import { HModal } from '@components/shared/common/h-modal';
import { CloseIconLargeSvg } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth } from '@lib/providers/auth';
import { NumberUtils } from '@lib/utils/number';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Col, Form, notification, Row } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { RealEstateInvestmentDetailRequestSchema } from './real-estate-investment-detail-request-schema';

const RealEstateInvestmentDetailRequest = ({ data }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const { currentUser } = useAuth();

  const closeFormModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const createRequestCounselling = async () => {
    try {
      const value = await form.validateFields();

      const dataSubmit = {
        email: value?.email,
        customerName: value?.fullName,
        phone: value?.tels[0]?.tel,
        projectId: data?.projectId,
        productType: TASK_PRODUCT_TYPES.investment,
        page: `FINA-Đầu tư-${data.code}-${data.name}`,
        type: TASK_TYPE.REAL_ESTATE,
        note: `Mong muốn vay: ${NumberUtils.format(value?.note)} VNĐ`,
      };

      FormUtils.submitForm(
        { ...dataSubmit },
        {
          endpoint: endpoints.generateNodeEndpoint('tasks/public'),
          method: 'post',
          onGotSuccess: () => {
            notification.success({
              message: 'Thành công',
              description: 'Đã tạo yêu cầu tư vấn',
            });
            closeFormModal();
          },
        },
      );
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  return (
    <>
      <div className={'bond-detail--request'}>
        <div className={'bond-detail--request__header'}>
          <Row gutter={[16, 16]}>
            <Col span={7.5} className={'bond-detail--request__header__logo'}>
              <Image
                src={'/assets/images/bond.fina-logo.png'}
                layout={'responsive'}
                width={1}
                height={1}
                alt={'fina-logo'}
              />
            </Col>
            <Col span={16.5} className={'bond-detail--request__header__title'}>
              <h2 className={'bond-detail--request__header__title--main'}>
                {t('Contact', { vn: 'Liên hệ tư vấn' })}
              </h2>
              <div
                className={'bond-detail--request__header__title--description'}
              >
                {t('Consultants are ready to help', {
                  vn: 'Chuyên viên tư vấn đã sẵn sàng hỗ trợ',
                })}
              </div>
            </Col>
          </Row>
        </div>
        <div className="bond-detail--request-actions">
          <Button
            type={'primary'}
            className={'bond-detail--request__button'}
            onClick={() => setVisible(true)}
          >
            {t('Request consultation', { vn: 'Yêu cầu tư vấn' })}
          </Button>
        </div>
      </div>

      <HModal
        {...{
          title: 'Thông tin yêu cầu tư vấn',
          onCancel: closeFormModal,
          visible,
          footer: null,
          width: 400,
          closeIcon: <CloseIconLargeSvg />,
          className: 'modal-real-estate-investment-detail-request',
        }}
      >
        <h2 className="modal-real-estate-investment-detail-request-title">
          Thông tin bất động sản
        </h2>
        <div className="modal-real-estate-investment-detail-request-info">
          <Row>
            <Col {...{ xs: 24, sm: 24, md: 16 }}>
              <div className="modal-real-estate-investment-detail-request-info-label">
                Tên sản phẩm bất động sản
              </div>
              <div className="modal-real-estate-investment-detail-request-info-value">
                {data?.name}
              </div>
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 8 }}>
              <div className="modal-real-estate-investment-detail-request-info-label">
                Vị trí
              </div>
              <div className="modal-real-estate-investment-detail-request-info-value">
                {data?.address}
              </div>
            </Col>
          </Row>
        </div>

        <h2 className="modal-real-estate-investment-detail-request-title">
          Thông tin khách hàng
        </h2>

        <HForm
          {...{
            form,
            schema: RealEstateInvestmentDetailRequestSchema,
            removeControlActions: true,
            initialValues: {
              fullName: ConverterUtils.getFullNameUser(currentUser),
              email: currentUser?.emails?.[0]?.email || '',
              phone: currentUser?.tels?.[0]?.tel || '',
            },
            className: 'modal-real-estate-investment-detail-request-form',
          }}
        />

        <div className="client-bond-form-view__submit-actions">
          <Button
            {...{
              type: 'ghost',
              onClick: createRequestCounselling,
              className: 'client-bond-form-view__submit-actions-btn',
            }}
          >
            {t('Request counselling', { vn: 'Yêu cầu tư vấn' })}
          </Button>
        </div>
      </HModal>
    </>
  );
};

export default RealEstateInvestmentDetailRequest;
