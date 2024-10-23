import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import PreviewQuestions from '@components/shared/questions/preview-questions';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { Tabs } from 'antd';
import { useMemo } from 'react';
const { TabPane } = Tabs;

interface SurveyResultsDetailScreenProps {
  questionGroup?: any;
}

const SurveyResultDetailInfo = ({ surveyResult }) => {
  const { t } = useHTranslation('admin-common');
  const { customer, customerInfo, createdAt } = surveyResult || {};
  const { fullName, email, tel } = useMemo(() => {
    if (customerInfo) return customerInfo;
    if (customer) {
      return {
        fullName: ConverterUtils.getFullNameUser(customer),
        email: customer.emails?.[0]?.email,
        tel: customer.tels?.[0]?.tel,
      };
    }
    return {};
  }, [customer, customerInfo]);
  return (
    <div>
      <FiledViewer
        {...{
          labelClassName: 'survey-results-info-label',
          label: t('Customer name', {
            vn: 'Tên khách hàng',
            en: 'Customer name',
          }),
          value: fullName,
        }}
      />
      <FiledViewer
        {...{
          labelClassName: 'survey-results-info-label',
          label: t('Email', { vn: 'Email', en: 'Email' }),
          value: email,
        }}
      />
      <FiledViewer
        {...{
          labelClassName: 'survey-results-info-label',
          label: t('Phone', { vn: 'Số điện thoại', en: 'Phone' }),
          value: tel,
        }}
      />
      <FiledViewer
        {...{
          labelClassName: 'survey-results-info-label',
          label: t('Created at'),
          value: ConverterUtils.fullDatetimeConverter(createdAt),
        }}
      />
    </div>
  );
};

const SurveyResultsDetailScreen = ({
  questionGroup = {},
}: SurveyResultsDetailScreenProps) => {
  const { t } = useHTranslation('admin-common');
  const surveyResult = useDocumentDetail();
  const { surveyDetails } = surveyResult;
  return (
    <Tabs>
      <TabPane key="result" tab={t('Result', { vn: 'Kết quả', en: 'Result' })}>
        <PreviewQuestions
          {...{
            questions: questionGroup?.children,
            value: surveyDetails,
            disabled: true,
          }}
        />
      </TabPane>
      <TabPane key="info" tab={t('Info', { vn: 'Thông tin', en: 'Info' })}>
        <SurveyResultDetailInfo {...{ surveyResult }} />
      </TabPane>
    </Tabs>
  );
};

export default SurveyResultsDetailScreen;
