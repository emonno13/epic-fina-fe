import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks/document-detail-hooks';
import {
  HDocumentDrawerPanel,
  HDocumentModalPanel,
} from '@schema-form/features/panels';
import { FooterControls } from '@schema-form/features/panels/popover-footer-controls';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { Tabs } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddUserSchemaForm, schemaForm } from './form';
import { TableSchema, TableUserSchema } from './table';
const TabPane = Tabs.TabPane;

const GROUP_TABS = [
  {
    label: 'Thông tin',
    value: 'config',
  },
  {
    label: 'Agent',
    value: 'user',
  },
];

const TableUser = () => {
  const detail = useDocumentDetail();

  return (
    <HFeature
      nodeName={'config-user-assign'}
      featureId={'configUserAssign'}
      documentIdName={'configUserAssign'}
      useQueryParams={false}
    >
      <HSearchFormWithCreateButton
        withRelations={['user']}
        hiddenValues={{
          filter: {
            order: 'numberIndex ASC',
            where: {
              configAutoAssignId: detail?.id,
            },
          },
        }}
        resetIfSuccess={false}
      />

      <HDocumentModalPanel>
        <HFeatureForm
          {...{
            schema: AddUserSchemaForm,
            hideSubmitAndContinueButton: true,
            onDataReadyToSubmit: (body) => {
              body.configAutoAssignId = detail?.id;
              return body;
            },
          }}
        />
      </HDocumentModalPanel>

      <HTable
        {...{
          schema: TableUserSchema,
        }}
      />
    </HFeature>
  );
};

const DetailForm = (props) => {
  const { t } = useTranslation('admin-common');
  const detail = useDocumentDetail();
  const defaultTabKey = GROUP_TABS[0];
  const [currentTab, setCurrentTab] = useState(defaultTabKey.value);

  return (
    <HDocumentDrawerPanel
      {...{
        title: t(!detail?.id ? 'Thêm mới' : 'Chỉnh sửa'),
        footer:
          currentTab === defaultTabKey.value ? (
            <FooterControls {...props} />
          ) : null,
      }}
    >
      <Tabs onChange={setCurrentTab}>
        <TabPane tab={t(GROUP_TABS[0].label)} key={GROUP_TABS[0].value}>
          <HFeatureForm
            {...{
              schema: schemaForm,
              hideSubmitAndContinueButton: true,
            }}
          />
        </TabPane>

        <TabPane
          tab={t(GROUP_TABS[1].label)}
          key={GROUP_TABS[1].value}
          disabled={!detail?.id}
        >
          <TableUser />
        </TabPane>
      </Tabs>
    </HDocumentDrawerPanel>
  );
};

const ConfigAutoAssignTask: FC = () => {
  return (
    <HFeature nodeName={'config-auto-assign'} featureId={'configAutoAssign'}>
      <HSearchFormWithCreateButton withRelations={[]} resetIfSuccess={false} />
      <DetailForm />
      <HTable
        {...{
          schema: TableSchema,
        }}
      />
    </HFeature>
  );
};

export default ConfigAutoAssignTask;
