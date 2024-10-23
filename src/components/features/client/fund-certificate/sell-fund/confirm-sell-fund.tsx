import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, notification, Row } from 'antd';
import { FC, useContext, useMemo } from 'react';
import { sellFundProductStep } from '../constants';
import {
  FundSuccessItemViewer,
  useDataPaymentConfirmation,
} from '../fund-success';
import { SellActionContext } from './context';

import './sell-fund.module.scss';

interface ConfirmSellFundProps {
  dataSell: any;
}

const ConfirmSellFund: FC<ConfirmSellFundProps> = ({ dataSell }) => {
  const { t } = useHTranslation('common');
  const {
    order,
    setCurrentStepSell,
    fee,
    setOtpTransId,
    productProgram,
    loading,
    setLoading,
  } = useContext(SellActionContext);
  const matchingSession = useMemo(
    () => dataSell?.info?.nextOrderMatchingSession,
    [dataSell],
  );
  const dataPaymentConfirmation = useDataPaymentConfirmation(
    t,
    matchingSession,
  );

  const handleCreateOrder = async () => {
    setLoading(true);
    await FormUtils.submitForm(order, {
      endpoint: endpoints.endpointWithApiDomain(
        '/products/create-sell-order-with-mio',
      ),
      method: 'post',
      onGotSuccess: (response) => {
        const otpTransId = response?.otpInfo?.otpTransId;
        if (!otpTransId) {
          setLoading(false);
          notification.error({
            message: 'Thất bại',
            description: 'Đã có lỗi xảy ra, vui lòng thử lại',
          });
          return;
        }
        setOtpTransId(otpTransId);
        setCurrentStepSell(sellFundProductStep.OTP);
        setLoading(false);
      },
      onGotError: ({ error }) => {
        setLoading(false);
        notification.error({
          message: error?.name || t('Failure', { vn: 'Thất bại' }),
          description:
            error?.message ||
            t('An error occurred, please try again', {
              vn: 'Đã có lỗi xảy ra, vui lòng thử lại',
            }),
        });
      },
    });
  };

  return (
    <div className="form-info-fund form-sell-fund">
      <div className="form-info-fund-header">
        <Row gutter={[5, 5]}>
          <Col {...{ xs: 24, sm: 12, md: 12 }}>
            <div className="form-info-fund-label text-left">VINACAPITAL</div>
            <div className="form-info-fund-value text-left">
              {dataSell?.name}
            </div>
          </Col>
          <Col {...{ xs: 24, sm: 12, md: 12 }}>
            <div className="form-info-fund-label text-right">
              {t('Purchase Program', { vn: 'Chương trình mua' })}
            </div>
            <div className="form-info-fund-value text-right">
              {productProgram?.name}
            </div>
          </Col>
        </Row>
      </div>

      <div className="fund-success-content">
        {dataPaymentConfirmation?.map((item, index) => (
          <FundSuccessItemViewer item={item} key={index} />
        ))}
      </div>

      <div className="fund-confirm-provisional-value">
        <p className="fund-confirm-provisional-value-desc">
          {t('Provisional value', { vn: 'Giá trị tạm tính' })}
        </p>
        <h2 className="fund-confirm-provisional-value-title">
          {`${ConverterUtils.formatNumber(fee?.totalAmount.toFixed(0))} vnđ`}
        </h2>
      </div>

      <div className="fund-confirm-desc">
        {t(
          'Payment time after order matching session is from 2-4 days. The custodian bank will transfer the money to your Bank Account.',
          {
            vn: 'Thời hạn thanh toán sau phiên khớp lệnh là từ 2-4 ngày. Ngân hàng giám sát sẽ chuyển tiền về Tài khoản Ngân hàng của bạn.',
          },
        )}
      </div>

      <div className="fund-success-actions">
        <HButton
          {...{
            type: 'ghost',
            size: 'large',
            onClick: () => setCurrentStepSell(sellFundProductStep.CREATE),
          }}
        >
          {t('Back', { vn: 'Quay lại' })}
        </HButton>
        <HButton
          {...{
            type: 'primary',
            size: 'large',
            onClick: handleCreateOrder,
            loading,
          }}
        >
          {t('Confirm', { vn: 'Xác nhận' })}
        </HButton>
      </div>
    </div>
  );
};

export default ConfirmSellFund;
