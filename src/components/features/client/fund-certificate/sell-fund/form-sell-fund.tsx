import { mappingTypeOfFund } from '@components/features/fina/products/fund/constants';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { Col, Form, notification, Row } from 'antd';
import { FC, memo, useContext, useEffect, useMemo } from 'react';
import { SellActionContext } from './context';
import { FormSellFundSchema } from './form-sell-fund-schema';

import './sell-fund.module.scss';

interface FormSellFundProps {
  handleCreateSellOrderGotSuccess?: (value?: any) => void;
}

const FormSellFund: FC<FormSellFundProps> = memo(
  ({ handleCreateSellOrderGotSuccess }) => {
    const [form] = Form.useForm();
    const { t } = useHTranslation('common');
    const { fee, setOrder, product, productProgram, loading, setLoading } =
      useContext(SellActionContext);

    const feeDetails = useMemo(() => fee?.details ?? [], [fee]);

    useEffect(() => {
      form?.setFieldsValue({
        matchingSession: product?.info?.nextOrderMatchingSession,
        navCurrent: ConverterUtils.formatNumber(
          (product?.navCurrent ?? 0).toFixed(0),
        ),
      });
    }, [product]);

    const handleCreateSellOrder = async () => {
      try {
        const values = await form?.validateFields();
        const { volume } = values;
        const order = {
          volume,
          productId: product?.id,
          productProgramId: productProgram?.id,
        };
        setOrder(order);
        if (handleCreateSellOrderGotSuccess)
          handleCreateSellOrderGotSuccess(order);
      } catch (e) {
        notification.error({
          message: t('Failure', { vn: 'Thất bại' }),
          description: t('Please check the information again', {
            vn: 'Vui lòng kiểm tra lại thông tin',
          }),
        });
      }
    };

    const headerContents = [
      { label: 'VINACAPITAL', value: product?.code },
      {
        label: t('Purchase Program', { vn: 'Chương trình mua' }),
        value: productProgram?.name,
      },
      {
        label: t('Number of CCQs available', { vn: 'Số lượng CCQ hiện có' }),
        value: productProgram?.volumeAvailable,
      },
      {
        label: t('Fund type', { vn: 'Loại quỹ' }),
        value: mappingTypeOfFund[product?.info?.typeOfFund],
      },
    ];

    return (
      <div className="form-info-fund form-sell-fund">
        <div className="form-info-fund-header">
          <Row gutter={[5, 5]}>
            {headerContents.map((headerContentItem: any, index: number) => (
              <Col
                key={`sell_header_content_item_${index}`}
                {...{ xs: 12, sm: 12, md: 6 }}
              >
                <div className="form-info-fund-label">
                  {headerContentItem.label}
                </div>
                <div className="form-info-fund-value">
                  {headerContentItem.value}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="form-info-fund-content">
          <HForm
            {...{
              form,
              hideControlButton: true,
              schema: FormSellFundSchema,
              transport: {
                form,
                sellMin: productProgram?.sellMin,
                holdingVolume: productProgram?.holdingVolume,
              },
            }}
          />
        </div>
        <div className="form-info-fund-item">
          <div className="form-info-fund-item-header">
            <p className="form-info-fund-item-quantity">
              {t('Volume', { vn: 'Số lượng' })}
            </p>
            <p className="form-info-fund-item-time">
              {t('Holding time(date)', { vn: 'Thời gian nắm giữ(ngày)' })}
            </p>
            <p className="form-info-fund-item-fee">
              {t('Selling fee(%)', { vn: 'Phí bán(%)' })}
            </p>
          </div>
          {feeDetails.map((fee: any, i: number) => (
            <div key={`fee-${i}`} className="form-info-fund-item-content">
              <p className="form-info-fund-item-quantity">
                {ConverterUtils.formatNumber(fee?.volumSell)}
              </p>
              <p className="form-info-fund-item-time">{fee?.holdingDay}</p>
              <p className="form-info-fund-item-fee">{fee?.feeRate}</p>
            </div>
          ))}
        </div>

        <div className="form-info-fund-action">
          <HButton
            {...{
              className: 'form-info-fund-action-sell',
              type: 'primary',
              size: 'large',
              onClick: handleCreateSellOrder,
              disabled: !fee?.totalAmount,
            }}
          >
            {t('Create sell order', { vn: 'Đặt lệnh bán' })}
          </HButton>
        </div>
      </div>
    );
  },
);

export default FormSellFund;
