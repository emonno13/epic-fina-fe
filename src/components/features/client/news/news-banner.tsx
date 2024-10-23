import { useHTranslation } from '@lib/i18n';
import { Input } from 'antd';
import { SearchIconSvg } from 'icons';

import './news.module.scss';

const ClientNewsBanner = () => {
  const { t } = useHTranslation('common');

  const handleSearchNews = (e) => {
    e && window.open(`/tim-kiem-tin-tuc?keyword=${e}`, '_blank')?.focus();
  };

  return (
    <div className="client-news-banner">
      <div className="max-w-1100 client-news-banner-wrapper m-auto">
        <h2 className="client-news-banner-title">
          {t('Blog news', { vn: 'Blog tin tức' })}
        </h2>
        <p className="client-news-banner-desc">
          {t(
            'Update news, knowledge, share about financial market trends, real estate, insurance, investment',
            {
              vn: 'Cập nhật tin tức, kiến thức, chia sẻ về xu thế thị trường tài chính, bất động sản, bảo hiểm, đầu tư',
            },
          )}
        </p>

        <Input.Search
          placeholder="Tìm kiếm tin tức..."
          enterButton={<SearchIconSvg />}
          onSearch={handleSearchNews}
        />
      </div>
    </div>
  );
};

export default ClientNewsBanner;
