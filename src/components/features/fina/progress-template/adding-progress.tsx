import { Button, Row } from 'antd';
import React, { useState } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useStore } from 'react-redux';
import { ProgressViewer } from './progress/progress-viewer';
import { HModal } from '../../../shared/common/h-modal';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { endpoints } from '../../../../lib/networks/endpoints';
import { callApi } from '../../../../schema-form/common/actions';
import { useHTranslation } from '../../../../lib/i18n';


export const AddingProgress = ({ searchForm }) => {
  const [showDocument, setShowDocument] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const productProgress = useDocumentDetail();
  const { t } = useHTranslation('admin-common');

  const getProgressAfterCloseModal = () => {
    return store.getState()?.featureStore['progress-selected']?.progress || [];
  };

  const handleModal = () => {
    setShowDocument(true);
  };

  const handleOkModal = () => {
    setShowDocument(false);
    const listProgress = getProgressAfterCloseModal();
    const productProgressId = productProgress?.id;
    const endpoint = endpoints.endpointWithApiDomain(`/progress-template-details/product/${productProgressId}`);
    const handleResponse = () => {
      searchForm?.submit();
    };

    dispatch(callApi({
      method: 'post',
      params: {
        listProgress,
      },
      endpoint,
      callback: handleResponse,
    }));
  };

  const handleCancelModal = () => {
    setShowDocument(false);
  };
  return (
    <Row justify={'end'}>
      <Button {...{
        size: 'large',
        onClick: handleModal,
      }}>
        <FileTextOutlined/> {t('', {
          en: 'Add progress',
          vn: 'Thêm tiến trình',
        })}
      </Button>
      <HModal
        visible={showDocument}
        width={'95%'}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <ProgressViewer/>
      </HModal>
    </Row>
  );
};