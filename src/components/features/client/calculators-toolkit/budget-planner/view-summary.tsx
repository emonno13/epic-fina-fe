import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { List } from 'antd';
import { useEffect, useState } from 'react';

import './styles.module.scss';

interface ViewSummaryProps {
  data: any;
}

const ViewSummary = ({ data: dataBudgetPlanner }: ViewSummaryProps) => {
  const { t } = useHTranslation('calculator-toolkit');
  const [tableResultData, setTableResultData] = useState<any>([]);

  useEffect(() => {
    FormUtils.submitForm(
      { dataBudgetPlanner },
      {
        nodeName: 'calculator/budget-planner-calculator',
        method: 'get',
        onGotSuccess: (res) => setTableResultData(res),
      },
    );
  }, [dataBudgetPlanner]);

  return (
    <div className="budget-planner-view-summary">
      <List
        header={
          <>
            <span className="label-header"></span>
            <span className="amount-header">
              {t('month')} <span className="unit">(vnđ)</span>
            </span>
            <span className="annual-header">
              {t('annual')} <span className="unit">(vnđ)</span>
            </span>
          </>
        }
        bordered={false}
        dataSource={tableResultData}
        renderItem={(item: any) => (
          <List.Item>
            <span className="label-list">{t(item?.label)}</span>
            <span className="amount-list">
              {ConverterUtils.formatNumber(Math.floor(item?.monthly))}
            </span>
            <span className="annual-list">
              {ConverterUtils.formatNumber(Math.floor(item?.annual))}
            </span>
          </List.Item>
        )}
        footer={
          <>
            <span className="label-list uppercase">{t('surplus')}</span>
            <span className="amount-list">
              {ConverterUtils.formatNumber(
                Math.floor(
                  tableResultData?.[0]?.monthly -
                    tableResultData?.[tableResultData.length - 1]?.monthly,
                ),
              )}{' '}
              vnđ
            </span>
            <span className="annual-list">
              {ConverterUtils.formatNumber(
                Math.floor(
                  tableResultData?.[0]?.annual -
                    tableResultData?.[tableResultData.length - 1]?.annual,
                ),
              )}{' '}
              vnđ
            </span>
          </>
        }
      />
    </div>
  );
};

export default ViewSummary;
