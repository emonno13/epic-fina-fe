import React from 'react';
import { SearchSchema } from './search-schema';
import { useHTranslation } from '../../../../../../lib/i18n';
import ClientFeatureSearchForm
  from '../../../../../../schema-form/client-features/search-form/client-feature-search-form';
import { HFormProps } from '../../../../../../schema-form/h-types';

import './search-form.module.scss';

interface SearchFormProps extends HFormProps{
  onClick?(): void;
}
const SearchForm = React.memo(({ onClick } :SearchFormProps)=> {
  const { t } = useHTranslation('common');

  return (
    <div className="search-form__body">
      <ClientFeatureSearchForm {...{
        schema: SearchSchema,
        showResetButton: false,
        submitButtonClassName: 'search-form__button',
        submitButtonLabel: t('search'),
      }}
      />
    </div>

  );
});
export default SearchForm;
