import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Tabs } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import ExpertDetailHeader from './header';
import { ExpertDetailOverallTab } from './overall-tab';
import { ExpertDetailReviewTab } from './review-tab';

import './expert-detail.module.scss';

const { TabPane } = Tabs;

const ExpertDetail = ({ data }) => {
  const { t } = useHTranslation('admin-common');
  const [activeTab, setActiveTab] = useState<string>('general');
  const formSectionRef = useRef<any>();
  const tabsAnchorRef = useRef<any>();
  const [ratingStats, setRatingStats] = useState<any>({});

  const fetchRatingStats = useCallback(async (userId) => {
    await FormUtils.submitForm(
      {},
      {
        nodeName: `user-ratings/statistics/${userId}`,
        method: 'get',
        onGotSuccess: (response) => {
          setRatingStats(response);
        },
      },
    );
  }, []);

  const scrollToFormSection = useCallback(() => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView();
    }
  }, [formSectionRef.current]);

  const onTabChange = useCallback(
    (activeKey) => {
      tabsAnchorRef.current.scrollIntoView();
      setActiveTab(activeKey);
    },
    [tabsAnchorRef],
  );

  useEffect(() => {
    if (data?.id) {
      fetchRatingStats(data.id);
    }
  }, [data?.id]);

  return (
    <div className="expert-detail">
      <ExpertDetailHeader
        {...{ data, onCreateRequest: scrollToFormSection, ratingStats }}
      />
      <div className="expert-detail__tabs-anchor" ref={tabsAnchorRef}></div>
      <Tabs
        {...{
          activeKey: activeTab,
          onChange: onTabChange,
        }}
      >
        <TabPane
          {...{ tab: t('General', { vn: 'Tổng quát' }), key: 'general' }}
        >
          <ExpertDetailOverallTab
            {...{
              data,
              onTabChange,
              ref: formSectionRef,
              ratingStats,
              fetchRatingStats,
            }}
          />
        </TabPane>
        <TabPane {...{ tab: t('Reviews', { vn: 'Đánh giá' }), key: 'reviews' }}>
          <ExpertDetailReviewTab
            {...{
              data,
              ref: formSectionRef,
              ratingStats,
              fetchRatingStats,
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ExpertDetail;
