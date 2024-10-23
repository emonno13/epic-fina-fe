import { ConverterUtils } from '@lib/converter';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { useHTranslation } from '@lib/i18n';
import { Popover } from 'antd';
import { PhoneOutlinedIconSvg } from 'icons';
import { FC, memo, ReactNode } from 'react';
import { AnyObject } from '../atom/type';
import { EmailWithIcon } from '../common/configuration/email-icon';
import { UserAvatar } from '../common/h-avatar';

import './view-customer.module.scss';

const ContentInfoUser: FC<{ user: AnyObject; document: AnyObject }> = memo(
  (props) => {
    const { user, document } = props;
    const { t } = useHTranslation('admin');

    const tels = user?.tels ?? [];
    const emails = user?.emails ?? [];

    return (
      <div className="info-user">
        <div className="header-info">
          <UserAvatar {...{ user }} />
          <div className="info">
            <div className={'customer-name'}>
              {ConverterUtils.getFullNameUser(user)}
            </div>

            {tels.map(({ tel }) => {
              if (!tel) {
                return <></>;
              }

              return (
                <div key={tel} className={'wrapper-preview-phone'}>
                  <CallPhoneFcssSDKConvert
                    {...{
                      phoneNumber: `${tel}`,
                      userInfo: user,
                      icon: <PhoneOutlinedIconSvg />,
                    }}
                  />
                </div>
              );
            })}

            <div className="ui-email-panel">
              {emails.map(({ email }) => (
                <EmailWithIcon email={email} key={email} />
              ))}
            </div>
          </div>
        </div>
        <hr />
        <ExtraData
          label={t('Presenter', { vn: 'Người giới thiệu' })}
          content={ConverterUtils.getFullNameUser(document?.source)}
        />
        {/* <ExtraData label={t('Source', { vn: 'Nguồn' })} content={document?.rootTask} /> */}
      </div>
    );
  },
);

export const ViewCustomer = ({
  user,
  document,
  onClick,
}: {
  user: AnyObject;
  document: AnyObject;
  onClick?: () => void;
}) => {
  return (
    <div className="customer-info">
      <UserAvatar {...{ user, onClick }} />
      <Popover
        content={<ContentInfoUser document={document} user={user} />}
        overlayClassName="popover-custom-line popover-customer-info"
      >
        <div onClick={() => onClick?.()} className={'customer-name'}>
          {ConverterUtils.getFullNameUser(user)}
        </div>
      </Popover>
      {/* <div onClick={() => onClick?.()} className={'customer-name'}>{ConverterUtils.getFullNameUser(user)}</div> */}
    </div>
  );
};

const ExtraData = ({
  label,
  content,
}: {
  label: string;
  content: string | ReactNode;
}) => {
  if (!content) {
    return <></>;
  }

  return (
    <div className="content-info">
      <p className="label">{label}</p>
      <p>{content}</p>
    </div>
  );
};
