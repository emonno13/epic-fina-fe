import { useCurrentUser } from '@lib/providers/auth';
import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import HSearchForm, { CreateButton } from '@schema-form/features/search-form';
import { USER_TYPES } from '@types/organization';
import { Row } from 'antd';
import { PRODUCT_TYPE } from '../utils';
import BondsDetailViewer from './bonds-detail-viewer';
import { BondsTableSchema } from './bonds.table-schema';

const Bonds = () => {
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const modelFilters = {
    filter: { where: { type: PRODUCT_TYPE.BONDS } },
  };
  return (
    <HFeature
      {...{
        featureId: 'products',
        nodeName: 'products',
      }}
    >
      <HSearchForm
        withRelations={['org', 'category']}
        renderRightSuffix={
          isOrgStaff && (
            <Row>
              <CreateButton />
            </Row>
          )
        }
        resetIfSuccess={false}
        hiddenValues={modelFilters}
      />
      <HDocumentDrawerPanel
        {...{
          footer: <span />,
          destroyOnClose: true,
        }}
      >
        <BondsDetailViewer />
      </HDocumentDrawerPanel>
      <HTable schema={BondsTableSchema} />
    </HFeature>
  );
};

export default Bonds;
