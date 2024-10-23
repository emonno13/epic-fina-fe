import { DocumentManagementProps } from '@components/shared/documents';
import DocumentTemplateFiles from '@components/shared/documents/document-template-files';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { Form } from 'antd';
import { FC, memo, useEffect, useMemo } from 'react';

import './public-document-upload-header.module.scss';

const ManagerLoanCustomerUploadDocument: FC<DocumentManagementProps> = memo(
  ({
    documentTemplateCode,
    documentIdName = 'uploadDocumentsToTemplate',
    documentTemplateId,
    objectId,
    objectType,
    objectSubType = '',
    isDisabled = false,
    dragDropContent,
  }) => {
    const featureId = useMemo(
      () => documentTemplateId || documentTemplateCode || '',
      [documentTemplateCode, documentTemplateId],
    );
    const [searchForm] = Form.useForm();

    useEffect(() => {
      searchForm.submit();
    }, [featureId]);

    return (
      <div className="public-document-upload">
        <HFeature
          {...{
            featureId,
            useQueryParams: false,
            endpoint: endpoints.endpointWithApiDomain(
              '/document-template-details/templates',
            ),
            documentIdName,
            searchForm,
          }}
        >
          <HSearchFormHiddenAble
            {...{
              hiddenFields: { documentTemplateCode, documentTemplateId },
            }}
          />
          <DocumentTemplateFiles
            {...{
              documentIdName,
              documentTemplateId,
              objectId,
              objectType,
              objectSubType,
              isDisabled,
              dragDropContent,
            }}
          />
        </HFeature>
      </div>
    );
  },
);
export default ManagerLoanCustomerUploadDocument;
