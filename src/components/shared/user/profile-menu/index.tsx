import { UserOutlined } from '@ant-design/icons';
import SpeedTestInternet from '@components/shared/common-form-elements/speed-test-internet';
import { useIsMobile } from '@lib/hooks/use-media';
import { useMeliSocketCallStatus } from '@schema-form/ws/hooks';
import { Badge, Popover, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../lib/providers/auth';
import { Link } from '../../link';
import { Logout } from '../utils';
const { Text } = Typography;

import './view.module.scss';

export const ProfileMenu = () => {
  const { t } = useTranslation('common');
  const { currentUser = {} } = useAuth();
  const { status, label } = useMeliSocketCallStatus();
  const isMobile = useIsMobile();

  const profileTitle = (
    <Space direction="vertical">
      <Text strong> {(currentUser as any).fullName}</Text>
      <Text className={`label-call-status ${status}`}> {label}</Text>
    </Space>
  );

  const renderLinkProfile = () => {
    if (!isMobile) return '/admin/profiles?screen=setting';
    return '/admin/profiles';
  };

  const profileMenu = (
    <div className="profile-menu">
      <p>
        <Link href={renderLinkProfile()}>{t('my_profile')}</Link>
      </p>
      <p>
        <a>
          <Logout />
        </a>
      </p>
    </div>
  );
  return (
    <Space>
      <Popover
        className="ui-profile-menu"
        placement="bottomRight"
        title={profileTitle}
        content={profileMenu}
      >
        <Badge
          {...{
            dot: true,
            offset: [-4, 22],
            status,
          }}
        >
          <UserOutlined className="user" style={{ fontSize: 18 }} />
        </Badge>
      </Popover>
      <SpeedTestInternet />
    </Space>
  );
};
