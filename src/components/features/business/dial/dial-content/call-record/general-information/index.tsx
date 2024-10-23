import { Form } from 'antd';
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { RootStateOrAny, useSelector } from 'react-redux';

import { GeneralInformationSchemaForm } from './general-information-detail-schema';
import { NoteCallDetail } from './note-call-record';
import { HForm } from '../../../../../../../schema-form/h-form';
import { USER_TRANSACTION_STATUS_LABEL_MAPPING } from '../../../constant';

const GeneralInformation = () => {
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace = '' } = stringee;
  const callDetail = stringee[namespace] || {};
  const userInfo = callDetail?.userInfo || {};
  const [form] = Form.useForm();

  useEffect(() => {
    form?.setFieldsValue({
      ...userInfo,
      phoneNumber: userInfo?.tels ? userInfo.tels[0]?.tel : '',
      transactionStatus: USER_TRANSACTION_STATUS_LABEL_MAPPING[userInfo?.metadata?.transaction?.status] || '',
    });
  }, [stringee, userInfo]);

  return (
    <Scrollbars style={{ height: 550 }}>
      <HForm {...{
        form,
        schema: GeneralInformationSchemaForm,
        hideSubmitAndContinueButton: true,
        removeControlActions: true,
      }}/>
      <NoteCallDetail/>
    </Scrollbars>
  );
};

export default GeneralInformation;
