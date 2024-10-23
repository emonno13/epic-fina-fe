import { Input } from 'antd';
import { useEffect } from 'react';

import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../lib/i18n';
import { useSubmitSearchForm } from '../hooks';
import {
  useLoadingSearchStatus,
  useSetLoadingSearchStatus,
} from '../hooks/feature-hooks';

export const SEARCH_MODES = {
  MULTIPLE: 'multiple',
  SINGLE: 'single',
};

export const SEARCH_TYPE_LIST_OPTION = [
  { value: SEARCH_MODES.MULTIPLE, label: 'Tương đối' },
  { value: SEARCH_MODES.SINGLE, label: 'Chính xác' },
];

export const DefaultSearchForm = (props: HFormProps): HFormItemProps[] => {
  const { transport = {} } = props;
  const { t } = useHTranslation('common');
  const { placeholder } = transport;

  const handleEnterSearch = useSubmitSearchForm();
  const loadingSearchStatus = useLoadingSearchStatus();
  const setLoadingSearchStatus = useSetLoadingSearchStatus();

  useEffect(() => {
    setLoadingSearchStatus(false);
  }, []);

  return [
    createSchemaItem({
      Component: Input.Search,
      name: '_q',
      className: 'advance-one-control',
      componentProps: {
        placeholder: placeholder || t('search_placeholder'),
        enterButton: t('search'),
        size: 'large',
        autoComplete: 'off',
        onSearch: handleEnterSearch,
        loading: loadingSearchStatus,
      },
    }),
  ];
};
