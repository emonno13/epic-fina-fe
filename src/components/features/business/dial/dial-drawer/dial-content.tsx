import { Button, Input } from 'antd';
import Form from 'antd/lib/form';
import { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { SVGIcon } from '@components/shared/atom/svg-icon';
import { ClearPhoneSvg, ClockSvg, ContactSvg, KeyboardSvg } from '@icons';
import classNames from 'classnames';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HForm } from '../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { HInput } from '../../../../shared/common-form-elements/h-input';
import { makeCall, setEndingCall } from '../../../../shared/stringee/actions';
import { CALL_DIRECTION } from '../../../../shared/stringee/constant';
import {
  setCallMode,
  setIsvisibleKeyBoardNumber,
  setIsvisiblePhoneBooks,
  setIsvisibleRecentCall,
  setShowDetailCallRecord,
} from '../actions';
import { CallHandleIncognito } from '../dial-content/call-handle/call-handle- incognito';
import { PhoneBooksDisplay } from '../dial-content/phone-books/phone-books.main-display';
import { RecentCallDisplay } from '../dial-content/recent-call/recent-call-display';

import './dial-content.module.scss';

export const ENTER_NUMBER_CONTROL = {
  RECENT: 'recent',
  KEYBOARD: 'keyboard',
  CONTACT: 'contact',
};

export const DialContent = () => {
  const [enterNumberControl, setEnterNumberControl] = useState<string>(
    ENTER_NUMBER_CONTROL.KEYBOARD,
  );
  const dispatch = useDispatch();
  const isShowDetailCallRecord = useSelector(
    (state: RootStateOrAny) => state.dial.showDetailCallRecord,
  );
  const isVisibleCallHandleIncognito = useSelector(
    (state: RootStateOrAny) => state.dial.isVisibleCallHandleIncognito,
  );
  const isVisibleKeyBoardNumber = useSelector(
    (state: RootStateOrAny) => state.dial.isVisibleKeyBoardNumber,
  );
  const isVisibleRecentCall = useSelector(
    (state: RootStateOrAny) => state.dial.isVisibleRecentCall,
  );
  const isVisiblePhoneBooks = useSelector(
    (state: RootStateOrAny) => state.dial.isVisiblePhoneBooks,
  );
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace } = stringee;
  const currentUser: any = useCurrentUser();
  const [form] = Form.useForm();

  const handleRecentCall = () => {
    setEnterNumberControl(ENTER_NUMBER_CONTROL.RECENT);
    dispatch(setIsvisibleRecentCall(true));
  };
  const handlePhoneBook = () => {
    setEnterNumberControl(ENTER_NUMBER_CONTROL.CONTACT);
    dispatch(setIsvisiblePhoneBooks(true));
  };
  const handleKeyBoardNumber = () => {
    setEnterNumberControl(ENTER_NUMBER_CONTROL.KEYBOARD);
    dispatch(setIsvisibleKeyBoardNumber(true));
  };
  const handleEndCall = () => {
    if (isShowDetailCallRecord) {
      dispatch(setEndingCall({ namespace, currentUser }));
    } else {
      const formData = form.getFieldsValue();
      if (!formData?.phoneNumber) {
        return;
      }

      dispatch(
        makeCall({
          phoneNumber: formData.phoneNumber,
          callingStaff: currentUser,
          currentUser,
          namespace: CALL_DIRECTION.CALL_OUT,
        }),
      );
      dispatch(setCallMode(false));
      dispatch(setShowDetailCallRecord(true));
    }
  };

  const onClearPhoneNumber = () => {
    const phoneNumber = form?.getFieldValue('phoneNumber');
    if (!phoneNumber) {
      return;
    }

    form?.setFieldsValue({
      phoneNumber: phoneNumber.slice(0, -1),
    });
  };

  return (
    <>
      <div className="phone-call">
        {isVisibleKeyBoardNumber && !isVisibleCallHandleIncognito && (
          <KeyboardNumber
            {...{
              form,
            }}
          />
        )}
        {isVisibleCallHandleIncognito && <CallHandleIncognito />}
        {isVisibleRecentCall && <RecentCallDisplay onClose={true} />}
        {isVisiblePhoneBooks && <PhoneBooksDisplay onClose={true} />}
        {enterNumberControl === ENTER_NUMBER_CONTROL.KEYBOARD && (
          <div className="control-btn">
            <HButton
              shape="circle"
              className={classNames(
                isShowDetailCallRecord
                  ? 'phone-call-modal__button'
                  : 'phone-call__footer__button',
                'call-icon',
              )}
              onClick={handleEndCall}
            >
              <img src="/assets/images/icons/call-white.svg" width={40} />
            </HButton>
            <Button
              {...{
                size: 'large',
                icon: <SVGIcon svg={<ClearPhoneSvg />} />,
                onClick: onClearPhoneNumber,
                className: 'control-btn__clear',
              }}
            />
          </div>
        )}
        <div className="phone-call__footer">
          <div className={'phone-call__footer__info'}>
            <HButton
              className={classNames('phone-call__footer__info__button', {
                active: enterNumberControl === ENTER_NUMBER_CONTROL.RECENT,
              })}
              onClick={handleRecentCall}
            >
              <SVGIcon svg={<ClockSvg />} />
            </HButton>
            <HButton
              className={classNames(
                isShowDetailCallRecord
                  ? 'phone-call-modal__button'
                  : 'phone-call__footer__button',
                {
                  active: enterNumberControl === ENTER_NUMBER_CONTROL.KEYBOARD,
                },
              )}
              onClick={handleKeyBoardNumber}
            >
              <SVGIcon svg={<KeyboardSvg />} />
            </HButton>
            <HButton
              className={classNames('phone-call__footer__info__button', {
                active: enterNumberControl === ENTER_NUMBER_CONTROL.CONTACT,
              })}
              onClick={handlePhoneBook}
            >
              <SVGIcon svg={<ContactSvg />} />
            </HButton>
          </div>
        </div>
      </div>
    </>
  );
};

export const KeyboardNumber = (props: any) => {
  const { form } = props;
  const isShowDetailCallRecord = useSelector(
    (state: RootStateOrAny) => state.dial.showDetailCallRecord,
  );
  const handleDial = (valueNumber) => {
    const phoneNumber = form?.getFieldValue('phoneNumber') || '';
    const numberConcat = phoneNumber + valueNumber;
    form.setFieldsValue({
      phoneNumber: numberConcat,
    });
  };

  const handleInputPhoneNumberChange = (phoneNumber: string) => {
    if (!phoneNumber) {
      return;
    }

    form?.setFieldsValue({
      phoneNumber,
    });
  };

  return (
    <div className={'key-board'}>
      <div className={'key-board__select'}>
        {isShowDetailCallRecord ? (
          <HForm
            {...{
              method: 'post',
              form: form,
              layout: 'inline',
              schema: () => [
                createSchemaItem({
                  Component: HInput,
                  colProps: { span: 24 },
                  rowProps: { gutter: { xs: 8, md: 16 } },
                  name: 'phoneNumber',
                  className: 'key-board-number__input',
                  componentProps: {
                    onChange: (e) => {
                      handleInputPhoneNumberChange(e?.target?.value);
                    },
                    size: 'large',
                  },
                }),
              ],
              removeControlActions: true,
            }}
          />
        ) : (
          <HForm
            {...{
              method: 'post',
              form: form,
              layout: 'inline',
              schema: () => [
                createSchemaItem({
                  Component: Input,
                  name: 'phoneNumber',
                  className: 'input-phone-number',
                  componentProps: {
                    size: 'large',
                    onChange: (e) => {
                      handleInputPhoneNumberChange(e?.target?.value);
                    },
                  },
                }),
              ],
              removeControlActions: true,
            }}
          />
        )}
      </div>
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
    </div>
  );
};

export default DialContent;

export const KeyboardNumberList = ({ handleDial, className }) => {
  const listPhoneNumber = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '*',
    '0',
    '#',
  ];

  return (
    <>
      {listPhoneNumber.map((value) => (
        <button
          key={value}
          className={className}
          onClick={(e) => handleDial(value)}
          value={value}
        >
          {value}
        </button>
      ))}
    </>
  );
};
