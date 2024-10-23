import { Row, Tabs } from 'antd';

import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../../schema-form/features';
import {
  CreateButton,
  HSearchForm,
} from '../../../../../schema-form/features/search-form';
import { USER_TYPES } from '../../../../../types/organization';
import { PRODUCT_TYPE } from '../utils';
import { InsurancesProductTableSchema } from './search-result-table-schema';
import { InsurancesDetailSchemaForm } from './view-detail-schema-form';

const { TabPane } = Tabs;

const InsuranceProduct = () => {
  const modelFilters = {
    filter: { where: { type: PRODUCT_TYPE.INSURANCE } },
  };
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const relations = [
    'org',
    {
      relation: 'category',
      scope: {
        include: [{ relation: 'commissionSettings' }],
      },
    },
    {
      relation: 'organizationProducts',
      scope: {
        include: [{ relation: 'organization' }],
      },
    },
  ];

  return (
    <HFeature
      {...{
        featureId: 'productInsurance',
        nodeName: 'products',
        documentRelations: relations,
      }}
    >
      <HSearchForm
        {...{
          endpoint: endpoints.endpointWithApiDomain('/products'),
          withRelations: relations,
          renderRightSuffix: isOrgStaff && (
            <Row>
              <CreateButton />
            </Row>
          ),
          hiddenValues: modelFilters,
        }}
      />

      <InsurancesDetailSchemaForm />

      <HTable
        scroll={{ x: 'max-content' }}
        schema={InsurancesProductTableSchema}
      />
    </HFeature>
  );
};

export default InsuranceProduct;
