import { ConverterUtils } from '@lib/converter';
import { formatNumber } from '../../../shared/common-form-elements/utils';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from './constants';

export const isRouteProductDetail = (slug) =>
  Array.isArray(slug) &&
  slug.length === 2 &&
  Object.values(CLIENT_PRODUCT_DETAIL_ROUTE).includes(slug[0]);

export const isRouteLoanDetail = (slug) =>
  isRouteProductDetail(slug) && slug[0] === CLIENT_PRODUCT_DETAIL_ROUTE.LOAN;

export const isRouteInsuranceDetail = (slug) =>
  isRouteProductDetail(slug) &&
  slug[0] === CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE;

export const isRouteRealEstateDetail = (slug) =>
  isRouteProductDetail(slug) &&
  slug[0] === CLIENT_PRODUCT_DETAIL_ROUTE.REAL_ESTATE;

export const isRouteProjectDetail = (slug) =>
  isRouteProductDetail(slug) && slug[0] === CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT;

export const getProductDetailContent = (t) => ({
  [CLIENT_PRODUCT_DETAIL_ROUTE.LOAN]: [
    {
      label: t('Preferential time', {
        en: 'Preferential time',
        vn: 'Thời gian ưu đãi',
      }),
      field: ['info', 'preferentialTime'],
      render: (value) => <span>{value} tháng</span>,
    },
    {
      label: t('Preferential rate', {
        en: 'Preferential rate',
        vn: 'Lãi suất ưu đãi',
      }),
      field: ['info', 'preferentialRate'],
      render: (value) => <span>{value}%</span>,
    },
    {
      label: t('After preferential rate', {
        en: 'After preferential rate',
        vn: 'Lãi suất sau ưu đãi',
      }),
      field: ['info', 'afterPreferentialRate'],
    },
    {
      label: t('Reference interest rate', {
        en: 'Reference interest rate',
        vn: 'Lãi suất tham chiếu',
      }),
      field: ['info', 'preferentialReference'],
      render: (value) => value && <span>{value}%</span>,
    },
    {
      label: t('Amplitude', {
        en: 'Amplitude',
        vn: 'Biên độ',
      }),
      field: ['info', 'amplitude'],
    },
    {
      label: t('Maximum loan rate', {
        en: 'Maximum loan rate',
        vn: 'Tỉ lệ cho vay tối đa',
      }),
      field: ['info', 'maxRate'],
      render: (value) => value && <span>{value}%</span>,
    },
    {
      label: t('Maximum loan period', {
        en: 'Maximum loan period',
        vn: 'Thời gian cho vay tối đa',
      }),
      field: ['info', 'maxTime'],
      render: (value) => value && <span>{value} năm</span>,
    },
    {
      label: t('Maximum loan money', {
        en: 'Maximum loan money',
        vn: 'Số tiền cho vay tối đa',
      }),
      field: ['info', 'maxMoney'],
      render: (value) => value && <span>{formatNumber(value)} VND</span>,
    },
    {
      label: t('Minimum loan period', {
        en: 'Minimum loan period',
        vn: 'Thời gian cho vay tối thiểu',
      }),
      field: ['info', 'minTime'],
      render: (value) => value && <span>{value} tháng</span>,
    },
    {
      label: t('Minimum loan amount', {
        en: 'Minimum loan amount',
        vn: 'Số tiền cho vay tối thiểu',
      }),
      field: ['info', 'minMoney'],
      render: (value) => value && <span>{formatNumber(value)} VND</span>,
    },
  ],
  [CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT]: [
    {
      label: t('Project scale', {
        en: 'Project scale',
        vn: 'Quy mô dự án',
      }),
      field: 'projectSize',
    },
    {
      label: t('Project total area', {
        en: 'Project total area',
        vn: 'Diện tích dự án',
      }),
      field: 'totalArea',
    },
    {
      label: t('Expected price', {
        en: 'Expected price',
        vn: 'Giá dự kiến',
      }),
      field: 'expectedPrice',
      render: (value) => value && <span>{formatNumber(value)} VND</span>,
    },
    {
      label: t('Project status', {
        en: 'Project status',
        vn: 'Trạng thái dự án',
      }),
      field: 'projectStatus',
    },
    {
      label: t('Project link', {
        en: 'Project link',
        vn: 'Link dự án',
      }),
      field: 'link',
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      ),
    },
    {
      label: t('Number of apartments', {
        en: 'Number of apartments',
        vn: 'Số căn hộ',
      }),
      field: 'productNumber',
    },
  ],
  [CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE]: [
    {
      label: t('Insurance link', {
        en: 'Insurance link',
        vn: 'Link bảo hiểm',
      }),
      field: ['info', 'productUrlOriginal'],
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      ),
    },
    {
      label: t('Comission percentage', {
        en: 'Comission percentage',
        vn: 'Hoa hồng',
      }),
      field: ['info', 'commissionPercentage'],
      render: (value) => value && <span>{value}%</span>,
    },
    {
      label: t('Payment note', {
        en: 'Payment note',
        vn: 'Ghi chú thanh toán',
      }),
      field: ['info', 'note_payment'],
    },
  ],
  [CLIENT_PRODUCT_DETAIL_ROUTE.REAL_ESTATE]: [
    {
      label: t('Link', {
        en: 'Link',
        vn: 'Liên kết',
      }),
      field: 'link',
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      ),
    },
    {
      label: t('Address', {
        en: 'Address',
        vn: 'Địa chỉ',
      }),
      field: 'address',
    },
    {
      label: t('Project', {
        en: 'Project',
        vn: 'Dự án',
      }),
      field: ['project', 'name'],
    },
    {
      label: t('Product value', {
        en: 'Product value',
        vn: 'Giá trị sản phẩm',
      }),
      field: 'productValue',
      render: (value) => value && <span>{formatNumber(value)} VND</span>,
    },
    {
      label: t('Apply from', {
        en: 'Apply from',
        vn: 'Áp dụng từ',
      }),
      field: 'applyFrom',
      render: (value) => ConverterUtils.dateConverter(value),
    },
    {
      label: t('Apply to', {
        en: 'To',
        vn: 'Đến',
      }),
      field: 'applyTo',
      render: (value) => ConverterUtils.dateConverter(value),
    },
  ],
});

export const getProductDetailFetchOptions = (slug, onGotSuccess) => ({
  [CLIENT_PRODUCT_DETAIL_ROUTE.LOAN]: {
    nodeName: `product-details/public/by-slug/${slug[1]}`,
    method: 'get',
    withRelations: [
      'org',
      {
        relation: 'product',
        scope: {
          include: [{ relation: 'documentTemplate' }],
        },
      },
    ],
    isSearchForm: true,
    onGotSuccess: (response) => {
      onGotSuccess({
        ...response,
        description: response?.product?.description,
      });
    },
  },
  [CLIENT_PRODUCT_DETAIL_ROUTE.INSURANCE]: {
    nodeName: `products/public/by-slug/${slug[1]}`,
    withRelations: [
      'category',
      {
        relation: 'org',
        scope: {
          fields: { id: true, code: true, name: true },
        },
      },
    ],
    isSearchForm: true,
    method: 'get',
    onGotSuccess,
  },
  [CLIENT_PRODUCT_DETAIL_ROUTE.REAL_ESTATE]: {
    nodeName: `properties/public/by-slug/${slug[1]}`,
    method: 'get',
    withRelations: ['project'],
    isSearchForm: true,
    onGotSuccess,
  },
  [CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT]: {
    nodeName: `projects/public/by-slug/${slug[1]}`,
    method: 'get',
    onGotSuccess: (response) => {
      onGotSuccess({ ...response, description: response?.content });
    },
  },
});
