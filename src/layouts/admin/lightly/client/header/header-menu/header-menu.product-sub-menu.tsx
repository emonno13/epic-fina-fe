import { RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import ClientHomeTypeProductInsuranceIcon from '@components/features/client/home/icons/client-home.type-product-insurance-icon';
import ClientHomeTypeProductLoanIcon from '@components/features/client/home/icons/client-home.type-product-loan-icon';
import ClientHomeTypeProductRealEstateIcon from '@components/features/client/home/icons/client-home.type-product-real-estate-icon';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';

export const ClientHeaderProductItemGroupTitle = ({ title, icon }) => (
  <div className="client-header-product-item-group-title">
    <div className="client-header-product-item-group-title__icon">{icon}</div>
    <span className="client-header-product-item-group-title__title">
      {title}
    </span>
  </div>
);

const ClientHeaderProductSubMenu = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Menu.SubMenu
      popupClassName="ui-lightly-client-header__menu__product"
      key="/product"
      title={t('Product', { en: 'Product', vn: 'Sản phẩm' })}
      popupOffset={[-300, 25]}
    >
      <Menu.ItemGroup
        key="product"
        title={
          <ClientHeaderProductItemGroupTitle
            {...{
              title: t('House loan', { en: 'House loan', vn: 'Vay mua nhà' }),
              icon: <ClientHomeTypeProductLoanIcon />,
            }}
          />
        }
      >
        <Menu.Item key="/danh-sach-san-pham-vay" icon={<RightOutlined />}>
          <Link href="/danh-sach-san-pham-vay">
            {t('House loan', { en: 'House loan', vn: 'Vay mua nhà' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-san-pham-vay" icon={<RightOutlined />}>
          <Link href="/danh-sach-san-pham-vay">
            {t('Certificated house loan', {
              en: 'Certificated house loan',
              vn: 'Vay mua nhà có sổ',
            })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-san-pham-vay" icon={<RightOutlined />}>
          <Link href="/danh-sach-san-pham-vay">
            {t('Project house loan', {
              en: 'Project house loan',
              vn: 'Vay mua nhà dự án',
            })}
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup
        key="product_insurance"
        title={
          <ClientHeaderProductItemGroupTitle
            {...{
              title: t('Insurance', { en: 'Insurance', vn: 'Bảo hiểm' }),
              icon: <ClientHomeTypeProductInsuranceIcon />,
            }}
          />
        }
      >
        <Menu.Item key="/danh-sach-bao-hiem" icon={<RightOutlined />}>
          <Link href="/danh-sach-bao-hiem">
            {t('Real estate insurance', {
              en: 'Real estate insurance',
              vn: 'Bảo hiểm bất động sản',
            })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-bao-hiem" icon={<RightOutlined />}>
          <Link href="/danh-sach-bao-hiem">
            {t('Human insurance', {
              en: 'Human insurance',
              vn: 'Bảo hiểm con người',
            })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-bao-hiem" icon={<RightOutlined />}>
          <Link href="/danh-sach-bao-hiem">
            {t('Other insurance', {
              en: 'Other insurance',
              vn: 'Bảo hiểm khác',
            })}
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup
        key="product_real_estate"
        title={
          <ClientHeaderProductItemGroupTitle
            {...{
              title: t('Real estate', {
                en: 'Real estate',
                vn: 'Bất động sản',
              }),
              icon: <ClientHomeTypeProductRealEstateIcon />,
            }}
          />
        }
      >
        <Menu.Item key="/danh-sach-bat-dong-san" icon={<RightOutlined />}>
          <Link href="/danh-sach-bat-dong-san">
            {t('Project real estate', {
              en: 'Project real estate',
              vn: 'Bất động sản dự án',
            })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-bat-dong-san" icon={<RightOutlined />}>
          <Link href="/danh-sach-bat-dong-san">
            {t('Certificated real estate', {
              en: 'Certificated real estate',
              vn: 'Bất động sản có sổ',
            })}
          </Link>
        </Menu.Item>
        <Menu.Item key="/danh-sach-bat-dong-san" icon={<RightOutlined />}>
          <Link href="/danh-sach-bat-dong-san">
            {t('Liquidated real estate', {
              en: 'Liquidated real estate',
              vn: 'Bất động sản thanh lý',
            })}
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>
  );
};

export default ClientHeaderProductSubMenu;
