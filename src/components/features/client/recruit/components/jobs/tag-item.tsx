import React from 'react';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../../../lib/i18n';

import './tag-item.module.scss';

interface TagItemProps{
  listTags: Array<any>
  setListTags(e: any): void
}

const TagItem = React.memo((props: TagItemProps)=> {
  const { listTags = [], setListTags } = props;
  const { t } = useHTranslation('recruit');

  const onCloseTag = (id: string | number) => {
    const list: any = [...listTags];
    const indexTag = list.findIndex((item: any) => item.id === id);

    if (indexTag > -1) {
      list.splice(indexTag, 1);
      setListTags([...list]);
    }
  };

  const clearAllFilter = () => {
    setListTags([]);
  };

  return (
    <div className="tag-item__container">
      {listTags?.map((item: any, key: any) => {
        return (
          <Tag
            key={key}
            className="tag-item__tag"
          >
            {item?.name}
            <span
              className="tag-item__delete"
              role="presentation"
              onClick={() => onCloseTag(item?.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                <path
                  id="Union_5"
                  data-name="Union 5"
                  d="M7703,5l-3,3-1-1,3-3-3-3,1-1,3,3,3-3,1,1-3,3,3,3-1,1Z"
                  transform="translate(-7699.001)"
                  fill="#4CAF50"
                />
              </svg>
            </span>
          </Tag>
        );
      })}
      <span
        className="tag-item__clear cursor-pointer"
        role="presentation"
        onClick={clearAllFilter}
      >
        {t('jobs.clearAll')}
      </span>
    </div>
  );
});
export default TagItem;
