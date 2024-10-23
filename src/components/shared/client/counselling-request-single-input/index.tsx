import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Input, Modal } from 'antd';
import { CounsellingRequestSendIcon } from 'icons';
import { useState } from 'react';

import './counselling-request-single-input.module.scss';

const CounsellingRequestSingleInput = ({ className = '' }) => {
  const [value, setValue] = useState<string>('');
  const { t } = useHTranslation('common');
  const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneFormat = /^0[0-9]{9}$/gm;

  const onSubmit = async () => {
    const customerInfo: any = {};

    if (!emailFormat.test(value) && !phoneFormat.test(value)) {
      Modal.error({
        title: t('counselling_request_single_input_error_title', {
          vn: 'Có lỗi xảy ra',
          en: 'Error',
        }),
        content: t('counselling_request_single_input_error_content', {
          vn: 'Sai định dạng email và số điện thoại',
          en: 'Wrong email and phone number format',
        }),
      });
      return;
    }
    if (emailFormat.test(value)) {
      customerInfo.email = value;
    }
    if (phoneFormat.test(value)) {
      customerInfo.tel = value;
    }
    await FormUtils.submitForm(
      {
        productId: '',
        categoryId: '',
        type: TASK_TYPE.counselling,
        customerInfo,
      },
      {
        nodeName: 'tasks/public/insurance',
        method: 'post',
        onGotSuccess: () => {
          setValue('');
          Modal.success({
            title: t('counselling_request_single_input_success_title', {
              en: 'Success',
              vn: 'Thành công',
            }),
            content: t('counselling_request_single_input_success_content', {
              en: 'Submit your information successfully, we will contact you as soon as possible!',
              vn: 'Gửi thông tin thành công, chúng tôi sẽ liên hệ lại với bạn sớm nhất!',
            }),
          });
        },
        showSuccessMessage: false,
      },
    );
  };
  const onChange = (e) => {
    setValue(e.target?.value);
  };

  return (
    <div className="counselling-request-single-input">
      <Input
        {...{
          className,
          suffix: <CounsellingRequestSendIcon onClick={onSubmit} />,
          placeholder: t('counselling_request_single_input', {
            vn: 'Nhập số điện thoại hoặc email',
            en: 'Enter phone number or email',
          }),
          value,
          onChange,
        }}
      />
    </div>
  );
};

export default CounsellingRequestSingleInput;
