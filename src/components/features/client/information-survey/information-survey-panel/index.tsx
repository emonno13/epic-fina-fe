import { useState } from 'react';
// import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
// import SurveyForm from '@components/shared/survey';
import NotSubmitedPanel from './not-submited-panel';
// import SubmitedPanel from './submited-panel';
import SubmitedPanel from './submited-panel';
// import InformationSurveyLeftArrow from '../icons/information-survey.left-arrow';

interface InformationSurveyPanelProps {
  isIntroduceCustomer?: boolean;
  showPanelTitle?: boolean;
}

const InformationSurveyPanel = ({
  showPanelTitle = true,
  isIntroduceCustomer = false,
}: InformationSurveyPanelProps) => {
  const { t } = useHTranslation('common');
  const [submited, setSubmited] = useState<boolean>(false);

  return (
    <div
      className="ui-information-survey"
      style={submited ? {} : { padding: '0 24px' }}
    >
      <div
        className="information-survey-panel-wrapper"
        style={submited ? {} : { maxWidth: '500px', padding: '24px 0' }}
      >
        {!submited && (
          <NotSubmitedPanel
            {...{ showPanelTitle, isIntroduceCustomer, setSubmited }}
          />
        )}
        {submited && (
          <>
            <SubmitedPanel {...{ setSubmited }} />
            {/* // <SurveyQuestionsContainer /> */}
            {/* <SurveyForm /> */}
          </>
        )}
      </div>
      {/* {submited && (
        <div className="submited-footer">
          {!isIntroduceCustomer && (
						<Button type="primary">
							{t('What can FINA do for you?', {vn: 'FINA giúp gì được cho bạn'})}
						</Button>
					)}
          <Link href="/">
            <div className="back-to-home-page">
              <InformationSurveyLeftArrow />
              <span>
                {t('Back to home page', { vn: 'Trở lại trang chủ' })}
              </span>
            </div>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default InformationSurveyPanel;
