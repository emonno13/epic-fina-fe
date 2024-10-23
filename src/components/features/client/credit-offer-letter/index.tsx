import ClientHeaderMenuMobileButton from '@layouts/admin/lightly/client/header/header.menu-mobile-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { Col, Menu, Row } from 'antd';
import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import CreditOfferLetterBody from './credit-offer-letter-body';
import CreditOfferLetterFooterBottom from './credit-offer-letter-footer-bottom';
import CreditOfferLetterHeader from './credit-offer-letter-header';

import './credit-offer-letter.module.scss';

const MENUS = [
  {
    key: 'intro',
    name: 'Công ty Cổ phần Dịch vụ Tài chính Bất động sản Tulip',
  },
  { key: 'welcome', name: 'Lời chào' },
  { key: 'plan', name: 'Phương án và yêu cầu của quý khách' },
  { key: 'calculation', name: 'Bảng tính khả năng vay sơ bộ' },
  { key: 'policy-and-condition', name: 'Một số chính sách và điều kiện' },
  { key: 'compare-product', name: 'So sánh một số gói LS nổi bật' },
  { key: 'flow', name: 'Đề xuất và quy trình' },
  { key: 'next-step', name: 'Các bước tiếp theo' },
  { key: 'introduce-fina', name: 'Giới thiệu FINA' },
  { key: 'policy', name: 'Điều khoản và thi hành' },
];

const clamp = (value: number) => Math.max(0, value);
const isBetween = (value: number, top: number, bottom: number) =>
  value >= top && value <= bottom;

const CreditOfferLetter = () => {
  const elRef = useRef(null);
  const [activeKey, setActiveKey] = useState('intro');
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    document.body.classList.add('credit-offer-letter-page');
  }, []);

  const handleScroll = () => {
    const { scrollTop }: any = elRef.current;
    const height = screen.height;

    const position = MENUS.map((menu) => {
      const element = document.getElementById(menu?.key);

      if (!element) return { key: menu?.key, top: -1, bottom: -1 };

      const rect = element.getBoundingClientRect();
      const top = clamp(rect.top + scrollTop - height / 2);
      const bottom = clamp(rect.bottom + scrollTop - height / 2);

      return { key: menu?.key, top, bottom };
    }).find(({ top, bottom }) => isBetween(scrollTop, top, bottom));

    position?.key && setActiveKey(position?.key);
  };

  return (
    <Row
      className="credit-offer-letter-wrapper"
      ref={elRef}
      onScroll={handleScroll}
    >
      <Col
        className="credit-offer-letter-nav"
        xl={4}
        lg={4}
        md={5}
        sm={24}
        xs={24}
      >
        <div className="credit-offer-letter-nav__sticky">
          <div className="credit-offer-letter-nav__sticky__logo">
            <div className="client-logo__image">
              <img src="/assets/images/fina_logo.png" />
            </div>
            {isMobile && (
              <ClientHeaderMenuMobileButton
                {...{
                  visible,
                  onClick: onVisible,
                }}
              />
            )}
          </div>

          {!isMobile && <hr />}

          {(!isMobile || visible) && (
            <Menu
              mode={isMobile ? 'inline' : 'vertical'}
              defaultSelectedKeys={[activeKey]}
              className={cls('credit-offer-letter-nav__menu')}
              selectedKeys={[activeKey]}
            >
              {MENUS?.map((menu) => (
                <Menu.Item key={menu?.key}>
                  <a href={`#${menu?.key}`}>{menu?.name}</a>
                </Menu.Item>
              ))}
            </Menu>
          )}
        </div>
      </Col>
      <Col
        className="credit-offer-letter-main"
        xl={20}
        lg={20}
        md={19}
        sm={24}
        xs={24}
      >
        <div className="credit-off-letter">
          <CreditOfferLetterHeader />
          <div className="line-dashed"></div>
          <CreditOfferLetterBody />
          <CreditOfferLetterFooterBottom />
        </div>
      </Col>
    </Row>
  );
};

export default CreditOfferLetter;
