import { Button, Form } from 'antd';
import moment from 'moment';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';

import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HTextArea } from '../../../../shared/common-form-elements/h-input';
import { HForm } from '../../../../../schema-form/h-form';
import { HModal } from '../../../../shared/common/h-modal';

import { TASK_RESPONSE_STATUS } from '../../../../../constants/crm/task';
import { useCurrentUser } from '../../../../../lib/providers/auth';

export const RejectTaskViewTellerModal = (props) => {
  const { t } = useHTranslation('admin-common');
  const { isVisibleReject = false, setIsVisibleReject , taskId, searchForm } = props;
  const [form] = Form.useForm();
  const currentUser = useCurrentUser();

  const handleReject = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsVisibleReject(false);
  };

  return (
    <HModal{...{
      title: t('Bạn có chắc muốn từ chối yêu cầu tư vấn'),
      visible: isVisibleReject,
      onCancel: () => {
        setIsVisibleReject(false);
      },
      centered: true,
      width: '700px',
      onOk: () => {
        setIsVisibleReject(false);
        handleCancel();
      },
      footer: (
        <div>
          <Button {...{
            onClick: () => {handleReject();},
            type: 'primary',
            danger: true,
          }}>
            Từ chối
          </Button>
          <Button {...{
            type: 'primary',
            onClick: () => {handleCancel();},
          }}>
            Thoát
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
              responseStatus:  TASK_RESPONSE_STATUS?.REJECT,
              responseDate: moment().toISOString(),
            };
          },
          onGotSuccess: () => {
            setIsVisibleReject(false);
            searchForm.submit();
          },
          schema: () => 	[
            createSchemaItem({
              Component: HTextArea,
              name:  ['bankNote'],
              rules: [{
                required: true,
                message: 'Ghi chú là bắt buộc',
              }],
              rowProps: { gutter: { xs: 24, md: 24 } },
              label:'Ghi chú' ,
            }),
          ],
        }}
      />
    </HModal>
  );
};
