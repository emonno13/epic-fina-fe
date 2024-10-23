import React, { useState } from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import SearchingForJobs from './searching-for-jobs';
import TagItem from '../components/jobs/tag-item';
import NoData from '../components/jobs/no-data';
import ChangingView from '../components/jobs/changing-view';
import {
  useClientDataSource,
  useClientFeature,
} from '../../../../../schema-form/client-features/hooks/client-feature-hook';
import ListJob from '../components/jobs/list-job';

import './filter.module.scss';

const Filter = React.memo(()=>{
  const jobs = useClientDataSource();
  const pagination = useClientFeature();
  const total = pagination.pagination.total;
  const size = pagination.pagination.size;
  const { query, push, locale } = useRouter();
  const [listTags, setListTags] = useState<any>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');



  const onPaginationChange = async (page) => {
    await push(`/${locale}/co-hoi-nghe-nghiep?page=${page}`);
  };

  return (
    <div>
      <SearchingForJobs />
      <div className="filter__body">
        <ChangingView {...{ view, setView }} total={total ?? 0}/>
        <div className="filter__container">

          {jobs.length ?
            <span style={{ width: '100%' }}>
              {!!listTags.length && <TagItem listTags={listTags} setListTags={setListTags} />}
              <ListJob {...{ view, jobs }}/>
              <Pagination
                {...{
                  className: 'filter__pagination',
                  current: Number(query.page || 1),
                  pageSize: size,
                  total: total,
                  onChange: onPaginationChange,
                  showSizeChanger: false,
                }}
              />
            </span>
            :
            <NoData />
          }
        </div>
      </div>
    </div>
  );
});
export default Filter;
