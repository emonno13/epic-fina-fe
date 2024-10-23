import React, { memo, useMemo } from 'react';
import { HForm } from '../../h-form';
import { HFormProps, removeUnnecessaryProps } from '../../h-types';
import {
  useDetailForm,
  useDocumentDetail,
  useFeature,
} from '../hooks';
import { useReloadSearchResult } from '../hooks/search-form-hooks';
import { useHideDocumentDetail, useSetDocumentFragments } from '../hooks/document-detail-hooks';
import { useSetLoadingCreateOrUpdateStatus } from '../hooks/feature-hooks';

export const NEW_DOCUMENT_ID = 'new';

interface HFeatureFormProps extends HFormProps {
  documentDetail?: any,
  newDocumentSchemaForm?: Function,
  documentId?: string
  isCloseDocumentDetailAfterSubmit?: boolean
}

const getFormProps = (props) => removeUnnecessaryProps({ ...props }, ['documentDetail', 'documentId', 'newDocumentSchemaForm']);

export const HFeatureForm = memo(({ isCloseDocumentDetailAfterSubmit = true, ...props }: HFeatureFormProps) => {
  props = { ...props, useDefaultMessage: true };
  
  const featureDocumentId = useFeature().documentId;
  const documentDetail = props.documentDetail || useDocumentDetail(featureDocumentId);
  const { apiEndpoint } = useFeature();
  const handleReloadOnGotSuccess = useReloadSearchResult();
  const detailForm = props.form || useDetailForm();
  const closeDocumentDetailPopover = useHideDocumentDetail();
  const setDocumentFragments = useSetDocumentFragments();

  const setLoadingCreateOrUpdateStatus = useSetLoadingCreateOrUpdateStatus();
  
  const documentId = featureDocumentId || documentDetail?.id;
  const isDefaultHideControlButton = props.hideControlButton === undefined;
  const isNewDocument = !documentId || documentId === NEW_DOCUMENT_ID;
  const schema = props.newDocumentSchemaForm && isNewDocument ? props.newDocumentSchemaForm : props.schema;

  const initialValues = useMemo(() => {
    const initValues = isNewDocument ? props?.initialValues : documentDetail;
    setTimeout(() => {
      detailForm?.resetFields();
      detailForm?.setFieldsValue(initValues);
    });
    return initValues;
  }, [props?.initialValues, documentDetail]);

  const handleGotSuccess = (response, isSubmitAndContinue) => {
    setLoadingCreateOrUpdateStatus(false);
    const onGotSuccess = props.onGotSuccess || (f=>f);
    onGotSuccess(response, isSubmitAndContinue);
    if (!isNewDocument) {
      setDocumentFragments(detailForm?.getFieldsValue(), documentId);
    }
    !!isCloseDocumentDetailAfterSubmit && !isSubmitAndContinue && closeDocumentDetailPopover();
    handleReloadOnGotSuccess();
  };

  const handleGotError = (error) => {
    setLoadingCreateOrUpdateStatus(false);
    props?.onGotError?.(error);
  };

  const handleBeforeSubmit = (params) => {
    if (props?.beforeSubmit) {
      if (props.beforeSubmit(params)) {
        setLoadingCreateOrUpdateStatus(true);
      }
    } else {
      setLoadingCreateOrUpdateStatus(true);
    }
  };

  const handleBeforeSubmitAndContinue = (params) => {
    if (props?.beforeSubmitAndContinue) {
      if (props.beforeSubmitAndContinue(params)) {
        setLoadingCreateOrUpdateStatus(true);
      }
    } else {
      setLoadingCreateOrUpdateStatus(true);
    }
  };

  return (
    <HForm
      {...getFormProps(props)}
      {...{
        schema,
        initialValues,
        form: detailForm,
        method: (props?.method || isNewDocument ? 'post' : 'put'),
        endpoint: props.endpoint || `${apiEndpoint}/${documentId || ''}`,
        onGotSuccess: handleGotSuccess,
        hideControlButton: isDefaultHideControlButton ? true : props.hideControlButton,
        onGotError: handleGotError,
        beforeSubmit: handleBeforeSubmit,
        beforeSubmitAndContinue: handleBeforeSubmitAndContinue,
      }}
    />
  );
});
