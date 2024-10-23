import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import {
  FacebookWhiteIconSvg,
  HeaderShapeMedium,
  InstagramIconSvg,
  PhoneInfomationIconSvg,
  PinFillIconSvg,
  SubtractEmailIconSvg,
  YoutubeWhiteIconSvg,
  ZaloWhiteIconSvg,
} from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Col, Form, Row } from 'antd';
import { ButtonSubmitForm, FormRegisterSchema } from '../rate-infomation';

import './reta-information.module.scss';

const URL_SOCIAL_NETWORK = [
  {
    icon: <FacebookWhiteIconSvg />,
    url: 'https://www.facebook.com/finavietnam',
  },
  {
    icon: <ZaloWhiteIconSvg />,
    url: 'https://zalo.me/937476885441449805',
  },
  {
    icon: <YoutubeWhiteIconSvg />,
    url: 'https://www.youtube.com/channel/UCdetskOW9FS3oZwBvEfKHyg',
  },
  {
    icon: <InstagramIconSvg />,
    url: 'https://www.instagram.com/finataichinh/',
  },
];

const RegisterFooter = () => {
  const [form] = Form.useForm();
  const { t } = useHTranslation('common');
  const submitForm = () => {
    form.submit();
  };

  return (
    <div id="register" className="loans-introduce-container">
      <HScrollAnimation>
        <div className="content-register-footer">
          <Row gutter={[16, 16]}>
            <Col {...{ xs: 24, sm: 24, lg: 12, xl: 12 }}>
              <div className="form-register-footer">
                <h1 className="title-form-register-footer">Đăng Ký Ngay</h1>
                <p className="decription-form-register-footer">
                  Hãy để lại thông tin của bạn, nhân viên FINA sẽ liên hệ một
                  cách sớm nhất!
                </p>
                <div className="form-regsiter">
                  <FormRegisterSchema {...{ form }} />
                  <ButtonSubmitForm {...{ onClick: submitForm }}>
                    {t('Complete', { vn: 'Hoàn thành' })}
                  </ButtonSubmitForm>
                </div>
              </div>
            </Col>
            <Col {...{ xs: 24, sm: 24, lg: 12, xl: 12 }}>
              <div className="information-socal-network">
                <ItemTitleComponent
                  {...{
                    icon: <HeaderShapeMedium />,
                    title: t('Contact Info', { vn: 'Thông tin liên hệ' }),
                  }}
                />
                <div className="decription-contact">
                  <ItemViewInformation
                    {...{
                      icon: <SubtractEmailIconSvg />,
                      title: 'Email',
                      content: 'support@fina.com.vn',
                    }}
                  />
                  <ItemViewInformation
                    {...{
                      icon: <PhoneInfomationIconSvg />,
                      title: 'Số điện thoại',
                      content: '08 5749 8668',
                    }}
                  />
                  <ItemViewInformation
                    {...{
                      icon: <PinFillIconSvg />,
                      title: 'Địa chỉ',
                      content:
                        'L17-11, Tầng 17, Toà nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM',
                    }}
                  />
                </div>
                <ItemTitleComponent
                  {...{
                    icon: <HeaderShapeMedium />,
                    title: 'Social media',
                  }}
                />
                <div className="footer-social-network">
                  {URL_SOCIAL_NETWORK?.map((social) => (
                    <a
                      href={social?.url}
                      target="_blank"
                      rel="noreferrer"
                      key={social?.url}
                    >
                      {social?.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default RegisterFooter;

const ItemViewInformation = (props) => {
  const { icon, title, content, classNames } = props;
  return (
    <div className={`item-view-infomation ${classNames}`}>
      <div className="content-icon">{icon || ''}</div>
      <div className="decription-infomation">
        <h1 className="title-item-infomation">{title || ''}</h1>
        <div className="detail-infomation">{content || ''} </div>
      </div>
    </div>
  );
};

const ItemTitleComponent = (props) => {
  const { icon, title } = props;
  return (
    <div className="title-infomation">
      <div className="title-infomation-icon">{icon} </div>
      <h1 className="title">{title} </h1>
    </div>
  );
};
