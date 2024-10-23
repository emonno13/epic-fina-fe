import { ProductDetailsTableSchema } from './search-result-table-schema';
import { ProductDetailViewer } from './detail-viewer';
import { HFeature, HTable } from '../../../../../../schema-form/features';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { HSearchFormWithCreateButton } from '../../../../../../schema-form/features/search-form';

export const ProductDetailsSchema = () => {
  const product = useDocumentDetail();
  const productId = product?.id;

  if (!productId) {
    return <span />;
  }

  return (
    <HFeature {...{
      featureId: 'product-details',
      nodeName: 'product-details',
      documentIdName: 'productDetailId',
      documentRelations: ['createdBy', 'updatedBy', 'org', {
        relation: 'category',
        scope: {
          include: [{
            relation: 'commissionSettings', scope: {
              fields: {
                id: true, createdAt: true, updatedAt: true, formula: true, applyDate: true,
                type: true, updateById: true, createdById: true,
              },
            },
          }],
        },
      }],
      limitNamespace: 'productDetailLimit',
      skipNamespace: 'productDetailSkip',
      pageNamespace: 'productDetailPage',
      useQueryParams: true,
    }}>
      <HSearchFormWithCreateButton {...{
        withRelations: [
          'org',
          {
            relation: 'category',
            scope: {
              include: [
                {
                  relation: 'commissionSettings',
                  scope: {
                    fields: {
                      id: true, createdAt: true, updatedAt: true, formula: true, applyDate: true,
                      type: true, updateById: true, createdById: true,
                    },
                  },
                },
              ],
            },
          },
        ],
        hiddenValues: {
          filter: {
            where: {
              productId,
            },
          },
        },
      }} />

      <ProductDetailViewer {...{ product }} />

      <HTable scroll={{ x: 'max-content' }} schema={ProductDetailsTableSchema} />
    </HFeature>
  );
};
