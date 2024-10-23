import { PhoneOutlined } from '@ant-design/icons';
import { useGenerateConcealContent } from '@lib/converter';
import {
  CallPhoneFcssSDKConvert,
  IPhoneNumberItem,
} from '@lib/fccs-sdk-convert';
import { Typography } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'underscore';
import { useCurrentUser, useStringeeToken } from '../../../lib/providers/auth';
import { useSearchForm } from '../../../schema-form/features/hooks';
import { USER_TYPES } from '../../../types/organization';
import { AnyObject } from '../atom/type';
import { makeCall, setEndingCall, setIsCalling } from './actions';
import { CALL_DIRECTION } from './constant';

import './stringee-style.scss';
const { Paragraph } = Typography;

export const PhoneCall = ({
  phoneNumber = '',
  userInfo,
  belongToId = undefined,
  icon = <PhoneOutlined className="phone-number" />,
  isShowViewFullPhoneNumberAction = true,
}: {
  phoneNumber?: string;
  userInfo?: AnyObject;
  icon?: ReactNode;
  isShowViewFullPhoneNumberAction?: boolean;
  belongToId?: string | undefined;
}) => {
  const dispatch = useDispatch();
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const isCalling = useMemo(
    () => stringee?.isCalling && stringee.phoneNumber === phoneNumber,
    [stringee.isCalling, stringee.phoneNumber],
  );
  const searchForm = useSearchForm();
  const stringeeToken = useStringeeToken();
  const currentUser: AnyObject = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const generateConcealContent = useGenerateConcealContent(
    undefined,
    undefined,
    undefined,
    isShowViewFullPhoneNumberAction,
  );

  useEffect(() => {
    if (isCalling && stringee.isEndingCall) {
      // callClient.hangup();
      dispatch(
        setIsCalling({
          isCalling: false,
          phoneNumber: '',
          direction: undefined,
          asName: '',
        }),
      );
      dispatch(setEndingCall({ isEndingCall: false, currentUser }));
    }
  }, [stringee.isEndingCall]);

  const makeAcall = async () => {
    dispatch(
      makeCall({
        phoneNumber,
        belongToId,
        callingStaff: currentUser,
        userInfo,
        currentUser,
        namespace: CALL_DIRECTION.CALL_OUT,
      }),
    );
    setTimeout(() => {
      searchForm?.submit();
    }, 300);
  };

  if (!isOrgStaff) {
    return (
      <Paragraph copyable={{ text: phoneNumber }}>
        <a>{generateConcealContent(phoneNumber)}</a>
      </Paragraph>
    );
  }
  return (
    <div className="stringee-phone-call">
      {generateConcealContent(phoneNumber)}
      {stringeeToken && stringeeToken != 'undefined' && (
        <span onClick={makeAcall} className="cursor-pointer">
          {icon}
        </span>
      )}
    </div>
  );
};

export const Phones = ({
  phones,
  userInfo,
  belongToId,
}: {
  phones: IPhoneNumberItem[];
  userInfo?: AnyObject;
  belongToId?: string;
}) => {
  if (isEmpty(phones)) {
    return null;
  }

  return (
    <div>
      {phones.map((phoneData) => {
        const phoneNumber = phoneData?.tel;
        if (!phoneNumber) {
          return <></>;
        }

        return (
          <CallPhoneFcssSDKConvert
            {...{ phoneNumber: phoneData?.tel, userInfo, belongToId }}
            key={phoneNumber}
          />
        );
      })}
    </div>
  );
};
