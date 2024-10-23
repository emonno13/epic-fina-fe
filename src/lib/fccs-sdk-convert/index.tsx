import { AnyObject } from '@components/shared/atom/type';
import { PhoneCall } from '@components/shared/stringee';
import { PhoneCall as PhoneCallSDK } from 'fccs-sdk/dist/components/features/package/phone-call';
import { isEmpty } from 'underscore';
export interface IPhoneNumberItem {
  tel: string;
}
export interface IEmailItem {
  email: string;
}

export const CallPhoneFcssSDKConvert = ({
  phones,
  userInfo,
  belongToId,
  phoneNumber,
}: {
  phoneNumber?: string;
  phones?: IPhoneNumberItem[];
  userInfo?: AnyObject;
  belongToId?: string;
}) => {
  if (phones && !isEmpty(phones)) {
    return (
      <div id="fcss-sdk-convert">
        {phones.map((phoneData) => {
          const customerPhoneCall = phoneData?.tel;

          if (customerPhoneCall) {
            return process.env.NEXT_PUBLIC_USED_FCCS_SDK ? (
              <PhoneCallSDK
                key={phoneData.tel}
                {...{
                  phoneNumber: customerPhoneCall,
                  userInfo,
                  showPhoneNumber: false,
                }}
              />
            ) : (
              <PhoneCall
                {...{ phoneNumber: phoneData?.tel, userInfo, belongToId }}
                key={phoneData.tel}
              />
            );
          }

          return <></>;
        })}
      </div>
    );
  }

  if (phoneNumber) {
    return process.env.NEXT_PUBLIC_USED_FCCS_SDK ? (
      <PhoneCallSDK {...{ phoneNumber, userInfo, showPhoneNumber: false }} />
    ) : (
      <PhoneCall {...{ phoneNumber, userInfo, belongToId }} />
    );
  }

  return <></>;
};
