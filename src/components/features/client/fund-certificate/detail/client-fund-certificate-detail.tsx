import { ORDER_MATCHING_DAY_MAPPING } from '@components/features/fina/products/fund/constants';
import { mappingLabelTypeOfFund } from '@components/features/fina/products/fund/utils';
import ClientBondDetailCompanyItem from '@components/shared/client/bond-detail/bond-detail-main/bond-detail-main.info-company';
import { BondInformationItem } from '@components/shared/client/bond-detail/common/bond-information-item';
import { fetchNavsPublicByProductId } from '@components/shared/client/fund-certificates/hook';
import HCard from '@components/shared/common/h-card';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Col, notification, Row } from 'antd';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import BuyFundAction from '../buy-fund-action';
import ClientFundReportDetail from './client-fund-report-detail';
import { RadioProductProgram } from './common/radio-product-program';
import FundCertificateChart from './fund-certificate-chart';
import {
  useSelectedProductProgram,
  useSetSelectedProductProgram,
} from './hooks';

import '../buy-fund/buy-fund.module.scss';
import '../client-fund-certificate.module.scss';
import './client-fund-certificate-detail.module.scss';

export const FundCertificateDetail = memo(({ fund }: any) => {
  const isMobile = useIsMobile();
  const productId = useMemo(() => fund?.id, [fund]);
  const { org = {}, name, code, info = {} } = fund;
  const [navHistory, setNavHistory] = useState<any[]>([]);
  const ref = useRef<HTMLSpanElement>(null);
  const { t } = useHTranslation('admin');
  const selectedProductProgram = useSelectedProductProgram();
  const setSelectedProductProgram = useSetSelectedProductProgram();

  const fundOverviewInfoLeft = [
    { label: 'Tổ chức phát hành', content: org.name },
    { label: 'Loại quỹ ', content: mappingLabelTypeOfFund(info?.typeOfFund) },
  ];
  const fundOverviewInfoRight = [
    {
      label: 'Ngày khớp lệnh',
      content:
        info?.orderMatchingDate
          ?.map((item: any) => ORDER_MATCHING_DAY_MAPPING[item])
          .join(', ') || '',
    },
    {
      label: 'Phiên giao dịch',
      content: ConverterUtils.dateConverterToString(
        info.nextOrderMatchingSession,
      ),
    },
  ];

  const executeScrollToSelectProductProgram = () => {
    if (selectedProductProgram) return true;

    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    notification.warning({
      message: t('Notification', { vn: 'Thông báo' }),
      description: t('Please select program of product', {
        vn: 'Quý khách chưa chọn chương trình',
      }),
    });
    return false;
  };

  useEffect(() => {
    return setSelectedProductProgram(undefined);
  }, []);
  useEffect(() => {
    if (!productId) {
      setNavHistory([]);
      return;
    }
    (async () => {
      const navsData = await fetchNavsPublicByProductId(productId, {
        skip: undefined,
        limit: undefined,
        order: ['navDate DESC'],
      });
      setNavHistory(navsData?.data || []);
    })();
  }, [productId]);

  return (
    <Row gutter={[16, 16]} className={'fund-detail'}>
      <Col xs={24} md={24} className={'fund-detail--item'}>
        <div className="fund-detail__left">
          <div className="fund-detail__left--header">
            <h2>
              {code} - {name}
            </h2>
          </div>
          <div className="fund-detail__left--content">
            <div
              className={
                !isMobile
                  ? 'fund-detail__left--content--item fund-detail__left--content__general'
                  : 'fund-detail__left--content--item__mobile fund-detail__left--content__general'
              }
            >
              <HCard
                contentProps={{
                  className: 'fund-detail__left--content__overview',
                }}
              >
                <div className="fund-detail__left--content__overview__left">
                  {fundOverviewInfoLeft.map((item, index) => (
                    <BondInformationItem
                      key={`fund-detail-item-left-${index}`}
                      label={item.label}
                      content={item.content}
                      className="fund-info-item"
                      labelClassName="fund-info-item--label"
                      contentClassName="fund-info-item--content"
                      type="down-line"
                    />
                  ))}
                </div>
                <div className="fund-detail__left--content__overview__right">
                  {fundOverviewInfoRight.map((item, index) => (
                    <BondInformationItem
                      key={`fund-detail-item-right-${index}`}
                      label={item.label}
                      content={item.content}
                      className="fund-info-item"
                      labelClassName="fund-info-item--label"
                      contentClassName="fund-info-item--content"
                      type="down-line"
                    />
                  ))}
                </div>
                <div>
                  <BondInformationItem
                    label={'Giá gần nhất'}
                    content={`${ConverterUtils.formatNumber((fund?.info?.navCurrently ?? 0).toFixed(0))}`}
                    contentClassName="last-price"
                    labelClassName="fund--info-item-label"
                    type="down-line"
                    isPrice={true}
                  />
                </div>
              </HCard>
            </div>
          </div>
        </div>

        <span ref={ref} id="select-product-program">
          <ProgramsFund fund={fund} />
        </span>

        <ClientBondDetailCompanyItem bondDetail={fund} />

        <div className="fund-detail__left--content__chart fund-detail__left--content__nav">
          <h2>Biểu đồ tăng trưởng NAV</h2>
          <FundCertificateChart priceUpdateHistories={navHistory} />
        </div>

        <ClientFundReportDetail bondDetail={fund} />
      </Col>

      {isMobile && (
        <BuyFundAction
          {...{
            data: fund,
            text: 'Đầu tư ngay',
            className: 'fixed-bottom form-info-fund-action-buy',
            beforeHandleClickBuy: executeScrollToSelectProductProgram,
          }}
        />
      )}
    </Row>
  );
});

export const ContentFee = ({ type, fees }) => {
  const feesByType = fees?.filter((fee) => fee?.type === type);

  return (
    <div className="fund-content-fee">
      <div className="fund-content-fee-header">
        {type === 'BUY' ? 'Biểu phí mua' : 'Biểu phí bán'}
      </div>

      <div className="fund-content-fee-content">
        <div className="fund-content-fee-content-item">
          <span>Thời gian nắm giữ</span>
          <span>{type === 'BUY' ? 'Phí mua' : 'Phí bán'}</span>
        </div>
        {feesByType?.map((fee) => (
          <div className="fund-content-fee-content-item" key={fee?.id}>
            {fee?.type === 'BUY' && fee?.endOperatorCode === '&' ? (
              '-'
            ) : (
              <span>{`Từ ${fee?.beginValue} ${
                fee?.endValue !== -1 ? `- ${fee?.endValue}` : ''
              } ngày ${fee?.endOperatorCode === '&' ? 'trở lên' : ''}`}</span>
            )}

            <span>{fee?.rate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProgramsFund = ({ fund }) => {
  const { t } = useHTranslation('common');
  const productPrograms = useMemo(() => fund?.productDetails, [fund]);
  const setSelectedProductProgram = useSetSelectedProductProgram();

  useEffect(() => {
    return () => setSelectedProductProgram(undefined);
  }, []);

  return (
    <div className="fund-detail__left--content__programs">
      <h2 className="fund-detail__left--content__programs-title">
        {t('List of investment fund programs', {
          vn: 'Các chương trình mua bao gồm',
        })}
      </h2>
      <RadioProductProgram productPrograms={productPrograms} />
    </div>
  );
};
