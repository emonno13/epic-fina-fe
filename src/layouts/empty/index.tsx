import { Layout } from 'antd';

import './index.module.scss';

const { Content } = Layout;

const EmptyLayout = ({ children }) => {
  return (
    <Layout className="empty-container">
      <Content>{children}</Content>
    </Layout>
  );
};

export default EmptyLayout;
