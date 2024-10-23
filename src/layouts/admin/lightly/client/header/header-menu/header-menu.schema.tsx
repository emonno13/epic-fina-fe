import { BankFilled, BookOutlined, ContainerOutlined } from '@ant-design/icons';
import { useFetchCategoriesOutStanding } from '@components/features/client/home/client-home-featured-products/loan-products/hooks';
import ClientHomeTypeProductInsuranceIcon from '@components/features/client/home/icons/client-home.type-product-insurance-icon';
import ClientHomeTypeProductLoanIcon from '@components/features/client/home/icons/client-home.type-product-loan-icon';
import ClientHomeTypeProductRealEstateIcon from '@components/features/client/home/icons/client-home.type-product-real-estate-icon';
import { TFunction } from 'next-i18next';
import { usePublicEnvironment } from '../../../../../../system/hooks';
import { ClientHeaderProductItemGroupTitle } from './header-menu.product-sub-menu';

export const useClientMenuSchema = (t: TFunction): any[] => {
  const linkBrochure = usePublicEnvironment('BROCHURE_URL');
  const categoriesOutStanding = useFetchCategoriesOutStanding();

  const subMenuHouseLoan = categoriesOutStanding?.map((category) => {
    return {
      key: `/danh-sach-san-pham-vay?categoryId=${category?.id}`,
      href: `/danh-sach-san-pham-vay?categoryId=${category?.id}`,
      title: t(category?.name),
    };
  });

  return [
    {
      title: t('Product', { en: 'Product', vn: 'Sản phẩm' }),
      popupClassName: 'ui-lightly-client-header__menu__product',
      key: '/product',
      popupOffset: [-300, 25],
      subMenu: [
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('House loan', { en: 'House loan', vn: 'Vay mua nhà' }),
                icon: <ClientHomeTypeProductLoanIcon />,
              }}
            />
          ),
          key: 'product_loan',
          itemGroup: [...subMenuHouseLoan],
        },
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Insurance', { en: 'Insurance', vn: 'Bảo hiểm' }),
                icon: <ClientHomeTypeProductInsuranceIcon />,
              }}
            />
          ),
          key: 'product_insurance',
          itemGroup: [
            {
              key: '/danh-sach-bao-hiem',
              href: '/danh-sach-bao-hiem',
              title: t('Real estate insurance', {
                en: 'Real estate insurance',
                vn: 'Bảo hiểm bất động sản',
              }),
            },
            {
              key: '/danh-sach-bao-hiem',
              href: '/danh-sach-bao-hiem',
              title: t('Human insurance', {
                en: 'Human insurance',
                vn: 'Bảo hiểm con người',
              }),
            },
            {
              key: '/danh-sach-bao-hiem',
              href: '/danh-sach-bao-hiem',
              title: t('Other insurance', {
                en: 'Other insurance',
                vn: 'Bảo hiểm khác',
              }),
            },
          ],
        },
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Real estate', {
                  en: 'Real estate',
                  vn: 'Bất động sản',
                }),
                icon: <ClientHomeTypeProductRealEstateIcon />,
              }}
            />
          ),
          key: 'product_real_estate',
          itemGroup: [
            {
              key: '/danh-sach-bat-dong-san',
              href: '/danh-sach-bat-dong-san',
              title: t('Project real estate', {
                en: 'Project real estate',
                vn: 'Bất động sản dự án',
              }),
            },
            {
              key: '/danh-sach-bat-dong-san',
              href: '/danh-sach-bat-dong-san',
              title: t('Certificated real estate', {
                en: 'Certificated real estate',
                vn: 'Bất động sản có sổ',
              }),
            },
            {
              key: '/danh-sach-bat-dong-san',
              href: '/danh-sach-bat-dong-san',
              title: t('Liquidated real estate', {
                en: 'Liquidated real estate',
                vn: 'Bất động sản thanh lý',
              }),
            },
          ],
        },
      ],
    },
    {
      title: t('About', { vn: 'Giới thiệu' }),
      popupClassName: 'ui-lightly-client-header__menu__product-info',
      popupOffset: [-300, 25],
      subMenu: [
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Company introduction', { vn: 'Giới thiệu Công ty' }),
                icon: <BankFilled style={{ fontSize: 32, color: '#0A3ECA' }} />,
              }}
            />
          ),
          key: 'about_fina',
          itemGroup: [
            {
              key: '/gioi-thieu-fina',
              href: '/gioi-thieu',
              title: t('Company introduction', { vn: 'Giới thiệu Công ty' }),
            },
          ],
        },
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Brochure', { vn: 'Brochure' }),
                icon: (
                  <BookOutlined style={{ fontSize: 32, color: '#0A3ECA' }} />
                ),
              }}
            />
          ),
          key: 'about_fina_brochure',
          itemGroup: [
            {
              key: '/gioi-thieu-fina-brochure',
              href: linkBrochure,
              title: t('Brochure', { vn: 'Brochure' }),
            },
          ],
        },
      ],
    },
    {
      title: t('Utilities', { vn: 'Tiện ích' }),
      key: 'utilities',
      popupClassName: 'ui-lightly-client-header__menu__product',
      popupOffset: [-300, 25],
      subMenu: [
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Loan calculator', { vn: 'Công cụ tính khoản vay' }),
                icon: (
                  <img
                    src="/assets/images/icons/ic_loan-interest.svg"
                    width="32"
                  />
                ),
              }}
            />
          ),
          key: 'loan_calculator',
          itemGroup: [
            {
              key: '/calculators-toolkit',
              href: '/calculators-toolkit',
              title: t('Calculation toolkit', { vn: 'Bộ công cụ tính' }),
            },
          ],
        },
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Check urban planning', { vn: 'Kiểm tra quy hoạch' }),
                icon: (
                  <img
                    src="/assets/images/icons/ic_construction.svg"
                    width="32"
                  />
                ),
              }}
            />
          ),
          key: 'check_urban_planning',
          itemGroup: [
            {
              key: '/kiem-tra-quy-hoach-meeymap',
              href: '/kiem-tra-quy-hoach-meeymap',
              title: t('Check urban planning MeeyMap', {
                vn: 'Kiểm tra quy hoạch cùng MeeyMap',
              }),
              isNew: true,
            },
            {
              key: '/kiem-tra-quy-hoach',
              href: '/kiem-tra-quy-hoach',
              title: t('Check urban planning ReMaps', {
                vn: 'Kiểm tra quy hoạch cùng ReMaps',
              }),
            },
          ],
        },
        {
          title: (
            <ClientHeaderProductItemGroupTitle
              {...{
                title: t('Online notarization', {
                  vn: 'Công chứng trực tuyến',
                }),
                icon: (
                  <ContainerOutlined
                    style={{ fontSize: 32, color: '#0A3ECA' }}
                  />
                ),
              }}
            />
          ),
          key: 'online_notarization',
          itemGroup: [
            {
              key: '/cong-chung-truc-tuyen',
              href: '/cong-chung-truc-tuyen',
              title: t('Online notarization', { vn: 'Công chứng trực tuyến' }),
            },
          ],
        },
      ],
    },
    {
      title: t('Q&A', { vn: 'Hỏi đáp' }),
      href: '/hoi-dap',
    },
    {
      title: t('Blog', { vn: 'Blog' }),
      href: '/tin-tuc',
    },
    {
      title: t('Experts', { vn: 'Chuyên gia' }),
      href: '/lien-he',
    },
    {
      title: t('Endow', { vn: 'Ưu đãi' }),
      href: '/alma-landing-page',
    },
  ];
};
