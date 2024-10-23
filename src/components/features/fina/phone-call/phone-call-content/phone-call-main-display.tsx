import {
  CloseOutlined,
  IdcardOutlined,
  OrderedListOutlined,
  PhoneOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { ENTER_NUMBER_CONTROL } from '@components/features/business/dial/dial-drawer/dial-content';
import { CALL_DIRECTION } from '@components/shared/stringee/constant';
import { Button, Col, Input, Row, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { HInput } from '../../../../shared/common-form-elements/h-input';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { makeCall } from '../../../../shared/stringee/actions';
import { CallHandleIncognito } from '../../../business/dial/dial-content/call-handle/call-handle- incognito';
import { PhoneBooksDisplay } from '../../../business/dial/dial-content/phone-books/phone-books.main-display';
import { RecentCallDisplay } from '../../../business/dial/dial-content/recent-call/recent-call-display';

import '../../../business/dial/dial-content/dial-content.module.scss';

export const PhoneCallMainDisplay = ({
  keyBoardNumber,
  callHandleIncognito,
}) => {
  const [enterNumberControl, setEnterNumberControl] = useState<string>(
    ENTER_NUMBER_CONTROL.KEYBOARD,
  );
  const [keyboardNumber, setKeyboardNumber] = useState<boolean>(keyBoardNumber);
  const [recentCall, setRecentCall] = useState<boolean>(false);
  const [phoneBook, setPhoneBook] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentUser: any = useCurrentUser();

  const handleRecentCall = () => {
    setRecentCall(true);
    setKeyboardNumber(false);
    setPhoneBook(false);
  };
  const handlePhoneBook = () => {
    setPhoneBook(true);
    setKeyboardNumber(false);
    setRecentCall(false);
  };
  const handleKeyBoardNumber = () => {
    setKeyboardNumber(true);
    setPhoneBook(false);
    setRecentCall(false);
  };
  const handlePhoneCall = () => {
    setVisible(true);
    dispatch(
      makeCall({
        phoneNumber: '0375390105',
        callingStaff: currentUser,
        currentUser,
        namespace: CALL_DIRECTION.CALL_OUT,
      }),
    );
  };

  return (
    <div className="phone-call">
      {!!keyboardNumber && <KeyboardNumber />}
      {/*<PhoneCallContent {...{visible}}/>*/}
      {callHandleIncognito && <CallHandleIncognito />}
      {recentCall && <RecentCallDisplay onClose={true} />}
      {phoneBook && <PhoneBooksDisplay onClose={true} />}
      <div className="phone-call-footer">
        <Row>
          <Col span={12} offset={9}>
            {keyboardNumber ? (
              <HButton
                shape="circle"
                className={'button-phone-call'}
                onClick={handlePhoneCall}
              >
                <PhoneOutlined />
              </HButton>
            ) : (
              <HButton
                shape="circle"
                className={'button-phone-call'}
                onClick={handleKeyBoardNumber}
              >
                <TableOutlined />
              </HButton>
            )}
          </Col>
        </Row>
        <div className={'phone-footer'}>
          <HButton
            className={'phone-footer__button'}
            onClick={handleRecentCall}
          >
            <OrderedListOutlined />
          </HButton>
          <HButton className={'phone-footer__button'} onClick={handlePhoneBook}>
            <IdcardOutlined />
          </HButton>
        </div>
      </div>
    </div>
  );
};

export const KeyboardNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
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
  const handleDial = (e) => {
    const number = e.target.value;
    setPhoneNumber(phoneNumber + number);
  };

  return (
    <div>
      <br />
      <div className={'phone-call-select'}>
        <HSelect
          {...{
            defaultValue: '+84(vietnam)',
            size: 'large',
          }}
        />
        <Input.Group compact>
          <HInput
            style={{ width: 'calc(100% - 50px)' }}
            {...{
              onChange: (e) => setPhoneNumber(e.target.value),
              value: phoneNumber,
              size: 'large',
            }}
          />
          <Tooltip title="delete">
            <Button
              {...{
                size: 'large',
                icon: <CloseOutlined />,
              }}
            />
          </Tooltip>
        </Input.Group>
      </div>
      <br />
      <div
        {...{
          className: 'phone-call-row',
        }}
      >
        {listPhoneNumber.map((value) => (
          <button
            key={value}
            className={'phone-call-row__button'}
            onClick={handleDial}
            value={value}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneCallMainDisplay;
