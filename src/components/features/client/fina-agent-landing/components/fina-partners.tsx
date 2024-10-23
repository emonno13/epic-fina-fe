import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import TextWithUnderline from './text-with-underline';

import '../css/fina-partner.module.scss';

const Web_Partner_1 = '/assets/images/web-partner-agent-1.png';
const Web_Partner_2 = '/assets/images/web-partner-agent-2.png';
const Web_Partner_3 = '/assets/images/web-partner-agent-3.png';

const Mobile_Partner_1 = '/assets/images/mobile-partner-agent-1.png';
const Mobile_Partner_2 = '/assets/images/mobile-partner-agent-2.png';
const Mobile_Partner_3 = '/assets/images/mobile-partner-agent-3.png';

const FinaPartner = () => {
  const { t } = useHTranslation('admin-common');
  const isMobile = useIsMobile();

  return (
    <div className="fina-partner-wrapper">
      <div className="fina-partner max-w-1100 m-auto">
        <TextWithUnderline
          title={t('fina-partner-title', { vn: 'ĐỐI TÁC CỦA FINA AGENT' })}
          isCenter={!isMobile}
        />
        <div className="fina-partner__webimages">
          <div className="fina-partner__title">Ngân Hàng</div>
          <img src={Web_Partner_1} alt="" />
        </div>
        <div className="fina-partner__webimages">
          <div className="fina-partner__title">Bảo Hiểm</div>
          <img src={Web_Partner_2} alt="" />
        </div>
        <div className="fina-partner__webimages">
          <div className="fina-partner__title">Đối Tác Đầu Tư</div>
          <img src={Web_Partner_3} alt="" />
        </div>

        <div className="fina-partner__mobileimages">
          <div className="fina-partner__title">Ngân Hàng</div>
          <img src={Mobile_Partner_1} alt="" />
        </div>
        <div className="fina-partner__mobileimages">
          <div className="fina-partner__title">Bảo Hiểm</div>
          <img src={Mobile_Partner_2} alt="" />
        </div>
        <div className="fina-partner__mobileimages">
          <div className="fina-partner__title">Đối Tác Đầu Tư</div>
          <img src={Mobile_Partner_3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FinaPartner;
