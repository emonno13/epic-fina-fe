import { useEffect, useMemo, ReactNode } from 'react';
import { Form } from 'antd';

import { DocumentTemplateFiles } from './document-template-files';
import { HSearchFormHiddenAble } from '../../../schema-form/features/search-form';
import { HFeature } from '../../../schema-form/features';
import { endpoints } from '../../../lib/networks/endpoints';

export interface DocumentManagementProps {
  documentTemplateCode?: string,
  documentTemplateId?: string,
  documentIdName?: string,
  objectId: string,
  objectType: string,
  objectSubType?: string,
  isDisabled?: boolean,
  dragDropContent?: ReactNode,
}

export const DocumentManagement = ({
  documentTemplateCode,
  documentIdName = 'uploadDocumentsToTemplate',
  documentTemplateId,
  objectId,
  objectType,
  objectSubType = '',
  isDisabled = false,
  dragDropContent,
}: DocumentManagementProps) => {
  const featureId = useMemo(() => {
    return documentTemplateId || documentTemplateCode || '';
  }, [documentTemplateCode, documentTemplateId]);

  const [searchForm] = Form.useForm();

  useEffect(() => {
    searchForm.submit();
  }, [featureId]);

  return (
    <HFeature {...{
      featureId,
      useQueryParams: false,
      endpoint: endpoints.endpointWithApiDomain('/document-template-details/templates'),
      documentIdName,
      searchForm,
    }}>
      <HSearchFormHiddenAble {...{
        hiddenFields: { documentTemplateCode, documentTemplateId },
      }}/>
      <DocumentTemplateFiles {...{
        documentIdName,
        documentTemplateId,
        objectId,
        objectType,
        objectSubType,
        isDisabled,
        dragDropContent,
      }} />
    </HFeature>
  );
};

export default DocumentManagement;
