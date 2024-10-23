import { HFeature, HTable } from '@schema-form/features';
import { useSetTransactionsOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { Collapse, Form, notification } from 'antd';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { endpoints } from '../../../../../../../lib/networks/endpoints';
import { useTableSourceData } from '../../../../../../../schema-form/features/hooks';
import { useSetDataSource } from '../../../../../../../schema-form/features/hooks/table-hooks';
import HSearchForm from '../../../../../../../schema-form/features/search-form';
import { LabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { DEAL_DETAIL_STATUSES } from '../../../utils';
import { HistoriesDisbursementForm } from './histories-disbursement-form';
import { HistoriesDisbursementTableSchema } from './histories-disbursement.table-schema';

const { Panel } = Collapse;

export const HistoriesDisbursement = (props) => {
  const { detail, dealDetail, isShow = true, cb, onReloadDealDetail } = props;
  const { id } = dealDetail;
  const setTransactionsOfDeal = useSetTransactionsOfDeal();
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  if (!isShow) {
    return null;
  }

  const onDataReadyToSubmit = (document) => {
    return {
      dealId: detail?.id,
      dealDetailId: dealDetail?.id,
      partnerId: dealDetail?.partnerId,
      productId: detail?.productId,
      categoryId: detail?.categoryId,
      staffId: detail?.assigneeId,
      customerId: detail?.userId,
      productCategory: detail?.category?.productCategory,
      executePartnerId: dealDetail?.executePartnerId,
      partnerStaffId: dealDetail?.partnerStaffId,
      consultantStaffId: detail?.sourceId,
      historiesDisbursement: document?.historiesDisbursement,
    };
  };

  const handleBeforeSubmit = (form, props) => {
    if (!dealDetail?.info?.approvalAmount) {
      notification.error({ message: 'Bạn chưa nhập số tiền phê duyệt' });
      return false;
    }
    return true;
  };

  return (
    <div>
      <Collapse
        {...{
          defaultActiveKey: 'histories_disbursement',
        }}
      >
        <Panel
          header={
            <LabelItem
              label={t('', {
                en: 'Histories disbursement',
                vn: 'Quá trình giải ngân',
              })}
              showFirstIcon={false}
            />
          }
          key="histories_disbursement"
        >
          <HFeature
            {...{
              featureId: `histories-disbursement-${dealDetail?.id}`,
            }}
          >
            <HSearchForm
              {...{
                endpoint: endpoints.endpointWithApiDomain('/transactions'),
                withRelations: [
                  {
                    relation: 'transactionDetails',
                    scope: { include: [{ relation: 'updatedBy' }] },
                  },
                ],
                hiddenFields: {
                  objectId: detail?.id,
                  'metaData.dealDetailId': dealDetail?.id,
                },
                className: 'hidden',
              }}
            />
            <ViewHistoriesDisbursement
              {...{ dealDetail, cb, onReloadDealDetail }}
            />
            {(dealDetail.status === DEAL_DETAIL_STATUSES.DISBURSING ||
              dealDetail.status === DEAL_DETAIL_STATUSES.LEND_APPROVAL ||
              isShow) && (
              <HistoriesDisbursementForm
                {...{
                  form,
                  onDataReadyToSubmit,
                  beforeSubmit: handleBeforeSubmit,
                  onGotSuccess: (value) => {
                    if (value?.metaData?.dealDetailId) {
                      setTransactionsOfDeal({
                        featureId: `transactions-${value.metaData.dealDetailId}`,
                        data: value,
                      });
                    }

                    cb();
                  },
                }}
              />
            )}
          </HFeature>
        </Panel>
      </Collapse>
    </div>
  );
};

const ViewHistoriesDisbursement = ({ dealDetail, cb, onReloadDealDetail }) => {
  const dataSource = useTableSourceData();
  const setDataSource = useSetDataSource();
  const setTransactionsOfDeal = useSetTransactionsOfDeal();

  if (
    !dataSource ||
    !dataSource[0] ||
    !dataSource[0].transactionDetails ||
    dataSource[0].transactionDetails.length <= 0
  ) {
    return <></>;
  }

  return (
    <HTable
      schema={() =>
        HistoriesDisbursementTableSchema({ dealDetail, onReloadDealDetail })
      }
      pagination={false}
      dataSource={dataSource[0].transactionDetails}
      endpoint={endpoints.endpointWithApiDomain(
        '/transactions/update-transaction-deal',
      )}
      isFeatureReloading={false}
      className={'m-b-20'}
      onReload={(newRowData, result) => {
        if (result.error) {
          return;
        }
        if (result?.metaData?.dealDetailId) {
          setTransactionsOfDeal({
            featureId: `transactions-${result.metaData.dealDetailId}`,
            data: result,
          });
        }
        const x = dataSource?.[0]?.transactionDetails?.map((el) => {
          if (el.id === newRowData.id) {
            return newRowData;
          }
          return el;
        });
        setDataSource([{ ...dataSource?.[0], transactionDetails: x }]);
        cb();
      }}
      useDefaultMessage={true}
    />
  );
};
