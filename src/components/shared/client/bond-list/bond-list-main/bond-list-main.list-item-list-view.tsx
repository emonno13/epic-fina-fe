import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import BondItemRowView from '../../bond-loan-item/bond-item.item-row-view';
import ClientBondListMainListItemContent from './bond-list-main.bond-item-content';
import ClientBondTransactionForm from './bond-list-main.form-transaction';

const ClientBondListMainListItemListView = ({ bondData }) => {
  const { name, sku, org, slug, productCodeOfTheInvestor, info } = bondData;
  const { t } = useHTranslation('admin-common');
  const orgImage = org?.image?.url || '';
  const [visible, setVisible] = useState<boolean>(false);
  const [typeAction, setTypeAction] = useState('');

  const showModal = (type) => {
    setTypeAction(type);
    setVisible(true);
  };

  const uiDescription = (
    <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap">
      <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap-item">
        <div className="w-half">
          <div>{t('product.sku')}: </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {sku}
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
          <div>
            {t('product.productCodeOfTheInvestor ', {
              en: 'Preferential time',
              vn: 'Mã trái phiếu',
            })}
            :{' '}
          </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {productCodeOfTheInvestor}
          </div>
        </div>
        <div className="w-half">
          <div>{t('product.maturityDate')}: </div>
          <div className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">
            {ConverterUtils.dateConverter(info.maturityDate)}
          </div>
        </div>
      </div>
      {/* <div>
				<span>{t('product.releaseDate')}</span>: <span className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">{ConverterUtils.dateConverter(info.releaseDate)}</span>
			</div>
		*/}
      {/* <div>
			<span>{t('product ', { en: 'product', vn: 'Kì hạn trái phiếu' })}</span>: {info.typeOfProfit === TYPE_OF_PROFIT.PERIODIC ? <span className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">{info.interestPeriod} {t('product  ', { en: 'month', vn: 'tháng' })}</span> : <span>Nhận lãi cuối kì</span>}
		</div> */}
      {/* todo -- UI temporarily hide this field */}
      {/* <div>. <span>{t('product ', { en: 'product.', vn: 'Khối lượng đăng kí giao dịch tối thiểu' })}</span>: <span className="client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap__value">{info.minimumPurchaseVolume ? info.minimumPurchaseVolume : '_'} {t('product ', { en: 'Preferential time', vn: 'trái phiếu' })}</span></div> */}
    </div>
  );

  return (
    <>
      <BondItemRowView
        backgroundColor={org?.backgroundColor}
        orgImage={orgImage}
        titleHeader={org ? org.name : ''}
        slug={`/danh-sach-trai-phieu/${slug}`}
        name={name}
        content={<ClientBondListMainListItemContent bondData={bondData} />}
        uiDescription={uiDescription}
        onClick={showModal}
      />

      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => setVisible(false)}
        bondData={{ bond: bondData, type: typeAction }}
      />
    </>
  );
};

export default ClientBondListMainListItemListView;
