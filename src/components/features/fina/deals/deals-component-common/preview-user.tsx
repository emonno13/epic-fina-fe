import { isEmpty } from 'lodash';
import { USER_TYPES } from 'types/organization';
import { UserAvatar } from '@components/shared/common/h-avatar';
import { useGenerateConcealContent, ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { Phones } from '@components/shared/stringee';
import { IconEmail } from '@components/shared/common/configuration/icon-email';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';

import './deals.module.scss';

export const PreViewUser = (props: any) => {
  const {
    user,
    onEditDocument,
    userTitle,
    showContactInfo = true,
    showEmails = true,
    isShowViewFullPhoneNumberAction = true,
    callbackFunctionWhenClickToName,
  } = props;
  const { tels = [], emails = [], type } = user || {};
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const isOnlyViewPermission =
    currentUser.type === USER_TYPES.customer ||
    currentUser.type === USER_TYPES.collaborator;
  const generateConcealContent = useGenerateConcealContent();

  if (isEmpty(user)) {
    if (!onEditDocument) {
      return null;
    }

    return isOnlyViewPermission ? (
      <>_</>
    ) : (
      <a onClick={onEditDocument}>
        {t('Add a staff', { en: 'Add a staff', vn: 'Bổ sung' })}
      </a>
    );
  }

  return (
    <div className={'wrapper-preview-user'}>
      <div className={'wrapper-preview-avatar'}>
        <UserAvatar {...{ user }} />
      </div>
      <div className={'wrapper-preview-short-info'}>
        <div className={'wrapper-preview-user-name'}>
          {callbackFunctionWhenClickToName ? (
            <a onClick={callbackFunctionWhenClickToName}>
              {ConverterUtils.getFullNameUser(user)}
            </a>
          ) : (
            ConverterUtils.getFullNameUser(user)
          )}
        </div>
        <div className={'wrapper-preview-user-position'}>
          {userTitle ||
            (type === USER_TYPES.staff ? 'Tư vấn viên tài chính Fina' : '')}
        </div>
        {showContactInfo && (
          <div className={'wrapper-preview-user-contact'}>
            {tels?.length ? (
              <div>
                {tels?.map(
                  ({ tel }, index) =>
                    tel && (
                      <div
                        key={`${tel}.${index}`}
                        className={'wrapper-preview-phone'}
                      >
                        <CallPhoneFcssSDKConvert
                          {...{
                            phoneNumber: `${tel}`,
                            userInfo: user,
                            isShowViewFullPhoneNumberAction,
                          }}
                        />
                      </div>
                    ),
                )}
              </div>
            ) : (
              <></>
            )}
            {emails?.length && showEmails ? (
              <div className="ui-email-panel">
                {emails?.map(({ email }) => (
                  <>
                    {generateConcealContent(email)}
                    <IconEmail key={email} {...{ email }} />
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .wrapper-preview-user {
          display: flex;
          width: 100%;
        }
        .ui-email-panel {
          display: flex;
        }
        .wrapper-preview-avatar {
          margin-right: 10px;
        }
        .wrapper-preview-user-name {
          color: #111111;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
        }
        .wrapper-preview-user-position {
          font-size: 12px;
          line-height: 20px;
          color: #555555;
          margin-bottom: 8px;
        }
        .wrapper-preview-phone {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export const PreViewCompany = ({ company }) => {
  const { t } = useHTranslation('common');
  const { name = '', emails = [], tels = [] } = company;
  const generateConcealContent = useGenerateConcealContent();
  return (
    <div className="preview-comopany">
      <div className="m-b-10 preview-comopany-origin">
        {' '}
        <p className="preview-comopany-origin-title ">
          {t('Origan', { vn: 'Tổ chức' })}:
        </p>{' '}
        {name}{' '}
      </div>
      <div className="preview-comopany-phone">
        <p className="preview-comopany-origin-title">
          {t('Phone', { vn: 'Điện thoại' })}:
        </p>
        <div className="preview-comopany-list-phone">
          <Phones
            {...{
              phones: tels,
              taskId: undefined,
            }}
          />
        </div>
      </div>
      <div className="ui-email-panel">
        <p className="preview-comopany-origin-title">
          {t('Emai', { vn: 'Email' })}:
        </p>
        <div className="preview-comopany-list-email">
          {emails?.map(({ email }) => (
            <div key={email} className="flex items-center">
              {generateConcealContent(email)}
              <IconEmail key={email} {...{ email }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
