import NoteModal from '@components/features/crm/tasks/edit-form/note-modal';
import { HModal } from '@components/shared/common/h-modal';
import { endpoints } from '@lib/networks/endpoints';
import { HTable } from '@schema-form/features';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Button, Form, FormInstance } from 'antd';
import React, { useState } from 'react';
import { DEAL_TYPE } from '../../../utils';
import { EditLoanSchemaForm } from '../edit-deal-loan/edit-loan-schema-form';
import { ProductLoanDetailTableSchema } from './product-detail.table-schema';

import './create-deal-loan.module.scss';

export const CreateLoan = (props: {
  documentDetailVisible?: boolean;
  setDocumentDetailVisible?: (value: boolean) => void;
  searchForm: FormInstance;
}) => {
  const {
    documentDetailVisible,
    setDocumentDetailVisible = (value: boolean) => {},
    searchForm,
  } = props;
  const loadDetail = useDocumentDetail();
  const [productDetails, setProductDetail] = useState();
  const [loanByProductSelected, setLoanByProductSelected] = useState();
  const [note, setNote] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const handleCancel = () => {
    setDocumentDetailVisible(false);
  };

  const handleUpdate = () => {
    if (!note) {
      setVisible(true);
    } else {
      setDisable(true);
      form?.submit();
    }
  };

  if (loadDetail?.id) {
    return null;
  }
  const handleBeforeSubmit = (form) => {
    const taskId = form?.getFieldValue('taskId');
    if (!note && taskId) {
      setVisible(true);
      return false;
    } else {
      return true;
    }
  };
  return (
    <HModal
      {...{
        visible: documentDetailVisible,
        onCancel: () => setDocumentDetailVisible(false),
        width: '80%',
        footer: (
          <div>
            <Button
              {...{
                onClick: () => {
                  handleCancel();
                },
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
      }}
    >
      <HForm
        {...{
          hideControlButton: true,
          endpoint: endpoints.generateNodeEndpoint('/deals'),
          method: 'post',
          form,
          useDefaultMessage: true,
          schema: EditLoanSchemaForm,
          transport: {
            setProductDetail,
            loanByProductSelected,
          },
          beforeSubmit: handleBeforeSubmit,
          onGotSuccess: () => {
            setNote('');
            setDocumentDetailVisible(false);
            searchForm?.submit();
            setDisable(false);
          },
          onDataReadyToSubmit: (values) => {
            return {
              ...values,
              note: note,
            };
          },
          hiddenValues: { type: DEAL_TYPE.LOAN },
        }}
      >
        <HTable
          {...{
            schema: ProductLoanDetailTableSchema,
            pagination: false,
            dataSource: [...(productDetails || [])],
            rowSelection: {
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                // @ts-ignore
                setLoanByProductSelected(selectedRows);
              },
            },
          }}
        />
        <NoteModal {...{ setVisible, visible, setNote }} />
      </HForm>
    </HModal>
  );
};
