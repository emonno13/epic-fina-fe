import { RightOutlined } from '@ant-design/icons';
import ClientBondTransactionForm from '@components/shared/client/bond-list/bond-list-main/bond-list-main.form-transaction';
import { fetchNavsPublicByProductId } from '@components/shared/client/fund-certificates/hook';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { NumberUtils } from '@lib/utils/number';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { ORDER_MATCHING_DAY_MAPPING } from '../../fina/products/fund/constants';
import { mappingLabelTypeOfFund } from '../../fina/products/fund/utils';
import { BuyFundActionWithProductProgram } from './buy-fund-action-with-product-program';
import { ClientFundCertificateRequestCounselling } from './detail/client-fund-certificate-request-counselling';

export const ClientFundCertificateListWithListView = ({ fundData }) => {
  const { info, name, org, slug, code } = fundData;
  const { t } = useHTranslation('admin-common');
  const orgImage = org?.image?.url || '';
  const [visible, setVisible] = useState<boolean>(false);
  const isIncrease = info?.navCurrently - info?.navPre > 0;

  const showModal = () => {
    setVisible(true);
  };

  const uiDescription = (
    <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap">
      <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap-item">
        <div className="w-half">
          <div>Mã sản phẩm: </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {code}
          </div>
        </div>
        <div className="w-half">
          <div>
            {t('product.productCodeOfTheInvestor ', {
              en: 'product.',
              vn: 'Tên TCPH',
            })}
            :{' '}
          </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {org ? org.name : ''}
          </div>
        </div>
      </div>

      <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap-item">
        <div className="w-half">
          <div>Loại sản phẩm: </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {mappingLabelTypeOfFund(info?.typeOfFund)}
          </div>
        </div>
        <div className="w-half">
          <div>Biến động so với phiên trước: </div>
          <div
            className={`client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value ${isIncrease ? 'increase__value' : 'decrease__value'}`}
          >
            {isIncrease ? '+' : ''}
            {ConverterUtils.formatNumber(
              NumberUtils.toFixed((info?.navCurrently - info?.navPre) / 100, 2),
            )}{' '}
            %
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <FundItemRowView
        backgroundColor={org?.backgroundColor}
        orgImage={orgImage}
        titleHeader={org ? org.name : ''}
        slug={`/danh-sach-chung-chi-quy/${slug}`}
        name={name}
        content={<ClientFundListMainListItemContent fundData={fundData} />}
        uiDescription={uiDescription}
        onClick={() => showModal()}
        fundData={fundData}
      />

      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => setVisible(false)}
        bondData={fundData}
      />
    </>
  );
};

const ClientFundListMainListItemContent = ({ fundData }) => {
  const { info } = fundData;
  const [navHistory, setNavHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const navsData = await fetchNavsPublicByProductId(fundData?.id, {
        skip: 0,
        limit: 1,
        order: ['navDate DESC'],
      });
      if (navsData?.data?.length) setNavHistory(navsData.data);
    })();
  }, [fundData]);

  return (
    <div className="client-bond-list-main-list-item-list-view__content__service">
      <div className="client-bond-list-main-list-item-list-view__content__service__divider">
        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            NAV hiện tại
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value">
            {ConverterUtils.formatNumber(
              NumberUtils.toFixed(navHistory?.[0]?.nav, 0),
            )}{' '}
            vnđ
          </div>
        </div>

        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Ngày khớp lệnh
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value">
            {info?.orderMatchingDate
              ?.map((item: any) => ORDER_MATCHING_DAY_MAPPING[item])
              .join(', ') || ''}
          </div>
        </div>
      </div>
      <div className="client-bond-list-main-list-item-list-view__content__service__break"></div>
      <div className="client-bond-list-main-list-item-list-view__content__service__divider">
        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Phiên giao dịch
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value-bottom">
            {ConverterUtils.dateConverter(info?.nextOrderMatchingSession)}
          </div>
        </div>

        <div className="client-bond-list-main-list-item-list-view__content__service__item">
          <div className="client-bond-list-main-list-item-list-view__content__service__item__label">
            Phí chuyển đổi
          </div>
          <div className="client-bond-list-main-list-item-list-view__content__service__item__value-bottom">
            Theo thời gian nắm giữ
          </div>
        </div>
      </div>
    </div>
  );
};

export const FundItemRowView = (props: any) => {
  const { t } = useHTranslation('common');
  const {
    backgroundColor,
    slug,
    content,
    uiDescription,
    titleHeader,
    orgImage,
    name,
    fundData,
  } = props;

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={'client-bond-list-main-list-item-list-view'}>
      <div
        className={'client-bond-list-main-list-item-list-view__header'}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        <div className="client-bond-list-main-list-item-list-view__header__wrapper">
          <div
            className={
              'client-bond-list-main-list-item-list-view__header__image'
            }
          >
            {orgImage && <img src={orgImage} alt={orgImage} />}
          </div>
          <div
            className={
              'client-bond-list-main-list-item-list-view__header__title'
            }
          >
            {titleHeader}
          </div>
        </div>
        <div
          className={
            'client-bond-list-main-list-item-list-view__content__title'
          }
        >
          {fundData?.code} - {name}
        </div>
      </div>

      <div className={'client-bond-list-main-list-item-list-view__content'}>
        <div className={'client-bond-list-main-list-item-list-view__info-wrap'}>
          <div
            className={
              'client-bond-list-main-list-item-list-view__info-wrap__left'
            }
          >
            <div
              className={
                'client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap'
              }
            >
              {uiDescription}
            </div>
            <Button
              type="link"
              className={
                'client-bond-list-main-list-item-list-view__content__detail-button'
              }
              href={slug}
            >
              {t('See detail', {
                en: 'See detail',
                vn: 'Xem chi tiết',
              })}
              <RightOutlined />
            </Button>
          </div>
          <div
            className={
              'client-bond-list-main-list-item-list-view__info-wrap__right'
            }
          >
            {content}
          </div>
        </div>

        <div
          className={
            'client-bond-list-main-list-item-list-view__content__request-button'
          }
        >
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            {t('Request counselling', {
              en: 'Request counselling',
              vn: 'Yêu cầu tư vấn',
            })}
          </Button>
          <BuyFundActionWithProductProgram data={fundData} />
        </div>

        <ClientFundCertificateRequestCounselling
          visible={visible}
          closeModal={() => setVisible(false)}
          fundData={fundData}
        />
      </div>
    </div>
  );
};
