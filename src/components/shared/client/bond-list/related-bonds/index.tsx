import { useFetchRelatedBonds } from './utils';
import ClientBondListMainList from '../bond-list-main/bond-list-main.list';
import { useHTranslation } from '../../../../../lib/i18n';
import { Link } from '../../../link';
import { ArrowRightIcon } from '../../../../../icons';

import './related-bonds.module.scss';

export const RelatedBonds = ({ bond }) => {
  const { data } = useFetchRelatedBonds({ orgId: bond?.org?.id, productId: bond?.id });
  const { t } = useHTranslation('admin-common');

  return (
    data?.length > 0 ? (
      <div className={'related-bonds'}>
        <div className={'related-bonds__header'}>
          <h2>
            {t('Refer to other bonds', { vn: 'Tham khảo các trái phiếu khác' })}
          </h2>
          <Link href={'/danh-sach-trai-phieu'}>
            <div className={'related-bonds__header__right'}>
              <span className={'related-bonds__header__right--text'}>{t('See all', { vn: 'Xem tất cả' })}</span>
              <ArrowRightIcon />
            </div>
          </Link>
        </div>
        <ClientBondListMainList defaultData={data} />
      </div>
    ) : <></>
  );
};
