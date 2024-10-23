import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { HTable } from '@schema-form/features';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
  useSetDocumentDetailVisibility,
} from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { Button, Col, Row, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import {
  UserInfoInsuranceTableSchema,
  UserInfoLoanDealsTableSchema,
} from './search-user.table';
import { UserInfoSchema } from './user-info-schema';
import UserOwners from './user-owners';

const { TabPane } = Tabs;

const UserInfoModal = () => {
  const documentDetail = useDocumentDetail() || {};
  const setDocumentDetail = useSetDocumentDetail();
  const searchForm = useSearchForm();
  const setDocumentDetailVisibility = useSetDocumentDetailVisibility();
  const visible = documentDetail?._viewUserInfo || false;
  const [tabKey, setTabKey] = useState<string>('loan');

  const {
    fullName,
    firstName,
    lastName,
    tels = [],
    emails = [],
    _userInfoTabKey = 'loan',
  } = documentDetail;
  const { t } = useHTranslation('common');
  const query = searchForm?.getFieldsValue()?._q || '';

  const onCancel = () => {
    setTabKey('loan');
    setDocumentDetail({}, false);
  };

  const onTabChange = (activeKey) => {
    setTabKey(activeKey);
  };

  const tabsData = useMemo(() => {
    const { deals, insuranceTransactions } = documentDetail;
    return [
      {
        tab: `${t('Loan deals', { vn: 'Hồ sơ vay' })} (${deals?.length})`,
        tableData: deals || [],
        tableColumns: UserInfoLoanDealsTableSchema(t),
        key: 'loan',
      },
      {
        tab: `${t('Insurance', { vn: 'Bảo hiểm' })} (${insuranceTransactions?.length})`,
        tableData: insuranceTransactions || [],
        tableColumns: UserInfoInsuranceTableSchema(t),
        key: 'insurance',
      },
    ];
  }, [documentDetail]);

  useEffect(() => {
    if (_userInfoTabKey) {
      setTabKey(_userInfoTabKey);
    }
  }, [_userInfoTabKey]);

  return (
    <HModal
      {...{
        visible,
        onCancel,
        centered: true,
        width: '80%',
        destroyOnClose: true,
        footer: (
          <div>
            <Button onClick={onCancel}>{t('Close', { vn: 'Đóng' })}</Button>
            <Button
              {...{
                type: 'primary',
                onClick: () => setDocumentDetailVisibility(true),
              }}
            >
              {t('Request permission to use', { vn: 'Yêu cầu quyền sử dụng' })}
            </Button>
          </div>
        ),
      }}
    >
      <div>
        <LabelItem
          {...{
            label: t("CUSTOMER'S INFO", { vn: 'THÔNG TIN KHÁCH HÀNG' }),
            titleTooltip: t("CUSTOMER'S INFO", { vn: 'THÔNG TIN KHÁCH HÀNG' }),
          }}
        />
        <Row gutter={32}>
          <Col span={12}>
            <HForm
              {...{
                initialValues: {
                  ...documentDetail,
                  fullName: fullName || `${lastName || ''} ${firstName || ''}`,
                  phone: Array.isArray(tels) && tels.length > 0 ? query : '',
                  email:
                    Array.isArray(emails) && emails.length > 0 ? query : '',
                },
                schema: UserInfoSchema,
                removeControlActions: true,
              }}
            />
          </Col>
          <Col span={12}>
            <UserOwners record={documentDetail} />
          </Col>
        </Row>
        <Tabs
          {...{
            activeKey: tabKey,
            onChange: onTabChange,
          }}
        >
          {tabsData.map((tabData) => {
            const { key, tab, tableColumns, tableData } = tabData;
            return (
              <TabPane key={key} tab={tab}>
                <HTable
                  {...{
                    dataSource: tableData,
                    schema: tableColumns,
                  }}
                />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </HModal>
  );
};

export default UserInfoModal;
