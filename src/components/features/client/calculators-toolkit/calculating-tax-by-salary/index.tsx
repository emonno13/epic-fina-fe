import { QuestionCircleTwoTone } from '@ant-design/icons';
import HContainer from '@components/shared/common/h-container';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { InputNumber } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useDebounce } from 'system/hooks';
import ButtonAction from '../button-action';
import CalculatorsToolkitHeader from '../calculators-toolkit-header';
import {
  contentInfo,
  postLocation,
  TYPE_MODAL,
  VisibleModal,
} from '../constants';
import CopyRightFina from '../copy-right';
import FormCreateTaskSchema from '../form-create-task-schema';
import InformationDescription from '../information-description';
import {
  dataDescription,
  getDataViewDetail,
  LABEL_INPUT,
  TYPE_RADIO,
} from './constant';

import './styles.module.scss';

interface TypeDataInput {
  income?: number;
  salaryPaidForInsurance?: number;
  numberOfDependents?: number;
}

const CalculatingTaxBySalary = () => {
  const { t } = useHTranslation('calculator-toolkit');
  const router = useRouter();

  const [typeConvert, setTypeConvert] = useState(TYPE_RADIO.GROSS_TO_NET);
  const [dataInput, setDataInput] = useState<TypeDataInput>({
    income: undefined,
    salaryPaidForInsurance: undefined,
    numberOfDependents: undefined,
  });
  const [dataDetail, setDataDetail] = useState({
    netSalary: 0,
    BHXH: 0,
    BHYT: 0,
    BHTN: 0,
    netTaxableIncome: 0,
    reducingNPTFamilySituation: 0,
    incomeTaxes: 0,
    TNCNTax: 0,
    grossSalary: 0,
  });
  const [visibleModal, setVisibleModal] = useState<VisibleModal>({
    visible: false,
    type: '',
  });
  const [iShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);
  const componentRef: any = useRef();

  const dataViewDetail = getDataViewDetail(dataDetail, t, typeConvert);

  const handleDataDetail = (data, label) => {
    if (label === LABEL_INPUT.INCOME) {
      setDataInput({
        ...dataInput,
        income: data,
      });
    }
    if (label === LABEL_INPUT.Salary_PAID_FOR_INSURANCE) {
      setDataInput({
        ...dataInput,
        salaryPaidForInsurance: data,
      });
    }
    if (label === LABEL_INPUT.NUMBER_OF_DEPENDENTS) {
      setDataInput({
        ...dataInput,
        numberOfDependents: data,
      });
    }
  };
  const debouncedValue = useDebounce(dataInput, 200);
  const closeModal = () => setVisibleModal({ visible: false, type: '' });
  const openModal = (type) => setVisibleModal({ visible: true, type });
  const handlePrintPage = useReactToPrint({
    content: () => componentRef?.current,
  });

  const actionReset = () => {
    setDataInput({
      income: undefined,
      salaryPaidForInsurance: undefined,
      numberOfDependents: undefined,
    });
  };

  const actionPrint = () => {
    if (!iShowCreateForm) {
      openModal(TYPE_MODAL.CREATE_INFO);
    } else {
      handlePrintPage && handlePrintPage();
    }
  };

  const actionInformation = () => openModal(TYPE_MODAL.INFO);

  useEffect(() => {
    postLocation(router); // Log times request calc;
  }, []);

  useEffect(() => {
    FormUtils.submitForm(
      { dataInput },
      {
        nodeName: 'calculator/calculating-tax-by-salary',
        method: 'get',
        onGotSuccess: (res) => setDataDetail(res),
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInput, debouncedValue, typeConvert]);

  return (
    <HContainer>
      <div className="calculating-tax-by-salary-wrapper" ref={componentRef}>
        <div className="calculating-tax-by-salary">
          <CalculatorsToolkitHeader />
          <h2 className="calculating-tax-by-salary-title">
            {t('calculateTaxIncomeBySalary')}
          </h2>
          <div className="calculators-toolkit-line"></div>
          <div className="calculating-tax-by-salary-content">
            <div className="content-input">
              <div className="content-input__title-convert">
                {t('grossToNet')}{' '}
              </div>
              <RenderInput
                label={LABEL_INPUT.INCOME}
                t={t}
                handleDataDetail={handleDataDetail}
                dataInput={dataInput}
              />
              <RenderInput
                label={LABEL_INPUT.Salary_PAID_FOR_INSURANCE}
                t={t}
                handleDataDetail={handleDataDetail}
                dataInput={dataInput}
              />
              <RenderInput
                label={LABEL_INPUT.NUMBER_OF_DEPENDENTS}
                t={t}
                handleDataDetail={handleDataDetail}
                dataInput={dataInput}
              />
            </div>
            <div className="content-input">
              <div className="title-view-detail">
                {' '}
                {typeConvert === TYPE_RADIO.NET_TO_GROSS
                  ? t('exchangeNetToGross')
                  : t('exchangeGrossToNet')}{' '}
              </div>
              {dataViewDetail?.map((elementDetail) => {
                return (
                  <div key={elementDetail?.label}>
                    <ViewShowDetail
                      {...{
                        label: elementDetail?.label,
                        value: elementDetail?.value,
                        className: elementDetail?.className,
                        showDescription: elementDetail.label === 'Thuế TNCN',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <ButtonAction
            {...{
              actionReset,
              actionPrint,
              actionInformation,
            }}
          />
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

export default CalculatingTaxBySalary;

const RenderInput = ({ label, t, handleDataDetail, dataInput }) => {
  return (
    <div className="render-input-content">
      <div className="render-input-lable">{t(`${label}`)}</div>
      <InputNumber
        value={dataInput[`${label}`]}
        min={0}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        onChange={(data) => handleDataDetail(data, label)}
        className="input-lable"
      />
    </div>
  );
};

const ViewShowDetail = ({
  label,
  value,
  className = '',
  showDescription = false,
  index = '',
}) => {
  const [isShowDescription, setIsShowDescription] = useState<boolean>(false);
  const { t } = useHTranslation('calculator-toolkit');

  return (
    <>
      <div className={`content-view-show-detail ${className}`}>
        {index ? <div className="index-show-detial">{index}</div> : <></>}
        <div
          className={`${index ? 'lable-show-detail-by-index' : 'lable-show-detail'}`}
        >
          <div>{label}</div>
          {showDescription && (
            <div className="show-description-tax-tncn">
              <QuestionCircleTwoTone
                className="m-l-15"
                onClick={() => setIsShowDescription(!isShowDescription)}
              />
            </div>
          )}
        </div>
        <div
          className={`${index ? 'value-show-detailby-index' : 'value-show-detail'}`}
        >
          {value}
        </div>
      </div>
      <div className="calculators-toolkit-line"></div>
      <HModal
        {...{
          visible: isShowDescription,
          onCancel: () => setIsShowDescription(false),
          footer: null,
        }}
      >
        <div className="title-description-calculating-tax-by-salary">
          {t('personalIncomeTaxDetail')}
        </div>
        <ViewShowDetail
          label={'Thu nhập tính thuế'}
          value={'Thuế suất'}
          index="Bậc"
          className="content-view-show-detail-header"
        />

        {dataDescription.map((elementDescription, index) => (
          <div key={elementDescription.label}>
            <ViewShowDetail
              {...{
                label: elementDescription.label,
                value: elementDescription.tax,
                index: (index + 1).toString(),
              }}
            />
          </div>
        ))}
      </HModal>
    </>
  );
};
