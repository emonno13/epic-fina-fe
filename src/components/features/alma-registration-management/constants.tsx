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
