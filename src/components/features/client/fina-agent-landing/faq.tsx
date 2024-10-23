import React from 'react';
import { FaqData } from './constants';
import FaqCollapse from './components/faq-collapse';
import TextWithUnderline from './components/text-with-underline';
import QuestionSvg from './icons/question';
import { useIsMobile } from '../../../../lib/hooks/use-media';
import { useHTranslation } from '../../../../lib/i18n';

import './css/faq.module.scss';


const Faq = React.memo(() => {
  const { t } = useHTranslation('common');
  const data = FaqData(t);
  const isMobile = useIsMobile();

  return (
    <div className="faq" id="faq">
      <div style={{ marginBottom: isMobile ? '40px' : '60px' }}>
        <TextWithUnderline title={t('faq', { vn: 'FAQ - NHỮNG Câu HỎI THƯỜNG GẶP' })} />
      </div>
			
      <div className="faq__content">
        <div>
          {data.map((value, index) => {
            return <FaqCollapse key={index.toString()} index={index} question={value.question} content={value.answer} />;
          })}
        </div>
        <div className="faq-image">
          <QuestionSvg />
        </div>
      </div>
    </div>
  );
});
export default Faq;
