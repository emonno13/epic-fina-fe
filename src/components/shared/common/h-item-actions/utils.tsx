import { Menu, Dropdown } from 'antd';
import { HItemAction } from './common';
import { ActionItemSchemaProps } from './h-schema-actions';
import { DotsVertical } from '../../../../icons';
import { ActionDndParams } from '../../../../schema-form/drag-n-drop/types';
import { ClickableOpacity } from '../../utils/clickable-opacity';

const { SubMenu, Item, ItemGroup } = Menu;

export const HActionUtils = {
  generateDropdownMenuConfigs: (
    schema: ActionItemSchemaProps[] = [],
    pindex = 0,
    options: ActionDndParams = {} as any,
  ) => {
    const result: any[] = [];
    schema.map((item: any, index) => {
      const handleClick = () => {
        const action = item.action || (() => {});
        action(options);
      };
      const Icon = <span onClick={handleClick}>{item.icon}</span>;
      const key = item.id || `${pindex}.${index}`;
      if (item.subMenu && item.subMenuType === 'group') {
        result.push(
          <ItemGroup key={key} title={item.label}>
            {HActionUtils.generateDropdownMenuConfigs(
              item.subMenu,
              index + 1,
              options,
            )}
          </ItemGroup>,
        );
        return;
      }
      if (item.subMenu?.length && item.subMenuType !== 'group') {
        result.push(
          <SubMenu
            key={key}
            title={item.label}
            icon={Icon}
            onTitleClick={handleClick}
          >
            {HActionUtils.generateDropdownMenuConfigs(
              item.subMenu,
              index + 1,
              options,
            )}
          </SubMenu>,
        );
        return;
      }
      const confirmation = item.confirmText
        ? {
            message: `${
              options?.currentDataItem?.name
                ? `<br>${options?.currentDataItem?.name}:</br>`
                : ''
            }${item.confirmText}`,
            params: options?.currentDataItem,
          }
        : undefined;
      result.push(
        <Item key={key} icon={Icon}>
          <ClickableOpacity onClick={handleClick} confirmation={confirmation}>
            {item.label || item.menuLabel}
          </ClickableOpacity>
        </Item>,
      );
    });
    return result;
  },
  generateAction: (
    {
      icon,
      label,
      action,
      permission,
      permissions,
      disabled,
      subMenu,
    }: ActionItemSchemaProps,
    actionParams: ActionDndParams,
  ) => {
    return (
      <HItemAction
        {...{
          icon,
          label,
          onAction: action,
          permission,
          permissions,
          disabled,
          subMenu,
          actionParams,
        }}
        key={`${actionParams?.containerId}.${actionParams?.currentIndex}`}
      />
    );
  },
  generateActions: (
    schema: ActionItemSchemaProps[] = [],
    actionParams: ActionDndParams,
    childElement?: React.ReactElement,
  ) => {
    const hiddenMenus: any[] = [];
    const result: any[] = [];
    schema.map((item: ActionItemSchemaProps) => {
      if (!item.hidden) {
        result.push(HActionUtils.generateAction(item, actionParams));
        return;
      }
      hiddenMenus.push(item);
    });
    return (
      <>
        {result}
        {hiddenMenus?.length > 0 && (
          <div className={childElement ? '' : 'item item-center no-extra flex'}>
            <Dropdown
              overlay={
                <Menu>
                  {HActionUtils.generateDropdownMenuConfigs(
                    hiddenMenus,
                    0,
                    actionParams,
                  )}
                </Menu>
              }
              trigger={['click']}
            >
              {childElement || (
                <DotsVertical
                  fill={'var(--primary-color)'}
                  height={15}
                  width={12}
                />
              )}
            </Dropdown>
          </div>
        )}
      </>
    );
  },
};
