import moment from 'moment';

export const getBannerStatus = (t) => ({
  DISPLAY: {
    text: t('Display', { vn: 'Hiển thị' }),
    color: 'success',
  },
  NOT_DISPLAY: {
    text: t('Not display', { vn: 'Không hiển thị' }),
    color: 'error',
  },
});

export const displayBannerCondition = (record: any) => {
  const { applyFrom, applyTo } = record;
  return (
    moment(applyFrom).isSameOrBefore(moment()) &&
    (!applyTo || moment(applyTo).isAfter(moment()))
  );
};

export const BANNER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
};

export const SCREEN = {
  FUND_PUBLIC: 'fundPublic',
  HOME: 'home',
};

export const SCREEN_OPTIONS = [
  { label: 'Trang chủ', value: SCREEN.HOME },
  { label: 'Giới thiệu đầu tư', value: SCREEN.FUND_PUBLIC },
];
