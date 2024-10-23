import { ImportOutlined } from '@ant-design/icons';
import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { httpRequester } from '@lib/networks/http';
import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import HSearchForm from '@schema-form/features/search-form';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { callApi } from '../../../../../schema-form/common/actions';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { DetailSchemaForm } from './detail-schema-form';
import { UsersTableSchema } from './search-result-table-schema';

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

const UserPreview = ({ model, importId, onConfirmSuccess }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const onGetResponse = (responseData) => {
    if (!responseData?.error) {
      onConfirmSuccess(responseData);
      notification.info({ message: `${model || 'Data'} have imported` });
    }
  };

  // Import Data from ImportDetail Table to xxx Table
  const handleConfirmUpload = async () => {
    try {
      // check validate
      const { errorRecords, totalError } = await httpRequester.getDataFromApi({
        url: endpoints.endpointWithApiDomain('/import-details/validate-data'),
        params: {
          filter: {
            where: {
              importId: importId,
            },
          },
        },
      });
      if (totalError > 0) {
        notification.error({
          message: (
            <div>
              {errorRecords?.map((err, index) => (
                <p key={index}>
                  Number {err?.idx} - duplicates values:{' '}
                  {`[${err?.duplicates?.toString()}]`}
                </p>
              ))}
            </div>
          ),
        });
        return;
      }
      // import to users table
      dispatch(
        callApi({
          method: 'post',
          endpoint: endpoints.endpointWithApiDomain(
            `/users/import-template/${importId}/confirm`,
          ),
          callback: onGetResponse,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HFeature
      {...{
        featureId: 'import-details/public',
        nodeName: 'import-details/public',
      }}
    >
      {query?.importId ? (
        <>
          <HSearchForm
            hiddenFields={{ importId }}
            renderRightSuffix={
              <ConfirmUploadButton
                onClick={handleConfirmUpload}
                confirmMessage={'Do you want to confirm to import the data?'}
              />
            }
          />
          <HDocumentModalPanel hideSubmitAndContinueButton>
            <UserImportedDetail />
          </HDocumentModalPanel>
          <HTable schema={UsersTableSchema} />
        </>
      ) : (
        <p>Need to complete step 2 to see the data</p>
      )}
    </HFeature>
  );
};

export default UserPreview;
