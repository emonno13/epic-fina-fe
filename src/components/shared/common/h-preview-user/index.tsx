import { ConverterUtils } from '@lib/converter';
import { MailIcon } from 'icons';
import { useHTranslation } from '../../../../lib/i18n';
import { USER_TYPES } from '../../../../types/organization';
import { IconEmail } from '../configuration/icon-email';
import { IconPhoneCall } from '../configuration/icon-phone';
import { IconZalo } from '../configuration/icon-zalo';
import { UserAvatar } from '../h-avatar';

import './h-preview-user.scss';

export const HPreviewUser = (props: any) => {
  const { user, userTitle } = props;
  const { tels = [], emails = [], type } = user || {};
  const { t } = useHTranslation('admin-common');
  const urlChatZalo = `https://zalo.me/${tels[0]?.tel}?chat`;
  return (
    <div className={'h-wrapper-preview-user'}>
      <div className={'wrapper-preview-avatar'}>
        <UserAvatar {...{ user }} />
      </div>
      <div className={'wrapper-preview-short-info'}>
        <div className={'wrapper-preview-user-name'}>
          {ConverterUtils.getFullNameUser(user)}
        </div>
        <div className={'wrapper-preview-user-position'}>
          {userTitle ||
            (type === USER_TYPES.staff ? 'Tư vấn viên tài chính Fina' : '')}
          <div>
            {!user?.id && user?.type !== USER_TYPES.customer
              ? '( Chưa thêm nhân viên )'
              : ''}
          </div>
        </div>
        <div className={'wrapper-preview-user-social-network'}>
          {tels.length > 0 && (
            <>
              <div>
                {tels.map(
                  ({ tel }, index) =>
                    tel && (
                      <div
                        key={`${tel}.${index}`}
                        className={'wrapper-preview-phone'}
                      >
                        <IconPhoneCall
                          {...{ phoneNumber: `${tel}`, userInfo: user }}
                        />
                      </div>
                    ),
                )}
              </div>
              <div className="ui-email-panel">
                <IconZalo zaloUrl={urlChatZalo} />
              </div>
            </>
          )}
          {emails.length > 0 && (
            <div className="ui-email-panel">
              {emails.map(({ email }) => (
                <>
                  <IconEmail
                    key={email}
                    {...{ email, icon: (<MailIcon />) as any }}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
