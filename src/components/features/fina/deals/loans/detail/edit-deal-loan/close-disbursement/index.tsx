import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

const CloseDisbursement = (props) => {
  const [form] = Form.useForm();
  const { onCancel, onSubmitSuccess, dealDetail, dataSource, dealId } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useHTranslation('common');

  const handleSubmit = () => {
    form.submit();
  };

  const AlmaRegisterSchema: HFormItemProps[] = [
    createSchemaItem({
      Component: Input.TextArea,
      colProps: { span: 24 },
      name: 'note',
      componentProps: {
        placeholder: t('Enter note ', { vn: 'Lý do kết thúc rải ngân' }),
        rows: 6,
      },
    }),
  ];

  return (
    <div>
      <Modal
        {...{
          title: t(
            'Are you sure you want to end the disbursement and cancel all outstanding?',
            {
              vn: 'Bạn có chắc chắn muốn kết thúc giải ngân và huỷ các giải ngân chưa đối soát không?',
            },
          ),
          visible,
          width: 800,
          destroyOnClose: true,
          onCancel: () => {
            setVisible(false);
          },
          footer: false,
        }}
      >
        <HForm
          {...{
            form,
            nodeName: `deal-details/update-status/${dealDetail.id}`,
            schema: () => AlmaRegisterSchema,
            method: 'put',
            hideControlButton: true,
            onDataReadyToSubmit: (value) => {
              return {
                ...value,
                status: 'close-all-disbursement',
                dealId,
                transactionDetailIds: dataSource?.map((e) => e.id) || [],
              };
            },
            onGotSuccess: () => {
              setVisible(false);
              onCancel();
              onSubmitSuccess();
            },
          }}
        />

        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button type="primary" className="m-r-5 m-l-5" onClick={handleSubmit}>
            {t('Yes', { vn: 'Đồng ý' })}
          </Button>
          <Button
            type="default"
            className="m-l-5"
            onClick={() => {
              setVisible(false);
            }}
          >
            {t('Close', { vn: 'Đóng' })}
          </Button>
        </div>
      </Modal>

      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <Button
          type="primary"
          className="m-r-5 m-l-5"
          onClick={() => {
            setVisible(true);
          }}
        >
          {t('End of disbursement', { vn: 'Kết thúc giải ngân' })}
        </Button>
        <Button type="default" className="m-l-5" onClick={onCancel}>
          {t('Close', { vn: 'Đóng' })}
        </Button>
      </div>
    </div>
  );
};

export default CloseDisbursement;
