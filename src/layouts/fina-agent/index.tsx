import { Affix, Layout } from 'antd';
import ClientFinaAgentHeader from './header';
import ClientFinaAgentFooter from './footer';

import './fina-agent.module.scss';

const { Content, Footer, Header } = Layout;

const FinaAgentLayout = ({ children }) => {
  return (
    <Layout className="alma-layout">
      <Affix offsetTop={0.0001}>
        <Header>
          <ClientFinaAgentHeader />
        </Header>
      </Affix>
      <Content>
        {children}
      </Content>
      <Footer>
        <ClientFinaAgentFooter />
      </Footer>
    </Layout>
  );
};

export default FinaAgentLayout;
