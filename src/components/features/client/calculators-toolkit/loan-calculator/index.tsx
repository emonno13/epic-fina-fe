import { UnorderedListOutlined } from '@ant-design/icons';
import LoanCalc from '@components/shared/client/loan-calculator';
import LoanCalculatorWrapper from '@components/shared/client/loan-calculator-wrapper';
import LoanEstimate from '@components/shared/client/loan-estimate';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import HContainer from '@components/shared/common/h-container';
import { HModal } from '@components/shared/common/h-modal';
import { PrintIconSvg, ResetIconSvg } from '@icons';
import { ArrowRightCircle } from '@icons/rsvgs/arrow-right-circle';
import { useHTranslation } from '@lib/i18n';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
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

import './styles.module.scss';

const LoanCalculator = () => {
  const componentRef: any = useRef();
  const { t } = useHTranslation('calculator-toolkit');
  const [showDetail, setShowDetail] = useState(false);
  const [iShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<VisibleModal>({
    visible: false,
    type: '',
  });
  const [dataSendEmail, setDataSendEmail] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleOpenDetail = () => setShowDetail(true);
  const router = useRouter();

  const handlePrintPage = useReactToPrint({
    content: () => componentRef?.current,
  });

  const handleClickViewDetail = (type) => {
    if (type === TYPE_MODAL.CREATE_INFO) {
      !iShowCreateForm
        ? setShowModalForm({ visible: true, type })
        : handlePrintPage && handlePrintPage();
    } else {
      !iShowCreateForm
        ? setShowModalForm({ visible: true, type })
        : handleOpenDetail();
    }
  };

  const handelQueryRouter = () => {
    const { pathname } = router;
    router.push(
      {
        pathname,
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    postLocation(router); // Log times request calc;
  }, []);

  // const isFina = true;

  // if (isFina) {
  // 	return <ModalErrorEmbedded />;
  // }

  return (
    <HContainer>
      <div className="loan-calculator-wrapper" ref={componentRef}>
        <div className="loan-calculator">
          <CalculatorsToolkitHeader />
          <h2 className="calculators-toolkit-item-title">
            Công cụ tính khoản vay
          </h2>
          <div className="calculators-toolkit-line"></div>
          <LoanCalculatorWrapper>
            <LoanCalc />
          </LoanCalculatorWrapper>

          <div className="loan-calculator-actions">
            <HButton
              className="btn-reset"
              type="primary"
              onClick={() => handelQueryRouter()}
            >
              <ResetIconSvg />
              Đặt lại
            </HButton>
            <HButton
              icon
              className="btn-print"
              onClick={() => handleClickViewDetail(TYPE_MODAL.CREATE_INFO)}
            >
              <PrintIconSvg />
              In
            </HButton>
            <HButton
              className="btn-print"
              onClick={() =>
                setShowModalForm({ visible: true, type: TYPE_MODAL.INFO })
              }
            >
              <UnorderedListOutlined /> Thông tin
            </HButton>
          </div>

          <div
            className={'loan-calculator-action'}
            onClick={() => handleClickViewDetail(TYPE_MODAL.SHOW_DETAIL)}
          >
            <h3>Xem thanh toán theo từng tháng</h3>
            <ArrowRightCircle />
          </div>
        </div>
        <CopyRightFina />
      </div>

      <HModal
        {...{
          visible: showModalForm.visible,
          onCancel: () => setShowModalForm({ visible: false, type: '' }),
          footer: null,
          title:
            showModalForm.type === TYPE_MODAL.INFO
              ? t('descriptionInformation')
              : '',
          className: `bank-loan-calculator-modal ${showModalForm.type === TYPE_MODAL.INFO ? '' : 'bank-loan-calculator-modal-no-padding'}`,
        }}
      >
        {showModalForm?.type && showModalForm?.type === TYPE_MODAL.INFO ? (
          <InformationDescription>
            <div>{contentInfo}</div>
          </InformationDescription>
        ) : (
          <FormCreateTaskSchema
            setIsShowCreateForm={setIsShowCreateForm}
            actionAfterSubmit={
              showModalForm?.type === TYPE_MODAL.CREATE_INFO
                ? handlePrintPage
                : handleOpenDetail
            }
            closeModal={() => setShowModalForm({ visible: false, type: '' })}
            setDataSendEmail={setDataSendEmail}
          />
        )}
      </HModal>

      <HModal
        {...{
          visible: showDetail,
          onCancel: () => setShowDetail(false),
          footer: null,
          width: 1280,
          closable: false,
          className: 'loan-calculator-modal',
        }}
      >
        <CalculatorsToolkitHeader />
        <LoanCalculatorWrapper>
          <LoanEstimate dataSendEmail={dataSendEmail} />
        </LoanCalculatorWrapper>
      </HModal>
    </HContainer>
  );
};

export default LoanCalculator;
