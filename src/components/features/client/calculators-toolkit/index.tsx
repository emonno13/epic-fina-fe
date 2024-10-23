import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HInput } from '@components/shared/common-form-elements/h-input';
import HContainer from '@components/shared/common/h-container';
import { HModal } from '@components/shared/common/h-modal';
import {
  InputEmailSchemaItem,
  InputFullNameSchemaItem,
  InputPhoneNumberSchemaItem,
} from '@components/shared/input-with-rule';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Checkbox, Col, Collapse, Form, Modal, Row } from 'antd';
import { ArrowRightCircleRightSvg } from 'icons';
import { useState } from 'react';
import Calculator from './calculator';

import './styles.module.scss';

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

const LIST_CALCULATOR = [
  { label: 'Công cụ tính khoản vay', value: 'loan-calculator' },
  { label: 'Tính toán khả năng vay', value: 'calculating-loan-capacity' },
  { label: 'Thiết lập kế hoạch ngân sách', value: 'budget-planner' },
  { label: 'Tính thuế theo lương', value: 'calculating-tax-by-salary' },
];

const ClientCalculatorsToolkit = () => {
  const { t } = useHTranslation('calculator-toolkit');
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  const FAQ_LIST = [
    {
      header: t('Máy tính di động và máy tính bảng có đáp ứng không?'),
      contents: [
        'Đúng. Tất cả các máy tính đều được tối ưu hóa cho thiết bị di động và máy tính để bàn.',
      ],
    },
    {
      header: t(
        'Tôi có phải cài đặt tất cả công cụ máy tính trên trang web của mình không?',
      ),
      contents: [
        t(
          'Đúng. Tất cả các máy tính đều được tối ưu hóa cho thiết bị di động và máy tính để bàn.',
        ),
      ],
    },
    {
      header: t(
        'Tôi không phải là Thành viên FINA. Tôi có thể truy cập vào máy tính không?',
      ),
      contents: [
        t(
          'Đúng. Tất cả các máy tính đều được tối ưu hóa cho thiết bị di động và máy tính để bàn.',
        ),
      ],
    },
    {
      header: t(
        'Điều khoản và Điều kiện của Máy tính Tài chính và Khoản vay FINA',
      ),
      contents: [
        t(
          'Đúng. Tất cả các máy tính đều được tối ưu hóa cho thiết bị di động và máy tính để bàn.',
        ),
      ],
    },
  ];

  return (
    <div className="calculators-toolkit">
      <div className="calculators-toolkit-banner">
        <HContainer>
          <div className="max-w-1200 m-auto">
            <h1 className="calculators-toolkit-title">
              Công cụ tính cho chính bạn
            </h1>
            <p className="calculators-toolkit-description">
              FINA cung cấp những công cụ tính tài chính giúp bạn dễ dàng tính
              được khả năng vay cũng như nhu cầu vay vốn của bạn.
            </p>
          </div>
        </HContainer>
      </div>

      <HContainer>
        <div className="max-w-1200 calculators-toolkit-content m-auto">
          <div className="calculators-toolkit-content-introduce">
            <h1 className="calculators-toolkit-content-introduce-header">
              Tăng lưu lượng truy cập vào trang web của bạn
            </h1>

            <Row gutter={[24, 32]}>
              <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                <p>
                  Bộ công cụ tính nhằm giúp người dùng có thể dễ dàng tính toán
                  lãi suất và chi phí phải trả khi vay vốn, giúp khách hàng có
                  thể dễ dàng tìm kiếm, so sánh và lựa chọn chính xác các giải
                  pháp tài chính phù hợp với nhu cầu của mình.
                </p>

                <h3 className="introduce-title">
                  Các tính năng chính bao gồm:{' '}
                </h3>

                <ul>
                  <li>Đa dạng công cụ với độ chính xác 100%.</li>
                  <li>Hoạch định kế hoạch tài chính cụ thể, rõ ràng.</li>
                  <li>Dễ dàng sử dụng và cài đặt trên web của bạn.</li>
                </ul>
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                <img
                  src="/assets/images/calculators-toolkit-introduce-bg.png"
                  alt="calculators-toolkit-introduce-bg"
                  className="introduce-bg"
                />
              </Col>
            </Row>
          </div>

          <h1 className="calculators-toolkit-content-title">
            Chúng tôi hiện tại đang cung cấp {LIST_CALCULATOR?.length} công cụ
            tính tài chính:
          </h1>

          <Row gutter={[24, 32]}>
            {LIST_CALCULATOR?.map((calculator) => (
              <Calculator key={calculator?.value} calculator={calculator} />
            ))}
          </Row>

          <div className="calculators-toolkit-content-introduce calculators-toolkit-content-value">
            <h1 className="calculators-toolkit-content-introduce-header">
              Thông tin nhận source
            </h1>
            <Row gutter={[24, 32]}>
              <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                <img
                  src="/assets/images/calc-money-tree.png"
                  alt="calc-money-tree"
                  className="calc-money-tree"
                />
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                <h3 className="introduce-title">
                  Mua gói đăng ký với giá siêu ưu đãi*:
                </h3>

                <ul>
                  <li>Miễn phí trọn đời*</li>
                </ul>
                <p className="introduce-description">
                  *Chương trình dành cho đối tác đã đăng ký tài khoản FINA.
                </p>

                <HButton
                  type="primary"
                  size="large"
                  className="buy-calc-toolkit"
                  onClick={() => setIsVisible(true)}
                >
                  Nhận bộ công cụ tính ngay <ArrowRightCircleRightSvg />
                </HButton>
              </Col>
            </Row>
          </div>

          <div className="calculators-toolkit-content-introduce calculators-toolkit-content-value">
            <h1 className="calculators-toolkit-content-introduce-header">
              FAQ
            </h1>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) =>
                isActive ? <MinusOutlined /> : <PlusOutlined />
              }
              expandIconPosition={'right'}
              className="calculators-toolkit-content-introduce-faq"
            >
              {FAQ_LIST?.map((faq, index) => (
                <Panel header={faq?.header} key={index + 1}>
                  <ul>
                    {faq?.contents.map((content, i) => (
                      <li key={i}>{content}</li>
                    ))}
                  </ul>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </HContainer>

      <HModal
        {...{
          title: t('Contact infomation', { vn: 'Thông tin liên hệ' }),
          visible: isVisible,
          onCancel: () => setIsVisible(false),
          footer: null,
          width: 600,
          className: 'form-contact-information-calc',
        }}
      >
        <h2 className="form-contact-information-calc-title">
          Để lại thông tin của bạn, chúng tôi sẽ gửi bộ công tụ tính cho bạn.
        </h2>
        <div className="get-iframe-calcu-tool">
          <HForm
            {...{
              form,
              schema: ContactInforFormSchema,
              onDataReadyToSubmit: (value) => {
                const dataSubmit = {
                  ...value,
                  phone: value?.tels[0].tel,
                  calculators: LIST_CALCULATOR.filter(({ value: id }) =>
                    value?.calculators?.some((item) => id === item),
                  ),
                };
                delete value.tels;
                delete dataSubmit.tels;

                return dataSubmit;
              },
              nodeName: '/calculator/send-iframe-calculator',
              method: 'post',
              showSuccessMessage: false,
              submitButtonLabel: t('Submit', { vn: 'Gửi' }),
              onGotSuccess: (res) => {
                setIsVisible(false);
                form.resetFields();
                Modal.success({
                  title: t('Sent email successfully !', {
                    vn: 'Gửi mail thành công !',
                  }),
                  content: t(
                    'FINA will quickly check and send the results to your email. Thank you for accompanying FINA.',
                    {
                      vn: 'FINA sẽ nhanh chóng kiểm tra và gửi kết quả đến email của bạn. Cảm ơn quý khách đã đồng hành cùng FINA.',
                    },
                  ),
                  centered: true,
                });
              },
            }}
          />
        </div>
      </HModal>
    </div>
  );
};

export default ClientCalculatorsToolkit;

const ContactInforFormSchema = () => {
  const { t } = useHTranslation('calculator-toolkit');

  return [
    createSchemaItem({
      Component: HInput,
      label: t('Organization', { vn: 'Tổ chức' }),
      colProps: { span: 24 },
      name: 'organizationName',
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the Organization name', {
          vn: 'Nhập tên tổ chức',
        }),
      },
    }),
    InputFullNameSchemaItem(),
    InputPhoneNumberSchemaItem(),
    InputEmailSchemaItem(),
    createSchemaItem({
      Component: GroupCheckBoxComponent,
      name: 'calculators',
      rules: [
        {
          required: true,
          message: t('Please select the calculation toolkit', {
            vn: 'Xin vui lòng chọn bộ công cụ tính',
          }),
        },
      ],
      label: 'Chọn bộ công cụ tính',
      className: 'group-checkbox-calc',
    }),
  ];
};

const GroupCheckBoxComponent = (props) => {
  const defaultCheckedList = [];
  const { value = defaultCheckedList, onChange } = props;
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChangeData = (list: any) => {
    onChange(list);
    setIndeterminate(!!list.length && list.length < LIST_CALCULATOR.length);
    setCheckAll(list.length === LIST_CALCULATOR.length);
  };

  const onCheckAllChange = (e) => {
    onChange(e.target.checked ? [...fetchData()] : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const fetchData = () => {
    return LIST_CALCULATOR.map(
      (plainOptionEleemnt) => plainOptionEleemnt.value,
    );
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Chọn tất cả
      </Checkbox>
      <CheckboxGroup
        options={LIST_CALCULATOR}
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};
