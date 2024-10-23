import React from 'react';
import { Timeline } from 'antd';
import { JOB_CONTENT } from './constants';
import TextWithUnderline from './components/text-with-underline';
import { useHTranslation } from '../../../../lib/i18n';

import './css/job-content.module.scss';


const JobContent = React.memo(()=> {
  const { t } = useHTranslation('common');
  return (
    <div className="job-content" id="service">
      <img src={'/assets/images/fina-agent-working.png'} className={'job-content__image'} />
			
      <div className="job-content__body">
        <TextWithUnderline title={t('job-content', { vn: 'Nội dung công việc' })}/>
        {/* {JOB_CONTENT.map((value, index)=> {
					return (
						<div className="job-content-item" key={index}>
							<div className="job-content-item__position">{index + 1}</div>
							<p className="job-content-item__content">{value.content}</p>
						</div>
					);
				})} */}

        <div className="job-content__body-content">
          <Timeline>
            {JOB_CONTENT.map((value, index) => {
              return (
                <Timeline.Item
                  key={index}
                  dot={<div className="job-content-item__position">{index + 1}</div>}
                >
                  <p className="job-content-item__content">{value.content}</p>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
      </div>
    </div>
  );
});
export default JobContent;
