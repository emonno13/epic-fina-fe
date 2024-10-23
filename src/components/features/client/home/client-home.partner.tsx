import { rgbDataURL } from '@components/shared/atom/rgb';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Web_Partner_1 = '/assets/images/Web-Partner-1.png';
const Web_Partner_2 = '/assets/images/Web-Partner-2.png';
const Web_Partner_3 = '/assets/images/Web-Partner-3.png';
const Mobile_Partner_1 = '/assets/images/Mobile-Partner-1.png';
const Mobile_Partner_2 = '/assets/images/Mobile-Partner-2.png';
const Mobile_Partner_3 = '/assets/images/Mobile-Partner-3.png';

const webImage = [Web_Partner_1, Web_Partner_2, Web_Partner_3];
const mobileImage = [Mobile_Partner_1, Mobile_Partner_2, Mobile_Partner_3];

const ClientHomePartner = () => {
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
    <div className="client-home-partners-wrapper">
      <div className="client-home-partners max-w-1100 m-auto">
        <h2 className="client-home-partners__title">
          {t('client_home_partner_title', { vn: 'ĐỐI TÁC CỦA FINA' })}
        </h2>
        <div className="client-home-partners__webimages">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={currentWebImage}
            width={550}
            height={149}
            alt="partner-web"
            layout="responsive"
          />
        </div>
        <div className="client-home-partners__mobileimages">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={currentMobileImage}
            width={356}
            height={403}
            alt="partner-mobile"
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientHomePartner;
