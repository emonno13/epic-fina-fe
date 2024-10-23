import { Button, Menu, Row } from 'antd';
import { useMemo, useState } from 'react';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';
import { useDispatch, useStore } from 'react-redux';
import DropdownButton from 'antd/lib/dropdown/dropdown-button';
import { useTranslation } from 'next-i18next';

import { AddingFromDocumentListModal } from './adding-from-document-list-modal';
import { AddingFromTemplateModal } from './adding-from-template-modal';
import { setDocumentDetail } from '../../../../../../schema-form/features/actions';
import { useSearchForm, useTableSourceData } from '../../../../../../schema-form/features/hooks';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { callApi } from '../../../../../../schema-form/common/actions';

export const AddingDocuments = ({ addToDocumentId, allowAddingMoreDocuments }) => {
  const { t } = useTranslation('admin-common');
  const dispatch = useDispatch();
  const store = useStore();
  const searchForm = useSearchForm();
  const [shouldShowCloneForm, setShouldShowCloneForm] = useState(false);
  const [shouldShowAddDocumentModal, setShouldShowAddDocumentModal] = useState(false);

  const handleClickAddDocuments = () => {
    setShouldShowAddDocumentModal(true);
    setShouldShowCloneForm(false);
  };

  const handleClickCloneFromTemplate = () => {
    setShouldShowAddDocumentModal(false);
    setShouldShowCloneForm(true);
  };

  const handleCancelModal = () => {
    setShouldShowAddDocumentModal(false);
    setShouldShowCloneForm(false);
  };

  const getDocumentsAfterCloseModal = (source) => {
    if (source.fromModalName === 'documentList') {
      return store.getState()?.featureStore['attachDocumentsToTemplate']?.documents || [];
    }

    const documentsFromTemplateStore = store.getState()?.featureStore[addToDocumentId]?.documentDetail || {};

    return (Object.values(documentsFromTemplateStore) as any).flat();
  };

  const handleOkModal = (source) => {
    setShouldShowAddDocumentModal(false);
    setShouldShowCloneForm(false);

    const documents = getDocumentsAfterCloseModal(source);
    if (documents.length === 0) {
      return;
    }

    const handleResponse = () => {
      if (source.fromModalName === 'documentList') {
        dispatch(setDocumentDetail({
          featureId: 'attachDocumentsToTemplate',
          documentDetail: [],
          namespace: 'documents',
        }));
      }

      searchForm?.submit();
    };
    const endpoint = endpoints.endpointWithApiDomain(`/document-template-details/templates/${addToDocumentId}`);

    dispatch(callApi({
      method: 'post',
      params: {
        documents,
      },
      endpoint,
      callback: handleResponse,
    }));
  };

  const handleMenuClick = (clickInfo) => {
    if (clickInfo.key === 'add_more') {
      handleClickAddDocuments();
      return;
    }

    if (clickInfo.key === 'clone_from_template') {
      handleClickCloneFromTemplate();
      return;
    }
  };

  const dataSource = useTableSourceData();

  const excludeDocumentIds = useMemo(() => {
    return dataSource
      ?.map((item: any) => item?.documentTemplateDetails)
      ?.flat()
      ?.map(item => item?.documentId);
  }, [dataSource]);

  return (
    <Row justify={'end'}>
      {allowAddingMoreDocuments && (
        <DropdownButton {...{
          onClick: handleClickAddDocuments,
          overlay: <Menu {...{
            onClick: handleMenuClick,
            children: [
              <MenuItem
                key={'add_more'}
                {...{
                  children: 'Add more document',
                }}/>,
              <MenuItem
                key={'clone_from_template'}
                {...{
                  children: 'Clone from template',
                }}/>,
            ],
          }}/>,
          children: <span><PlusOutlined/> Add more document</span>,
          size: 'large',
          type: 'primary',
        }}/>
      )}

      <Button {...{
        type: 'ghost',
        size: 'large',
        style: { marginLeft: 50 },
        disabled: true,
      }}>
        <DownloadOutlined/> Download
      </Button>

      <AddingFromDocumentListModal {...{
        visible: shouldShowAddDocumentModal,
        onCancel: handleCancelModal,
        onOk: handleOkModal,
        destroyOnClose: true,
        excludeDocumentIds,
      }}/>

      <AddingFromTemplateModal {...{
        visible: shouldShowCloneForm,
        onCancel: handleCancelModal,
        onOk: handleOkModal,
        destroyOnClose: true,
        excludeDocumentIds,
        addToDocumentId,
      }}/>
    </Row>
  );
};