import { Tabs } from 'antd';
import { NewsDetailSchemaForm } from './detail-schema-form';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import {
  useDetailTitleDefault,
} from '../../../../../schema-form/features/hooks/document-detail-hooks';

const { TabPane } = Tabs;

const NewsDetail = (props) => {
  const defaultTitleWithModel = useDetailTitleDefault();
  return (
    <HDocumentDrawerPanel title={defaultTitleWithModel('news')}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Content" key="1">
          <HFeatureForm {...{
            schema: NewsDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}/>
        </TabPane>
        <TabPane tab="Advanced" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="SEO" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

export default NewsDetail;
