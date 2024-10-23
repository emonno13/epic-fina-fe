import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import {
  HereToHelpCallIcon,
  HereToHelpChatIcon,
  HereToHelpMailIcon,
  HereToHelpTimeIcon,
} from 'icons';
import ClientHomeEndowIcon from './icons/client-home.endow-icon';
import ClientHomeFreeIcon from './icons/client-home.free-icon';
import ClientHomeIndependentIcon from './icons/client-home.independent-icon';
import ClientHomeSaveTimeIcon from './icons/client-home.save-time-icon';
import ClientHomeTechnologyIcon from './icons/client-home.technology-icon';
import ClientHomeTransparentIcon from './icons/client-home.transparent-icon';
import ClientHomeTypeProductInsuranceIcon from './icons/client-home.type-product-insurance-icon';
import ClientHomeTypeProductInvestIcon from './icons/client-home.type-product-invest-icon';
import ClientHomeTypeProductLoanIcon from './icons/client-home.type-product-loan-icon';

export const getWhyChooseUsData = (t) => [
  {
    title: t('client_why_use_fina_save_time_title', {
      vn: 'Tiết kiệm thời gian',
      en: 'Save time',
    }),
    description: t('client_why_use_fina_save_time_desc', {
      vn: 'FINA giúp khách hàng hoàn thiện toàn bộ thủ tục giấy tờ, khách hàng chỉ việc lên ký hợp đồng vay với ngân hàng.',
      en: 'FINA helps customers complete all paperwork, customers only need to sign a loan contract with the bank.',
    }),
    icon: <ClientHomeSaveTimeIcon />,
  },
  {
    title: t('client_why_use_fina_free_title', {
      vn: 'Hoàn toàn miễn phí',
      en: 'All free',
    }),
    description: t('client_why_use_fina_free_desc', {
      vn: 'FINA sẽ tư vấn và hỗ trợ khách hàng hết mình cho đến khi khách hàng vay được, với mức phí là 0 đồng!',
      en: 'FINA will advise and support customers until the customer can borrow, with a fee of 0 VND!',
    }),
    icon: <ClientHomeFreeIcon />,
  },
  {
    title: t('client_why_use_fina_endow_title', {
      vn: 'Lãi suất ưu đãi',
      en: 'Preferential interest rate',
    }),
    description: t('client_why_use_fina_endow_desc', {
      vn: 'FINA giúp bạn tiếp cận được những khoản vay với lãi suất thấp hơn thị trường từ phía ngân hàng.',
      en: 'FINA helps you access loans with lower-than-market interest rates from banks.',
    }),
    icon: <ClientHomeEndowIcon />,
  },
  {
    title: t('client_why_use_fina_4.0_title', {
      vn: 'Công nghệ 4.0',
      en: 'Technology 4.0',
    }),
    description: t('client_why_use_fina_4.0_desc', {
      vn: 'FINA giúp khách hàng dễ dàng tra cứu, so sánh đa dạng giải pháp tài chính và lựa chọn sản phẩm phù hợp nhất.',
      en: 'FINA helps customers easily look up and compare a variety of financial solutions and choose the most suitable product.',
    }),
    icon: <ClientHomeTechnologyIcon />,
  },
  {
    title: t('client_why_use_fina_independent_title', {
      vn: 'Hoạt động độc lập',
      en: 'Indepedent operations',
    }),
    description: t('client_why_use_fina_independent_desc', {
      vn: 'FINA không thuộc sở hữu của bất kì ngân hàng hay định chế tài chính nào. Với FINA, lợi ích khách hàng là trên hết.',
      en: 'FINA helps customers complete all paperwork, customers only need to sign a loan contract with the bank.',
    }),
    icon: <ClientHomeIndependentIcon />,
  },
  {
    title: t('client_why_use_fina_transparent_title', {
      vn: 'Thông tin minh bạch',
      en: 'Transparent information',
    }),
    description: t('client_why_use_fina_transparent_desc', {
      vn: 'FINA luôn cập nhập và công khai các khoản vay, gói dịch vụ đảm bảo thông tin khách hàng tiếp nhận luôn chính xác nhất!',
      en: 'FINA always updates and publicizes loans to ensure that the information received by our customers is always the most accurate!',
    }),
    icon: <ClientHomeTransparentIcon />,
  },
];

export const getHomeProcedureData = (t) => [
  {
    title: t('procedure_title_1', {
      en: 'Optimal solution to help own a home quickly',
      vn: 'Giải pháp tối ưu giúp sở hữu nhà nhanh chóng',
    }),
    description: t('procedure_title_1_description', {
      en: 'FINA application helps customers access and compare home loan packages with attractive interest rates. Free support for customers to register and complete paperwork.',
      vn: 'Ứng dụng FINA giúp khách hàng tiếp cận và so sánh các gói vay mua nhà với lãi suất hấp dẫn. Hỗ trợ miễn phí khách hàng đăng ký và hoàn thiện thủ tục giấy tờ.',
    }),
  },
  {
    title: t('procedure_title_2', {
      en: 'Diversify non-life insurance packages',
      vn: 'Đa dạng hóa các gói Bảo hiểm phi nhân thọ',
    }),
    description: t('procedure_title_2_description', {
      en: 'FINA application provides diverse insurance packages from health, car to real estate, making it easy for customers to choose.',
      vn: 'Ứng dụng FINA cung cấp các gói bảo hiểm đa dạng từ sức khỏe, xe đến bất động sản, giúp khách hàng dễ dàng lựa chọn.',
    }),
  },
  {
    title: t('procedure_title_3', {
      en: 'Opportunity to increase income',
      vn: 'Cơ hội gia tăng thu nhập',
    }),
    description: t('procedure_title_3_description', {
      en: 'FINA application is an online distribution platform for buying and selling financial and insurance products with commissions up to 56% of product value.',
      vn: 'Ứng dụng FINA là nền tảng phân phối, mua bán các sản phẩm tài chính và bảo hiểm online với hoa hồng lên đến 56% giá trị sản phẩm.',
    }),
  },
];

export const getHereToHelpData = (t) => [
  {
    imgSrc: '/assets/images/here_to_help_call.png',
    desc: (
      <div>
        <div>
          {t('24/7 consultation hotline', {
            en: '24/7 consultation hotline',
            vn: 'Hotline tư vấn 24/7',
          })}
        </div>
        <div>08 5749 8668</div>
      </div>
    ),
    Icon: HereToHelpCallIcon,
  },
  {
    imgSrc: '/assets/images/here_to_help_chat.png',
    desc: t('Direct contact', {
      en: 'Direct contact',
      vn: 'Liên hệ trực tiếp',
    }),
    Icon: HereToHelpChatIcon,
  },
  {
    imgSrc: '/assets/images/here_to_help_time.png',
    desc: t('Flexible scheduling consultation', {
      en: 'Flexible scheduling consultation',
      vn: 'Linh hoạt đặt lịch tư vấn',
    }),
    Icon: HereToHelpTimeIcon,
  },
  {
    imgSrc: '/assets/images/here_to_help_mail.png',
    desc: (
      <div>
        <div>
          {t('Email support', { en: 'Support email', vn: 'Email hỗ trợ' })}
        </div>
        <div>support@fina.com.vn</div>
      </div>
    ),
    Icon: HereToHelpMailIcon,
  },
];

export const TYPE_PRODUCT_HOME_SLUG = {
  LOAN: '/vay-mua-nha',
  INSURANCE: '/bao-hiem',
  REAL_ESTATE: '/bat-dong-san',
  INVEST: '/invest-intro',
};

export const PRODUCT_TYPE_MAPPING_SLUG = {
  [TYPE_PRODUCT_HOME_SLUG.LOAN]: PRODUCT_TYPE.LOAN,
  [TYPE_PRODUCT_HOME_SLUG.INSURANCE]: PRODUCT_TYPE.INSURANCE,
  [TYPE_PRODUCT_HOME_SLUG.REAL_ESTATE]: PRODUCT_TYPE.REAL_ESTATE,
};

export const getTypeProductNavigationData = (t) => [
  {
    value: TYPE_PRODUCT_HOME_SLUG.LOAN,
    imgSrc: '/assets/images/type_product_navigation_loan_icon.png',
    title: t('type_product_navigation_loan_title', {
      en: 'House loan',
      vn: 'Vay vốn',
    }),
    description: t('type_product_navigation_loan_description', {
      en: 'Browse house loan',
      vn: 'Tra cứu các gói vay vốn',
    }),
    Icon: ClientHomeTypeProductLoanIcon,
  },
  {
    value: TYPE_PRODUCT_HOME_SLUG.INSURANCE,
    imgSrc: '/assets/images/type_product_navigation_insurance_icon.png',
    title: t('type_product_navigation_insurance_title', {
      en: 'Insurance',
      vn: 'Bảo hiểm',
    }),
    description: t('type_product_navigation_insurance_description', {
      en: 'Attractive insurance products',
      vn: 'Sản phẩm bảo hiểm hấp dẫn',
    }),
    Icon: ClientHomeTypeProductInsuranceIcon,
  },
  {
    value: TYPE_PRODUCT_HOME_SLUG.INVEST,
    imgSrc: '/assets/images/type_product_navigation_invest.png',
    title: t('type_product_navigation_invest_title', {
      en: 'Invest',
      vn: 'Đầu tư',
    }),
    description: t('type_product_navigation_invest_description', {
      en: 'Bond products',
      vn: 'Sản phẩm trái phiếu, chứng chỉ quỹ',
    }),
    Icon: ClientHomeTypeProductInvestIcon,
  },
];

export const STATIC_BANNERS = Array.from(Array(4)).map((_, index) => ({
  desktopBanner: `/assets/images/client_banner_${index + 1}.png`,
  mobileBanner: `/assets/images/client_banner_mobile_${index + 1}.jpeg`,
}));
