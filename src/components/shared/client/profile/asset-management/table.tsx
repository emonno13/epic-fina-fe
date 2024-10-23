/* eslint-disable @next/next/no-img-element */
import { SellFundAction } from '@components/features/client/fund-certificate/sell-fund/sell-fund-action';
import { Link } from '@components/shared/link';
import { CloseIconLargeSvg } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import { Modal } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { IconCart, IconDown, IconSale, IconUp } from './constants';
import DetailAsset from './modal-asset-detail';

const TableComponent = ({ asset, selectedProductId, programs }) => {
  const { t } = useHTranslation('common');
  const selectedProduct = useMemo(
    () => asset.find((item) => item.id === selectedProductId),
    [asset, selectedProductId],
  );
  const currentNav = useMemo(
    () => selectedProduct?.navCurrent || 0,
    [selectedProduct],
  );
  const navInvested = useMemo(
    () => selectedProduct?.navInvested || 0,
    [selectedProduct],
  );
  const [detailAsset, setDetailAsset]: any = useState({
    visible: false,
    data: null,
  });

  const handleClickRowTable = (record) =>
    setDetailAsset({ visible: true, data: record });
  const handleCloseModal = () => setDetailAsset({ visible: false, data: null });

  return (
    <>
      <HTable
        scroll={{ x: 'max-content' }}
        bordered={true}
        schema={() => [
          TableUtils.createTableColumnConfig({
            title: t('Organization', { vn: 'CTQL quỹ' }),
            dataIndex: ['product', 'org', 'name'],
            width: 150,
            ellipsis: true,
            key: 'orgName',
            render: (name, document) => {
              return (
                <span
                  className="asset-table-org"
                  onClick={() => handleClickRowTable(document)}
                >
                  <img src={document?.product?.org?.avatar?.url} />
                  {name}
                </span>
              );
            },
          }),
          TableUtils.createTableColumnConfig({
            title: t('Program', { vn: 'Chương trình' }),
            dataIndex: 'productProgramName',
            key: 'productDetailName',
          }),
          TableUtils.createTableColumnConfig({
            title: t('Volume', { vn: 'Số lượng' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => ConverterUtils.formatNumber(volume),
          }),
          // TableUtils.createTableColumnConfig({
          //   title: t('Price invested', { vn: 'Giá mua' }),
          //   render: () => <span>{ConverterUtils.formatNumber(navInvested.toFixed(0))}<sup>đ</sup></span>,
          // }),
          // TableUtils.createTableColumnConfig({
          //   title: t('Total price invested', { vn: 'Giá trị đầu tư' }),
          //   dataIndex: 'volume',
          //   key: 'volume',
          //   render: (volume = 0) => <span>{ConverterUtils.formatNumber((volume * navInvested).toFixed(0))}đ</span>,
          // }),
          TableUtils.createTableColumnConfig({
            title: t('Nav Current', { vn: 'Giá hiện tại' }),
            render: () => (
              <span>
                {currentNav
                  ? ConverterUtils.formatNumber(currentNav.toFixed(0))
                  : '_'}
                <sup>đ</sup>
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Equivalent value', { vn: 'Giá trị tương ứng' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume = 0) => (
              <span>
                {ConverterUtils.formatNumber((volume * currentNav).toFixed(0))}
                <sup>đ</sup>
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Order date', { vn: 'Ngày đặt lệnh' }),
            dataIndex: 'createAt',
            key: 'createAt',
            render: (createAt) => (
              <span>{moment.unix(createAt / 1000).format('DD/MM/YYYY')}</span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('% profit', { vn: '% lợi nhuận' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => {
              const price = volume * currentNav - volume * navInvested;
              const interest = (price / (volume * navInvested)) * 100;
              return (
                <span
                  style={{ color: interest > 0 ? 'green' : 'red' }}
                  className="percent-icon"
                >
                  {ConverterUtils.formatNumber(interest.toFixed(2))}% &nbsp;
                  {interest > 0 ? <IconUp /> : <IconDown />}
                </span>
              );
            },
          }),
          TableUtils.createTableColumnConfig({
            title: t('Total profit', { vn: 'Tổng lợi nhuận' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => {
              const price = volume * currentNav - volume * navInvested;
              return (
                <span
                  style={{ color: price > 0 ? 'green' : 'red' }}
                  className="total-profit"
                >
                  {ConverterUtils.formatNumber(price.toFixed(0))}
                  <sup>đ</sup>
                </span>
              );
            },
          }),
          TableUtils.createTableColumnConfig({
            title: '',
            render: (_, document) => {
              const programSelected = programs.find(
                (item: any) => item.id === document?.productProgramId,
              );

              return (
                <span className="asset-table-actions">
                  <span title={t('profile.buy')}>
                    <Link
                      href={`/danh-sach-chung-chi-quy/${selectedProduct?.slug}`}
                    >
                      <IconCart />
                    </Link>
                  </span>
                  <span title={t('profile.sell')}>
                    <SellFundAction
                      text={<IconSale />}
                      productSell={selectedProduct}
                      productProgramSell={programSelected}
                    />
                  </span>
                </span>
              );
            },
          }),
        ]}
      />

      <Modal
        {...{
          visible: detailAsset?.visible,
          closeIcon: <CloseIconLargeSvg />,
          closable: true,
          onCancel: handleCloseModal,
          width: 655,
          className: 'detail-asset-modal profile-info-modal',
          footer: null,
          title: t('profile.detailFundAssets'),
        }}
      >
        <DetailAsset
          data={detailAsset.data}
          currentNav={currentNav}
          navInvested={navInvested}
          type={selectedProduct?.info?.typeOfFund}
        />
      </Modal>
    </>
  );
};

export default TableComponent;
