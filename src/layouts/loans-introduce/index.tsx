import { Affix, Layout } from 'antd';
import { useEffect, useState } from 'react';
import LoansIntroduceFooter from './footer';
import LoansIntroduceHeader from './header';

import './loans-introduce.module.scss';

const { Content, Footer, Header } = Layout;
const HEIGHT_HEADER = 72;

const LoansIntroduceLayout = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    document.body.classList.add('loans-introduce-page');
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
    <Layout className="alma-layout loans-introduce">
      <Affix offsetTop={0.0001}>
        <Header className={`${scrollPosition > HEIGHT_HEADER ? 'header-scroll' : '' }`}>
          <LoansIntroduceHeader />
        </Header>
      </Affix>
      <Content>
        {children}
      </Content>
      <Footer>
        <LoansIntroduceFooter />
      </Footer>
    </Layout>
  );
};

export default LoansIntroduceLayout;
