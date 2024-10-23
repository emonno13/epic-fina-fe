import { CaretUpOutlined } from '@ant-design/icons';
import { TaskPopover } from '@components/features/crm/tasks/task-popover';
import { SVGIcon } from '@components/shared/atom/svg-icon';
import { useSetDocumentDetailVisibility } from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import {
  DocumentSvg,
  ForwardSvg,
  KeyboardSvg,
  MicroSvg,
  MicroUnmute,
  PauseSvg,
  Play,
  RequestCounsellingIconSvg,
  UserSvg,
} from 'icons';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';
import CallTransfer from './call-transfer';

import { useAuth } from '../../../../../../lib/providers/auth';
import {
  setCallInfo,
  setHoldCall,
  setMuteCall,
} from '../../../../../shared/stringee/actions';
import { setIsVisibleCallRecordDetail } from '../../actions';
import { useCurrentControl, useSetCurrentControl } from '../../hooks';
import { ShutDownButton } from '../shutdown-button';

import './call-handle.module.scss';

enum Control {
  DIAL = 'dial',
  TRANSFER = 'transfer',
}

interface props {
  setHiddenLayout?: Function;
  hiddenLayout?: boolean;
}

export const CallHandle = ({
  setHiddenLayout,
  hiddenLayout = false,
}: props) => {
  const isVisibleCallRecordDetail = useSelector(
    (state: RootStateOrAny) => state.dial.isVisibleCallRecordDetail,
  );
  const authContext = useAuth();
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace = '' } = stringee;
  const callDetail = stringee[namespace] || {};
  const customerInfo = callDetail?.userInfo || {};
  const { currentUser } = authContext;
  const dispatch = useDispatch();
  const currentControl = useCurrentControl();
  const setCurrentControl = useSetCurrentControl();
  const { mute, hold } = callDetail;
  const callLog = callDetail?.callLog;

  const updateCallLog = (taskDocument) => {
    const callLogId = callLog?.id;
    const taskId = taskDocument?.id;
    if (!taskId || !callLogId) {
      return;
    }

    FormUtils.submitForm(
      {
        belongToId: taskId,
      },
      {
        nodeName: `call-logs/${callLogId}`,
        method: 'put',
        onGotSuccess: () => {
          dispatch(
            setCallInfo({
              namespace,
              callLog: { ...callLog, belongToId: taskId },
            }),
          );
        },
      },
    );
  };

  const handleClick = () => {
    dispatch(setIsVisibleCallRecordDetail(!isVisibleCallRecordDetail));
  };

  const handleMuteAndUnmuteCall = () => {
    dispatch(setMuteCall({ namespace, muteEnabled: !mute }));
  };

  const handleHoldAndUnHoldCall = () => {
    dispatch(setHoldCall({ namespace, holdState: !hold }));
  };

  return (
    <div className={'call-handle'}>
      <div
        style={
          hiddenLayout
            ? { display: 'none' }
            : {
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }
        }
      >
        <div className={'call-handle__information'}>
          <h1 className={'call-handle__customer-call profile'}>
            {customerInfo?.fullName}
          </h1>
          <p className={'call-handle__customer-call'}>Khách hàng</p>
          <ShowTimeCall />
        </div>
        <div className="call-handle__call-nav-panel">
          {!currentControl && (
            <div className={'call-handle__function-keys function-keys'}>
              <div className={'function-keys__wrap-number'}>
                <HButton
                  shape="circle"
                  className={'call-handle__button'}
                  onClick={handleMuteAndUnmuteCall}
                >
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        Tắt tiếng
                      </span>
                    }
                    svg={mute ? <MicroSvg /> : <MicroUnmute />}
                  />
                </HButton>
                <HButton
                  shape="circle"
                  className={'call-handle__button'}
                  onClick={handleHoldAndUnHoldCall}
                >
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        Tạm dừng
                      </span>
                    }
                    svg={hold ? <Play /> : <PauseSvg />}
                  />
                </HButton>
                <HButton
                  shape="circle"
                  className={'call-handle__button'}
                  onClick={handleClick}
                >
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        {isVisibleCallRecordDetail
                          ? 'Ẩn phiếu ghi'
                          : 'Hiện phiếu ghi'}
                      </span>
                    }
                    svg={<DocumentSvg />}
                  />
                </HButton>
                <HButton
                  shape="circle"
                  className={'call-handle__button'}
                  onClick={() => setCurrentControl(Control.TRANSFER)}
                >
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        Chuyển tiếp
                      </span>
                    }
                    svg={<ForwardSvg />}
                  />
                </HButton>
                <HButton shape="circle" className={'call-handle__button'}>
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        Bàn phím
                      </span>
                    }
                    svg={<KeyboardSvg />}
                  />
                </HButton>
                <HButton shape="circle" className={'call-handle__button'}>
                  <SVGIcon
                    addon={
                      <span className={'call-handle__button__addon'}>
                        Danh bạ
                      </span>
                    }
                    svg={<UserSvg />}
                  />
                </HButton>
                <TaskPopover onGotSuccess={updateCallLog}>
                  <CreateRequestCounSelling />
                </TaskPopover>
              </div>
            </div>
          )}
          {currentControl === Control.TRANSFER && (
            <CallTransfer
              {...{
                currentUser,
                callDetail,
              }}
            />
          )}
        </div>
        <ShutDownButton
          changeLayoutModal={() => {
            handleClick();
            setHiddenLayout && setHiddenLayout();
          }}
        />
      </div>

      {hiddenLayout && (
        <div
          onClick={() => {
            handleClick();
            setHiddenLayout && setHiddenLayout();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <ShowTimeCall title="" />
          <CaretUpOutlined style={{ fontSize: '36px', color: '#0068ff' }} />
        </div>
      )}
      {/* {currentControl === Control.DIAL && <DialContent/>} */}
    </div>
  );
};

export default CallHandle;

export const ShowTimeCall = ({ title = 'Đang kết nối' }) => {
  const countUp = useCountUp();
  return (
    <p className={'call-handle__customer-call connect'}>
      {title} {countUp}
    </p>
  );
};

const CreateRequestCounSelling = () => {
  const setDocumentDetailVisibility = useSetDocumentDetailVisibility();
  const handleCreateNewDocument = () => {
    setDocumentDetailVisibility(true);
  };
  return (
    <HButton
      shape="circle"
      className={'call-handle__button'}
      onClick={handleCreateNewDocument}
    >
      <SVGIcon
        addon={
          <span className={'call-handle__button__addon'}>
            Tạo yêu cầu tư vấn
          </span>
        }
        svg={<RequestCounsellingIconSvg />}
      />
    </HButton>
  );
};

const useCountUp = () => {
  const [timer, setTimer] = useState<any>('00:00');
  const showDetailCallRecord = useSelector(
    (state: RootStateOrAny) => state.dial.showDetailCallRecord,
  );
  const interValRef = useRef<any>();
  const startTimer = () => {
    const startTimestamp = moment().startOf('day');
    interValRef.current = setInterval(() => {
      startTimestamp.add(1, 'second');
      setTimer(startTimestamp.format('mm:ss'));
    }, 1000);
  };

  useEffect(() => {
    if (showDetailCallRecord) {
      startTimer();
    }
    if (!showDetailCallRecord) {
      clearInterval(interValRef.current);
      setTimer('00:00');
    }
  }, [showDetailCallRecord]);
  return useMemo(() => timer, [timer]);
};
