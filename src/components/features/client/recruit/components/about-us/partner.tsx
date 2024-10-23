import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useEffect, useState } from 'react';
import ContentConnection from './content-connection';

import './content-connecttion.module.scss';

const Sustainable_Development = '/assets/images/recruit-fina-1.png';
const Humans = '/assets/images/recruit-fina-2.png';

const Web_Partner_1 = '/assets/images/Web-Partner-1.png';
const Web_Partner_2 = '/assets/images/Web-Partner-2.png';
const Web_Partner_3 = '/assets/images/Web-Partner-3.png';
const Mobile_Partner_1 = '/assets/images/Mobile-Partner-1.png';
const Mobile_Partner_2 = '/assets/images/Mobile-Partner-2.png';
const Mobile_Partner_3 = '/assets/images/Mobile-Partner-3.png';

const webImage = [Web_Partner_1, Web_Partner_2, Web_Partner_3];
const mobileImage = [Mobile_Partner_1, Mobile_Partner_2, Mobile_Partner_3];

const FinaPartner = () => {
  const { t } = useHTranslation('admin-common');
  const [currentWebImage, setCurrentWebImage] = useState<any>(webImage[0]);
  const [currentMobileImage, setCurrentMobileImage] = useState<any>(
    mobileImage[0],
  );
  const [current, setCurrent] = useState<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current < 2 ? current + 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCurrentWebImage(webImage[current]);
    }
    if (isMobile) {
      setCurrentMobileImage(mobileImage[current]);
    }
  }, [current]);

  return (
    <>
      <ContentConnection
        title={t('fina_partner_title', { vn: 'ĐỐI TÁC', en: 'Fina Partner' })}
        content={
          <>
            <div className="content-connection__webimages">
              <img src={currentWebImage} alt="" />
            </div>
            <div className="content-connection__mobileimages">
              <img src={currentMobileImage} alt="" />
            </div>
          </>
        }
      />

      <ContentConnection
        title={t('fina_partner_title', {
          en: 'Value connection - sustainable development',
          vn: 'Kết nối giá trị - phát triển bền vững',
        })}
        des={t('fina_partner_des', {
          en: 'With more than 40 domestic and foreign partners, FINA allows users to search and compare home loan packages with attractive interest rates & benefits, helping customers feel secure to choose the optimal financial solution suitable for their needs. need.',
          vn: 'Với hơn 40 đối tác trong và ngoài nước, FINA cho phép người dùng tìm kiếm, so sánh các gói vay mua nhà với lãi suất & quyền lợi hấp dẫn, giúp khách hàng an tâm lựa chọn giải pháp tài chính tối ưu phù hợp với nhu cầu. ',
        })}
        maxWidth={'625px'}
        content={
          <img
            src={Sustainable_Development}
            alt=""
            className="sustainable-development"
          />
        }
      />

      <ContentConnection
        title={t('fina_partner_des', {
          en: 'Humans FINA',
          vn: 'Con người FINA',
        })}
        des={t('fina_partner_des', {
          en: 'At FINA, we always support our employees in realizing their full potential and create the conditions for them to reach their full potential. Each individual has their own background and career development path. We encourage you to experience the spirit of FINA in your own way. ',
          vn: 'Tại FINA, chúng tôi luôn hỗ trợ nhân viên trong việc nắm bắt toàn bộ tiềm năng của họ và tạo mọi điều kiện để có thể phát huy hết tiềm năng đó. Mỗi cá nhân đều có nền tảng và lộ trình phát triển nghề nghiệp cho riêng mình. Chúng tôi khuyến khích bạn cảm nhận tinh thần FINA theo cách riêng của bạn.',
        })}
        maxWidth={'805px'}
        content={
          <>
            <img src={Humans} alt="" className={'sustainable-development'} />
          </>
        }
      />
    </>
  );
};

export default FinaPartner;
