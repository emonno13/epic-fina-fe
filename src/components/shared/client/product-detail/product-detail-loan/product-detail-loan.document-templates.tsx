import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { Col, Row } from 'antd';

const TemplateDetailList = ({ data }) => {
  if (!Array.isArray(data) || data.length < 1) {
    return null;
  }
  return (
    <ul className="client-product-detail-loan-document-template-list__detail-item">
      {data.map(({ document, id }) => (
        <li key={`template-detail-item-${id}`}>{document?.name}</li>
      ))}
    </ul>
  );
};

const ProductDetailLoanDocumentTemplatesList = () => {
  const { t } = useHTranslation('common');
  const templates = useTableSourceData();
  return (
    <div className="client-product-detail-loan-document-template-list">
      <div className="client-product-detail-loan-document-template-list__title">
        {t('Document requirement', { vn: 'Yêu cầu hồ sơ' })}
      </div>
      {Array.isArray(templates) &&
        templates.length > 0 &&
        templates.map((template) => {
          const { id, name, documentTemplateDetails } = template;
          return (
            <Row
              key={`product-detail-loan-document-template-list-item-${id}`}
              className="client-product-detail-loan-document-template-list__item"
            >
              <Col
                {...{ xs: 24, sm: 24, md: 12 }}
                className="client-product-detail-loan-document-template-list__item__name"
              >
                {name}
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 12 }}>
                <TemplateDetailList data={documentTemplateDetails} />
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

const ProductDetailLoanDocumentTemplates = ({ documentTemplateId }) => {
  return (
    <HFeature
      {...{
        featureId: 'productDetailLoanDocumentTemplate',
        useQueryParams: false,
        nodeName: 'document-template-details/templates/public',
        documentIdName: 'productDetailLoanDocumentTemplateId',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenFields: { documentTemplateId },
        }}
      />
      <ProductDetailLoanDocumentTemplatesList />
    </HFeature>
  );
};

export default ProductDetailLoanDocumentTemplates;
