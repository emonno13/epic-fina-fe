import { useState } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import { ForControlDisbursementTableSchema } from './for-control-disbursement-table-schema';
import { ForControlDisbursementAdvanceFormSchema } from './for-control-disbursement-advance-form-schema';
import { ForControlDisbursementDetailView } from './for-control-disbursement-detail';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchForm } from '../../../../../schema-form/features/search-form';
import { TRANSACTION_DETAIL_STATUS, TRANSACTION_TYPE } from '../../transaction/constant';
import { useSearchForm } from '../../../../../schema-form/features/hooks';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { callApi } from '../../../../../schema-form/common/actions';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';

const ForControlDisbursementTable = () => {
  const { t } = useHTranslation('admin-common');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchForm = useSearchForm();
  const dispatch = useDispatch();

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (transactionDetail: any) => ({
      disabled: transactionDetail?.status !== TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL,
    }),
  };

  const handleResponse = (res) => {
    searchForm?.submit();
    setSelectedRowKeys([]);
  };

  const handleForControl = () => {
    const updateData: any = {
      ids: selectedRowKeys,
    };

    const endpoint = endpoints.endpointWithApiDomain('/transaction-details/for-control-multiple-disbursement');
    dispatch(callApi({ method: 'put', params: updateData, endpoint, callback: handleResponse }));
  };

  return (
    <>
      <div style={{ marginTop: 16 }}>
        <HButton {...{
          type: 'primary',
          onClick: handleForControl,
        }}>
          {t('Đối soát')}
        </HButton>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} bản ghi` : ''}
        </span>
      </div>

      <HTable rowSelection={rowSelection} schema={ForControlDisbursementTableSchema}/>
    </>
  );
};

export const ForControlDisbursementManagement = () => {
  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(data?.from, data?.to || moment().add(1, 'days').format('YYYY/MM/DD'));
      delete data.from;
      delete data.to;
    }
  };

  return (
    <HFeature
      {...{
        featureId: 'dealForControlDisbursement',
        nodeName: 'transaction-details',
      }}>
      <HSearchForm {...{
        resetIfSuccess: false,
        onDataReadyToSubmit: handleDataReadyToSubmit,
        advancedSchema: ForControlDisbursementAdvanceFormSchema,
        withRelations: [
          'staff',
          'partnerStaff',
          {
            relation: 'dealDetail',
            scope: {
              include: [
                { relation: 'deal' },
                { relation: 'productDetailPartner' },
                { relation: 'partner' },
              ],
            },
          },
          {
            relation: 'transaction',
            scope: {
              include: [{ relation: 'customer' }],
            },
          },
        ],
        hiddenFields: { transactionType: TRANSACTION_TYPE.LOAN },
        hiddenValues: { filter: { order: ['createdAt DESC'] } },
      }}/>

      <ForControlDisbursementDetailView/>
      <ForControlDisbursementTable />
    </HFeature>
  );
};

export default ForControlDisbursementManagement;
