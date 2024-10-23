import { ButtonProps } from 'antd/lib/button';
import { Button } from 'antd';
import { WithPermission } from './with-permission';

interface HpButtonProps extends ButtonProps {
  permissions: string[],
}

export const HPButton = ({ permissions, ...props }: HpButtonProps) => {
  return (
    <WithPermission permissions={permissions}>
      <Button {...props}/>
    </WithPermission>
  );
};