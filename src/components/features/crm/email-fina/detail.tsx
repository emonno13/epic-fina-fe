import { ContainerOutlined, MailOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { notification, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useState } from 'react';
import {
  contentDefault,
  DetailSchemaForm,
  EVENT_STATUS,
  ImportInsuranceBeneficiaryTable,
} from './detail-schema-form';

const TABS = {
  information: 'information',
  email: 'email',
};

export const DetailView = () => {
  const [form] = useForm();
  const isNewDocument = useIsNewDocument();
  const { t } = useHTranslation('admin-common');
  const [activeTab, setActiveTab] = useState<string>(TABS.information);
  const documentDetail = useDocumentDetail();

  const onValuesChange = (values, allValue) => {
    if (allValue?.type === 'all') {
      notification.info({
        message: 'Bạn vừa chuyển trạng thái sang gửi trực tiếp toàn hệ thống',
      });
    }
  };

  return (
    <HDocumentDrawerPanel
      hideSubmitAndContinueButton={true}
      hiddenDocumentButtonControls={
        activeTab === TABS.information ? false : true
      }
    >
      <Tabs
        defaultActiveKey={activeTab}
        onChange={setActiveTab}
        destroyInactiveTabPane={true}
      >
        <Tabs.TabPane
          tab={
            <span>
              <ContainerOutlined />
              {t('Information')}
            </span>
          }
          key={TABS.information}
        >
          <HFeatureForm
            {...{
              form,
              onValuesChange,
              schema: DetailSchemaForm,
              initialValues: {
                buttonText: '',
                content: contentDefault(
                  'https://storage.googleapis.com/crm-example/upload/beta-fina/tttttt1670235958399png',
                  'https://fina.com.vn/vn',
                  '',
                ),
                time: moment().add(1, 'hour'),
              },
              hideSubmitAndContinueButton: true,
              onDataReadyToSubmit: (values) => {
                if (isNewDocument) values.status = EVENT_STATUS.not_send;
                return {
                  ...values,
                };
              },
            }}
          />
        </Tabs.TabPane>
        {!isNewDocument && (
          <Tabs.TabPane
            tab={
              <span>
                <MailOutlined />
                {t('Emails')}
              </span>
            }
            key={TABS.email}
          >
            <p className="font-bold" style={{ fontSize: '16px' }}>
              {t('List of recipients', {
                vn: 'Danh sách người nhận',
                en: 'List of recipients',
              })}
            </p>
            <ImportInsuranceBeneficiaryTable
              data={documentDetail?.emails?.map((el) => ({ email: el }))}
            />
          </Tabs.TabPane>
        )}
      </Tabs>
    </HDocumentDrawerPanel>
  );
};
