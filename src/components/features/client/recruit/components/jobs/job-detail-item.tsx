import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import TitleAndContent from './title-and-content';
import RenderHtml from './render-html';
import { RoundFbSvg, RoundLinkedInSvg, RoundTwitterSvg } from '../../icons';
import { useHTranslation } from '../../../../../../lib/i18n';

import './job-detail-item.module.scss';

interface Props{
  item: any
}
const JobDetailItem = React.memo(({ item }: Props)=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="job-detail-item__container">
      <p className="job-detail-item__title">
        {item.jobTitle}
      </p>
      <div className="job-detail-item__item">
        <TitleAndContent label={t('jobs.workplace')} content={item?.workplace} />
        <TitleAndContent label={t('jobs.careerLevel')} content={item?.careerLevel} />
        <TitleAndContent label={t('jobs.formality')} content={item?.formality} />
        <TitleAndContent label={t('jobs.experience')} content={item?.experience} />
        <TitleAndContent label={t('jobs.salary')} content={item.salary} />
        <TitleAndContent label={t('jobs.career')} content={item?.career} />
        <TitleAndContent label={t('jobs.workplace')} content={moment(item?.applicationDeadline).format('DD/MM/YYYY')} />
      </div>

      <div className="job-detail-item__row">
        <Button className="job-detail-item__button">
					Ứng tuyển vị trí này
        </Button>
        <div className="job-detail-item__share-container">
          <p className="job-detail-item__share">Chia sẻ:</p>
          <RoundFbSvg className="job-detail-item__icon"/>
          <RoundTwitterSvg className="job-detail-item__icon"/>
          <RoundLinkedInSvg className="job-detail-item__icon"/>
        </div>
      </div>
      <div>
        <RenderHtml label={'Mô tả công việc:'} html={item?.jobDescription} />
        <RenderHtml label={'Yêu cầu công việc:'} html={item?.jobRequirements} />
      </div>
    </div>
  );
});

export default JobDetailItem;
