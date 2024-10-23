import { TASK_PRODUCT_TYPES } from '@components/features/crm/tasks/utils';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { ROOT_TASK, TASK_TYPES } from 'constants/crm/task';
import { ArrowDownSmallIcon } from 'icons';
import { useState } from 'react';

import './receive-information.module.scss';

export const FinancialAdviceReceiveInformation = () => {
  return (
    <div id="register" className="financial-advice-receive-information">
      <div className="financial-advice-container">
        <Row gutter={{ xs: 24, md: 54 }}>
          <Col
            className="financial-advice-receive-information__left"
            {...{ xs: 24, md: 9 }}
          >
            <FinancialAdviceIntroduceReceiveInformation />
          </Col>
          <Col {...{ xs: 24, md: 15 }}>
            <FinancialAdviceFormReceiveInformation />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FinancialAdviceReceiveInformation;

const FinancialAdviceFormReceiveInformation = () => {
  const [form] = Form.useForm();

  return (
    <div className="financial-advice-form-receive-information">
      <div className="financial-advice-form-receive-information__header">
        <h3>
          tư vấn <span>30 phút</span>
        </h3>
        <span>Miễn phí tư vấn tài chính bất động sản cho khách hàng FINA</span>
      </div>

      <div className="financial-advice-form-receive-information__form-detail">
        <HForm
          {...{
            form,
            schema: FinancialAdviceFormReceiveInformationDetailSchema,
            hideControlButton: true,
            endpoint: endpoints.endpointWithApiDomain('/tasks/public'),
            method: 'post',
            onDataReadyToSubmit: (values) => {
              const notes: string[] = [];
              // if (values?.note) notes.push(values.note);
              if (values?.inCome)
                notes.push(
                  `Tổng thu nhập thực lãnh hàng tháng của gia đình: ${values.inCome}`,
                );
              if (values?.productType)
                notes.push(
                  `Loại hình Bất động sản bạn đang quan tâm: ${values.productType === 'other' ? values?.note : values.productType}`,
                );

              return {
                ...values,
                inCome: undefined,
                note: notes?.join(', '),
                page: location.href,
                rootTask: ROOT_TASK.LANDING_PAGE,
                productType: TASK_PRODUCT_TYPES?.loan,
                type: TASK_TYPES?.COUNSELLING,
              };
            },
            onGotSuccess: () =>
              notification.success({
                message: 'Đã tạo yêu cầu vấn thành công',
              }),
          }}
        />
        <Button
          onClick={() => form?.submit()}
          className="financial-advice-form-receive-information__form-detail__submit"
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
};

export const FinancialAdviceIntroduceReceiveInformation = () => {
  return (
    <div className="financial-advice-introduce-receive-information">
      <p className="financial-advice-introduce-receive-information__hot">
        <strong>ĐẶC BIỆT</strong>
        <p>Miễn phí tư vấn Tài chính Bất động sản cho khách hàng FINA</p>
        <strong>
          Dành cho 100 khách <br /> hàng đăng ký sớm nhất <br /> trong tháng
        </strong>
      </p>
      <p className="financial-advice-introduce-receive-information__description">
        Chúng tôi sẽ liên lạc trực tiếp để trao đổi và xác nhận thông tin trước
        khi tiến hành dịch vụ 30 phút tư vấn về tình hình tài chính của cá
        nhân/gia đình bạn.
        <br />
        <br />
        Bạn vui lòng hoàn tất điền thông tin sau đây. Chúng tôi sẽ liên hệ trong
        thời gian sớm nhất.
      </p>
    </div>
  );
};

const FinancialAdviceFormReceiveInformationDetailSchema = () => {
  const { t } = useHTranslation('common');
  const [productType, setProductType] = useState('');

  return [
    createSchemaItem({
      Component: Input,
      name: 'customerName',
      rules: [{ required: true, message: 'Tên là bắt buộc' }],
      label: 'Họ và tên',
      componentProps: {
        placeholder: 'Nhập họ và tên',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'phone',
      rules: [
        { required: true, message: 'Số điện thoại là bắt buộc' },
        {
          pattern: /^0[0-9]{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      label: 'Số điện thoại',
      componentProps: {
        normalize: (value, prevVal, prevVals) => value.trim(),
        placeholder: 'Nhập số điện thoại',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'email',
      rules: [{ required: true, message: 'Email là bắt buộc' }],
      label: 'Email',
      componentProps: {
        placeholder: 'Nhập email',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'inCome',
      label: 'Tổng thu nhập thực lãnh hàng tháng của gia đình',
      rules: [
        {
          required: true,
          message:
            'Tổng thu nhập thực lãnh hàng tháng của gia đình là bắt buộc',
        },
      ],
      initialValue: 'Dưới 50 triệu VND',
      componentProps: {
        getPopupContainer: (trigger) => trigger.parentNode,
        suffixIcon: <ArrowDownSmallIcon />,
        options: [
          { value: 'Dưới 50 triệu VND', label: 'Dưới 50 triệu VND' },
          { value: '50 - 100 triệu VND', label: '50 - 100 triệu VND' },
          { value: '100 - 150 triệu VND', label: '100 - 150 triệu VND' },
          { value: 'Trên 150 triệu VND', label: 'Trên 150 triệu VND' },
        ],
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'productType',
      label: 'Loại hình Bất động sản bạn đang quan tâm',
      rules: [
        {
          required: true,
          message: 'Loại hình Bất động sản bạn đang quan tâm là bắt buộc',
        },
      ],
      initialValue: 'Đất nền dân sinh',
      componentProps: {
        getPopupContainer: (trigger) => trigger.parentNode,
        onChange: (value) => setProductType(value),
        suffixIcon: <ArrowDownSmallIcon />,
        options: [
          { value: 'Đất nền dân sinh', label: 'Đất nền dân sinh' },
          { value: 'Nhà cấp 4', label: 'Nhà cấp 4' },
          { value: 'Căn hộ', label: 'Căn hộ' },
          { value: 'Đất dự án', label: 'Đất dự án' },
          { value: 'Nhà phố', label: 'Nhà phố' },
          { value: 'other', label: 'Khác' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'note',
      label: 'Khác',
      rendering: productType === 'other',
      rules: [{ required: true, message: 'Xin vui lòng nhập thông tin' }],
      componentProps: {
        placeholder: 'Nhập thông tin',
      },
    }),
  ];
};
