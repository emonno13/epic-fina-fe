import {
  makeCall,
  setEndingCall,
  setIsCalling,
} from '@components/shared/stringee/actions';
import { CALL_DIRECTION } from '@components/shared/stringee/constant';
import { useGenerateConcealContent } from '@lib/converter';
import { useCurrentUser, useStringeeToken } from '@lib/providers/auth';
import { useSearchForm } from '@schema-form/features/hooks';
import { Tooltip, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { USER_TYPES } from 'types/organization';
import { PhoneIcon } from '../../../../../icons';

const { Paragraph } = Typography;

export const IconPhoneCall = ({
  phoneNumber = '',
  userInfo,
  belongToId = undefined,
}) => {
  const dispatch = useDispatch();
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const isCalling = useMemo(
    () => stringee?.isCalling && stringee.phoneNumber === phoneNumber,
    [stringee.isCalling, stringee.phoneNumber],
  );
  const searchForm = useSearchForm();
  const stringeeToken = useStringeeToken();
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const generateConcealContent = useGenerateConcealContent();

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
      <Tooltip
        color={'white'}
        title={
          <Paragraph copyable={{ text: phoneNumber }}>
            {generateConcealContent(phoneNumber)}
          </Paragraph>
        }
      >
        <div className="stringee-phone-call">
          <PhoneIcon />
        </div>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={generateConcealContent(phoneNumber)}>
      <div className="stringee-phone-call">
        {stringeeToken && stringeeToken != 'undefined' && (
          <div onClick={makeAcall}>
            <PhoneIcon />
          </div>
        )}
      </div>
    </Tooltip>
  );
};
