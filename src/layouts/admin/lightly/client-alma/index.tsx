import { Layout } from 'antd';
import Sticky from 'react-sticky-el';
import ClientAlmaFooter from './footer';
import ClientAlmaHeader from './header';

import './lightly-client-alma.module.scss';

const { Content, Footer, Header } = Layout;

const LightlyClientAlmaLayout = ({ children }) => {
  return (
    <Layout className="alma-layout">
      <Sticky stickyStyle={{ zIndex: 10 }} scrollElement=".height100percent">
        <Header>
          <ClientAlmaHeader />
        </Header>
      </Sticky>
      <Content>
        {children}
      </Content>
      <Footer>
        <ClientAlmaFooter />
      </Footer>
    </Layout>
  );
};

export default LightlyClientAlmaLayout;
