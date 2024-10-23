/* eslint-disable @next/next/no-img-element */
import { InfoCircleOutlined } from '@ant-design/icons';
import { mappingLabelTypeOfFund } from '@components/features/fina/products/fund/utils';
import { Link } from '@components/shared/link';
import { DesIcon, IncIcon } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { NumberUtils } from '@lib/utils/number';
import { HTable } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Button, Popover } from 'antd';
import { useRouter } from 'next/router';

import '../../../features/client/fund-certificate/buy-fund/buy-fund.module.scss';
import '../../../features/client/fund-certificate/client-fund-certificate.module.scss';
import './fund-certificates-wrapper.scss';

const FundCertificatesTable = () => {
  const data = useTableSourceData();
  const { locale } = useRouter();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleClickRowTable = (record) => {
    if (isMobile) return;
    router.push(`/${locale}/danh-sach-chung-chi-quy/${record?.slug}`);
  };

  if (!data?.length) return null;

  return (
    <HTable
      schema={FundCertificatesTableSchema}
      className="client-fund-certificates-table"
      onRow={(record) => {
        return { onClick: () => handleClickRowTable(record) };
      }}
      pagination={false}
    />
  );
};

export default FundCertificatesTable;

export const ButtonToFundDetail = ({ record, className = '' }) => {
  const { t } = useHTranslation('common');
  return (
    <Link href={`/danh-sach-chung-chi-quy/${record?.slug}`}>
      <Button className={className} type="primary">
        {t('Buy', { vn: 'Mua' })}
      </Button>
    </Link>
  );
};

export const FundCertificatesTableSchema = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  const ContentIssuers = ({ document }) => {
    return (
      <div className="fund-certificates-table-issuers-content">
        <div className="fund-certificates-table-issuers-content-title">
          Đơn vị phát hành
        </div>
        <div className="fund-certificates-table-issuers-content-item">
          <span className="fund-certificates-table-issuers-content-label">
            Tên đơn vị phát hành
          </span>
          <span className="fund-certificates-table-issuers-content-value">
            {document?.org?.name || ''}
          </span>
        </div>
        <div className="fund-certificates-table-issuers-content-item">
          <span className="fund-certificates-table-issuers-content-label">
            Thông tin
          </span>
          <span className="fund-certificates-table-issuers-content-value">
            {document?.org?.description || '_'}
          </span>
        </div>
      </div>
    );
  };

  const renderColorPercent = (percent: number) => {
    return percent < 0
      ? 'fund-certificates-table-percent-hole'
      : 'fund-certificates-table-percent-interest';
  };

  const tableSchemaForDesktop = [
    TableUtils.createTableColumnConfig({
      title: t('Fund Certificate Name', { vn: 'Mã chứng chỉ quỹ' }),
      dataIndex: 'info',
      width: 150,
      render: (info, document) => {
        return (
          <div className="fund-certificates-table-info">
            <img src={document?.org?.avatar?.url} alt={document?.org?.name} />
            <div className="fund-certificates-table-name-wrapper">
              <Link href={`/danh-sach-chung-chi-quy/${document.slug}`}>
                <span className="fund-certificates-table-name">
                  {document?.code}
                </span>
              </Link>
              <div className={'fund-certificates-table-fund-type'}>
                {mappingLabelTypeOfFund(info?.typeOfFund)}
              </div>
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Issuers', { vn: 'Tổ chức phát hành' }),
      align: 'center',
      width: 150,
      render: (record) => {
        return (
          <div className="fund-certificates-table-issuers">
            {record?.org?.name}
            <Popover content={<ContentIssuers document={record} />}>
              <InfoCircleOutlined />
            </Popover>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: (
        <span>
          <strong>{t('Nearest price', { vn: 'Giá gần nhất' })}</strong> (VNĐ)
        </span>
      ),
      align: 'right',
      key: 'nav',
      render: (documentDetail) => {
        return (
          <div>
            <div className="fund-certificates-table-nearest-price">
              {ConverterUtils.formatNumber(
                NumberUtils.toFixed(documentDetail?.info?.navCurrently, 0),
              )}
              {documentDetail?.info?.navCurrently >
                documentDetail?.info?.navPre && (
                <IncIcon style={{ marginLeft: 8 }} />
              )}
              {documentDetail?.info?.navCurrently <
                documentDetail?.info?.navPre && (
                <DesIcon style={{ marginLeft: 8 }} />
              )}
            </div>

            <div className="fund-certificates-table-date-update">
              Cập nhật ngày{' '}
              {ConverterUtils.dateConverterToString(
                documentDetail?.info?.preOrderMatchingSession,
                'DD/MM',
              )}
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      align: 'center',
      key: 'info',
      className: 'fund-info',
      children: [
        {
          title: 'Lợi nhuận 6 tháng',
          align: 'center',
          dataIndex: ['info', 'volatilityOverTime', 'inSixMonth'],
          key: 1,
          render: (percent) => {
            return (
              <span
                className={`fund-certificates-table-percent ${renderColorPercent(percent)}`}
              >
                {NumberUtils.toFixed(percent)}%
              </span>
            );
          },
        },
        {
          title: 'Lợi nhuận 1 năm',
          dataIndex: ['info', 'volatilityOverTime', 'inOneYear'],
          align: 'center',
          key: 2,
          render: (percent) => (
            <span
              className={`fund-certificates-table-percent ${renderColorPercent(percent)}`}
            >
              {NumberUtils.toFixed(percent)}%
            </span>
          ),
        },
        {
          title: 'Lợi nhuận 3 năm',
          dataIndex: ['info', 'volatilityOverTime', 'inThreeYear'],
          align: 'center',
          key: 3,
          render: (percent) => (
            <span
              className={`fund-certificates-table-percent ${renderColorPercent(percent)}`}
            >
              {NumberUtils.toFixed(percent)}%
            </span>
          ),
        },
      ] as any,
    }),
    TableUtils.createTableColumnConfig({
      align: 'center',
      width: 80,
      render: (record) => <ButtonToFundDetail record={record} />,
    }),
  ];
  const tableSchemaForMobile = [
    TableUtils.createTableColumnConfig({
      title: t('Fund Certificate Name', {
        vn: 'Mã chứng chỉ quỹ',
      }),
      dataIndex: 'info',
      width: 200,
      render: (info, document) => {
        return (
          <div className="fund-certificates-table-info">
            <div className="fund-certificates-table-name-wrapper">
              <Link href={`/danh-sach-chung-chi-quy/${document.slug}`}>
                <span className="fund-certificates-table-name">
                  {document?.code}
                </span>
              </Link>
              <div className={'fund-certificates-table-fund-type'}>
                {mappingLabelTypeOfFund(info?.typeOfFund)}
              </div>
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: (
        <span>
          <strong>{t('Nearest price', { vn: 'Giá gần nhất' })}</strong> (VNĐ)
        </span>
      ),
      align: 'left',
      width: 200,
      key: 'nav',
      render: (documentDetail) => {
        return (
          <>
            <div>
              <div className="fund-certificates-table-nearest-price">
                {ConverterUtils.formatNumber(
                  NumberUtils.toFixed(documentDetail?.info?.navCurrently, 0),
                )}
                {documentDetail?.info?.navCurrently >
                  documentDetail?.info?.navPre && (
                  <IncIcon style={{ marginLeft: 8 }} />
                )}
                {documentDetail?.info?.navCurrently <
                  documentDetail?.info?.navPre && (
                  <DesIcon style={{ marginLeft: 8 }} />
                )}
              </div>

              <div className="fund-certificates-table-date-update">
                Cập nhật ngày{' '}
                {ConverterUtils.dateConverterToString(
                  documentDetail?.info?.preOrderMatchingSession,
                  'DD/MM',
                )}
              </div>
            </div>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: (
        <span>
          <strong>{t('Profit', { vn: 'Lợi nhuận' })}</strong>{' '}
          {t('(1 most recent year)', { vn: '(1 năm gần nhất)' })}
        </span>
      ),
      dataIndex: 'info',
      align: 'left',
      render: (info, record) => (
        <div className="flex" style={{ alignItems: 'center' }}>
          <span
            className={`fund-certificates-table-percent ${renderColorPercent(info?.volatilityOverTime?.inOneYear)}`}
          >
            {NumberUtils.toFixed(info?.volatilityOverTime?.inOneYear)}%
          </span>
          <ButtonToFundDetail record={record} />
        </div>
      ),
    }),
  ];

  if (isMobile) return tableSchemaForMobile;
  return tableSchemaForDesktop;
};
