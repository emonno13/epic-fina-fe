import { ImportOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { endpoints } from '@lib/networks/endpoints';
import { callApi } from '@schema-form/common/actions';
import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import HSearchForm from '@schema-form/features/search-form';
import { DetailSchemaForm } from './detail-schema-form';
import { PreviewTableSchema } from './search-result-table-schema';

export const ConfirmUploadButton = (props: HButtonProps) => {
  const { t } = useTranslation('common');

  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn',
        onClick: props.onClick,
        icon: <ImportOutlined />,
      }}
    >
      {t('Import to DB')}
    </HButton>
  );
};

export const UserImportedDetail = () => {
  const documentDetail = useDocumentDetail();
  return (
    <HFeatureForm
      {...{
        schema: DetailSchemaForm,
        documentId: documentDetail?.id,
        documentDetail: documentDetail?.data || {},
        hideSubmitAndContinueButton: true,
      }}
    />
  );
};

export default ({ model, importId, onConfirmSuccess }) => {
  const dispatch = useDispatch();

  const onGetResponse = (responseData) => {
    if (!responseData?.error) {
      onConfirmSuccess(responseData);
      notification.info({ message: `${model || 'Data'} have imported` });
    }
  };

  const handleConfirmUpload = () => {
    const endpoint = endpoints.endpointWithApiDomain(
      `/deals/import/${importId}/confirm`,
    );
    dispatch(callApi({ method: 'post', endpoint, callback: onGetResponse }));
  };

  return (
    <HFeature
      {...{
        featureId: 'import-details',
        nodeName: 'import-details',
      }}
    >
      <HSearchForm
        hiddenFields={{ importId }}
        renderRightSuffix={
          <ConfirmUploadButton
            onClick={handleConfirmUpload}
            confirmMessage={'do you want to confirm to import the data?'}
          />
        }
      />
      <HDocumentModalPanel>
        <UserImportedDetail />
      </HDocumentModalPanel>
      <HTable schema={PreviewTableSchema} />
    </HFeature>
  );
};
