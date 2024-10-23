import { EditOutlined } from '@ant-design/icons';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { TASK_STATUSES, TASK_STATUSES_ASSIGNED } from '@constants/crm/task';
import { useCheckRoleFinaStaff } from '@dynamic-configuration/hooks';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import {
  useDocumentDetail,
  useDocumentIdName,
  useSearchForm,
  useSetDocumentDetail,
  useSetDocumentDetailVisibility,
} from '@schema-form/features/hooks';
import HSearchForm from '@schema-form/features/search-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, Modal, Select, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useHTranslation } from '../../../../../lib/i18n';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { ModalHelper } from '../../../../shared/utils/modal.helper';
import { STATUS_RESPONSE_PARTNER } from './constants';
import FeedbacksDetailSchemaTable from './feedbacks-detail-schema-table';
import { isRecordDisable, unCheckedFeedBacksSameOrg } from './utils';

const Feedbacks = () => {
  const { query } = useRouter();
  const documentId: string = query.documentId as string;
  const { t } = useHTranslation('admin-common');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [orgPathsSelected, setOrgPathsSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusResponse, setStatusResponse] = useState<string>(
    STATUS_RESPONSE_PARTNER.ALL,
  );
  const [form] = Form.useForm();
  const taskId = query?.documentId || '';
  const setVisibleDrawn = useSetDocumentDetailVisibility();
  const taskDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const documentIdName = useDocumentIdName();
  const searchForm = useSearchForm();
  const isFinaStaff = useCheckRoleFinaStaff();

  const handleCreateDeal = () => {
    ModalHelper.confirm(
      'Confirm',
      t('Do you want to create deal with loan package?', {
        vn: 'Bạn có đồng ý tạo hồ sơ vay với những phản hồi đã chọn?',
      }),
    ).then((res: boolean) => {
      if (!res) {
        return;
      }
      FormUtils.submitForm(
        {
          taskId: documentId,
          bankFeedbacksSelected: selectedRowKeys || [],
        },
        {
          endpoint: endpoints.generateNodeEndpoint(
            'deals/create-deal-for-client',
          ),
          method: 'post',
          onGotSuccess: () => {
            Modal.success({
              title: 'Tạo hồ sơ vay thành công',
              centered: true,
              onOk: () => {
                searchForm && searchForm.submit();
                setVisibleDrawn(false);
                RouteUtils.redirectToDocumentDetail(undefined, documentIdName);
                setDocumentDetail({}, false);
              },
            });
          },
        },
      );
    });
  };

  const onSelectChange = (currentSelectedRowKeys) => {
    setSelectedRowKeys(currentSelectedRowKeys);
    setOrgPathsSelected(
      currentSelectedRowKeys.map((el) => el?.partner?.orgPaths || ''),
    );
  };

  const handleSelectedAll = (_, selectedRows) => {
    setLoading(true);
    const a = setTimeout(() => {
      const feedbacksSelected = unCheckedFeedBacksSameOrg([...selectedRows]);
      setSelectedRowKeys(feedbacksSelected);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(a);
    };
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled:
        taskDetail?.statusAssign === TASK_STATUSES_ASSIGNED.CREATE_PROFILE ||
        isRecordDisable({ record, orgPathsSelected, selectedRowKeys }),
      responseStatus: record.responseStatus,
    }),
    onSelectAll: handleSelectedAll,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <HFeature
      {...{
        featureId: 'bank-feedbacks',
        documentIdName: 'bank-feedbacks',
        endpoint: endpoints.generateNodeEndpoint(
          `tasks/bank-feedbacks/${taskId}`,
        ),
        searchForm: form,
      }}
    >
      <HSearchForm
        {...{
          advancedSchema: () => [
            createSchemaItem({
              Component: Select,
              colProps: { span: 6 },
              componentProps: {
                value: statusResponse,
                placeholder: 'Trạng thái phản hồi',
                options: [
                  { label: 'Tất cả', value: STATUS_RESPONSE_PARTNER.ALL },
                  {
                    label: 'Chấp nhận',
                    value: STATUS_RESPONSE_PARTNER.RECEIVED,
                  },
                  { label: 'Từ chối', value: STATUS_RESPONSE_PARTNER.REJECT },
                  {
                    label: 'Chưa phản hồi',
                    value: STATUS_RESPONSE_PARTNER.NO_RESPONSE,
                  },
                ],
                onChange: async (value) => {
                  setStatusResponse(value);
                  (await form) && form.submit();
                },
              },
            }),
          ],
          hiddenFields: {
            statusResponse,
          },
        }}
      />
      <div>
        <HButton
          className={'m-t-20'}
          type="primary"
          onClick={handleCreateDeal}
          disabled={
            !hasSelected ||
            taskDetail?.statusAssign !==
              TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS ||
            taskDetail?.status !== TASK_STATUSES.CONSULTED ||
            taskDetail?.statusAssign ===
              TASK_STATUSES_ASSIGNED.CREATE_PROFILE ||
            !isFinaStaff
          }
          icon={<EditOutlined />}
          shape="round"
          size="large"
        >
          Tạo hồ sơ vay
        </HButton>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} gói vay` : ''}
        </span>
      </div>
      <Spin spinning={loading}>
        <HTable
          {...{
            rowSelection,
            schema: FeedbacksDetailSchemaTable,
            pagination: {
              size: 'small',
              position: ['topRight', 'bottomRight'],
              showSizeChanger: true,
              showQuickJumper: true,
            },
            rowKey: (record) => record,
          }}
        />
      </Spin>
    </HFeature>
  );
};

export default Feedbacks;
