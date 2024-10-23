import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { useCallback, useMemo } from 'react';
import { useClientFeature } from '../hooks/client-feature-hook';

const ClientFeatureSearchForm = (props: HFormProps) => {
  const { onGotSuccess, form, hiddenValues = {} } = props;
  const {
    pagination,
    setDataSource,
    setPagination,
    nodeName,
    endpoint,
    searchForm,
    dataSource,
    isLoadMore = false,
    setIsLoadMore,
  } = useClientFeature();

  const onFormGotSuccessWhenLoadMore = useCallback(
    (res) => {
      const { data = [], total = 0 } = res;
      const { page } = pagination;

      setDataSource([...dataSource, ...data]);
      setPagination({
        ...pagination,
        page: page + 1,
        total,
      });
    },
    [setDataSource, setPagination, dataSource, pagination],
  );

  const onFormGotSuccessWhenNotLoadMore = useCallback(
    (res) => {
      const { data = [], total = 0 } = res;

      setDataSource(data);
      setPagination({
        ...pagination,
        total,
      });
    },
    [setDataSource, setPagination, pagination],
  );

  const onFormGotSuccess = useCallback(
    (res) => {
      if (onGotSuccess) onGotSuccess(res);
      if (isLoadMore) {
        onFormGotSuccessWhenLoadMore(res);
      } else {
        onFormGotSuccessWhenNotLoadMore(res);
      }
      setIsLoadMore(false);
    },
    [
      isLoadMore,
      onGotSuccess,
      onFormGotSuccessWhenLoadMore,
      onFormGotSuccessWhenNotLoadMore,
    ],
  );

  const formHiddenValues = useMemo(() => {
    const { page, size } = pagination;
    const defaultHiddenValues = {
      ...hiddenValues,
      'filter[limit]': size,
    };

    if (isLoadMore) {
      return {
        ...defaultHiddenValues,
        'filter[skip]': page * size,
      };
    }
    return {
      ...defaultHiddenValues,
      'filter[skip]': (page - 1) * size,
    };
  }, [hiddenValues, isLoadMore, pagination]);

  return (
    <HForm
      {...{
        ...props,
        nodeName,
        endpoint,
        form: searchForm || form,
        onGotSuccess: onFormGotSuccess,
        hiddenValues: formHiddenValues,
        isSearchForm: true,
      }}
    />
  );
};

export const ClientFeatureSearchFormHiddenAble = (props: HFormProps) => {
  const schema: any = props?.schema;
  const isHidden = !schema || schema().length === 0;

  return (
    <ClientFeatureSearchForm
      {...props}
      schema={isHidden ? () => [] : schema}
      className={isHidden ? 'display-none' : ''}
    />
  );
};

export default ClientFeatureSearchForm;
