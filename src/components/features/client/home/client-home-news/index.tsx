import FeaturedNews from '@components/shared/client/featured-news';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { ArrowRightIcon } from 'icons';

const ClientHomeNews = () => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-home-news">
      <div className="max-w-1100 m-auto">
        <h2 className="client-home-news-title">
          <span>Tin tức nổi bật</span>
          <Link href={'/tin-tuc'}>
            <div className={'client-home-news-title-right'}>
              <span className={'client-home-news-title-right-text'}>
                {t('See all', { vn: 'Xem tất cả' })}
              </span>
              <ArrowRightIcon />
            </div>
          </Link>
        </h2>

        <p className="client-home-news-desc">
          Luôn cập nhật những tin tức nóng hổi nhất về xu thế thị trường bất
          động sản, bảo hiểm, các khoản vay trong và ngoài nước.
        </p>
      </div>

      <FeaturedNews />
    </div>
  );
};

export default ClientHomeNews;
