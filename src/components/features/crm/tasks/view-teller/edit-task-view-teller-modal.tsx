import { Button, Form } from 'antd';
import moment from 'moment';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HInputNumber, HTextArea } from '../../../../shared/common-form-elements/h-input';
import { HForm } from '../../../../../schema-form/h-form';
import { HModal } from '../../../../shared/common/h-modal';
import { TASK_RESPONSE_STATUS } from '../../../../../constants/crm/task';
import { useCurrentUser } from '../../../../../lib/providers/auth';

import './view-teller.module.scss';

export const EditTaskViewTellerModal = (props) => {
  const { t } = useHTranslation('admin-common');
  const { isVisibleUpdate = false, setIsVisibleUpdate , taskId, searchForm } = props;
  const [form] = Form.useForm();
  const currentUser = useCurrentUser();

  const disabledDate = (current) => {
    return  current < moment();
  };

  const handleCancel = () => {
    setIsVisibleUpdate(false);
  };

  const handleUpdate = () => {
	 form.submit();
  };

  return (
    <HModal{...{
      title: t('Đánh giá khả năng cho vay'),
      visible: isVisibleUpdate,
      onCancel: () => {
        setIsVisibleUpdate(false);
      },
      centered: true,
      width: '700px',
      onOk: () => {
        setIsVisibleUpdate(false);
        handleUpdate();
      },
      footer: (
        <div>
          <Button {...{
            onClick: () => {handleCancel();},
            danger: true,
          }}>
						Thoát
          </Button>
          <Button {...{
            type: 'primary',
            onClick: () => {handleUpdate();},
          }}>
						Xác nhận
          </Button>
        </div>
      ),
    }}>
      <HForm
        {...{
          form,
          endpoint: endpoints.generateNodeEndpoint(`tasks/update-bankId/${taskId}`),
          method: 'put',
          hideControlButton: true,
          onDataReadyToSubmit: (values) => {
            return {
              ...values,
              userId: currentUser?.id,
              orgId: currentUser?.orgId,
              responseStatus:  TASK_RESPONSE_STATUS?.RECEIVED,
              responseDate: moment().toISOString(),
            };
          },
          onGotSuccess: () => {
            setIsVisibleUpdate(false);
            searchForm.submit();
          },
          schema: () => 	[
            createSchemaItem({
              Component: HInputNumber,
              name: ['content', 'loanDemand'],
              label: t('Loan pay', { en: 'Loan pay', vn: 'Số tiền vay' }),
              rowProps: { gutter: { xs: 24, md: 24 } },
              rules: [{
                required: true,
                message: t('Loan pay is required', { vn: 'Số tiền vay là bắt buộc' }),
              }, {
                type: 'number',
                min: 0,
                message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
              }],
              componentProps: {
                formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                parser: value => value.replace(/(,*)/g, ''),
                placeholder:t('Loan pay'),
                style: { width: '100%' },
              },
            }),
            createSchemaItem({
              Component: HInputNumber,
              label: t('Borrow time', { vn: 'Thời gian vay' }),
              rules: [{
                required: true,
                message: t('Borrow time is required', { vn: 'Thời gian vay là bắt buộc' }),
              }, {
                type: 'number',
                min: 0,
                message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
              }],
              name: ['content', 'borrowTime'],
              componentProps: {
                placeholder:t('Borrow time'),
                disabledDate,
              },
            }),
            createSchemaItem({
              Component: HInputNumber,
              name: ['content', 'interestRate'],
              label: t('Interest rate', { en: 'Interest rate', vn: 'Lãi suất ưu đãi' }),
              rules: [{
                type: 'number',
                max: 100,
                message: t('Max is 100', { vn: 'Giá trị lớn nhất là 100' }),
              }, {
                type: 'number',
                min: 0,
                message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
              }],
              componentProps: {
                placeholder:t('Interest rate'),
                style: { width: '100%' },
              },
            }),
            createSchemaItem({
              Component: HInputNumber,
              label: t('Preferential Time', { vn: 'Thời gian ưu đãi' }),
              name: ['content', 'preferentialTime'],
              rules: [{
                type: 'number',
                min: 0,
                message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
              }],
              componentProps: {
                placeholder:t('Preferential Time'),
                disabledDate,
              },
            }),
            createSchemaItem({
              Component: HInputNumber,
              name: ['content', 'prepaidTermFee'],
              label: t('Prepaid term fee', { en: 'Prepaid term fee', vn: 'Phí trả trước hạn' }),
              rules: [ {
                type: 'number',
                min: 0,
                message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
              }],
              componentProps: {
                placeholder: 'Phí trả trước hạn',
                formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                parser: value => value.replace(/(,*)/g, ''),
                style: { width: '100%' },
              },
            }),
            createSchemaItem({
              Component: HTextArea,
              name:  ['content', 'propertyValuation'],
              label:'Định giá tài sản sơ bộ' ,
              componentProps: {
                placeholder: 'Giá 2 tỷ/chưa có giá',
              },
            }),
            createSchemaItem({
              Component: HTextArea,
              name:  ['bankNote'],
              label:'Ghi chú' ,
            }),
          ],
        }}
      />
    </HModal>
  );
};
