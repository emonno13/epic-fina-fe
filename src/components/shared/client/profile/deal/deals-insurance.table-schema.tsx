import { Tag } from 'antd';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { DEAL_STATUS } from '@components/features/fina/deals/utils';
import { FormatterUtils } from '@lib/formatter';
import { ConverterUtils } from '../../../../../lib/converter';
import { useAuth } from '../../../../../lib/providers/auth';
import { ItemViewer } from '../../../common/configuration/item-viewer';

export const DealsInsuranceTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();

  return [
    TableUtils.createTableColumnConfig({
      title: t('Nhà cung cấp'),
      render: (_, document: any) => {
        return (
          <div style={{ maxWidth: '140px' }}>
            {document?.product?.org?.name}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Profile information'),
      fixed: 'left',
      dataIndex: 'code',
      key: 'code',
      render: (_, document: any) => {
        const detailLink = `profile/transaction-management/records?dealId=${document.id}`;
        return (
          <div className="deal-content">
            <div className={'code-status-deal'}>
              <Link href={detailLink}>
                <span style={{ color: '#0B51D7' }}>#{document.code}</span>
              </Link>
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('User', { vn: 'Chủ hồ sơ' }),
      render: (_, document: any) => {
        return (
          <div style={{ fontWeight: 'bold' }}>
            {ConverterUtils.getFullNameUser(document?.user)}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Tel'),
      render: (_, document: any) => {
        return <div>{document?.user?.tels?.[0]?.tel}</div>;
      },
    }),

    TableUtils.createTableColumnConfig({
      title: t('Số tiền'),
      render: (_, document: any) => {
        return (
          <div className="deal-content">
            {FormatterUtils.formatAmount(document?.meta?.amount || 0, '')}đ
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      render: (_, document: any) => {
        return <StatusDeals {...{ document, currentUser }} />;
      },
    }),
  ];
};

export const StatusDeals = ({ currentUser, document }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <div className={'status-deal'}>
      <ItemViewer
        {...{
          label: '',
          className: 'status-deal_item',
          value: (
            <>
              <Tag color={DEAL_STATUS[document?.status]?.color}>
                {t(DEAL_STATUS[document?.status]?.name) || t(document?.status)}
              </Tag>
            </>
          ),
          labelClassName: 'm-b-10',
        }}
      />
    </div>
  );
};
