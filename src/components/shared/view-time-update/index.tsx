import { ArrowRightCircleSvg } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Popover } from 'antd';

import './view-time-update.module.scss';

export const ViewTimeUpdate = ({
  createdAt,
  updatedAt,
  isNoPopover = false,
}) => {
  const { t } = useHTranslation('admin-common');

  const ContentViewTimeV2 = () => (
    <>
      <p className="item">
        <span>{t('Created at')}</span>
        <span className="dot"></span>
        {ConverterUtils.fullDatetimeConverter(createdAt)}
      </p>
      <p className="item">
        <span>{t('updatedAt')}</span>
        <span className="dot"></span>
        {ConverterUtils.fullDatetimeConverter(updatedAt)}
      </p>
    </>
  );

  const ContentViewTime = () => (
    <>
      <p className="item">
        {ConverterUtils.fullDatetimeConverter(createdAt)}
        <span className="dot"></span>
        <span>{t('Created at')}</span>
      </p>
      <p className="item">
        {ConverterUtils.fullDatetimeConverter(updatedAt)}
        <span className="dot"></span>
        <span>{t('updatedAt')}</span>
      </p>
    </>
  );

  return (
    <>
      {isNoPopover ? (
        <div className="popover-custom-line popover-view-time-update">
          <div className="container">
            <ContentViewTimeV2 />
          </div>
        </div>
      ) : (
        <Popover
          content={ContentViewTime()}
          overlayClassName="popover-custom-line popover-view-time-update"
        >
          <div className="view-time">
            {t('viewTime')}
            <ArrowRightCircleSvg className="cursor-pointer" />
          </div>
        </Popover>
      )}
    </>
  );
};
