import { useHTranslation } from '@lib/i18n';
import { Collapse } from 'antd';
import { useState } from 'react';
import { HSubForm } from '../../../../../../schema-form/h-form';
import {
  createSchemaItem,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import { DocumentTemplateDetails } from '../../../../documents/templates/document-template-details';
import { NAMESPACE_DOCUMENT } from '../../utils';

import '../../../../../../styles/_default_responsive.scss';
import './common.module.scss';

export const DocumentProduct = (props: HFormProps) => {
  const { t } = useHTranslation('admin-crm');
  const { initialValues } = props;
  const namespace = (props as any)?.namespace;
  const documentTemplateDefault =
    namespace === NAMESPACE_DOCUMENT.loan
      ? initialValues?.documentTemplateId
      : '';
  const [documentTemplateId, SetDocumentTemplateId] = useState(
    documentTemplateDefault,
  );
  const buttonViewDocument =
    namespace === NAMESPACE_DOCUMENT.product && !!initialValues
      ? [
          createSchemaItem({
            Component: DocumentProductModel,
            rowProps: { gutter: { xs: 16, md: 24 } },
            colProps: { span: 24 },
            componentProps: { ...props },
          }),
        ]
      : [];
  return (
    <HSubForm
      schema={() => [
        SelectUtils.createDocumentTemplateSuggestionElement({
          name: 'documentTemplateId',
          colProps: { xs: 24, sm: 24, md: 12 },
          rowProps: { gutter: { xs: 24, md: 24 } },
          label: t('Document Template', { vn: 'Mẫu tài liệu' }),
          componentProps: {
            orientation: 'left',
            placeholder: t('Select a Template', { vn: 'Chọn mẫu tài liệu' }),
            onChange: (document) => {
              SetDocumentTemplateId(document);
            },
          },
        }),
        ...buttonViewDocument,
        createSchemaItem({
          Component: PreViewDocumentTemplate,
          rowProps: { gutter: { xs: 16, md: 24 } },
          componentProps: { value: documentTemplateId || null },
        }),
      ]}
    />
  );
};

const PreViewDocumentTemplate = (value) => {
  if (value.value) {
    return (
      <DocumentTemplateDetails
        {...{
          addToDocumentId: value.value,
        }}
      />
    );
  }
  return <span />;
};

const DocumentProductModel = (props: HFormProps) => {
  const { initialValues } = props;
  const { Panel } = Collapse;
  return (
    <div className={'custom-collapse'}>
      <Collapse bordered={false}>
        <Panel header="Xem chi tiết biếu mẫu" key="1">
          <DocumentTemplateDetails
            {...{
              addToDocumentId: initialValues?.documentTemplateId,
            }}
          />
        </Panel>
      </Collapse>
    </div>
  );
};
