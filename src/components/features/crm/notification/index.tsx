import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Form from 'antd/lib/form';
import { PopupNotificationSchema } from './popup-schema-from';
import { HModal } from '../../../shared/common/h-modal';
import { HForm } from '../../../../schema-form/h-form';
import { hiddenPopNoti } from '../../../shared/firebase/actions';
import { endpoints } from '../../../../lib/networks/endpoints';

import './notification.module.scss';

export const PopupNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootStateOrAny) => state.firebase);
  const [form] = Form.useForm();
  const { userId, isShowPopup } = notification;
  return <HModal visible={isShowPopup} onCancel={() => {
    dispatch(hiddenPopNoti({ isShowPopup: false }));
  }} onOk={() => form.submit()}>
    <HForm {...{
      endpoint: endpoints.endpointWithApiDomain('/notifications/send-user'),
      method: 'post',
      form: form,
      schema: PopupNotificationSchema,
      hiddenValues: {
        userId: userId  ,
      },
      removeControlActions: true,
    }}/>
  </HModal>;
};