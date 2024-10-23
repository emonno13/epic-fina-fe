import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { ArrowRightIcon } from 'icons';
import { FC } from 'react';

export interface ClientRelatedProductHeaderProps {
  seeAllHref?: string;
  productTitle?: string;
}

export const ClientRelatedProductHeader: FC<
  ClientRelatedProductHeaderProps
> = ({ seeAllHref = '', productTitle = 'sản phẩm' }) => {
  const { t } = useHTranslation('common');
  return (
    <div className="related-bonds__header">
      <h2>{`Tham khảo các ${productTitle} khác`}</h2>
      <Link href={seeAllHref}>
        <div className={'related-bonds__header__right'}>
          <span className={'related-bonds__header__right--text'}>
            {t('See all', { vn: 'Xem tất cả' })}
          </span>
          <ArrowRightIcon />
        </div>
      </Link>
    </div>
  );
};
