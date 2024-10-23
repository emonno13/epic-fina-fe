import { ProductLoanDetailTableSchema } from '@components/features/fina/deals/loans/detail/create-deal-loan/product-detail.table-schema';
import { EditLoanSchemaForm } from '@components/features/fina/deals/loans/detail/edit-deal-loan/edit-loan-schema-form';
import { DEAL_TYPE } from '@components/features/fina/deals/utils';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import {
  useDocumentDetail,
  useDocumentIdName,
  useSearchForm,
} from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Button, Form, notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { RouteUtils } from '../../../../shared/layout/router-contaner/utils';
import { mapSurveyResultsToField } from '../utils';
import NoteModal from './note-modal';

interface CreateLoanDealProps {
  isVisibleCreateLoan: boolean;
  setIsVisibleCreateLoan: (value: boolean) => void;
}

export const CreateDealLoan = (props: CreateLoanDealProps) => {
  const { isVisibleCreateLoan, setIsVisibleCreateLoan } = props;
  const { t } = useHTranslation('admin-common');
  const task = useDocumentDetail();
  const [loanByProductSelected, setLoanByProductSelected] = useState<any[]>([]);
  const [productDetails, setProductDetail] = useState<any>();
  const surveyDetails = useMemo(
    () => mapSurveyResultsToField(task?.surveyResult?.surveyDetails || []),
    [task],
  );
  const [form] = Form.useForm();
  const searchForm = useSearchForm();
  const [note, setNote] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const documentIdName = useDocumentIdName();
  const [disable, setDisable] = useState(false);
  const handleCancel = () => {
    setIsVisibleCreateLoan(false);
  };

  const handleUpdate = () => {
    if (!note) {
      setVisible(true);
    } else {
      setDisable(true);
      form?.submit();
    }
  };

  useEffect(() => {
    setProductDetail(task?.product?.productDetails);
  }, [task]);

  return (
    <HModal
      {...{
        visible: isVisibleCreateLoan,
        width: 1000,
        footer: (
          <div>
            <Button
              {...{
                onClick: () => {
                  handleCancel();
                },
                danger: true,
              }}
            >
              Thoát
            </Button>
            <Button
              {...{
                type: 'primary',
                disabled: disable,
                loading: disable,
                onClick: () => {
                  handleUpdate();
                },
              }}
            >
              Tạo hồ sơ vay
            </Button>
          </div>
        ),
        okText: t('Create Deal Loan', { vn: 'Tạo hồ sơ vay' }),
      }}
    >
      <HFeature featureId="createLoan" documentIdName="createLoan">
        <HForm
          {...{
            form,
            endpoint: endpoints.generateNodeEndpoint('deals'),
            method: 'post',
            schema: EditLoanSchemaForm,
            transport: {
              loanByProductSelected,
              isCreateFromTaskScreen: true,
              setProductDetail,
            },
            hiddenValues: { type: DEAL_TYPE.LOAN },
            initialValues: {
              ...task,
              ...surveyDetails,
              taskId: task?.id || '',
              documentTemplateId: task?.product?.documentTemplateId || '',
            },
            hideControlButton: true,
            onGotSuccess: () => {
              notification.success({
                message: 'Thành công',
                description: 'Đã tạo hồ sơ vay thành công!',
              });
              setIsVisibleCreateLoan(false);
              searchForm?.submit();
              setDisable(false);
              RouteUtils.redirectToDocumentDetail(undefined, documentIdName);
            },
            onGotError: (err) => {
              notification.error({
                message: 'Đã có lỗi xảy ra',
                description: err?.error?.message || 'Không thể tạo hồ sơ vay',
              });
            },
            onDataReadyToSubmit: (values) => ({
              ...values,
              note: note,
            }),
          }}
        />
        <NoteModal {...{ setVisible, visible, setNote }} />
        <HTable
          {...{
            schema: ProductLoanDetailTableSchema,
            pagination: false,
            dataSource: [...(productDetails || [])],
            rowSelection: {
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                setLoanByProductSelected(selectedRows);
              },
            },
          }}
        />
      </HFeature>
    </HModal>
  );
};

export default CreateDealLoan;
