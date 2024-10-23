import { Affix, Layout } from 'antd';
import { useEffect, useState } from 'react';
import FinancialAdviceFooter from './footer';
import FinancialAdviceHeader from './header';

import './financial-advice.module.scss';

const { Content, Footer, Header } = Layout;
const HEIGHT_HEADER = 72;

const FinancialAdviceLayout = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    document.body.classList.add('financial-advice-page');
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout className="alma-layout financial-advice">
      <Affix offsetTop={0.0001}>
        <Header className={`${scrollPosition > HEIGHT_HEADER ? 'header-scroll' : '' }`}>
          <FinancialAdviceHeader />
        </Header>
      </Affix>
      <Content>
        {children}
      </Content>
      <Footer>
        <FinancialAdviceFooter />
      </Footer>
    </Layout>
  );
};

export default FinancialAdviceLayout;
