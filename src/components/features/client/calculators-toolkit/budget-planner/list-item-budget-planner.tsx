import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Input, InputNumber, List, Select } from 'antd';
import { ArrowDownIconSvg } from 'icons';
import { TYPE_TIME } from '../constants';

import './styles.module.scss';

const { Option } = Select;

interface ListItemBudgetPlannerProps {
  dataBudgetPlanner: any;
  setData: any;
  keyBudgetPlanner: string;
}

export const totalList = (data, key) =>
  data?.reduce((a, b) => a + (b?.[key] || 0), 0);

const ListItemBudgetPlanner = ({
  dataBudgetPlanner,
  setData,
  keyBudgetPlanner,
}: ListItemBudgetPlannerProps) => {
  const { t } = useHTranslation('calculator-toolkit');
  const convertAnnual = (value, time) =>
    time === TYPE_TIME.MONTH ? value * 12 : value;

  const onChangeValue = (value, indexBudgetPlanner, key, keyBudgetPlanner) => {
    const budgetPlannerChanged = dataBudgetPlanner[keyBudgetPlanner]?.map(
      (item, index) => {
        const newItem =
          index === indexBudgetPlanner ? { ...item, [key]: value } : item;

        return {
          ...newItem,
          annual: convertAnnual(newItem?.value, newItem?.time) || 0,
        };
      },
    );

    setData({ ...dataBudgetPlanner, [keyBudgetPlanner]: budgetPlannerChanged });
  };

  return (
    <List
      header={
        <>
          <span className="label-header"></span>
          <span className="amount-header">
            {t('amount')} <span className="unit">(vnđ)</span>
          </span>
          <span className="annual-header">
            {t('annual')} <span className="unit">(vnđ)</span>
          </span>
        </>
      }
      bordered={false}
      dataSource={dataBudgetPlanner[keyBudgetPlanner]}
      renderItem={(item: any, index) => (
        <List.Item>
          <span className="label-list">{item?.label}</span>
          <span className="amount-list">
            <Input.Group compact>
              <InputNumber
                min={1}
                value={item?.value}
                placeholder={t('enterTheAmount')}
                maxLength={16}
                onChange={(e: any) =>
                  onChangeValue(e, index, 'value', keyBudgetPlanner)
                }
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value: any) => value.replace(/(,*)/g, '')}
              />
              <Select
                defaultValue={TYPE_TIME.MONTH}
                suffixIcon={<ArrowDownIconSvg />}
                value={item?.time}
                onChange={(e: any) =>
                  onChangeValue(e, index, 'time', keyBudgetPlanner)
                }
              >
                <Option
                  value={TYPE_TIME.MONTH}
                  className="bank-loan-calculator-option"
                >
                  {t('month')}
                </Option>
                <Option
                  value={TYPE_TIME.YEAR}
                  className="bank-loan-calculator-option"
                >
                  {t('year')}
                </Option>
              </Select>
            </Input.Group>
          </span>
          <span className="annual-list">
            {ConverterUtils.formatNumber(
              Math.floor(convertAnnual(item?.value, item?.time) || 0),
            )}
          </span>
        </List.Item>
      )}
      footer={
        <>
          <span className="label-footer">{t('totalAnnual')}: </span>
          <span className="annual-footer">
            {ConverterUtils.formatNumber(
              Math.floor(
                totalList(dataBudgetPlanner[keyBudgetPlanner], 'annual'),
              ),
            )}
          </span>
        </>
      }
    />
  );
};

export default ListItemBudgetPlanner;
