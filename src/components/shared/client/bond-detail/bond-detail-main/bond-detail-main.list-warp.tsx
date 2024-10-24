import { RightOutlined } from '@ant-design/icons';
import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { usePublicEnvironment } from '@system/hooks';
import ClientBondTable from '../../bond-list/bond-list-main/bond-table';

import './bond-list-wrapper.scss';

export const BondListWrapper = (props) => {
  const featureId = 'products';
  const data = useTableSourceData(featureId);
  const { t } = useHTranslation('admin-common');
  const {
    title = t('Featured Bonds', { vn: 'Trái phiếu nổi bật' }),
    des = 'Lãi suất cao ưu đãi',
  } = props;
  const modelFilters = {
    filter: { where: { type: PRODUCT_TYPE.BONDS, isOutstanding: true } },
  };
  const pagination = {
    filter: { limit: +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10 },
  };

  return (
    <HFeature
      {...{
        featureId,
        nodeName: 'products/public-bond',
      }}
    >
      <HSearchFormHiddenAble
        withRelations={['org']}
        resetIfSuccess={false}
        hiddenValues={modelFilters}
        pagination={pagination}
      />
      {data?.length ? (
        <div className="bond-list-wrapper">
          <div className="bond-list-wrapper__title">{title}</div>

          <div className="bond-list-wrapper__des">
            <span>{des}</span>
            <a
              className="bond-list-wrapper__link"
              href={'/danh-sach-trai-phieu'}
            >
              {t('Bond Lis tWrapper', {
                en: 'View all',
                vn: 'Xem tất cả',
              })}
              <RightOutlined style={{ fontSize: '12px', marginLeft: '10px' }} />
            </a>
          </div>

          <ClientBondTable />
        </div>
      ) : null}
    </HFeature>
  );
};

export default BondListWrapper;
