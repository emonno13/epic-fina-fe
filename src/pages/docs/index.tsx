import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import Link from 'antd/lib/typography/Link';
import { LightlyClientLayoutForDocPage } from '../../layouts/admin/lightly/client';
import { FormUtils } from '../../schema-form/utils/form-utils';
import { endpoints } from '../../lib/networks/endpoints';

const Index = () => {
  const [domainTest, setDomainTest] = useState('https://crm-beta.fina.com.vn/');
  useEffect(() => {
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/configurations/public/DOMAIN_TEST'),
      onGotSuccess: response => setDomainTest(response?.value || 'https://crm-beta.fina.com.vn/'),
    });
  }, []);

  return (
    <div className="client-documentation-detail">
      <div  className="client-documentation-detail__header" >
				Overview
      </div>
      <div>
        <div className="client-documentation-detail__title">Giới thiệu về FINA</div>
        <div>FINA là một nền tảng công nghệ cho phép người dùng có thể tìm kiếm, so sánh và lựa chọn chính xác các giải pháp tài chính phù hợp với nhu cầu của mình bao gồm các khoản vay mua nhà, các gói bảo hiểm hoặc các sản phẩm đầu tư. Chúng tôi giúp người dùng kết nối dễ dàng tới những chuyên gia trong mạng lưới của FINA. Họ là những cố vấn tài chính chuyên nghiệp, giúp đưa ra những tư vấn phù hợp nhất với nhu cầu tài chính của bạn.</div>
      </div>
      <br/>
      <div>
        <h2 className="client-documentation-detail__title">Thông tin tích hợp</h2>
        <p className="client-documentation-detail__content">FINA cung cấp cho đối tác hai môi trường để tích hợp với FINA API:</p>
        <ul className="client-documentation-detail__content">
          <li>Môi trường Staging: <Link href ={`${domainTest}`}>{domainTest}</Link></li>
          <li >Môi trường Production: <Link href = "https://fina.com.vn">https://fina.com.vn</Link></li>
        </ul>
      </div>
    </div>
  );
};

Index.Layout = LightlyClientLayoutForDocPage;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
    },
  };
};

export default Index;

