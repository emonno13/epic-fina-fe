import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { filterFundList } from '@components/features/client/fund-certificate/constants';
import { PopoverExplain } from '@components/shared/popover-explain';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { usePublicEnvironment } from 'system/hooks';
import FundCertificatesTable from './fund-certificates-table';

import './fund-certificates-wrapper.scss';

export const FundCertificatesWrapper = (props) => {
  const featureId = 'fund-product';
  const data = useTableSourceData(featureId);
  const { t } = useHTranslation('admin-common');
  const {
    title = t('Fund certificates', { vn: 'Chứng chỉ quỹ' }),
    des = 'Lãi suất cao ưu đãi',
  } = props;
  const filter = { ...filterFundList, where: { isOutstanding: true } };

  return (
    <HFeature
      {...{
        featureId,
        nodeName: 'products/public-fund',
      }}
    >
      <HSearchFormHiddenAble
        withRelations={['org']}
        pagination={{
          filter: {
            limit: +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10,
          },
        }}
        hiddenValues={{ filter }}
      />
      {data?.length ? (
        <div className="fund-certificates-wrapper">
          <div className="fund-certificates-wrapper__title">
            {title} &nbsp;
            <PopoverExplain
              title="Chứng chỉ quỹ"
              content={
                <div>
                  Là loại chứng khoán xác nhận quyền sở hữu của nhà đầu tư đối
                  với một phần vốn góp của quỹ đầu tư chứng khoán.
                  <div>
                    <ArrowUpOutlined style={{ color: '#0A9A36' }} /> (tăng){' '}
                    <ArrowDownOutlined style={{ color: 'red' }} /> (giảm), NAV
                    so sánh với phiên trước đó
                  </div>
                </div>
              }
            />
          </div>

          <div className="fund-certificates-wrapper__des">
            <span>{des}</span>
            <a
              className="fund-certificates-wrapper__link"
              href={'/danh-sach-chung-chi-quy'}
            >
              {t('Fund Certificates Wrapper', {
                en: 'View all',
                vn: 'Xem tất cả',
              })}
              <RightOutlined style={{ fontSize: '12px', marginLeft: '10px' }} />
            </a>
          </div>

          <FundCertificatesTable />
        </div>
      ) : null}
    </HFeature>
  );
};

export default FundCertificatesWrapper;
