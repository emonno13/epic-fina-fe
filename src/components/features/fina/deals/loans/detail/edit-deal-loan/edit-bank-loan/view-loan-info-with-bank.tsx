import { HForm } from '@schema-form/h-form';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { useSetDocumentFragments } from '../../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { ORGANIZATION_TYPES } from '../../../../../../../../types/organization';
import { requestDealDetailsByDeal } from '../../../../actions';
import { BankInformation } from '../../component-deal-loan-common/bank-information';
import { BankStaff } from '../../component-deal-loan-common/bank-staff';
import { HandlingStaff } from '../../component-deal-loan-common/handling-staff';
import { DealLoanProfile } from '../../component-deal-loan-common/loan-profile';
import { EditLoanDetailWithBankSchemaForm } from './edit-loan-with-bank.schema-form';

export const ViewLoanInformationDetailWithBank = ({
  detail,
  onEditDocument,
  dealDetail,
  isEditBank,
  setIsEditBank,
  currentStep,
}) => {
  const dispatch = useDispatch();
  const setDocumentFragments = useSetDocumentFragments();

  const onGotSuccess = () => {
    dispatch(
      requestDealDetailsByDeal({
        params: {
          id: dealDetail?.id,
        },
        callback: (response) => {
          const detailDetailNew = detail?.dealDetails?.map((el) => {
            if (el?.id === response?.data?.[0]?.id) {
              return response?.data?.[0];
            }
            return el;
          });
          setDocumentFragments({ dealDetails: detailDetailNew });
        },
      }),
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <DealLoanProfile
          {...{
            detail,
            dealDetail,
            onEditDocument,
            type: ORGANIZATION_TYPES.BANK,
          }}
        />
      </Col>
      <Col span={24}>
        <ViewFormEditDealDetail
          {...{ isEditBank, detail, dealDetail, setIsEditBank, onGotSuccess }}
        />
      </Col>
      <Col span={12}>
        <HandlingStaff {...{ detail, onEditDocument }} />
      </Col>
      <Col span={12}>
        <BankStaff {...{ isEditBank, dealDetail, onEditDocument }} />
      </Col>
      <Col span={24}>
        <BankInformation
          {...{ isEditBank, dealDetail, onEditDocument, currentStep, detail }}
        />
      </Col>
    </Row>
  );
};

export const ViewFormEditDealDetail = (props) => {
  const { isEditBank, detail, dealDetail, setIsEditBank, onGotSuccess } = props;
  const { t } = useTranslation('admin-common');
  const [form] = Form.useForm();
  const handleSubmitWithBank = () => {
    form?.submit();
    setIsEditBank(false);
  };
  const onCloseDocument = () => {
    setIsEditBank(false);
  };

  if (!isEditBank) {
    return null;
  }

  return (
    <>
      <HForm
        {...{
          hideControlButton: true,
          featureId: 'deal-details',
          nodeName: `deal-details/${dealDetail?.id}`,
          method: 'put',
          form: form,
          initialValues: dealDetail,
          schema: EditLoanDetailWithBankSchemaForm,
          hiddenValues: {
            dealId: detail?.id,
          },
          onGotSuccess: onGotSuccess,
        }}
      />
      <Row justify={'end'} className={'m-b-20'}>
        <Button type="primary" onClick={handleSubmitWithBank}>
          {t('Save')}
        </Button>
        <Button
          type="primary"
          danger
          onClick={onCloseDocument}
          className={'m-r-5 m-l-5'}
        >
          {t('Close')}
        </Button>
      </Row>
    </>
  );
};
