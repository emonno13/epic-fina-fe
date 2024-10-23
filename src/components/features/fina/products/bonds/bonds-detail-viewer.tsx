import {
  ContainerOutlined,
  FileOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { Tabs } from 'antd';
import { TabLabel } from '../loans/loan-detail-viewer.tabs';
import BondsInformationForm from './bonds-information';
const { TabPane } = Tabs;

const BondsDetailViewer = () => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs hideAdd>
      <TabPane
        key={'bonds-information'}
        {...{
          tab: (
            <TabLabel
              Icon={ContainerOutlined}
              label={t('Thông tin trái phiếu', { en: 'Bonds Information' })}
            />
          ),
          closable: false,
        }}
      >
        <BondsInformationForm />
      </TabPane>
      <TabPane
        key={'commission-settings'}
        {...{
          tab: (
            <TabLabel
              Icon={FileOutlined}
              label={t('Cài đặt hoa hồng', { en: 'Commission settings' })}
            />
          ),
          closable: false,
          disabled: !documentDetail,
        }}
      ></TabPane>
      <TabPane
        key={'commission-change-history'}
        {...{
          tab: (
            <TabLabel
              Icon={SettingOutlined}
              label={t('Lịch sử thay đổi hoa hồng', {
                en: 'Commission change history',
              })}
            />
          ),
          closable: false,
          disabled: !documentDetail,
        }}
      ></TabPane>
    </Tabs>
  );
};

export default BondsDetailViewer;
