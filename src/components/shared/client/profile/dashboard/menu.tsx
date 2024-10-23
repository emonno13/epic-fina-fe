import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';
import {
  IconAdvancedSurveys,
  IconAffiliateAccount,
  IconAssetManagement,
  IconContributorContract,
  IconEarningsCommissions,
  IconListTransactions,
  IconRecordsManagement,
  IconReferrer,
} from 'icons';

import './styles.module.scss';

const ProfileDashboardMenu = () => {
  const { t } = useHTranslation('common');

  const menus = [
    {
      icon: <IconListTransactions />,
      label: t('profile.listOfTransactions'),
      link: '/profile/transaction-management/transactions',
    },
    {
      icon: <IconRecordsManagement />,
      label: t('profile.recordsManagement'),
      link: '/profile/transaction-management/records',
    },
    {
      icon: <IconAssetManagement />,
      label: t('profile.assetManagement'),
      link: '/profile/asset-management',
    },
    {
      icon: <IconAffiliateAccount />,
      label: t('profile.affiliateAccount'),
      link: '/profile/account-management/affiliate-account',
    },
    {
      icon: <IconEarningsCommissions />,
      label: t('profile.earningsCommissions'),
      link: '/profile/account-management/earnings-commissions',
    },
    {
      icon: <IconReferrer />,
      label: t('profile.referrer'),
      link: '/profile/account-management/my-network',
    },
    {
      icon: <IconContributorContract />,
      label: t('profile.collaboratorContract'),
      link: '/profile/account-management/collaborator-contract',
    },
    {
      icon: <IconAdvancedSurveys />,
      label: t('profile.advancedSurveys'),
      link: '/profile/account-management/advanced-surveys',
    },
  ];

  return (
    <div className="profile-dashboard-menus">
      <Row gutter={[16, 16]}>
        {menus?.map((item, index) => (
          <Col {...{ xs: 12, sm: 12, md: 6 }} key={index}>
            <a href={item?.link} target="_blank" rel="noreferrer">
              <div className="profile-dashboard-menus-item">
                <div className="profile-dashboard-menus-icon">{item?.icon}</div>
                <div className="profile-dashboard-menus-content">
                  {item?.label}
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileDashboardMenu;
