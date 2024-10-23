import React from 'react';
import { Checkbox } from 'antd';

import './filter-item.module.scss';

interface FilterItemProps{
  listData: Array<any>
  label: string
  listTags: Array<any>
  callBackListTags(value: any): void;

}

const FilterItem = React.memo((props: FilterItemProps)=> {
  const { listData = [], label,listTags = [], callBackListTags } = props;
  const onChange = (e: any, name: string, id: string | number) => {
    const checkedCheckbox = e.target.checked;

    if (checkedCheckbox) {
      callBackListTags([...listTags, { id, name }]);
    } else {
      const indexTag = listTags.findIndex((item: any) => item.id === id);

      if (indexTag > -1) {
        listTags.splice(indexTag, 1);
        callBackListTags([...listTags]);
      }
    }
  };

  return (
	    <div className="max-w-1100" style={{ marginBottom: '25px' }}>
      <p className="filter-item__label">{label}</p>
      {
        listData.map((item: any, key: any) => {
          const isActive = listTags.some((e)=> e?.id === item?.id);
          return (
            <div className="filter-item__container" key={key}>
              <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Checkbox
                  onChange={(e: any) => onChange(e, item?.content, item?.id)}
                  value={item.id}
                  checked={isActive}
                >
                  <span className="filter-item__content">
                    {item?.content}
                  </span>
                </Checkbox>

                <span className="filter-item__count">
                  {`(${item?.count})`}
                </span>
              </span>
            </div>
          );
        })}
    </div>
  );
});

export default FilterItem;
