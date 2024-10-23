import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import ProductsMenuContentFinance from './products-menu/products-menu-content/product-menu-content-finance';
import ProductsMenuContentInsurance from './products-menu/products-menu-content/product-menu-content-insurance';
import ProductsMenuContentRealEstate from './products-menu/products-menu-content/product-menu-content-real-estate';

export const CAROUSEL_DATA = (t) => {
  const makeMoneyNow = t('Make money now', {
    en: 'Make money now',
    vn: 'Kiếm tiền ngay',
  });
  const withText = t('With text', {
    en: 'with',
    vn: 'với',
  });
  return Array.from(Array(3)).map(() => ({
    img: '/assets/images/carousel-mobile-image.jpg',
    content: (
      <>
        <div>{makeMoneyNow}</div>
        <div>{withText} FINA</div>
      </>
    ),
  }));
};

export const PRODUCTS_MENU_KEYS = {
  FINANCE: 'FINANCE',
  INSURANCE: 'INSURANCE',
  REAL_ESTATE: 'REAL_ESTATE',
};

export const PRODUCTS_MENU_DATA = (t) => {
  return [
    {
      type: PRODUCTS_MENU_KEYS.FINANCE,
      productType: PRODUCT_TYPE.LOAN,
      iconActive: '/assets/images/icons/ic_finance-active.svg',
      iconDisable: '/assets/images/icons/ic_finance-disable.svg',
      label: t('Finance', {
        en: 'Finance',
        vn: 'Tài chính',
      }),
      Content: ProductsMenuContentFinance,
      createTaskButtonText: t('Want loan button text', {
        en: 'I want a home loan',
        vn: 'Vay mua nhà',
      }),
      referCustomerButtonText: t('Introduce loan borrower button text', {
        en: 'Introduce a borrower',
        vn: 'Giới thiệu khách vay',
      }),
    },
    {
      type: PRODUCTS_MENU_KEYS.INSURANCE,
      productType: PRODUCT_TYPE.INSURANCE,
      iconActive: '/assets/images/icons/ic_insurance-active.svg',
      iconDisable: '/assets/images/icons/ic_insurance-disable.svg',
      label: t('Insurance', {
        en: 'Insurance',
        vn: 'Bảo hiểm',
      }),
      Content: ProductsMenuContentInsurance,
      createTaskButtonText: t('Want insurance button text', {
        en: 'I want an insurance',
        vn: 'Tư vấn bảo hiểm',
      }),
      referCustomerButtonText: t('Introduce insurance borrower button text', {
        en: 'Introduce insurance buyer',
        vn: 'Giới thiệu khách mua',
      }),
    },
    {
      type: PRODUCTS_MENU_KEYS.REAL_ESTATE,
      productType: PRODUCT_TYPE.REAL_ESTATE,
      iconActive: '/assets/images/icons/ic_real-estate-active.svg',
      iconDisable: '/assets/images/icons/ic_real-estate-disable.svg',
      label: t('Real estate', {
        en: 'Real estate',
        vn: 'Bất động sản',
      }),
      Content: ProductsMenuContentRealEstate,
      createTaskButtonText: t('Want real estate button text', {
        en: 'I want a real estate',
        vn: 'Đăng kí mua nhà',
      }),
      referCustomerButtonText: t('Introduce real estate button text', {
        en: 'Introduce real estate buyer',
        vn: 'Giới thiệu khách mua',
      }),
    },
  ].map((menuData, index) => ({
    ...menuData,
    id: index,
  }));
};

export const FINANCE_MENU_DATA = ({ t, openCreateTask, handleRedirect }) => {
  return [
    {
      icon: '/assets/images/icons/ic_loan-interest.svg',
      label: t('Calculate loan interest', {
        en: 'Calculate loan interest',
        vn: 'Tính lãi vay',
      }),
      needAuthenticate: false,
      componentProps: {
        onClick: () => handleRedirect('/admin/m-loan-calculator'),
      },
    },
    {
      icon: '/assets/images/icons/ic_upload-document.svg',
      label: t('Upload document', {
        en: 'Upload document',
        vn: 'Upload hồ sơ',
      }),
      needAuthenticate: true,
      componentProps: {
        onClick: () => handleRedirect('/admin/m-document-management'),
      },
    },
    {
      icon: '/assets/images/icons/ic_create-counseling-request.svg',
      label: t('Create counselling request', {
        en: 'Create counselling request',
        vn: 'Tạo yêu cầu tư vấn',
      }),
      needAuthenticate: false,
      componentProps: {
        onClick: openCreateTask,
      },
    },
    {
      icon: '/assets/images/icons/ic_loan.svg',
      label: t('Loan', {
        en: 'Loan',
        vn: 'Khoản vay',
      }),
      needAuthenticate: true,
      componentProps: {
        onClick: () => handleRedirect('/admin/m-deal-loan-management'),
      },
    },
  ];
};

export const REAL_ESTATE_MENU_DATA = (t) => [
  {
    icon: '/assets/images/icons/ic_construction.svg',
    label: t('Planning Check', {
      en: 'Planning Check',
      vn: 'Kiểm tra quy hoạch',
    }),
    needAuthenticate: false,
    componentProps: {
      onClick: async () => {
        await RouteUtils.redirect('/admin/m-planning-check');
      },
    },
  },
];

export const INSURANCE_MENU_DATA = (t) => [
  {
    icon: '/assets/images/icons/ic_insurance-car.svg',
    label: t('Car insurance', {
      en: 'Car insurance',
      vn: 'Bảo hiểm TNDS BB ô tô',
    }),
    commission: 27.38,
  },
  {
    icon: '/assets/images/icons/ic_insurance-motorbike.svg',
    label: t('Motorbike insurance', {
      en: 'Motorbike insurance',
      vn: 'Bảo hiểm TNDS BB xe máy',
    }),
    commission: 56.25,
  },
  {
    icon: '/assets/images/icons/ic_insurance-lost-motorbike.svg',
    label: t('Lost motorbike insurance', {
      en: 'Lost motorbike insurance',
      vn: 'Bảo hiểm mất cắp mất cướp xe máy',
    }),
    commission: 37.5,
  },
  {
    icon: '/assets/images/icons/ic_insurance-stroke.svg',
    label: t('Stroke insurance', {
      en: 'Stroke insurance',
      vn: 'Bảo hiểm đột quỵ',
    }),
    commission: 21.14,
  },
];
