import { Button, Dropdown, Menu } from 'antd';
import { useCallback, useMemo } from 'react';

const ExpertDetailReviewsFormFilterBtn = ({ label, icon, onChange, value, options = [] }) => {
  const onMenuClick = useCallback(({ key }) => {
    if (onChange) onChange(key);
  }, [onChange]);

  const selectedOption: any = useMemo(() => {
    const existedOption = options?.find((item: any) => item.value === value);
    return existedOption ? existedOption : {};
  }, [value, options]);

  return (
    <div className="expert-detail-reviews-form-filter-btn">
      <Dropdown {...{
        placement: 'bottomCenter',
        overlay: (
          <Menu {...{
            selectedKeys: [value],
            onClick: onMenuClick,
          }}>
            {options.map(item => {
              const { value: optionValue, label: optionLabel } = item;
              return (
                <Menu.Item key={optionValue}>
                  {optionLabel}
                </Menu.Item>
              );
            })}
          </Menu>
        ),
      }}>
        <Button {...{
          icon,
        }}>
          {label}: <span style={{ fontWeight: 'bold' }}>{selectedOption?.label}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default ExpertDetailReviewsFormFilterBtn;
