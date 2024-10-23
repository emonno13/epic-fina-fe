import { RightOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Collapse } from 'antd';
import ClientFaqHomeLoanDocument from './faq.home-loan-document';
import ClientFaqHomeLoanForm from './faq.home-loan-form';
import ClientFaqHomeLoanIncurredFee from './faq.home-loan-incurred-fee';
import ClientFaqHomeLoanProcess from './faq.home-loan-process';

const { Panel } = Collapse;

const ClientFaqContent = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-faq-content">
      <Collapse
        defaultActiveKey="1"
        expandIcon={({ isActive }) => (
          <RightOutlined
            rotate={isActive ? 90 : 0}
            style={{ color: '#FC7513', fontSize: 14 }}
          />
        )}
        className="client-faq-content-collapse"
      >
        <Panel
          {...{
            key: '1',
            className: 'client-faq-content-panel',
            header: t('client_faq_1_header', {
              vn: 'A. Về Sản phẩm Vay',
              en: 'A. About Loan Products',
            }),
          }}
        >
          <Collapse
            className="client-faq-content-collapse"
            expandIcon={({ isActive }) => (
              <RightOutlined
                rotate={isActive ? 90 : 0}
                style={{ color: '#FC7513', fontSize: 14 }}
              />
            )}
          >
            <Panel
              {...{
                key: '1.1',
                className: 'client-faq-content-panel',
                header: t('client_faq_1.1_header', {
                  en: '1. What are the forms of home loan?',
                  vn: '1. Vay mua nhà có những hình thức nào?',
                }),
              }}
            >
              <ClientFaqHomeLoanForm />
            </Panel>
            <Panel
              {...{
                key: '1.2',
                className: 'client-faq-content-panel',
                header: t('client_faq_1.2_header', {
                  en: '2. What is the current home loan process?',
                  vn: '2. Quy trình vay mua nhà hiện nay như thế nào?',
                }),
              }}
            >
              <ClientFaqHomeLoanProcess />
            </Panel>
            <Panel
              {...{
                key: '1.3',
                className: 'client-faq-content-panel',
                header: t('client_faq_1.3_header', {
                  en: '3. What documents are required for a home loan?',
                  vn: '3. Vay mua nhà có cần những giấy tờ gì?',
                }),
              }}
            >
              <ClientFaqHomeLoanDocument />
            </Panel>
            <Panel
              {...{
                key: '1.4',
                className: 'client-faq-content-panel',
                header: t('client_faq_1.4_header', {
                  en: '4. What are the fees that may be incurred when applying for a home loan?',
                  vn: '4. Những khoản phí có thể phát sinh khi vay mua nhà là gì?',
                }),
              }}
            >
              <ClientFaqHomeLoanIncurredFee />
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ClientFaqContent;
