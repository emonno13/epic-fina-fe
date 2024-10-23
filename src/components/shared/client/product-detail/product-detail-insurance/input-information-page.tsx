import { CheckCircleFilled } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HModal } from '@components/shared/common/h-modal';
import { ArrowLeftCircleSvg, CloseIconLargeSvg } from '@icons';
import { IconBuySuccess } from '@icons/rsvgs/buy-success-icon';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useAuth } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Steps } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BillingPaymentInsurance from './buy-insurance/billing-payment-insurance';
import ContractHolderInformation from './buy-insurance/contract-information';
import { TYPE } from './buy-insurance/form-staff';
import InfoBeneficiary from './buy-insurance/info-beneficiary';
import PaymentInsurance from './buy-insurance/payment-insurance';
import TransactionInsurance from './buy-insurance/transaction-insurance';
import { renderPrice } from './constants';

import './product-detail-insurance.module.scss';

const KEY_CTV = 'FINA_COLLABORATOR';
const code = 'INSURANCE_BSH';

const InputInformationPage = ({ data }) => {
  const router = useRouter();

  //   const { info, name, description, slug } = data;
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();
  const { currentUser } = useAuth();
  const { type, positionCodes } = currentUser;
  const findPositionCodeCOLLABORATOR = positionCodes?.find(
    (el) => el === KEY_CTV,
  );
  const isCollaborator =
    (findPositionCodeCOLLABORATOR &&
      (type === 'collaborator' || type === 'customer')) ||
    type === 'staff';

  const [paymentLink, setPaymentLink] = useState('');
  const [customers, setCustomers] = useState([]);
  const [stepBuyInsurance, setStepBuyInsurance] = useState(0);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [showModalBuyInsurance, setShowModalBuyInsurance] = useState(false);
  const [showModalConfirmClose, setShowModalConfirmClose] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [orgInsurance, setOrgInsurance] = useState<any>(null);

  const closeModalBuyInsurance = () => {
    setStepBuyInsurance(0);
    setCustomers([]);
    setCustomerDetail(null);
    setPaymentLink('');
    form.resetFields();
    setShowModalBuyInsurance(false);
    setShowModalConfirmClose(false);
    setTransactionId('');
  };

  const hiddenModalBuyInsurance = () => {
    if (stepBuyInsurance === 3) {
      setShowModalConfirmClose(true);
    } else {
      closeModalBuyInsurance();
    }
  };

  const getTransaction = (transactionId: string) => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain(
          `/transactions/${transactionId}`,
        ),
        hiddenValues: {
          filter: {
            where: {
              fields: ['id', 'status'],
            },
          },
        },
        onGotSuccess: (res) => {
          if (res?.status === 'SUCCEEDED') {
            setStepBuyInsurance(4);
          }
        },
      },
    );
  };

  if (transactionId && stepBuyInsurance > 2) {
    setTimeout(() => {
      getTransaction(transactionId);
    }, 10000);
  }

  const packages =
    data?.packages?.map((el, index) => ({
      ...el,
      value: index,
      label: `${el?.name}-${
        isCollaborator
          ? FormatterUtils.formatAmount(el?.price)
          : FormatterUtils.formatAmount(el.priceRoot)
      } VNĐ`,
    })) || [];
  const listPackageStaff =
    packages?.filter((el) => el?.objects?.find((e) => e === TYPE?.staff)) || [];
  const listPackageRelative =
    packages?.filter((el) => el?.objects?.find((e) => e === TYPE?.relative)) ||
    [];

  const handleBackStep = () => {
    const newStep = stepBuyInsurance - 1;
    if (newStep < 0) {
      router.back();
      return;
    }
    setStepBuyInsurance(newStep);
  };

  const renderTitleModal = () => {
    return (
      <div>
        <div className="flex flex-row items-center !gap-x-5">
          <ArrowLeftCircleSvg
            onClick={handleBackStep}
            className="cursor-pointer hover:!opacity-40"
          />
          {/* <p style={{ margin: '0px' }}>Quay</p> */}
        </div>
        {/* <HButton shape="circle" icon={<ArrowLeftCircleSvg />} type="ghost" /> */}
        <Steps
          className="insurance-steps__title-container"
          size="small"
          labelPlacement="vertical"
          current={stepBuyInsurance}
        >
          <Steps.Step title="Chủ hợp đồng" icon={<CheckCircleFilled />} />
          <Steps.Step
            title="Người được bảo hiểm"
            icon={<CheckCircleFilled />}
          />
          <Steps.Step title="Kiểm tra" icon={<CheckCircleFilled />} />
          <Steps.Step title="Thanh toán" icon={<CheckCircleFilled />} />
        </Steps>
      </div>
    );
  };

  const renderClassNameModal = () => {
    return stepBuyInsurance === 1 || stepBuyInsurance === 2
      ? 'hidden-icon-close-modal'
      : '';
  };

  const formValue = {
    ...form.getFieldsValue(),
    customers: customers?.map((customer: any) => ({
      ...customer,
      meta: packages?.find((el) => el.value === customer?.package),
    })),
  };

  const totalAmount = () => {
    let amount = 0;
    formValue?.customers?.forEach(
      (customer) => (amount = renderPrice(customer, isCollaborator) + amount),
    );

    return {
      value: amount || 0,
      label: FormatterUtils.formatAmount(amount, 'vnđ') || '',
    };
  };

  const getConfiguration = async () => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(
          `/configurations/public/${code}`,
        ),
        method: 'get',
        onGotSuccess: (response) => {
          setOrgInsurance(response);
        },
      },
    );
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <div className="insurance-detail-page">
      <Head>
        {/* <meta property="og:url" content={`/san-pham-bao-hiem/${slug}`} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={
            info?.image?.url || '/assets/images/icons/ic_insurance-active.svg'
          }
        />
        <title>{name}</title> */}
      </Head>

      <div className="max-w-1100 m-auto">
        <div
          // width={stepBuyInsurance === 3 ? 1080 : 500}
          // width={500}
          // title={renderTitleModal()}
          // onCancel={hiddenModalBuyInsurance}
          className="buying-insurance-modal"
          // closeIcon={<CloseIconLargeSvg />}
          style={{
            padding: '40px',
          }}
        >
          {renderTitleModal()}
          {/* Chủ hợp đồng */}
          <div className={stepBuyInsurance === 0 ? 'show' : 'hidden'}>
            <ContractHolderInformation
              customers={customers}
              form={form}
              setCustomerDetail={setCustomerDetail}
              setCustomers={setCustomers}
              setStepBuyInsurance={setStepBuyInsurance}
              totalAmount={totalAmount()}
              isCollaborator={isCollaborator}
            />
          </div>

          {/* Người được bảo hiểm */}
          {stepBuyInsurance === 1 && (
            <InfoBeneficiary
              setStepBuyInsurance={setStepBuyInsurance}
              customers={customers}
              setCustomers={setCustomers}
              packages={{ listPackageStaff, listPackageRelative }}
              customerDetail={customerDetail}
              setCustomerDetail={setCustomerDetail}
            />
          )}

          {/* Kiểm tra */}
          {stepBuyInsurance === 2 && (
            <div className="payment-insurance">
              <PaymentInsurance
                setStepBuyInsurance={setStepBuyInsurance}
                data={data}
                formValue={formValue}
                totalAmount={totalAmount()}
                isCollaborator={isCollaborator}
              />
            </div>
          )}

          {/* Thanh toán */}
          {stepBuyInsurance === 3 && (
            <>
              <BillingPaymentInsurance totalAmount={totalAmount} />
            </>
          )}

          {/* Thanh toán */}
          {stepBuyInsurance === 3 && paymentLink && (
            <TransactionInsurance link={paymentLink} />
          )}

          {stepBuyInsurance === 4 && (
            <div className="payment-insurance-success">
              <IconBuySuccess />
              <div className="payment-insurance-success-description">
                Mua bảo hiểm
              </div>
              <h2>Thành công</h2>

              <HButton
                type="primary"
                block
                className="payment-button-success"
                onClick={hiddenModalBuyInsurance}
              >
                Hoàn tất
              </HButton>
            </div>
          )}
        </div>
      </div>

      <HModal
        visible={showModalConfirmClose}
        destroyOnClose
        width={400}
        maskClosable={false}
        footer={null}
        title={'Xác nhận'}
        onCancel={() => setShowModalConfirmClose(false)}
        className={'buying-insurance-modal'}
        closeIcon={<CloseIconLargeSvg />}
      >
        <div className="confirm-close-buy-insurance">
          <p className="confirm-close-buy-insurance-description">
            Bạn có chắc chắn muốn dừng thanh toán ?
          </p>

          <div className="buying-insurance-modal-actions">
            <HButton
              type="ghost"
              onClick={() => setShowModalConfirmClose(false)}
            >
              Không
            </HButton>
            <HButton type="primary" onClick={closeModalBuyInsurance}>
              Có
            </HButton>
          </div>
        </div>
      </HModal>
    </div>
  );
};

export default InputInformationPage;
