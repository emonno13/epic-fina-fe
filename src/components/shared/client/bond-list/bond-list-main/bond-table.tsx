import { Link } from '@components/shared/link';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Button, Popover } from 'antd';
import { MoreActionIcon } from 'icons';
import { useState } from 'react';
import { TYPE_ACTIONS, TYPE_OF_PROFIT } from '../constants';
import ClientBondTransactionForm from './bond-list-main.form-transaction';

import '../bond-item-list.module.scss';
import '../bond-list.module.scss';

interface Props {
  defaultData?: any;
}

const ClientBondTable = ({ defaultData = [] }: Props) => {
  const data = defaultData.length ? defaultData : useTableSourceData();
  const [visible, setVisible] = useState<boolean>(false);
  const [bondDetail, setBondDetail] = useState({ bond: null, type: '' });

  if (!Array.isArray(data) || data.length < 1) {
    return null;
  }

  const getBond = (data) => {
    setBondDetail(data);
    setVisible(true);
  };

  return (
    <>
      {data.length ? (
        <HTable
          dataSource={data}
          {...{ schema: () => BondListTableSchema({ setBondDetail: getBond }) }}
          className="client-bond-main-list-table"
          pagination={false}
        />
      ) : (
        <HTable
          {...{ schema: () => BondListTableSchema({ setBondDetail: getBond }) }}
          className="client-bond-main-list-table"
          pagination={false}
        />
      )}
      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => {
          setVisible(false);
          setBondDetail({ bond: null, type: '' });
        }}
        bondData={bondDetail}
      />
    </>
  );
};

export default ClientBondTable;

const BondListTableSchema = (props) => {
  const { setBondDetail } = props;
  const { t } = useHTranslation('admin-common');
  const isMobile = useIsMobile();

  const renderActions = (document) => {
    return (
      <div className="client-bond-list-main-list-item-list-view__content__request-button">
        <Button
          onClick={() =>
            setBondDetail({ bond: document, type: TYPE_ACTIONS.REQUEST })
          }
        >
          {t('Request counselling', {
            en: 'Request counselling',
            vn: 'Yêu cầu tư vấn',
          })}
        </Button>

        <Button
          onClick={() =>
            setBondDetail({ bond: document, type: TYPE_ACTIONS.BUY })
          }
          className="buy-button"
        >
          {t('Buy', { vn: 'Mua' })}
        </Button>
      </div>
    );
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Bond name', { vn: 'Tên trái phiếu' }),
      dataIndex: 'name',
      width: 150,
      render: (name, document) => {
        const { info, slug } = document;

        return (
          <>
            <Link href={`/danh-sach-trai-phieu/${slug}`}>
              <div className="bond-list-table-name">{name}</div>
            </Link>

            {isMobile && (
              <div className="bond-list-table-total-value">
                {info.parValueShares && info.totalReleaseVolume
                  ? ConverterUtils.getMoneyLabel(
                      info.totalReleaseVolume * info.parValueShares,
                      t,
                    )
                  : '_'}
              </div>
            )}
          </>
        );
      },
    }),
    // Hide Mobile
    ...(!isMobile
      ? [
          TableUtils.createTableColumnConfig({
            title: t('Total value', { vn: 'Tổng giá trị phát hành' }),
            dataIndex: 'info',
            align: 'center',
            width: 150,
            render: (info) => {
              return (
                <>
                  <div className="bond-list-table-total-value">
                    {info.parValueShares && info.totalReleaseVolume
                      ? ConverterUtils.getMoneyLabel(
                          info.totalReleaseVolume * info.parValueShares,
                          t,
                        )
                      : '_'}
                  </div>
                </>
              );
            },
          }),
        ]
      : []),
    TableUtils.createTableColumnConfig({
      title: (
        <div>
          {t('Interest rate', { vn: 'Lãi suất' })}
          <br />
          <span>(%/ {t('year', { vn: 'năm' })})</span>
        </div>
      ),
      dataIndex: 'info',
      align: 'center',
      width: 120,
      render: (info) => {
        const maxInterest = info.interestRate
          .filter((e) => e.rate)
          .reduce((previousValue, nextValue) =>
            previousValue.rate > nextValue.rate ? previousValue : nextValue,
          );
        return (
          <span className="bond-list-table-interest-rate">
            {maxInterest?.rate} %
          </span>
        );
      },
    }),
    ...(!isMobile
      ? [
          TableUtils.createTableColumnConfig({
            title: (
              <div>
                {t('Denominations', { vn: 'Mệnh giá' })}
                <br /> <span>(VNĐ/ {t('bonds', { vn: 'trái phiếu' })})</span>
              </div>
            ),
            dataIndex: 'info',
            width: 150,
            align: 'center',
            render: (info) => {
              return (
                <>
                  <div className="bond-list-table-total-value">
                    {FormatterUtils.formatAmount(info.parValueShares)}
                  </div>
                </>
              );
            },
          }),
        ]
      : []),
    TableUtils.createTableColumnConfig({
      title: (
        <div>
          Kì tính lãi
          <br /> <span>(Tháng/ lần)</span>
        </div>
      ),
      align: 'center',
      dataIndex: 'info',
      width: 120,
      render: (info) => {
        return (
          <>
            {info.typeOfProfit === TYPE_OF_PROFIT.PERIODIC ? (
              <div className="bond-list-table-period">
                {info.interestPeriod}{' '}
                {t('product ', { en: 'Month', vn: 'tháng' })}
              </div>
            ) : (
              <div className="bond-list-table-period">Nhận lãi cuối kì</div>
            )}
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: isMobile ? t('action', { vn: 'Hành động' }) : '',
      align: 'center',
      width: 100,
      key: 'id',
      render: (id, document) => {
        return (
          <>
            {isMobile ? (
              <Popover
                placement="topRight"
                overlayClassName="bond-list-table-popover"
                content={renderActions(document)}
                trigger="click"
              >
                <MoreActionIcon />
              </Popover>
            ) : (
              renderActions(document)
            )}
          </>
        );
      },
    }),
  ];
};
