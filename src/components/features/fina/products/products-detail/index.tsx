import { EditOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { FilterIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import { useSubmitSearchForm } from '@schema-form/features/hooks';
import { useFeatureData } from '@schema-form/features/hooks/feature-hooks';
import HSearchForm, {
  HSearchFormHiddenAble,
} from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Tabs } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePublicEnvironment } from 'system/hooks';
import { ProductDetailViewer } from '../loans/tab-applied-banks/detail-viewer';
import { ProductDetailsTableSchema } from '../loans/tab-applied-banks/search-result-table-schema';
import { AdvanceSearch } from './advance-search-schema-form';
import ProductDetailAddPrioritizedModal from './product-detail-add-prioritized-modal';
import { PRODUCT_DETAIL_STATUS, PRODUCT_DETAIL_TITLE } from './utils';

import './product-detail.module.scss';

const { TabPane } = Tabs;

export const ProductDetailManager = ({ ...props }) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const endpoint = endpoints.endpointWithApiDomain(
    '/product-details/product-detail-loan',
  );
  const featureData = useFeatureData('product-details');

  return (
    <HFeature
      {...{
        featureId: 'product-details',
        nodeName: 'product-details',
        documentRelations: ['product'],
      }}
    >
      <HSearchForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            '/product-details/product-detail-loan',
          ),
          withRelations: [
            {
              relation: 'org',
              scope: {
                fields: ['id', 'name', 'emails', 'code'],
              },
            },
            {
              relation: 'category',
              scope: {
                include: [
                  {
                    relation: 'commissionSettings',
                  },
                ],
              },
            },
            {
              relation: 'product',
              scope: {
                fields: ['id', 'name', 'code'],
              },
            },
          ],
          hiddenValues: {
            filter: {
              order: ['updatedAt desc'],
              where: {
                status: {
                  in: [PRODUCT_DETAIL_STATUS.APPROVED],
                },
              },
              fields: [
                'id',
                'name',
                'code',
                'orgId',
                'categoryId',
                'applyFrom',
                'applyTo',
                'info',
                'status',
                'productId',
              ],
            },
          },
          renderLeftSuffix: (
            <HButton
              {...{
                onClick: () => setIsShowFilter(!isShowFilter),
                className: 'btn-new-filter',
              }}
            >
              <FilterIconSvg />
            </HButton>
          ),
        }}
      />
      <ProductDetailViewer />
      <div className="product-details-management">
        {isShowFilter && (
          <div
            className="product-details-management_filter"
            style={{
              marginTop:
                featureData?.dataSource?.length === 0 ? '20px' : '55px',
            }}
          >
            <HSearchFormHiddenAble
              {...{
                endpoint,
                schema: AdvanceSearch,
                resetIfSuccess: false,
                isAppendData: true,
                withRelations: [
                  {
                    relation: 'org',
                    scope: {
                      fields: ['id', 'name', 'emails', 'code'],
                    },
                  },
                  {
                    relation: 'category',
                    scope: {
                      include: [
                        {
                          relation: 'commissionSettings',
                        },
                      ],
                    },
                  },
                  {
                    relation: 'product',
                    scope: {
                      fields: ['id', 'name', 'code'],
                    },
                  },
                ],
                hiddenValues: {
                  filter: {
                    where: {
                      status: {
                        in: [PRODUCT_DETAIL_STATUS.APPROVED],
                      },
                    },
                  },
                },
                hiddenFields: {
                  'filter[order]': 'info.preferentialRate DESC',
                },
                onDataReadyToSubmit: (values) => ({
                  ...values,
                  createdAt: FormUtils.getQueryBetweenDays(
                    values?.createdAt?.[0],
                    values?.createdAt?.[1],
                  ),
                }),
              }}
            />

            <div className="wrapper-btn-apply-filter">
              <ApplyFilterButton />
            </div>
          </div>
        )}

        <div
          className={
            isShowFilter
              ? 'product-details-management_content-filter'
              : 'product-details-management_no-content-filter'
          }
        >
          <HTable
            scroll={{ x: 'max-content' }}
            schema={ProductDetailsTableSchema}
          />
        </div>
      </div>
    </HFeature>
  );
};

const ApplyFilterButton = () => {
  const { t } = useHTranslation('admin-common');
  const advanceSearch = useSubmitSearchForm();

  return (
    <HButton type="primary" onClick={() => advanceSearch()}>
      {t('Apply filter')}
    </HButton>
  );
};

export const GetIndexPrioritized = () => {
  const maxIndexPrioritized =
    +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10;
  const indexPrioritized: number[] = [];
  for (let i = 1; i <= maxIndexPrioritized; i++) {
    indexPrioritized.push(i);
  }
  return indexPrioritized;
};

export const ProductDetailView = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchForm] = Form.useForm();
  const handleAddProductDetailPrioritized = () => {
    setIsVisible(true);
  };
  const indexPrioritized = GetIndexPrioritized();

  return (
    <div className={'product-detail'}>
      <HFeature
        {...{
          featureId: 'product-details-prioritized',
          nodeName: 'product-details',
          documentRelations: ['product'],
        }}
      >
        <HSearchFormHiddenAble
          {...{
            withRelations: [
              'org',
              {
                relation: 'category',
                scope: { include: [{ relation: 'commissionSettings' }] },
              },
              {
                relation: 'product',
              },
            ],
            hiddenValues: {
              filter: {
                order: ['indexPrioritized ASC'],
                where: {
                  indexPrioritized: { inq: indexPrioritized },
                  status: PRODUCT_DETAIL_STATUS.APPROVED,
                },
              },
            },
            resetIfSuccess: false,
          }}
        />
        <div className="product-detail-prioritized">
          <h1>Gói vay nổi bật</h1>
          <HButton
            icon={<EditOutlined />}
            className={'m-b-15 m-t-10'}
            type={'primary'}
            onClick={handleAddProductDetailPrioritized}
          >
            Chỉnh sửa gói vay nổi bật
          </HButton>

          {isVisible && (
            <ProductDetailAddPrioritizedModal
              {...{
                isVisible,
                setIsVisible,
                searchForm,
              }}
            />
          )}

          <HTable
            scroll={{ x: 'max-content' }}
            schema={ProductDetailsTableSchema({ ...{ isNotShowAction: true } })}
          />
        </div>
      </HFeature>

      {/*<HFeature*/}
      {/*	{...{*/}
      {/*		featureId: 'product-details-create-at',*/}
      {/*		nodeName: 'product-details',*/}
      {/*		documentRelations: ['product'],*/}
      {/*	}}>*/}
      {/*	<HSearchFormHiddenAble {...{*/}
      {/*		withRelations: [*/}
      {/*			'org',*/}
      {/*			{*/}
      {/*				relation: 'category',*/}
      {/*				scope: {include: [{relation: 'commissionSettings'}]},*/}
      {/*			},*/}
      {/*			{*/}
      {/*				relation: 'product',*/}
      {/*			},*/}
      {/*		],*/}
      {/*		hiddenValues: {*/}
      {/*			filter: {*/}
      {/*				where: {*/}
      {/*					indexPrioritized: {nin: indexPrioritized},*/}
      {/*					status: PRODUCT_DETAIL_STATUS.APPROVED,*/}
      {/*				},*/}
      {/*			},*/}
      {/*		},*/}
      {/*		resetIfSuccess: false,*/}
      {/*	}}/>*/}
      {/*	<div className="product-detail">*/}
      {/*		<p>Gói vay mới nhất</p>*/}
      {/*		<HTable schema={ProductDetailsTableSchema()}/>*/}
      {/*	</div>*/}
      {/*</HFeature>*/}
    </div>
  );
};

export default () => {
  const { t } = useTranslation('admin-common');
  const [activeKey, setActiveKey] = useState<string>(PRODUCT_DETAIL_TITLE.ALL);

  return (
    <Tabs activeKey={activeKey} onChange={setActiveKey}>
      <TabPane tab={t(PRODUCT_DETAIL_TITLE.ALL)} key={PRODUCT_DETAIL_TITLE.ALL}>
        {activeKey === PRODUCT_DETAIL_TITLE.ALL && <ProductDetailManager />}
      </TabPane>
      <TabPane
        tab={t(PRODUCT_DETAIL_TITLE.VIEW)}
        key={PRODUCT_DETAIL_TITLE.VIEW}
      >
        {activeKey === PRODUCT_DETAIL_TITLE.VIEW && <ProductDetailView />}
      </TabPane>
    </Tabs>
  );
};
