import { FormOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Button, Tag } from 'antd';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { useOnDocumentClick } from '../../../../../schema-form/features/hooks/table-hooks';
import { IconEmail } from '../../../../shared/common/configuration/icon-email';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';
import { DEAL_STATUS } from '../../deals/utils';
import { useOpenUserInfoModal } from './hooks';
import TransactionInformationCount from './transaction-information-count';
import UserOwners from './user-owners';

export const SearchUserTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const onDocumentClick = useOnDocumentClick();
  const onOpenUserInfoModal = useOpenUserInfoModal();
  return [
    {
      title: t('full_name', { vn: 'Họ và tên' }),
      dataIndex: 'firstName',
      key: 'name',
      width: '20%',
      render: (_, user) => (
        <span style={{ textTransform: 'capitalize' }}>
          {ConverterUtils.getFullNameUser(user)}
        </span>
      ),
    },
    {
      title: t('Information', { vn: 'Thông tin tìm kiếm' }),
      dataIndex: 'id',
      key: 'id',
      width: '190px',
      render: (_, user) => {
        const tels = [...(user.tels || [])];
        const emails = [...(user.emails || [])];
        const idNumber = user?.idNumber;
        return (
          <div>
            {emails?.map(
              ({ email }) =>
                email && (
                  <div style={{ display: 'flex' }}>
                    {email}
                    <IconEmail key={email} {...{ email }} />
                  </div>
                ),
            )}
            {tels.map(
              (phoneData) =>
                phoneData?.tel && (
                  <CallPhoneFcssSDKConvert
                    {...{ phoneNumber: `${phoneData?.tel}`, userInfo: user }}
                  />
                ),
            )}
            {idNumber && (
              <ItemViewer
                {...{
                  label: 'CMT/CCCD',
                  value: idNumber,
                  labelClassName: 'm-b-0i',
                }}
              />
            )}
          </div>
        );
      },
    },
    TableUtils.createColumnCreatedAt(),
    TableUtils.createTableColumnConfig({
      title: t('', { vn: 'Thông tin giao dịch' }),
      render: (record) => {
        const { deals = [], insuranceTransactions = [] } = record;
        return (
          <div>
            <TransactionInformationCount
              {...{
                count: deals?.length || 0,
                label: t('Loan deals', { vn: 'Hồ sơ vay' }),
                record,
              }}
            />
            <TransactionInformationCount
              {...{
                count: insuranceTransactions?.length || 0,
                label: t('Insurance', { vn: 'Bảo hiểm' }),
                record,
                tabKey: 'insurance',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Owner', { vn: 'Sở hữu bởi' }),
      dataIndex: 'owner',
      key: 'owner',
      sortable: true,
      render: (_, record) => {
        return (
          <UserOwners
            {...{
              record,
              showTitle: false,
            }}
          />
        );
      },
    }),
    {
      title: t('Request access', { vn: 'Yêu cầu quyền truy cập' }),
      dataIndex: 'id',
      key: 'id',
      width: '100px',
      render: (_, user) => {
        let status = '';
        let disable = false;
        if (
          currentUser.id == user.ownerId ||
          currentUser.id == user.createdById
        ) {
          status = 'Khách hàng của bạn';
          disable = true;
        } else if (
          user?.sharingWithUserIds?.includes(currentUser.id) ||
          currentUser.id == user.id
        ) {
          status = 'Đã có quyền sử dụng';
          disable = true;
        } else {
          status = t('Request access', { vn: 'Yêu cầu quyền truy cập' });
          disable = false;
        }
        return (
          <div className="request-access-cell">
            <FormOutlined onClick={() => onOpenUserInfoModal(user)} />
            <Button
              {...{
                type: 'primary',
                onClick: () => onDocumentClick(user, {}),
                disabled: disable,
              }}
            >
              {status}
            </Button>
          </div>
        );
      },
    },
  ];
};

export const UserInfoLoanDealsTableSchema = (t) => {
  return [
    TableUtils.createTableColumnConfig({
      title: t('Document code', { vn: 'Mã hồ sơ' }),
      dataIndex: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Loan product', { vn: 'Sản phẩm vay' }),
      dataIndex: ['product', 'name'],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Document code', { vn: 'Mã căn hộ' }),
      dataIndex: ['realEstateInfo', 'apartmentCode'],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Staff', { vn: 'Nhân viên xử lý' }),
      dataIndex: 'assignee',
      render: (assignee) => (
        <PreViewUser
          {...{
            user: assignee,
            userTitle: t('Staff', { vn: 'Nhân viên xử lý' }),
          }}
        />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status', { vn: 'Trạng thái' }),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={DEAL_STATUS[status]?.color}>
          {t(DEAL_STATUS[status]?.name) || t(status)}
        </Tag>
      ),
    }),
  ];
};

export const UserInfoInsuranceTableSchema = (t) => {
  return [
    TableUtils.createTableColumnConfig({
      title: t('Document code', { vn: 'Mã hồ sơ' }),
      dataIndex: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Insurance product', { vn: 'Sản phẩm bảo hiểm' }),
      dataIndex: ['product', 'name'],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Staff', { vn: 'Nhân viên xử lý' }),
      dataIndex: 'staff',
      render: (staff) => (
        <PreViewUser
          {...{
            user: staff,
            userTitle: t('Staff', { vn: 'Nhân viên xử lý' }),
          }}
        />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status', { vn: 'Trạng thái' }),
      dataIndex: 'status',
      render: (status) => <Tag color="green">{t(status)}</Tag>,
    }),
  ];
};
