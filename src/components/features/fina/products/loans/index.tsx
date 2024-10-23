import { Row } from 'antd';
import { LoanProductViewTabs } from './loan-detail-viewer.tabs';
import { LoanProductTableSchema } from './loan-product.table-schema';
import { ProductLoanAdvanceSearch } from './search.schema-form';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { CreateButton, HSearchForm } from '../../../../../schema-form/features/search-form';
import { USER_TYPES } from '../../../../../types/organization';
import { LOAN_STATUS, PRODUCT_TYPE } from '../utils';

const LoanComponent = () => {
  const modelFilters = {
    filter: { where: { type: PRODUCT_TYPE.LOAN } },
    include: [
      {
        relation: 'org',
        scope: {
          fields: { id: true, name: true },
        },
      },
      {
        relation: 'category',
        scope: {
          fields: { id: true, name: true },
        },
      },
      {
        relation: 'productDetails',
        scope: {
          fields: {
            id: true, status: true, name: true, slug: true, info: true, outstandingAdvantages: true, productId: true,
          },
        },
      },
    ],
    // fields: ['id', 'slug', 'orgId', 'categoryId', 'productDetails'],
  };
	
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  return (
    <HFeature
      {...{
        featureId: 'products',
        nodeName: 'products',
        documentRelations: modelFilters?.include,
      }}>
      <HSearchForm
        advancedSchema={ProductLoanAdvanceSearch}
        initialValues={{ status: LOAN_STATUS.APPROVED }}
        withRelations={modelFilters?.include}
        renderRightSuffix={isOrgStaff && <Row><CreateButton /></Row>}
        hiddenValues={modelFilters}
        resetIfSuccess={false}
      />
      <HDocumentDrawerPanel {...{
        footer: <span />,
        destroyOnClose: true,
        onCloseParams: {
          'filter[productDetailLimit]': undefined,
          'filter[productDetailSkip]': undefined,
          'productDetailPage': undefined,
        },
      }}>
        <LoanProductViewTabs />
      </HDocumentDrawerPanel>
      <HTable schema={LoanProductTableSchema} />
    </HFeature>
  );
};

export default LoanComponent;