import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import MobileAppDefaultDrawer from '@components/shared/mobile-app/default-drawer';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { DrawerProps, Form } from 'antd';
import { useEffect } from 'react';
import { useMobile } from '../hooks/login-drawer-hooks';
import { MOBILE_TASK_TYPE } from './constants';
import { MobileCreateTaskChemaForm } from './mobile-create-task-schema-form';

const MobileCreateTask = (props: DrawerProps) => {
  const { createTaskVisible, setCreateTaskVisible, taskExtraValues } =
    useMobile();
  const currentUser = useCurrentUser();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!createTaskVisible) {
      form.resetFields();
      return;
    }
    const fieldsValue: any = {
      productType: taskExtraValues.productType,
    };
    if (
      currentUser &&
      currentUser.id &&
      taskExtraValues?.type === MOBILE_TASK_TYPE.WANT_TO_BUY
    ) {
      fieldsValue.customerInfo = {
        fullName: currentUser?.fullName,
        email: currentUser?.emails?.[0]?.email,
        tel: currentUser?.tels?.[0]?.tel,
        address: currentUser?.address,
      };
      form.setFieldsValue(fieldsValue);
    }
  }, [createTaskVisible, taskExtraValues]);

  return (
    <MobileAppDefaultDrawer
      {...props}
      visible={createTaskVisible}
      footer={null}
      onClose={() => setCreateTaskVisible(false)}
      destroyOnClose
      contentWrapperStyle={{ width: '100%' }}
    >
      <div>
        <HForm
          {...{
            form,
            className: 'm-t-15',
            endpoint: endpoints.endpointWithApiDomain(
              '/tasks/public/insurance',
            ),
            method: 'post',
            hiddenValues: {
              productId: '',
              categoryId: '',
              type: TASK_TYPE.counselling,
              ...(taskExtraValues || {}),
            },
            onGotSuccess: () => {
              setCreateTaskVisible(false);
            },
            schema: MobileCreateTaskChemaForm,
          }}
        />
      </div>
    </MobileAppDefaultDrawer>
  );
};

export default MobileCreateTask;
