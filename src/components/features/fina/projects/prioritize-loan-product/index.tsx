import { useHTranslation } from '@lib/i18n';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { PrioritizeLoanDealDetailSchema } from './prioritize-loan-product-detail-schema';

const PrioritizeLoanProductForm = ({
  projectId,
  setPrioritizeProductId,
  prioritizeProductId,
}) => {
  const { t } = useHTranslation('admin');

  const relations = ['org', 'category', 'productDetails', 'project'];
  const onSelectChange = (selectedRowKeysData) => {
    setPrioritizeProductId(selectedRowKeysData[0]);
  };
  const rowSelection = {
    prioritizeProductId,
    onChange: onSelectChange,
    type: 'radio',
    selectedRowKeys: prioritizeProductId ? [prioritizeProductId] : [],
    columnTitle: t('Prioritize loan product', { vn: 'Sản phẩm vay ưu tiên' }),
    columnWidth: 100,
  } as any;

  return (
    <div className={'chose-prioritize-product'}>
      <HFeature
        {...{
          featureId: 'products-deal-by-project',
          nodeName: 'products',
          documentIdName: 'loan-products-by-project',
          documentRelations: relations,
        }}
      >
        <HSearchForm
          layout={'horizontal'}
          withRelations={relations}
          hiddenValues={{
            filter: {
              where: {
                'info.projectId': projectId,
              },
            },
          }}
        />
        <HTable
          rowSelection={rowSelection}
          schema={PrioritizeLoanDealDetailSchema}
        />
      </HFeature>
    </div>
  );
};

export default PrioritizeLoanProductForm;
