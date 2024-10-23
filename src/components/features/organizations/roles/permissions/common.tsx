import { Checkbox, Row, Tooltip } from 'antd';

export const CommonPermissions = {
  checkHasValueInlist: (value: any[], groupPermissionModelBykey: any[]) => {
    let indeterminate = false;
    let checkAll = false;
    const data = value?.filter(item => groupPermissionModelBykey?.includes(item));
    if (!!data?.length && !!groupPermissionModelBykey.length && data.length < groupPermissionModelBykey.length) {
      indeterminate = true;
      checkAll = false;
    } else if (!!data?.length && !!groupPermissionModelBykey.length && data.length === groupPermissionModelBykey.length) {
      indeterminate = false;
      checkAll = true;
    }
    return { indeterminate, checkAll };
  },
};

export const CheckBoxTooltip = ({ titleTooltip, value, key }) => {
  return (
    <Row justify="center" align = "middle">
      <Tooltip title={titleTooltip}>
        <Checkbox {...{
          value,
          key,
          className: 'full-width m-b-0',
          style: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          } }}/>
      </Tooltip>
    </Row>
  );
};