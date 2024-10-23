import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';

import './what-is-fina.module.scss';

const WhatIsFina = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="what-is-fina">
      <div className="max-w-1100 m-auto">
        <div className="what-is-fina__header">
          <h1>{t('What is FINA?', { vn: 'FINA là gì?' })}</h1>
        </div>
        <div className="what-is-fina__content">
          <p>
            {t('client_about_what_is_fina_content', {
              en: 'FINA is a technology platform that allows users to search, compare and choose exactly the right financial solutions for their needs including home loans, insurance packages or other products. investment products. We make it easy for users to connect with experts in the FINA network. They are professional financial advisors, helping to provide advice that best suits your financial needs.',
              vn: 'FINA là một nền tảng công nghệ cho phép người dùng có thể tìm kiếm, so sánh và lựa chọn chính xác các giải pháp tài chính phù hợp với nhu cầu của mình bao gồm các khoản vay mua nhà, các gói bảo hiểm hoặc các sản phẩm đầu tư. Chúng tôi giúp người dùng kết nối dễ dàng tới những chuyên gia trong mạng lưới của FINA. Họ là những cố vấn tài chính chuyên nghiệp, giúp đưa ra những tư vấn phù hợp nhất với nhu cầu tài chính của bạn.',
            })}
          </p>
          <Button className="what-is-fina__button">
            {t('join_fina', { en: 'Join FINA', vn: 'Gia nhập cùng FINA' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatIsFina;
