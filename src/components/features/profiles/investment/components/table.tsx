import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import { useContext, useMemo } from 'react';
import { InvestmentContext } from '..';

import './tabs.scss';

const TableComponent = () => {
  const { t } = useHTranslation('admin-common');
  const { asset, selectedProductId } = useContext(InvestmentContext);
  const selectedProduct = useMemo(
    () => asset.find((item: any) => item.id === selectedProductId),
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

  return (
    <div className="list-of-holding-table">
      <HTable
        scroll={{ x: 'max-content' }}
        bordered={true}
        schema={() => [
          TableUtils.createTableColumnConfig({
            title: t('Organization', { vn: 'CTQL quỹ' }),
            dataIndex: ['product', 'org', 'name'],
            key: 'orgName',
          }),
          TableUtils.createTableColumnConfig({
            title: t('Fund - Program', { vn: 'Quỹ - Chương trình' }),
            dataIndex: 'productProgramName',
            key: 'productDetailName',
          }),
          TableUtils.createTableColumnConfig({
            title: t('Volume', { vn: 'Số lượng' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => ConverterUtils.formatNumber(volume),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Price invested', { vn: 'Giá mua' }),
            render: () => (
              <span>
                {ConverterUtils.formatNumber(navInvested.toFixed(0))}đ
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Total price invested', { vn: 'Giá trị đầu tư' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume = 0) => (
              <span>
                {ConverterUtils.formatNumber((volume * navInvested).toFixed(0))}
                đ
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Nav Current', { vn: 'NAV kì trước' }),
            render: () => (
              <span>
                {currentNav
                  ? ConverterUtils.formatNumber(currentNav.toFixed(0))
                  : '_'}
                đ
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Equivalent value', { vn: 'Giá trị hiện tại' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume = 0) => (
              <span>
                {ConverterUtils.formatNumber((volume * currentNav).toFixed(0))}đ
              </span>
            ),
          }),
          TableUtils.createTableColumnConfig({
            title: t('Interest Or Hole (%)', { vn: 'Lời/Lỗ (%)' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => {
              const price = volume * currentNav - volume * navInvested;
              const interest = (price / (volume * navInvested)) * 100;
              return (
                <span style={{ color: interest > 0 ? 'green' : 'red' }}>
                  {ConverterUtils.formatNumber(interest.toFixed(2))}%
                </span>
              );
            },
          }),
          TableUtils.createTableColumnConfig({
            title: t('Interest Or Hole (đ)', { vn: 'Lời/Lỗ (đ)' }),
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => {
              const price = volume * currentNav - volume * navInvested;
              return (
                <span style={{ color: price > 0 ? 'green' : 'red' }}>
                  {ConverterUtils.formatNumber(price.toFixed(0))}đ
                </span>
              );
            },
          }),
        ]}
      />
    </div>
  );
};

export default TableComponent;
