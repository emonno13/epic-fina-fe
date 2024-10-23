import { ProfileTitle } from '@components/features/profiles/player-screen';
import { PageHeader } from 'antd';
import { useContext } from 'react';
import { useHTranslation } from '../../../../../lib/i18n';
import { partnerScreen } from '../constants';
import { LinkWithPartnerContext } from '../context/context';
import VinaCapitalManagement from '../vinacapital';
import { LinkWithPartnerList } from './link-with-partner-list';

export const SwitchScreenLinkPartner = () => {
  const { t } = useHTranslation('admin');
  const { screen } = useContext(LinkWithPartnerContext);
  switch (screen) {
    case partnerScreen.LIST:
      return (
        <>
          <ProfileTitle
            description={t(
              'Please select a partner to view specific information.',
              {
                vn: 'Quý khách vui lòng chọn một đối tác để xem thông tin cụ thể.',
              },
            )}
          >
            <div>{t('Link information', { vn: 'Thông tin liên kết' })}</div>
          </ProfileTitle>
          <LinkWithPartnerList />
        </>
      );
    case partnerScreen.VINA_CAPITAL:
      return (
        <PartnerDetailWithHeader partnerName={'VinaCapital'}>
          <VinaCapitalManagement />
        </PartnerDetailWithHeader>
      );
    default:
      return null;
  }
};

const PartnerDetailWithHeader = ({ children, partnerName }) => {
  const { setScreen } = useContext(LinkWithPartnerContext);
  return (
    <PageHeader
      style={{ padding: 0 }}
      onBack={() => {
        setScreen(partnerScreen.LIST);
      }}
      title={partnerName}
    >
      {children}
    </PageHeader>
  );
};
