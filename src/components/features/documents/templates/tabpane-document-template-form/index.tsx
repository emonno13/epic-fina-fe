import { useTranslation } from 'next-i18next';
import { Tabs } from 'antd';
import { ContainerOutlined, FileTextOutlined } from '@ant-design/icons';

import { useDocumentDetail, useSetDocumentDetail } from '../../../../../schema-form/features/hooks';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { DocumentTemplateFormSchema } from '../document-template-form-schema';
import { RouteUtils } from '../../../../shared/layout/router-contaner/utils';
import { DOCUMENT_TEMPLATE_STATUSES } from '../constants';
import { DocumentTemplateDetails } from '../document-template-details';
import { PRODUCT_TYPES } from '../../../../../types/organization';

const { TabPane } = Tabs;

const TabLabel = ({ Icon, label }) => (<><Icon/> {label} </>);
const initialValues = {
  productType: PRODUCT_TYPES.loan,
  status: DOCUMENT_TEMPLATE_STATUSES.DRAFT,
};

export const TabpaneDocumentTemplateForm = () => {
  const { t } = useTranslation('admin-common');
  const documentTemplate = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const onDocumentCreated = (document) => {
    if (!document?.id) {
      return;
    }
    RouteUtils.redirectToDocumentDetail(document.id);
    setDocumentDetail(document);
  };

  return (
    <Tabs hideAdd type="editable-card">
      <TabPane
        key={'info'}
        {...{
          tab: <TabLabel Icon={ContainerOutlined} label={t('Template Information')}/>,
          closable: false,
        }}>
        <HFeatureForm {...{
          schema: DocumentTemplateFormSchema,
          hideControlButton: false,
          resetIfSuccess: false,
          initialValues,
          onGotSuccess: onDocumentCreated,
          submitButtonLabel: t('Save'),
          hideSubmitAndContinueButton: true,
          withRelations: ['clonedFrom'],
        }}/>
      </TabPane>

      <TabPane
        key={'detail'}
        {...{
          tab: <TabLabel Icon={FileTextOutlined} label={t('Documents')}/>,
          closable: false,
          disabled: !documentTemplate?.id,
        }}>
        <DocumentTemplateDetails {...{
          addToDocumentId: documentTemplate?.id,
          allowAddingMoreDocuments: documentTemplate?.status !== DOCUMENT_TEMPLATE_STATUSES.IN_USE,
          showGroupAction: true,
        }}/>
      </TabPane>
    </Tabs>
  );
};