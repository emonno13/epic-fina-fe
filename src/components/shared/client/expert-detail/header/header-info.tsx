import { StarFilled, UserOutlined } from '@ant-design/icons';
import { ZaloIcon } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Avatar } from 'antd';
import camelCase from 'camelcase';
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from 'next-share';
import { useMemo } from 'react';

export const ExpertDetailHeaderInfoSocialItem = ({ icon, value }) => (
  <a
    {...{
      href: value,
      target: '_blank',
      className: 'expert-detail-header-info-social-item',
    }}
  >
    {icon}
  </a>
);

const ExpertDetailHeaderInfo = ({ data, ratingStats }) => {
  const { t } = useHTranslation('admin-common');
  const { avatar, advancedInformation, title } = data;
  const socialLinks = useMemo(() => {
    const { linkFb, linkZalo, linkLinkedIn, linkTwitter, linkTelegram } =
      advancedInformation || {};
    const links = [
      {
        icon: <FacebookIcon round />,
        value: linkFb,
      },
      {
        icon: (
          <ZaloIcon
            {...{
              viewBox: '0 0 32 32',
              id: 'expert-detail-header-info-zalo-icon',
            }}
          />
        ),
        value: linkZalo,
      },
      {
        icon: <LinkedinIcon round />,
        value: linkLinkedIn,
      },
      {
        icon: <TwitterIcon round />,
        value: linkTwitter,
      },
      {
        icon: <TelegramIcon round />,
        value: linkTelegram,
      },
    ];

    return links.filter(({ value }) => !!value);
  }, [advancedInformation]);

  return (
    <div className="expert-detail-header-info">
      <Avatar
        {...{
          src: avatar,
          size: 136,
          icon: <UserOutlined />,
        }}
      />
      <div className="expert-detail-header-info-detail">
        <h2 className="expert-detail-header-info-detail__name">
          {ConverterUtils.getFullNameUser(data)}
        </h2>
        <p className="expert-detail-header-info-detail__title">
          {title
            ? t(camelCase(title))
            : t('Financial expert', { vn: 'Chuyên viên tài chính' })}
        </p>
        <div className="expert-detail-header-info-detail-rate-and-socials">
          <div className="expert-detail-header-info-detail__rate">
            <StarFilled />
            <span>{ratingStats?.rate}</span>
          </div>
          {socialLinks.map((socialLink, index) => (
            <ExpertDetailHeaderInfoSocialItem
              key={`social-link-item-${index}`}
              {...socialLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailHeaderInfo;
