import { useDispatch } from 'react-redux';

import React from 'react';
import { HModal } from '../../../../../shared/common/h-modal';
import DocumentManagement from '../../../management';
import { setDocumentDetail } from '../../../../../../schema-form/features/actions';

export const AddingFromDocumentListModal = ({
  visible = false,
  onCancel = (f => f),
  width = '80%',
  onOk = (f => f),
  destroyOnClose = false,
  excludeDocumentIds = [],
}) => {
  const dispatch = useDispatch();

  return (
    <HModal{...{
      visible,
      onCancel,
      width,
      onOk: () => {
        onOk({ fromModalName: 'documentList' });
      },
      destroyOnClose,
    }}>
      <DocumentManagement {...{
        excludeDocumentIds,
        useQueryParams: false,
        documentIdName: 'documentModalId',
        rowSelection: {
          onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            dispatch(setDocumentDetail({
              featureId: 'attachDocumentsToTemplate',
              documentDetail: selectedRows,
              namespace: 'documents',
            }));
          },
        },
      }}/>
    </HModal>
  );
};