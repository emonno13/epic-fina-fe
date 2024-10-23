import React from 'react';
import SearchForm from '../components/search/search-form';
import { useHTranslation } from '../../../../../lib/i18n';

import './searching-for-jobs.module.scss';

const SearchingForJobs = React.memo(()=>{
  const { t } = useHTranslation('recruit');
  return (
    <div className="searching-for-jobs__container">
      <p className="searching-for-jobs__title ">
        {t('jobs.searchingForJobs')}
      </p>
      <div className="searching-for-jobs__search">
        <SearchForm />
      </div>
    </div>
  );
});
export default SearchingForJobs;

