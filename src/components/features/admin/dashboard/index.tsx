import { useHTranslation } from '@lib/i18n';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TASK_PRIORITY, TASK_STATUSES } from '../../../../constants/crm/task';
import { ConverterUtils } from '../../../../lib/converter';
import { useAuth, useCurrentUser } from '../../../../lib/providers/auth';
import { requestInformationUser } from '../../../../store/actions';
import { DEAL_STATUSES } from '../../fina/deals/utils';
import { getActionStatusWithoutDone } from '../../fina/progress-template/utils';
import { DashboardBlock } from './dashboard-block';
import { DashboardDealTracking } from './dashboard-deal-tracking';
import { DashboardTaskTracking } from './dashboard-task-tracking';

import './dashboard.scss';

const Dashboard = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const { setCurrentUser } = useAuth();
  const dispatch = useDispatch();
  const taskTrackingTabs = [
    {
      tab: t('Mới / Đang xử lý'),
      key: 'processing',
      content: (
        <DashboardTaskTracking
          {...{
            hiddenValues: {
              status: {
                inq: [
                  TASK_STATUSES.NEW,
                  TASK_STATUSES.PROCESSING,
                  ...getActionStatusWithoutDone(),
                ],
              },
              endAt: {
                gt: moment().format('YYYY/MM/DD HH:mm:ss'),
              },
              assigneeId: currentUser?.id,
            },
            featureId: 'dashboardTaskProcessingTracking',
          }}
        />
      ),
    },
    {
      tab: t('Quá hạn'),
      key: 'out_of_date',
      content: (
        <DashboardTaskTracking
          {...{
            hiddenValues: {
              status: { neq: TASK_STATUSES.DELETED },
              endAt: {
                lt: moment().format('YYYY/MM/DD HH:mm:ss'),
              },
              assigneeId: currentUser?.id,
            },
            featureId: 'dashboardTaskOutOfDateTracking',
          }}
        />
      ),
    },
    {
      tab: t('Cần duyệt'),
      key: 'need_approve',
      content: (
        <DashboardTaskTracking
          {...{
            hiddenValues: {
              status: { nin: [DEAL_STATUSES.CANCELLED, DEAL_STATUSES.DELETED] },
              assigneeId: currentUser?.id,
              priority: {
                gt: TASK_PRIORITY.NORMAL,
              },
            },
            featureId: 'dashboardTaskNeedApproveTracking',
          }}
        />
      ),
    },
  ];

  const dealTrackingTabs = [
    {
      tab: t('Khoản vay'),
      key: 'loan',
      content: (
        <DashboardDealTracking
          type={'loan'}
          featureId={'dashboardDealLoanTracking'}
          shouldNotShowProfileInfo={true}
        />
      ),
    },
    {
      tab: t('Bảo hiểm'),
      key: 'insurance',
      content: (
        <DashboardDealTracking
          type={'insurance'}
          featureId={'dashboardDealInsuranceTracking'}
          shouldNotShowProfileInfo={true}
        />
      ),
    },
    {
      tab: t('Bất động sản'),
      key: 'real_estate',
      content: (
        <DashboardDealTracking
          type={'real_estate'}
          featureId={'dashboardDealRealEstateTracking'}
          shouldNotShowProfileInfo={true}
        />
      ),
    },
    {
      tab: t('Khác'),
      key: 'other',
      content: <h4>Khác</h4>,
    },
  ];
  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          setCurrentUser({
            ...response,
            fullName: ConverterUtils.getFullNameUser(response),
          });
        },
      }),
    );
  }, []);

  return (
    <div className={'fina-dashboard'}>
      <div className={'fina-dashboard__title'}>
        Chào ngày mới, <strong>{currentUser?.fullName}</strong>!
      </div>
      <div className={'fina-dashboard__title'}>
        {t('Your referral code')}: <strong>{currentUser?.code}</strong>
      </div>
      <div className={'fina-dashboard__content m-t-10'}>
        <div className={'fina-dashboard__content-left'}>
          <DashboardBlock
            title={'Theo dõi công việc'}
            tabList={taskTrackingTabs}
          />
          <DashboardBlock title={'Theo dõi hồ sơ'} tabList={dealTrackingTabs} />
        </div>

        {/*<div className={'fina-dashboard__content-right'}>*/}
        {/*	<DashboardBlock title={'Thu nhập của bạn'} tabList={[]}/>*/}
        {/*	<DashboardBlock title={'Tin nhắn'} tabList={[]}/>*/}
        {/*</div>*/}
      </div>

      {/*<DashboardBlock title={'Thống kê'} tabList={[]}/>*/}
    </div>
  );
};
export default Dashboard;
