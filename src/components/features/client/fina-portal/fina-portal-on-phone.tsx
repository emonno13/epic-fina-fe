import { ShowTimeCall } from '@components/features/business/dial/dial-content/call-handle';
import { KeyboardNumberList } from '@components/features/business/dial/dial-drawer/dial-content';
import { SVGIcon } from '@components/shared/atom/svg-icon';
import { setDtmfCallOut } from '@components/shared/stringee/actions';
import { CALL_DIRECTION } from '@components/shared/stringee/constant';
import { ClearPhoneSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Badge, Input } from 'antd';
import { useMemo, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { TYPE_FINA_PORTAL, useFinaPortalContext } from './fina-portal-context';
import { FinaEndCall, FinaOnPhone } from './icons';

import '../../business/dial/dial-content/dial-content.module.scss';

import './styles.module.scss';

const FinaPortalOnPhone = () => {
  const { t } = useHTranslation('common');
  const { callState } = useSelector(
    (state: RootStateOrAny) =>
      state.stringee[CALL_DIRECTION.CALL_OUT] || { callState: {} },
  );
  const { setShowForm, showForm, setEndCall } = useFinaPortalContext();

  const handleEndCall = () => {
    setEndCall();
    setTimeout(() => {
      setShowForm(TYPE_FINA_PORTAL.HOME);
    }, 1000);
  };

  if (showForm !== TYPE_FINA_PORTAL.ON_PHONE) {
    return <span></span>;
  }

  return (
    <div className="fina-portal-on-phone">
      <div className="fina-portal-on-phone-title">
        <PhoneTitleByCallStatus />
      </div>

      <ShowContentPhone />

      <p className="fina-portal-on-phone-time">
        <ShowTimeCall title="" />
      </p>
      <FinaEndCall onClick={handleEndCall} />
    </div>
  );
};

export default FinaPortalOnPhone;

const PhoneTitleByCallStatus = () => {
  const { t } = useHTranslation('common');
  const { callState } = useSelector(
    (state: RootStateOrAny) =>
      state.stringee[CALL_DIRECTION.CALL_OUT] || { callState: {} },
  );
  const { status, title } = useMemo(() => {
    switch (callState?.code) {
      case 1:
      case 2:
        return {
          status: 'warning',
          title: t('Calling', { vn: 'Đang gọi' }),
        };
      case 3:
        return {
          status: 'success',
          title: t('Fina connecting with you', {
            vn: 'Fina đang kết nối với bạn',
          }),
        };
      case 6:
        return {
          status: 'error',
          title: t('End call', { vn: 'Cuộc gọi kết thúc' }),
        };
      default:
        return {
          status: 'default',
          title: t('Trying', { vn: 'Cuộc gọi đang chuẩn bị' }),
        };
    }
  }, [callState]);
  return (
    <>
      <Badge status={status as any} /> {title}
    </>
  );
};

const ShowContentPhone = () => {
  const { callState } = useSelector(
    (state: RootStateOrAny) =>
      state.stringee[CALL_DIRECTION.CALL_OUT] || { callState: {} },
  );
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState('');

  const handleDial = (valueNumber) => {
    setValueInput(valueInput + valueNumber);
    dispatch(
      setDtmfCallOut({
        valueNumber,
        callback: (result) => {
          console.log('ShowContentPhone', result);
        },
      }),
    );
  };

  const onClearPhoneNumber = () => setValueInput(valueInput.slice(0, -1));

  return (
    <>
      <div
        className={`fina-portal-on-phone-container-inner ${callState?.code === 3 ? 'fina-portal-on-phone-container-inner-small' : ''}`}
      >
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="inner-circle">
          <FinaOnPhone />
        </div>
      </div>

      {callState?.code === 3 && (
        <div className="fina-portal-on-phone-container-inner-content">
          <Input
            value={valueInput}
            className="fina-portal-on-phone-container-inner-input"
            readOnly
          />
          <div
            {...{
              className: 'key-board__list',
            }}
          >
            <KeyboardNumberList
              {...{
                handleDial,
                className: 'key-board__list__button',
              }}
            />
          </div>

          <span
            className="fina-portal-on-phone-container-inner-clear"
            onClick={onClearPhoneNumber}
          >
            <SVGIcon svg={<ClearPhoneSvg />} />
          </span>
        </div>
      )}
    </>
  );
};
