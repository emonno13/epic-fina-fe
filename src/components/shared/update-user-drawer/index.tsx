import RenderCustomerUpdate from '@components/features/business/customer/render-customer-update';
import { ConverterUtils } from '@lib/converter';
import { ORGANIZATION_TYPES } from '@types/organization';
import { Drawer, DrawerProps } from 'antd';
import { memo } from 'react';
// import { useCurrentUser } from '@lib/providers/auth';
import { useCheckRoleFinaStaff } from '@dynamic-configuration/hooks';
import { AnyObject } from '../atom/type';

export interface UpdateUserDrawerProps extends DrawerProps {
  setIsVisibleUserUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isVisibleUserUpdate: boolean;
  selectedUserUpdate: AnyObject;
  setSelectedUserUpdate: React.Dispatch<React.SetStateAction<AnyObject>>;
}
export const UpdateUserDrawer = memo((props: UpdateUserDrawerProps) => {
  const {
    setIsVisibleUserUpdate,
    setSelectedUserUpdate,
    isVisibleUserUpdate,
    selectedUserUpdate,
    ...drawerProps
  } = props;
  const isFinaStaff = useCheckRoleFinaStaff();

  if (!isFinaStaff) {
    return <></>;
  }

  return (
    <Drawer
      {...{
        placement: 'right',
        visible: isVisibleUserUpdate,
        width: '70%',
        footer: null,
        title: <div>{ConverterUtils.getFullNameUser(selectedUserUpdate)}</div>,
        onClose: () => {
          setIsVisibleUserUpdate(false);
          setSelectedUserUpdate({});
        },
        ...drawerProps,
      }}
    >
      <RenderCustomerUpdate
        {...{
          orgId: '',
          orgType: ORGANIZATION_TYPES.SUB_ORG,
          type: selectedUserUpdate.type,
          user: selectedUserUpdate,
        }}
      />
    </Drawer>
  );
});
