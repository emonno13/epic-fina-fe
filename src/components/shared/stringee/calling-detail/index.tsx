import { PhoneFilled } from '@ant-design/icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import {
  answerIncomingCall,
  setEndingCall,
  switchViewMode,
} from '../actions';
import { ConverterUtils } from '../../../../lib/converter';
import { useCurrentUser } from '../../../../lib/providers/auth';
import CallLogsPopover from '../call-logs';

import './calling-detail.module.scss';

export const CallingDetail = ({ userInfo, isShortViewMode, namespace, isCalling, answered, callState = { reason: 'Calling', isCallFromApp: false }, phoneNumber }) => {
  const isIncomingCall = namespace === 'callIn';
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const endCall = () => {
    dispatch(setEndingCall({ namespace, currentUser }));
  };

  const answer = () => {
    dispatch(answerIncomingCall({ namespace, currentUser }));
  };

  const switchCallViewMode = () => {
    dispatch(switchViewMode());
  };

  return (
    <div className={`ui-calling-detail  ${(!isCalling || !isShortViewMode) ? 'display-none' : 'show'}`}>
      <div className="call-icon reject-call" onClick={endCall}>
        <PhoneFilled className="icon-phone"/>
      </div>
      <Space direction="vertical" className="info-panel">
        <div className="info-header">{callState?.reason}</div>
        <div className="calling-to-name">
          {ConverterUtils.getFullNameUser(userInfo, `Khách ${phoneNumber}`)}
          {/*<ArrowsAltOutlined onClick={switchCallViewMode}/>*/}
        </div>
      </Space>
      {isIncomingCall && !answered && (
        <div className="call-icon accept-call" onClick={answer}>
          <PhoneFilled className="icon-phone"/>
        </div>
      )}
      <video id={`localVideo[${namespace}]`} autoPlay muted style={{ display: 'none' }}/>
      <video id={`remoteVideo[${namespace}]`} autoPlay style={{ display: 'none' }}/>
    </div>
  );
};

export const StringeeCall = () => {
  const stringee = useSelector((state: RootStateOrAny) => state.stringee || {});
  const { callOut = {}, callIn = {} } = stringee;

  return (
    <>
      <div className={`ui-stringee-call-panel ${(callOut?.isCallFromApp) ? 'display-none' : 'show'}`}>
        <CallingDetail {...{
          ...callIn,
          isShortViewMode: stringee.isShortViewMode,
          namespace: 'callIn',
        }}/>
        <CallingDetail {...{
          ...callOut,
          isShortViewMode: stringee.isShortViewMode,
          namespace: 'callOut',
        }}/>
      </div>
      <CallLogsPopover/>
    </>
  );
};
