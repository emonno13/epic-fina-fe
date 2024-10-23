import React from 'react';
// import JoinReasonItem from './components/join-reason-item';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '../../../../lib/i18n';
import TextWithUnderline from './components/text-with-underline';
import { JoinReasonData } from './constants';
// import { Col, Row } from 'antd';

import './css/join-reason.scss';

interface Props {
  icon: any;
  title: string;
  content: string;
}
const JoinReasonItem = React.memo(({ icon, title, content }: Props) => {
  return (
    <div className="join-reason-item">
      <div className="join-reason-item__icon">{icon}</div>
      <div className="join-reason-item__content">
        {title} {content}
      </div>
    </div>
  );
});

const JoinReason = React.memo(() => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  const data = JoinReasonData(t, isMobile);

  return (
    <div className="join-reason" id="review">
      <TextWithUnderline
        title={t('join-reason', {
          vn: 'LÝ DO NÊN GIA NHẬP CỘNG ĐỒNG FINA AGENT',
        })}
        isCenter
      />

      <div className="join-reason__content">
        {data.map((v, i) => (
          <JoinReasonItem
            key={i.toString()}
            icon={v.icon}
            title={v.title}
            content={v.content}
          />
        ))}
      </div>
    </div>
  );
});
export default JoinReason;
