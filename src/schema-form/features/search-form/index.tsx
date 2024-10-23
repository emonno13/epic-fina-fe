import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { Button, ButtonProps, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { CreateIconSvg } from 'icons';
import {
  differenceWith,
  identity,
  isEmpty,
  isEqual,
  omit,
  pickBy,
} from 'lodash';
import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useStore } from 'react-redux';
import {
  HButton,
  HButtonProps,
} from '../../../components/shared/common-form-elements/h-confirmation-button';
import { HForm, HSubForm } from '../../h-form';
import { HFormProps, removeUnnecessaryProps } from '../../h-types';
import {
  setNamespaceFeature,
  setPagination,
  storeSearchResultOfFeature,
} from '../actions';
import {
  useFeature,
  useFeatureId,
  useSearchForm,
  useSetDocumentDetailVisibility,
} from '../hooks';
import { useSetLoadingSearchStatus } from '../hooks/feature-hooks';
import { usePagination } from '../hooks/table-hooks';
import { DefaultSearchForm } from './schema';

import './search-form.module.scss';
const { Text } = Typography;

interface HSearchFormProps extends HFormProps {
  children?: ReactNode;
  schema?: Function;
  hiddenCreateButton?: boolean;
  renderLeftSuffix?: any;
  renderRightSuffix?: any;
  rendering?: boolean;
  advancedSchema?: Function;
  advancedTabSchema?: Function;
  searchForm?: FormInstance<any> | (() => FormInstance<any>);
  endpoint?: string;
  className?: string;
  pagination?: any;
  placeholder?: string;
  annotate?: boolean | string;
  classNameAdvancedTabSchema?: string;
}

export const annotateDefaultSearch =
  'Tìm kiếm chính xác vui lòng thêm dấu " vào trước và sau từ khoá cần tìm kiếm. Ví dụ: "Nguyễn Văn A", "nguyen van a" ...';

const getFormProps = (props) =>
  removeUnnecessaryProps({ ...props }, [
    'searchForm',
    'advancedSchema',
    'renderRightSuffix',
    'rendering',
  ]);

const getPaginationAsHiddenValues = (pagination) => {
  return {
    'filter[limit]': pagination?.filter?.limit,
    'filter[skip]': pagination?.filter?.skip || 0,
    'filter[order]': pagination?.filter?.order,
    page: pagination?.page || 1,
  };
};

export const HSearchForm = memo((props: HSearchFormProps) => {
  const {
    searchForm,
    apiEndpoint,
    featureId = '',
    useQueryParams,
  } = useFeature();
  const {
    onGotSuccess = (f) => f,
    className = '',
    onDataReadyToSubmit,
    rendering = true,
    annotate = false,
  } = props;
  const store = useStore();

  const dispatch = useDispatch();
  const setLoadingSearchStatus = useSetLoadingSearchStatus();

  const handleBeforeSubmit = (params) => {
    if (props?.beforeSubmit) {
      if (props.beforeSubmit(params)) {
        setLoadingSearchStatus(true);
      }
    } else {
      setLoadingSearchStatus(true);
    }
  };

  const handleBeforeSubmitAndContinue = (params) => {
    if (props.beforeSubmitAndContinue) {
      if (props.beforeSubmitAndContinue(params)) {
        setLoadingSearchStatus(true);
      }
    } else {
      setLoadingSearchStatus(true);
    }
  };

  const handleGotError = (error) => {
    setLoadingSearchStatus(false);
    props?.onGotError?.(error);
  };

  const handleGotSuccess = (searchResult) => {
    const { data: dataSource, total, metadata } = searchResult;
    dispatch(
      storeSearchResultOfFeature({ featureId, dataSource, total, metadata }),
    );
    setLoadingSearchStatus(false);
    onGotSuccess(searchResult);
  };

  const pagination = props.pagination || usePagination();
  const hiddenValues = props.hiddenValues || {};
  const advancedSchema = props.advancedSchema;
  const advancedSchemaItems = (
    <div className={props?.classNameAdvancedTabSchema}>
      <HSubForm {...{ schema: advancedSchema }} />
    </div>
  );

  const onValuesChange = (_, allValues) => {
    const searchValue =
      store.getState().featureStore?.[featureId]?.['searchValue'] || {};
    const newAllValues = pickBy(allValues, identity);
    dispatch(
      setNamespaceFeature({
        featureId,
        documentFragments: {
          allSearchField: newAllValues,
          isSearchFieldChange: !isEmpty(
            differenceWith(
              [newAllValues],
              [searchValue?.allSearchField],
              isEqual,
            ),
          ),
        },
        namespace: 'searchValue',
      }),
    );
  };

  const handleDataReadyToSubmit = async (document) => {
    const searchValue =
      store.getState().featureStore?.[featureId]?.['searchValue'] || {};
    if (searchValue?.isSearchFieldChange) {
      const basePath = RouteUtils.getAdminBasePathFromRoute();
      const newPagination = {
        ...pagination,
        filter: {
          ...pagination?.filter,
          skip: 0,
        },
        page: 1,
      };
      dispatch(setPagination({ featureId, pagination: newPagination }));
      dispatch(
        setNamespaceFeature({
          featureId,
          documentFragments: {
            ...searchValue,
            isSearchFieldChange: undefined,
          },
          namespace: 'searchValue',
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 50));
      if (useQueryParams) {
        await RouteUtils.redirect(
          `${basePath}?${RouteUtils.getQueryUri(omit(newPagination, ['total']), true)}`,
        );
      }
      document['filter[skip]'] = 0;
      document['page'] = 1;
    }
    if (onDataReadyToSubmit) {
      return onDataReadyToSubmit(document);
    }
  };

  const advancedTabSchema = props.advancedTabSchema;

  if (!rendering) {
    return null;
  }

  return (
    <>
      {advancedTabSchema && (
        <HForm
          {...{
            ...getFormProps(props),
            schema: advancedTabSchema,
            hideControlButton: true,
          }}
        />
      )}
      <div className={`advance_search_panel ${className}`}>
        <div className={'advance_search_content'}>
          {props.renderLeftSuffix && (
            <div className={'left-suffix'}>{props.renderLeftSuffix}</div>
          )}
          <div className={'advance_search_form'}>
            {annotate && (
              <Text className="annotate-search">
                {typeof annotate === 'string'
                  ? annotate
                  : annotateDefaultSearch}
              </Text>
            )}
            <HForm
              {...{
                ...getFormProps(props),
                preFormElements: advancedSchemaItems,
                form: searchForm,
                endpoint: props.endpoint || apiEndpoint,
                onGotSuccess: handleGotSuccess,
                onGotError: handleGotError,
                schema: props.schema || DefaultSearchForm,
                hideControlButton: true,
                isSearchForm: true,
                hiddenValues: {
                  ...hiddenValues,
                  ...getPaginationAsHiddenValues(pagination),
                },
                transport: {
                  placeholder: props?.placeholder,
                },
                onValuesChange,
                onDataReadyToSubmit: handleDataReadyToSubmit,
                beforeSubmit: handleBeforeSubmit,
                beforeSubmitAndContinue: handleBeforeSubmitAndContinue,
              }}
            />
          </div>
          <div className={'ui-btns'}>{props.renderRightSuffix}</div>
        </div>
      </div>
    </>
  );
});

export const CreateButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const setDocumentDetailVisibility = useSetDocumentDetailVisibility();
  const handleCreateNewDocument = () => {
    setDocumentDetailVisibility(true);
  };
  return (
    <HButton
      {...{
        size: 'large',
        shape: 'round',
        className: 'control-btn create-btn',
        onClick: handleCreateNewDocument,
        icon: <CreateIconSvg />,
        ...props,
      }}
    >
      {t('create')}
    </HButton>
  );
});

export const HSearchFormWithCreateButton = memo((props: HSearchFormProps) => {
  return (
    <HSearchForm
      {...props}
      renderRightSuffix={
        !props.hiddenCreateButton && (
          <div>
            <CreateButton />
            {props.renderRightSuffix}
          </div>
        )
      }
    />
  );
});

export const HSearchFormHiddenAble = memo((props: HSearchFormProps) => {
  const schema: any = props?.schema;
  const isHidden = !schema || schema().length === 0;

  return (
    <HSearchForm
      {...props}
      schema={isHidden ? () => [] : schema}
      className={isHidden ? 'display-none' : ''}
    />
  );
});

export const HResetPaginationButton = (props: ButtonProps) => {
  const dispatch = useDispatch();
  const featureId = useFeatureId();
  const searchForm = useSearchForm();
  const onClick = useCallback(() => {
    dispatch(
      setPagination({
        featureId,
        pagination: {
          isAppendData: false,
          page: 1,
        },
      }),
    );
    searchForm?.submit();
  }, [featureId]);
  return <Button {...{ ...props, onClick }} />;
};

export default HSearchForm;
