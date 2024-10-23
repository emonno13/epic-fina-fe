/* eslint-disable @next/next/no-img-element */
import { MinusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import HContainer from '@components/shared/common/h-container';
import { HModal } from '@components/shared/common/h-modal';
import { ArrowDownIconSvg, PrintIconSvg, ResetIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Input, InputNumber, Radio, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useReactToPrint } from 'react-to-print';
import { useDebounce } from 'system/hooks';
import CalculatorsToolkitHeader from '../calculators-toolkit-header';
import {
  contentInfo,
  dataChartBankLoan,
  legendConfig,
  options,
  postLocation,
  TYPE_CALCULATOR,
  TYPE_GENERAL,
  TYPE_MODAL,
  TYPE_TIME,
  VisibleModal,
} from '../constants';
import CopyRightFina from '../copy-right';
import FormCreateTaskSchema from '../form-create-task-schema';
import InformationDescription from '../information-description';
import BankLoanCalculatorItem from './bank-loan-calculator-item';
import ButtonAddPortfolio from './button-add-portfolio';
import RadioGroupGeneral from './radio-group-general';
import ResultLoanCalculator from './result-loan-calculator';
import ShowTotalFormSelect from './show-total-form-select';

import './styles.module.scss';

const BankLoanCalculator = () => {
  const { t } = useHTranslation('calculator-toolkit');
  const componentRef: any = useRef();
  const [data, setData] = useState({
    generalIncome: { value: undefined, time: TYPE_TIME.MONTH },
    incomes: [{ value: undefined, time: TYPE_TIME.MONTH }],
    isShowGeneralIncome: true,

    generalOutcome: { value: undefined, time: TYPE_TIME.MONTH },
    outcomes: [{ value: undefined, time: TYPE_TIME.MONTH }],
    isShowGeneralOutcome: true,

    interestRate: undefined,
    loanMaturity: { value: undefined, time: TYPE_TIME.MONTH },
  });
  const [dataBankLoanCalculator, setDataBankLoanCalculator] = useState<any>();
  const [visibleModal, setVisibleModal] = useState<VisibleModal>({
    visible: false,
    type: '',
  });
  const [iShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);
  const [iShowChart, setIsShowChart] = useState<boolean>(false);
  const [typeCalculator, setTypeCalculator] = useState(
    TYPE_CALCULATOR.DEBT_BALANCE_IS_DECREASING,
  );
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(data, 300);
  const router = useRouter();

  const closeModal = () => setVisibleModal({ visible: false, type: '' });
  const openModal = (type) => setVisibleModal({ visible: true, type });

  const handleChangeValue = (
    e: string | number,
    key: string,
    keyData: string,
  ) => {
    setData({ ...data, [keyData]: { ...data[keyData], [key]: e } });
  };

  const handleChangeItemPortfolio = (
    e: string | number,
    key: string,
    keyData: string,
    index: number,
  ) => {
    const itemsChanged = data?.[keyData]?.map((item, i) => {
      return i === index ? { ...item, [key]: e } : item;
    });

    setData({ ...data, [keyData]: itemsChanged });
  };

  const onChangeIsGeneral = (e: boolean, key: string) =>
    setData({ ...data, [key]: e });

  const addPortfolio = (key: string) =>
    setData({
      ...data,
      [key]: [...data[key], { value: undefined, time: TYPE_TIME.MONTH }],
    });

  const removePortfolio = (index: number, key: string) =>
    setData({ ...data, [key]: data[key].filter((el, i) => i !== index) });

  const checkTimeIsMonth = (data) =>
    (data.time === TYPE_TIME.YEAR ? data?.value / 12 : data?.value) || 0;

  useEffect(() => {
    setLoading(true);

    const incomes = data?.isShowGeneralIncome
      ? checkTimeIsMonth(data?.generalIncome)
      : data?.incomes?.reduce((a, b) => a + checkTimeIsMonth(b), 0);
    const outcomes = data?.isShowGeneralOutcome
      ? checkTimeIsMonth(data?.generalOutcome)
      : data?.outcomes?.reduce((a, b) => a + checkTimeIsMonth(b), 0);
    const interestRate = data?.interestRate || 0;
    const loanMaturity =
      (data?.loanMaturity.time === TYPE_TIME.YEAR
        ? data?.loanMaturity?.value
        : (data?.loanMaturity?.value || 0) / 12) || 0;

    FormUtils.submitForm(
      {
        totalIncome: incomes,
        totalCost: outcomes,
        realInterestRate: interestRate,
        borrowedTime: loanMaturity,
        type: typeCalculator,
      },
      {
        nodeName: 'calculator/bank-loan-calculator',
        method: 'get',
        onGotSuccess: (res) => {
          setDataBankLoanCalculator(res);
          setLoading(false);
        },
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, typeCalculator]);

  const handleResetData = () => {
    setData({
      generalIncome: { value: undefined, time: TYPE_TIME.MONTH },
      incomes: [{ value: undefined, time: TYPE_TIME.MONTH }],
      isShowGeneralIncome: true,

      generalOutcome: { value: undefined, time: TYPE_TIME.MONTH },
      outcomes: [{ value: undefined, time: TYPE_TIME.MONTH }],
      isShowGeneralOutcome: true,

      interestRate: undefined,
      loanMaturity: { value: undefined, time: TYPE_TIME.MONTH },
    });
    setDataBankLoanCalculator({});
  };

  const handlePrintPage = useReactToPrint({
    content: () => componentRef?.current,
  });

  useEffect(() => {
    postLocation(router); // Log times request calc;

    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint(
          'calculator/get-min-rate-duration-calculator',
        ),
        onGotSuccess: (res) => {
          setData({
            ...data,
            interestRate: res?.minPreferentialRate,
            loanMaturity: {
              ...data?.loanMaturity,
              value: (res?.maxTime * 12) as any,
            },
          });
        },
      },
    );
  }, []);

  return (
    <HContainer>
      <div className="bank-loan-calculator-wrapper" ref={componentRef}>
        <div className="bank-loan-calculator">
          <CalculatorsToolkitHeader />

          <h2 className="calculators-toolkit-item-title">
            {t('calculatingLoanCapacity')}
          </h2>
          <div className="calculators-toolkit-line"></div>

          <Row gutter={[24, 24]} className="mb-24">
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <h3 className="bank-loan-calculator-subtitle">
                {t('enterYourIncomes')}
              </h3>
              <div className="calculators-toolkit-line"></div>

              <RadioGroupGeneral
                keyGeneral={'isShowGeneralIncome'}
                onChangeIsGeneral={onChangeIsGeneral}
                value={data?.isShowGeneralIncome}
              />

              {data?.isShowGeneralIncome ? (
                <BankLoanCalculatorItem
                  valueInput={data?.generalIncome?.value}
                  valueSelect={data?.generalIncome?.time}
                  label={t('totalIncomes')}
                  keyData={'generalIncome'}
                  onChangeValue={handleChangeValue}
                />
              ) : (
                <>
                  {data?.incomes?.map((income, index) => (
                    <div
                      className="income-portfolio"
                      key={`income-portfolio-${index}`}
                    >
                      <BankLoanCalculatorItem
                        label={`${t('incomes')} ${index + 1}`}
                        valueInput={income?.value}
                        valueSelect={income?.time}
                        keyData={'incomes'}
                        indexItem={index}
                        onChangeValue={handleChangeItemPortfolio}
                      />
                      {index > 0 && (
                        <MinusCircleOutlined
                          onClick={() => removePortfolio(index, 'incomes')}
                          className="icon-remove"
                        />
                      )}
                    </div>
                  ))}
                  <div className="calculators-toolkit-line"></div>
                  <ShowTotalFormSelect
                    total={
                      data?.isShowGeneralIncome
                        ? checkTimeIsMonth(data?.generalIncome)
                        : data?.incomes?.reduce(
                            (a, b) => a + checkTimeIsMonth(b),
                            0,
                          )
                    }
                    keyGeneral={'income'}
                  />
                  {data?.incomes.length < 3 && (
                    <ButtonAddPortfolio
                      type={TYPE_GENERAL.INCOME}
                      addPortfolio={() => addPortfolio('incomes')}
                    />
                  )}
                </>
              )}
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <h3 className="bank-loan-calculator-subtitle">
                {t('enterYourOutcomes')}
              </h3>
              <div className="calculators-toolkit-line"></div>

              <RadioGroupGeneral
                keyGeneral={'isShowGeneralOutcome'}
                onChangeIsGeneral={onChangeIsGeneral}
                value={data?.isShowGeneralOutcome}
              />

              {data?.isShowGeneralOutcome ? (
                <BankLoanCalculatorItem
                  valueInput={data?.generalOutcome?.value}
                  valueSelect={data?.generalOutcome?.time}
                  label={t('totalOutcomes')}
                  keyData={'generalOutcome'}
                  onChangeValue={handleChangeValue}
                />
              ) : (
                <>
                  {data?.outcomes?.map((outcome, index) => (
                    <div
                      className="income-portfolio"
                      key={`outcome-portfolio-${index}`}
                    >
                      <BankLoanCalculatorItem
                        valueInput={outcome?.value}
                        valueSelect={outcome?.time}
                        label={`${t('outcomes')} ${index + 1}`}
                        keyData={'outcomes'}
                        indexItem={index}
                        onChangeValue={handleChangeItemPortfolio}
                      />
                      {index > 0 && (
                        <MinusCircleOutlined
                          onClick={() => removePortfolio(index, 'outcomes')}
                          className="icon-remove"
                        />
                      )}
                    </div>
                  ))}
                  <div className="calculators-toolkit-line"></div>
                  <ShowTotalFormSelect
                    total={
                      data?.isShowGeneralOutcome
                        ? checkTimeIsMonth(data?.generalOutcome)
                        : data?.outcomes?.reduce(
                            (a, b) => a + checkTimeIsMonth(b),
                            0,
                          )
                    }
                    keyGeneral={'outcomes'}
                  />
                  {data?.outcomes.length < 3 && (
                    <ButtonAddPortfolio
                      type={TYPE_GENERAL.OUTCOME}
                      addPortfolio={() => addPortfolio('outcomes')}
                    />
                  )}
                </>
              )}
            </Col>
          </Row>

          <Row gutter={[24, 24]} className="mb-24">
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="loan-info">
                <h3 className="bank-loan-calculator-subtitle">
                  {t('enterLoanInformation')}
                </h3>
                <div className="calculators-toolkit-line"></div>
                <div>
                  <Radio.Group
                    onChange={(e) => setTypeCalculator(e.target.value)}
                    value={typeCalculator}
                  >
                    <Radio value={TYPE_CALCULATOR.DEBT_BALANCE_IS_DECREASING}>
                      {t('debtBalanceDecreasesGradually')}
                    </Radio>
                    <Radio value={TYPE_CALCULATOR.PAID_MONTHLY}>
                      {t('payingMonthly')}
                    </Radio>
                  </Radio.Group>
                </div>

                <div className="bank-loan-calculator-item loan-info-calculator-item">
                  <span className="bank-loan-calculator-item-label">
                    {t('expectedInterestRate')}
                  </span>
                  <Input.Group compact>
                    <InputNumber
                      min={0}
                      value={data.interestRate}
                      max={100}
                      onChange={(e: any) =>
                        setData({ ...data, interestRate: e })
                      }
                      formatter={(value) => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                    />
                  </Input.Group>
                </div>
                <BankLoanCalculatorItem
                  label={t('loanMaturityDate')}
                  valueInput={data?.loanMaturity?.value}
                  valueSelect={data?.loanMaturity?.time}
                  placeholder={' '}
                  keyData={'loanMaturity'}
                  onChangeValue={handleChangeValue}
                  maxLength={3}
                />
              </div>

              <HButton
                className="btn-show-chart"
                onClick={() => setIsShowChart(!iShowChart)}
              >
                {t('viewLoanBalanceChart')} <ArrowDownIconSvg />
              </HButton>

              <div className="result-wrapper-desktop">
                <h3 className="bank-loan-calculator-subtitle">
                  {t('seeYourResults')}
                </h3>
                <div className="calculators-toolkit-line"></div>
                <ResultLoanCalculator
                  dataBankLoanCalculator={dataBankLoanCalculator}
                  loading={loading}
                />
              </div>
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div
                className={`bank-loan-calculator-chart-wrapper ${iShowChart ? 'show-chart' : ''}`}
              >
                <h3 className="bank-loan-calculator-subtitle">
                  {typeCalculator === TYPE_CALCULATOR.DEBT_BALANCE_IS_DECREASING
                    ? t('debtBalanceChart')
                    : t('monthlyPayoutChart')}{' '}
                </h3>
                <div className="calculators-toolkit-line"></div>
                <div className="bank-loan-calculator-chart">
                  {/* <Spin spinning={loading}> */}
                  <Line
                    data={dataChartBankLoan(
                      dataBankLoanCalculator?.lableChart,
                      dataBankLoanCalculator?.dataChartByLoanBalance,
                      dataBankLoanCalculator?.dataChartByTotalPayment,
                      t,
                    )}
                    legend={legendConfig}
                    width={150}
                    height={180}
                    options={options(t)}
                  />
                  {/* </Spin> */}
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="result-wrapper-mobile">
                <h3 className="bank-loan-calculator-subtitle">
                  {t('seeYourResults')}
                </h3>
                <div className="calculators-toolkit-line"></div>
                <ResultLoanCalculator
                  dataBankLoanCalculator={dataBankLoanCalculator}
                  loading={loading}
                />
              </div>
            </Col>
          </Row>

          <div className="bank-loan-calculator-actions">
            <HButton
              className="btn-reset"
              type="primary"
              onClick={() => handleResetData()}
            >
              <ResetIconSvg /> {t('reset')}
            </HButton>
            <HButton
              icon
              className="btn-print"
              onClick={() => {
                if (!iShowCreateForm) {
                  openModal(TYPE_MODAL.CREATE_INFO);
                } else {
                  handlePrintPage && handlePrintPage();
                }
              }}
            >
              <PrintIconSvg />
              {t('print')}
            </HButton>
            <HButton
              className="btn-print"
              onClick={() => openModal(TYPE_MODAL.INFO)}
            >
              <UnorderedListOutlined /> {t('information')}
            </HButton>
          </div>

          <HModal
            {...{
              visible: visibleModal.visible,
              onCancel: closeModal,
              footer: null,
              title:
                visibleModal.type === TYPE_MODAL.INFO
                  ? t('descriptionInformation')
                  : '',
              className: `bank-loan-calculator-modal ${visibleModal.type === TYPE_MODAL.INFO ? '' : 'bank-loan-calculator-modal-no-padding'}`,
            }}
          >
            {visibleModal.type === TYPE_MODAL.INFO ? (
              <InformationDescription>
                <div>{contentInfo}</div>
              </InformationDescription>
            ) : (
              <FormCreateTaskSchema
                setIsShowCreateForm={setIsShowCreateForm}
                actionAfterSubmit={handlePrintPage}
                closeModal={closeModal}
              />
            )}
          </HModal>
        </div>
        <CopyRightFina />
      </div>
    </HContainer>
  );
};

export default BankLoanCalculator;
