import { HComment } from '@components/shared/common-form-elements/h-comment';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import DocumentManagement from '@components/shared/documents';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { callApi } from '@schema-form/common/actions';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useDetailForm,
  useDocumentDetail,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Collapse, notification } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EnterFinishRequestCounsellingReasonModal } from './close-deal-reason-modal';
import { checkStatust, TYPE_ACTION_CLAIM_MONEY } from './contants';
import { ClaimInsuranceSchemaDetailForm } from './schema-detail/claim-insurance.schema-detail-form';
import {
  DEAL_CLAIM_INSURANCE_STATUSES,
  mappingLabelDealClaimInsurance,
} from './utils';

import './schema-detail/shema-detail-claim.module.scss';

const { Panel } = Collapse;

interface PanelHeaderUploadProps {
  onClick?: any;
  documentTemplateId?: string;
  objectId?: string;
  objectType?: string;
  objectSubType?: string;
  isPublicUpload?: boolean;
}

export const PanelHeaderUpload = (props: PanelHeaderUploadProps) => {
  const { t } = useTranslation('admin-common');
  const deal = useDocumentDetail();

  return (
    <div className={'deal-panel-header'}>
      <LabelItem
        className={'deal-panel-header__label'}
        label={t('Giấy tờ')}
        showFirstIcon={false}
        titleTooltip={t('Giấy tờ')}
      />
    </div>
  );
};

export const DealClaimInsuranceDetails = (props) => {
  const { type } = props;

  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const [isVisibleCloseRequest, setIsVisibleCloseRequest] = useState(false);
  const documentDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const useForm = useDetailForm();
  const [isFormClaimMoney, setIsFormClaimMeney] = useState<any>({
    isVisible: false,
    typeAction: null,
  });
  const documentId = useMemo(() => documentDetail?.id, [documentDetail]);

  const initialValues = useMemo(
    () => ({
      type,
      sourceId: currentUser.id,
      startAt: moment(),
    }),
    [type, currentUser.id, currentUser.type],
  );

  const isStatust = checkStatust(documentDetail);

  const handleNextStep = async () => {
    // todo
    const claimMoney = documentDetail?.claimMoney;
    if (isStatust && !claimMoney) {
      setIsFormClaimMeney({
        isVisible: true,
        typeAction: TYPE_ACTION_CLAIM_MONEY.REQUIRED_ACTION,
      });
    } else {
      const indexStatus = mappingLabelDealClaimInsurance.findIndex(
        (step) => step?.value === documentDetail?.status,
      );
      const historyLog = {
        status: mappingLabelDealClaimInsurance[indexStatus + 1].value,
        createdAt: new Date(),
        createdById: currentUser.id,
        message: `Hồ sơ đã được chuyển sang trạng thái ${mappingLabelDealClaimInsurance[indexStatus + 1].value}`,
        createdBy: currentUser,
      };
      const body = {
        status: mappingLabelDealClaimInsurance[indexStatus + 1].value,
        history: documentDetail?.statusHistories
          ? [...documentDetail.statusHistories, historyLog]
          : [historyLog],
        claimMoney: Number(useForm?.getFieldValue('claimMoney')),
      };
      await useForm?.validateFields();
      FormUtils.submitForm(
        {
          ...body,
        },
        {
          endpoint: endpoints.generateNodeEndpoint(
            `deals/${documentDetail?.id}`,
          ),
          method: 'put',
          showSuccessMessage: false,
          onGotSuccess: (response) => {
            setDocumentDetail(response);
          },
        },
      );
    }
  };

  const handleCancelRequest = () => {
    setIsVisibleCloseRequest(true);
  };

  const SendEmailToPartner = async () => {
    // todo
    const indexStatus = mappingLabelDealClaimInsurance.findIndex(
      (step) => step?.value === documentDetail?.status,
    );
    const historyLog = {
      status: mappingLabelDealClaimInsurance[indexStatus].value,
      createdAt: new Date(),
      createdById: currentUser.id,
      message: 'Đã gửi email hồ sơ cho đối tác',
      createdBy: currentUser,
    };

    const body = {
      history: documentDetail?.statusHistories
        ? [...documentDetail.statusHistories, historyLog]
        : [historyLog],
    };

    await useForm?.validateFields();
    FormUtils.submitForm(
      {
        ...body,
      },
      {
        endpoint: endpoints.generateNodeEndpoint(`deals/${documentDetail?.id}`),
        method: 'put',
        showSuccessMessage: true,
        onGotSuccess: (response) => {
          setDocumentDetail(response);
        },
      },
    );

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint(
          `deals/send-email-to-partner-bsh/${documentDetail?.id}`,
        ),
        method: 'put',
        showSuccessMessage: true,
        onGotSuccess: (response) => {
          notification.info({
            message: 'Gửi email',
            description: 'Đã gửi email thôi tin đến email đối tác',
          });
        },
      },
    );
  };

  const renderCustomButton = () => {
    if (
      documentDetail?.status !==
      DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER
    ) {
      return (
        <>
          {documentDetail?.assigneeId && (
            <HButton
              onClick={SendEmailToPartner}
              className={'m-r-10'}
              type={'primary'}
            >
              {t('Gửi email cho đối tác', { vn: 'Gửi email cho đối tác' })}
            </HButton>
          )}
          <HButton
            onClick={handleNextStep}
            className={'m-r-10'}
            type={'primary'}
          >
            {t('Next', { vn: 'Bước tiếp theo' })}
          </HButton>
          <HButton
            onClick={handleCancelRequest}
            className={'m-r-10'}
            type={'ghost'}
            danger
          >
            {t('Partner Reject', { vn: 'Đối tác từ chối' })}
          </HButton>
        </>
      );
    }

    return <></>;
  };

  const handleClick = () => {
    let resourceUrl = `/deals/${documentDetail.id}/documents/complete`;
    let updateData: any = {};

    if (documentDetail.isDocumentsCompleted) {
      resourceUrl = `/deals/${documentDetail.id}`;
      updateData = {
        isDocumentsCompleted: false,
      };
    }

    const endpoint = endpoints.endpointWithApiDomain(resourceUrl);
    dispatch(
      callApi({
        method: 'put',
        params: updateData,
        endpoint,
        callback: handleResponse,
      }),
    );
  };

  const handleResponse = (responseData) => {
    if (!responseData?.error) {
      notification.info({
        message: 'The documents for deal has been completed!',
      });

      setDocumentDetail({
        ...document,
        isDocumentsCompleted: !documentDetail.isDocumentsCompleted,
      });
    }
  };

  return (
    <HDocumentDrawerPanel
      {...{
        title: t('Claim insurance', { vn: 'Yêu cầu bồi thường bảo hiểm' }),
        customButton: renderCustomButton(),
        hideSubmitAndContinueButton: true,
        hiddenDocumentButtonControls:
          documentDetail?.status ===
          DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER,
        className: 'claim-insurance-drawer',
      }}
    >
      <HFeatureForm
        {...{
          schema: ClaimInsuranceSchemaDetailForm,
          initialValues,
          transport: {
            initialValues,
            isFormClaimMoney,
            setIsFormClaimMeney,
          },
        }}
      />

      <EnterFinishRequestCounsellingReasonModal
        {...{
          isVisibleCloseRequest,
          setIsVisibleCloseRequest,
        }}
      />

      <Collapse defaultActiveKey={['1']} className={'m-t-20 m-b-20'}>
        <Panel
          forceRender={true}
          header={
            <PanelHeaderUpload
              {...{
                onClick: handleClick,
                objectId: documentDetail?.id,
                objectType: 'deal_claim_insurance',
                documentTemplateId: documentDetail?.documentTemplateId,
              }}
            />
          }
          key="1"
        >
          <DocumentManagement
            {...{
              objectId: documentDetail?.id,
              objectType: 'deal_claim_insurance',
              documentTemplateId: documentDetail?.documentTemplateId,
              isDisabled: documentDetail?.isDocumentsCompleted,
            }}
          />
        </Panel>
      </Collapse>

      <HComment {...{ className: 'm-t-10' }} />
    </HDocumentDrawerPanel>
  );
};

export default DealClaimInsuranceDetails;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
