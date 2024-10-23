import { useState } from 'react';
import SurveyNavigationGridViewPanel from './grid-view';
import SurveyNavigationListViewPanel from './list-view';

const SurveyNavigation = ({ result, currentIndex, onNavigate }) => {
  const [listView, setListView] = useState(false);
  const viewPanelProps = { result, currentIndex, onNavigate };

  const onChangeView = () => {
    setListView(!listView);
  };

  return (
    <div className="survey-navigation">
      <div className="survey-navigation__header">
        <span>Bạn đã trả lời các câu hỏi</span>
        <img
          onClick={onChangeView}
          src={
            listView
              ? '/assets/images/icons/ic_view_list.svg'
              : '/assets/images/icons/ic_view_module.svg'
          }
          width="24px"
          height="24px"
        />
      </div>
      {listView ? (
        <SurveyNavigationListViewPanel {...viewPanelProps} />
      ) : (
        <SurveyNavigationGridViewPanel {...viewPanelProps} />
      )}
    </div>
  );
};

export default SurveyNavigation;
