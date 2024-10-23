import React, { memo, useMemo } from 'react';
import { HForm } from '../../h-form';
import { HFormProps, removeUnnecessaryProps } from '../../h-types';
import { useFeature, useItem } from '../hooks';
import {
  useItemDocumentForm,
  useOnCloseItem,
} from '../hooks/document-detail-hooks';
import { FormUtils } from '../../utils/form-utils';

export const NEW_ITEM_DOCUMENT_ID = 'newItem';

interface HFeatureItemFormProps extends HFormProps {
  itemDocument?: any,
  endpointNamespace?: string,
  newItemDocumentSchemaForm?: Function,
  itemId?: string
}

const getFormProps = (props) => removeUnnecessaryProps({ ...props }, ['endpointNamespace', 'itemDocument', 'itemId', 'newItemDocumentSchemaForm']);

export const HFeatureItemForm = memo((props: HFeatureItemFormProps) => {
  const { endpointNamespace = 'children', nodeName, endpoint, resetIfSuccess = false } = props;
  const item = useItem();
  const itemDocument = props.itemDocument || item?.data;
  const featureDocumentId = useFeature().documentId;
  const formEndpoint: string = FormUtils.getNodeEndpoint({ nodeName, endpoint, silentWhenException: true });
  const apiEndpoint = formEndpoint || useFeature().apiEndpoint;
  const itemId = itemDocument?.id || NEW_ITEM_DOCUMENT_ID;
  // const handleReloadOnGotSuccess = useReloadSearchResult();
  const isDefaultHideControlButton = props.hideControlButton === undefined;
  const isNewDocument = !itemId || itemId === NEW_ITEM_DOCUMENT_ID;
  const itemDocumentForm = props.form || useItemDocumentForm();
  const onCloseItem = useOnCloseItem();
  // const setDocumentFragments = useSetDocumentFragments();
  const initialValues = useMemo(() => {
    const initValues = isNewDocument ? props?.initialValues : itemDocument;
    setTimeout(() => {
      itemDocumentForm?.resetFields();
      itemDocumentForm?.setFieldsValue(initValues);
    });
    return initValues;
  }, [props?.initialValues, itemDocument]);

  const handleGotSuccess = (response, isSubmitAndContinue) => {
    const onGotSuccess = props.onGotSuccess || (f=>f);
    onGotSuccess(response, isSubmitAndContinue, isNewDocument);
    if (!isNewDocument) {
      // setDocumentFragments(itemDocumentForm?.getFieldsValue(), documentId);
    }
    isSubmitAndContinue && onCloseItem();
    // handleReloadOnGotSuccess();
  };

  const schema = props.newItemDocumentSchemaForm && isNewDocument ? props.newItemDocumentSchemaForm : props.schema;

  return (
    <HForm
      {...getFormProps(props)}
      {...{
        schema,
        initialValues,
        form: itemDocumentForm,
        resetIfSuccess,
        method: isNewDocument ? 'post' : 'put',
        submitAndContinueButtonLabel: props.submitAndContinueButtonLabel || 'Save & close',
        endpoint: `${apiEndpoint}/${itemDocument?.id !== NEW_ITEM_DOCUMENT_ID ? (itemDocument?.id || '') : ''}`,
        onGotSuccess: handleGotSuccess,
        hideControlButton: isDefaultHideControlButton ? true : props.hideControlButton,
      }}
    />
  );
});
