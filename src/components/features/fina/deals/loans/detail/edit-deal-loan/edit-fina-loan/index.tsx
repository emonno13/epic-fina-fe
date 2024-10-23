import DownloadZipFileDocument from '@components/features/documents/download-zip-file';
import {
  DEAL_STATUS,
  DEAL_STATUSES,
  DEAL_TYPE,
  PERMISSION_DEAL,
} from '@components/features/fina/deals/utils';
import { WithPermission } from '@components/shared/accessibility/with-permission';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { TooltipIcon } from '@icons/rsvgs/tooltip-icon';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import { CommentUtils } from '@lib/utils/comment';
import { callApi } from '@schema-form/common/actions';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useApiEndpoint,
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import {
  useDocumentDetailVisibility,
  useHideDocumentDetail,
  useSubmitAndContinueButton,
  useViewTypeOfDeal,
} from '@schema-form/features/hooks/document-detail-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { ORGANIZATION_TYPES, USER_TYPES } from '@types/organization';
import { Button, Collapse, notification, Row } from 'antd';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'underscore';
import { VIEW_TYPE_OF_DEAL } from '../../..';
import { HButtonControlDeal } from '../../component-deal-loan-common/button-control';
import { ButtonDealSteps } from '../../component-deal-loan-common/button-deal-steps';
import ManagerLoanCustomerUploadDocument from '../customer-upload';
import { EditLoanSchemaForm } from '../edit-loan-schema-form';
import { ProgressView } from '../view-progress';
import { ViewLoanInformationDetail } from './view-loan-info-with-fina';

import './manager-loan-with-fina.scss';

interface ManagerLoanWithFinaProps {
  documentTemplateId?: string;
  objectId?: string;
  objectType?: string;
  objectSubType?: string;
  isPublicUpload?: boolean;
  dragDropContent?: ReactNode;
}

interface PanelHeaderUploadProps extends ManagerLoanWithFinaProps {
  onClick?: any;
}

export const DocumentManagement = dynamic(
  () => import('@components/shared/documents'),
  { ssr: false },
);

const { Panel } = Collapse;

const DEAL_STATUSES_STEPS = Object.keys(DEAL_STATUS);

export const PanelHeaderUpload = (props: PanelHeaderUploadProps) => {
  const { t } = useTranslation('admin-common');
  const deal = useDocumentDetail();
  const buttonText = deal?.isDocumentsCompleted ? 'Chỉnh sửa' : 'Phê duyệt';
  const currentUser = useCurrentUser();
  const {
    onClick = (f) => f,
    documentTemplateId,
    objectId,
    objectType,
    objectSubType,
  } = props;
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const handleCopyToClipBoard = async () => {
    const currenDomain = location.origin;
    const hrefUploadDocumentTemplateFiles = `document-template-files/upload/${documentTemplateId}?objectId=${objectId}&objectType=${objectType}&objectSubtype=${objectSubType}&filter=%5Binclude%5D%5B0%5D%5Brelation%5D=file&filter%5Binclude%5D%5B1%5D%5Brelation%5D=document`;

    const response = await FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/short-urls'),
        hiddenValues: {
          filter: {
            where: {
              fullUrl: hrefUploadDocumentTemplateFiles,
            },
          },
        },
      },
    );
    CommentUtils.copyToClipboard(
      `${currenDomain}/api/v1/short-urls/redirect/${response.shortCode}`,
      t('addToClipBoardSuccessfully'),
    );
  };

  const fileName = useMemo(
    () =>
      deal?.realEstateInfo?.apartmentCode ||
      deal?.code + '_' + deal?.user?.fullName,
    [deal, deal?.realEstateInfo, deal?.user],
  );

  return (
    <div className={'deal-panel-header'}>
      <LabelItem
        {...{
          label: <span>{t('Giấy tờ')}</span>,
          titleTooltip: t('Giấy tờ'),
          firstIcon: <></>,
          lastIcon: (
            <span>
              <TooltipIcon />
            </span>
          ),
          uppercaseLabel: false,
          style: {
            fontWeight: 700,
            color: '#064DD6',
          },
          labelStrong: false,
        }}
      />
      {isOrgStaff && (
        <div className={'deal-panel-header__action-btn'}>
          <Button
            className={'deal-panel-header__action-btn__upload m-r-10'}
            type="default"
            shape="round"
            onClick={handleCopyToClipBoard}
          >
            {t('createLinkUpload')}
          </Button>

          <Button type={'primary'} shape={'round'} onClick={onClick}>
            {t(buttonText)}
          </Button>

          <DownloadZipFileDocument {...{ fileName, documentTemplateId }} />
        </div>
      )}
    </div>
  );
};

export const ManagerLoanWithFina = (props: ManagerLoanWithFinaProps) => {
  const {
    documentTemplateId,
    objectId,
    objectType,
    objectSubType,
    isPublicUpload = false,
    dragDropContent,
  } = props;
  const { t } = useTranslation('admin-common');
  const dispatch = useDispatch();
  const document = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const [isEdit, setIsEdit] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const submitAndContinueButton: any = useSubmitAndContinueButton();
  const hideDocumentDetail = useHideDocumentDetail();
  const apiEndpoint = useApiEndpoint();
  const searchForm = useSearchForm();
  const viewTypeOfDeal = useViewTypeOfDeal('view-type-of-deal');
  const visible = useDocumentDetailVisibility('deals');

  const user = useCurrentUser();

  useEffect(() => {
    if (viewTypeOfDeal === VIEW_TYPE_OF_DEAL.GRID) {
      setIsEdit(isEmpty(document) && visible);
    }
    if (viewTypeOfDeal === VIEW_TYPE_OF_DEAL.LIST) {
      setIsEdit(isEmpty(document));
    }
  }, [document, visible, viewTypeOfDeal]);

  useEffect(() => {
    setCurrentStep(DEAL_STATUSES_STEPS.indexOf(document?.status));
  }, [document]);

  const handleClickNextSteps = async () => {
    const statusCurrent = DEAL_STATUSES_STEPS[currentStep + 1];
    setCurrentStep(currentStep + 1);
    await FormUtils.submitForm(
      { status: statusCurrent },
      {
        nodeName: `deals/${document?.id}`,
        method: 'put',
      },
    );
  };

  const handleClickAStep = async (clickInfo) => {
    const statusCurrent = DEAL_STATUSES_STEPS[clickInfo?.key];
    setCurrentStep(clickInfo?.key);
    await FormUtils.submitForm(
      { status: statusCurrent },
      {
        nodeName: `deals/${document?.id}`,
        method: 'put',
      },
    );
  };

  const onSubmitDocument = () => {
    submitAndContinueButton?.current?.click();
  };

  const onEditDocument = () => {
    setIsEdit(true);
  };

  const onCloseDocument = () => {
    setIsEdit(false);
  };

  const onCancelDocument = async () => {
    const detailEndpoint = `${apiEndpoint}/${document?.id || document?._iid}`;
    await httpRequester.deleteFromApi({ url: detailEndpoint });
    searchForm && searchForm.submit();
    hideDocumentDetail();
  };

  const handleResponse = (responseData) => {
    if (!responseData?.error) {
      notification.info({
        message: 'The documents for deal has been completed!',
      });
      setDocumentDetail({
        ...document,
        isDocumentsCompleted: !document.isDocumentsCompleted,
      });
    }
  };

  const handleClick = () => {
    let resourceUrl = `/deals/${document.id}/documents/complete`;
    let updateData: any = {};

    if (document.isDocumentsCompleted) {
      resourceUrl = `/deals/${document.id}`;
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

  return (
    <>
      {isOrgStaff && !isPublicUpload && (
        <>
          <ViewFormEditDeal
            {...{ isEdit, setIsEdit, onSubmitDocument, onCloseDocument }}
          />
          <ViewLoanInformationDetail
            {...{ isEdit, onEditDocument, currentStep, isPublicUpload }}
          />
        </>
      )}
      {!isPublicUpload && (
        <WithPermission
          {...{ permissions: [PERMISSION_DEAL.UPDATE, PERMISSION_DEAL.DELETE] }}
        >
          {isOrgStaff && (
            <Row
              justify={'end'}
              className={'m-t-20 deal-detail-with-bank__group-button'}
            >
              <HButtonControlDeal
                {...{
                  isEdit,
                  onSubmitDocument,
                  onEditDocument,
                  onCancelDocument,
                  onCloseDocument,
                }}
              />
              {[DEAL_STATUSES.WAIT_PROCESSING].includes(document?.status) &&
                [DEAL_STATUSES.WAIT_PROCESSING].includes(
                  DEAL_STATUSES_STEPS[currentStep],
                ) && (
                  <ButtonDealSteps
                    {...{
                      currentStep,
                      label: t(
                        DEAL_STATUS[DEAL_STATUSES_STEPS[currentStep + 1]]
                          ?.name || '',
                      ),
                      steps: Object.values(DEAL_STATUS),
                      handleClickNextSteps,
                      handleClickAStep,
                    }}
                  />
                )}
            </Row>
          )}
          <ProgressView
            {...{
              objectId: objectId || document?.id,
              objectType: ORGANIZATION_TYPES.SUB_ORG,
              isShowProgressView: !isEmpty(document) && !isEdit && isOrgStaff,
            }}
          />
        </WithPermission>
      )}

      {user?.type === 'customer' || !user?.type ? (
        <>
          <ManagerLoanCustomerUploadDocument
            documentTemplateId={documentTemplateId || ''}
            objectId={objectId || ''}
            objectType={objectType || ''}
          />
        </>
      ) : (
        <>
          <Collapse
            defaultActiveKey={isPublicUpload ? ['1'] : []}
            className={'m-t-20 m-b-20'}
          >
            <Panel
              header={
                <PanelHeaderUpload
                  {...{
                    onClick: handleClick,
                    objectId: objectId || document?.id,
                    objectType: objectType || 'deal_loan',
                    documentTemplateId:
                      documentTemplateId || document?.documentTemplateId,
                    objectSubType,
                  }}
                />
              }
              forceRender={true}
              key="1"
            >
              <DocumentManagement
                {...{
                  objectId: objectId || document?.id,
                  objectType: objectType || 'deal_loan',
                  documentTemplateId:
                    documentTemplateId || document?.documentTemplateId,
                  objectSubType,
                  isDisabled: document?.isDocumentsCompleted,
                  dragDropContent,
                }}
              />
            </Panel>
          </Collapse>
        </>
      )}
    </>
  );
};

export const ViewFormEditDeal = ({
  isEdit,
  setIsEdit,
  onSubmitDocument,
  onCloseDocument,
}) => {
  const { t } = useTranslation('admin-common');
  if (!isEdit) {
    return null;
  }

  return (
    <>
      <HFeatureForm
        {...{
          schema: EditLoanSchemaForm,
          hiddenValues: { type: DEAL_TYPE.LOAN },
          onGotSuccess: () => {
            setIsEdit(false);
          },
        }}
      />
      <Row justify={'end'} className={'m-b-20'}>
        <Button type="primary" onClick={onSubmitDocument}>
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
