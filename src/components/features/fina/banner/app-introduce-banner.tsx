import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { useCallback, useMemo } from 'react';

const AppIntroduceBanner = ({ setBanner }) => {
  const { t } = useHTranslation('common');

  const urlLink = useMemo(
    () => `${location.origin}/huong-dan-cai-dat`,
    [location],
  );

  const onLinkClick = useCallback(() => {
    setBanner(false);
  }, [setBanner]);

  return (
    <a
      className="app-introduce-popup"
      href={urlLink}
      onClick={onLinkClick}
      target="_blank"
      rel="noreferrer"
    >
      <h2>
        {t('FINA - Together with you to build a home', {
          vn: 'FINA - Cùng bạn tạo dựng mái ấm',
        })}
      </h2>
      <p>
        {t(
          'FINA provides the optimal solution to help customers own homes quickly, access and compare home loan packages with attractive interest rates, registration support, and complete paperwork for free.',
          {
            vn: 'FINA cung cấp giải pháp tối ưu giúp khách hàng sở hữu nhà nhanh chóng, tiếp cận và so sánh các gói vay mua nhà với lãi suất hấp dẫn, hỗ trợ đăng ký, hoàn thiện thủ tục giấy tờ hoàn toàn miễn phí.',
          },
        )}
      </p>
      <Button
        {...{
          type: 'primary',
        }}
      >
        {t('Download now', { vn: 'Tải về ngay' })}
      </Button>
      <img
        {...{
          src: '/assets/images/app-introduce-popup-two-phones-image.png',
        }}
      />
    </a>
  );
};

export default AppIntroduceBanner;
