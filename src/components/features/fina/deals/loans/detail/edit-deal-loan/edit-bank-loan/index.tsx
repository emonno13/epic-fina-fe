import {
  ERROR_STATUS,
  TRANSACTION_DETAIL_STATUS,
} from '@components/features/fina/transaction/constant';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Row, Typography } from 'antd';
import notification from 'antd/lib/notification';
import { useEffect, useState } from 'react';
import { usePermissions } from '../../../../../../../../lib/providers/auth';
import {
  useDocumentDetail,
  useSearchForm,
  useTableSourceData,
} from '../../../../../../../../schema-form/features/hooks';
import {
  useHideDocumentDetail,
  useSetDocumentFragments,
} from '../../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { FormUtils } from '../../../../../../../../schema-form/utils/form-utils';
import { ADMIN_PERMISSIONS } from '../../../../../../../shared/accessibility/constant';
import { WithPermission } from '../../../../../../../shared/accessibility/with-permission';
import {
  DEAL_BANK_STATUS,
  DEAL_DETAIL_STATUSES,
  DEAL_STATUSES,
  mergeArrayObjects,
  PERMISSION_BANK,
} from '../../../../utils';
import { HButtonControlDeal } from '../../component-deal-loan-common/button-control';
import { ButtonDealSteps } from '../../component-deal-loan-common/button-deal-steps';
import { HButtonSharingWithOrg } from '../../component-deal-loan-common/button-sharing-with-org';
import { RenderDealSteps } from '../../deal-steps';
import { BankProfileInformation } from '../../form-extradata/bank-profile-information';
import { HistoriesDisbursement } from '../../histories-disbursement';
import CloseDisbursement from '../close-disbursement';
import { DisbursementProcessTableSchema } from './disbursement-process.table-schema';
import { ViewLoanInformationDetailWithBank } from './view-loan-info-with-bank';

const DEAL_BANK_STATUSES = Object.keys(DEAL_BANK_STATUS);
const { Paragraph } = Typography;

export const ManagerLoanWithBank = ({ dealDetail }) => {
  const { t } = useHTranslation('admin-common');
  const [statusInit, setStatusInit] = useState(dealDetail?.status);
  useEffect(() => {
    setStatusInit(dealDetail?.status);
    setCurrentStep(DEAL_BANK_STATUSES.indexOf(dealDetail?.status));
  }, [dealDetail?.status]);
  const documentDealLoan = useDocumentDetail();
  const searchForm = useSearchForm();
  const hideDocumentDetail = useHideDocumentDetail();
  const setDealFragments = useSetDocumentFragments();
  const [isEditBank, setIsEditBank] = useState(false);
  const [showFormBankProfile, setShowFormBankProfile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isCheckedAmountEnough, setIsCheckedAmountEnough] = useState(false);
  const [isHistoriesDisbursement, setIsHistoriesDisbursement] = useState(true);
  const permissions = [
    ADMIN_PERMISSIONS.SITE_OWNER,
    ADMIN_PERMISSIONS.SUPPER_ADMIN,
    ADMIN_PERMISSIONS.ADMIN,
  ];
  const allowed = usePermissions(permissions);

  useEffect(() => {
    setTimeout(() => {
      setIsHistoriesDisbursement(true);
    }, 1000);
  }, [isHistoriesDisbursement]);

  const updateBankProfileGotSuccess = (document: any) => {
    const dealDetailsRefactor = documentDealLoan?.dealDetails?.map(
      (item: any) => {
        if (item.id === dealDetail.id) {
          item.info = {
            ...item.info,
            ...document.info,
          };
        }
        return item;
      },
    );
    setShowFormBankProfile(false);
    setDealFragments({
      status: DEAL_STATUSES.LEND_APPROVAL,
      dealDetails: dealDetailsRefactor,
    });
    setCurrentStep(currentStep + 1);
  };

  const stepCurrentByStatus = () => {
    return DEAL_BANK_STATUSES.indexOf(statusInit);
  };
  const [currentStep, setCurrentStep] = useState(stepCurrentByStatus);
  const handleEditWithBank = () => {
    setIsEditBank(true);
  };

  const reloadDealDetails = () => {
    setStatusInit(DEAL_STATUSES.DISBURSED);
    setCurrentStep(currentStep + 1);

    const dealDetailsRefactor = documentDealLoan?.dealDetails?.map(
      (item: any) => {
        if (item.id === dealDetail.id) {
          item.status = DEAL_DETAIL_STATUSES.DISBURSED;
        }
        return item;
      },
    );

    setDealFragments({
      status: DEAL_STATUSES.DISBURSED,
      dealDetails: dealDetailsRefactor,
    });
    notification.info({
      message: 'Cập nhật thành công',
      description: 'HSV chuyển sang trạng thái đã giải ngân',
    });
  };

  const reloadHistoriesDisbursement = () => {
    setIsHistoriesDisbursement(false);
  };

  const DisbursementProcessModal = ({ dealDetail, visible }) => {
    const handleCancelModal = () => {
      setVisible(false);
    };

    return (
      <HModal
        {...{
          visible,
          width: 1000,
          footer: null,
          title: 'Giải ngân chưa đối soát',
          destroyOnClose: true,
          onCancel: () => handleCancelModal(),
        }}
      >
        <HFeature
          {...{
            featureId: 'histories-disbursements',
          }}
        >
          <HSearchForm
            {...{
              endpoint: endpoints.endpointWithApiDomain('/transactions'),
              withRelations: [
                {
                  relation: 'transactionDetails',
                  scope: { include: [{ relation: 'updatedBy' }] },
                },
              ],
              className: 'hidden',
              hiddenFields: {
                objectId: documentDealLoan?.id,
                'metaData.dealDetailId': dealDetail?.id,
              },
            }}
          />
          {isCheckedAmountEnough && (
            <Paragraph type="danger">
              Số tiền giải ngân đã đối soát đang nhỏ hơn số tiền đã phê duyệt
            </Paragraph>
          )}
          <ViewHistoriesDisbursement
            {...{ dealDetail }}
            onCancel={() => setVisible(false)}
            onSubmitSuccess={() => {
              reloadHistoriesDisbursement();
              reloadDealDetails();
            }}
            dealId={documentDealLoan?.id}
          />
        </HFeature>
      </HModal>
    );
  };

  const handleCancelWithBank = async () => {
    await httpRequester.deleteFromApi({
      url: endpoints.endpointWithApiDomain(`/deal-details/${dealDetail?.id}`),
    });
    searchForm && searchForm.submit();
    hideDocumentDetail();
  };

  const handleClickNextSteps = async (jump = 1) => {
    const beforeIndex = stepCurrentByStatus();
    const nextStatus = DEAL_BANK_STATUSES[currentStep + jump];
    const requireApproveAmountStatuses = [
      DEAL_DETAIL_STATUSES.LEND_APPROVAL,
      DEAL_DETAIL_STATUSES.DISBURSING,
    ];
    switch (nextStatus) {
      case DEAL_DETAIL_STATUSES.LEND_APPROVAL:
        setShowFormBankProfile(true);
        return;
      case DEAL_DETAIL_STATUSES.DISBURSED:
        break;
      default:
        console.log('nothing...');
    }
    if (
      requireApproveAmountStatuses.includes(nextStatus) &&
      !dealDetail?.info?.approvalAmount
    ) {
      notification.error({
        message:
          'Bạn cần nhập số tiền phê duyệt trước khi chuyển sang trạng thái này.',
      });
      return;
    }
    if (
      currentStep + jump > beforeIndex &&
      documentDealLoan?.status !== DEAL_STATUSES.DISBURSED
    ) {
      const statusCurrent = DEAL_BANK_STATUSES[currentStep + jump];
      const result = await FormUtils.submitForm(
        { status: statusCurrent, dealId: documentDealLoan?.id },
        {
          nodeName: `deal-details/update-status/${dealDetail?.id}`,
          method: 'put',
          showSuccessMessage: false,
        },
      );

      if (result.status === ERROR_STATUS.CHECKED_AMOUNT_IS_NOT_ENOUGH) {
        setVisible(true);
        setIsCheckedAmountEnough(true);
        return;
      }

      if (result.status === ERROR_STATUS.NOT_FOR_CONTROL) {
        setVisible(true);
        return;
      }

      if (result?.error) {
        return;
      }

      setCurrentStep(currentStep + jump);
      if (
        statusCurrent === DEAL_STATUSES.LEND_APPROVAL ||
        statusCurrent === DEAL_STATUSES.DISBURSING ||
        statusCurrent === DEAL_STATUSES.DISBURSED ||
        statusCurrent === DEAL_STATUSES.TRIPARTITE_BLOCKADE
      ) {
        setDealFragments({ status: statusCurrent });
      }
    }
  };

  const handleClickAStep = async (clickInfo) => {
    const statusCurrent = DEAL_BANK_STATUSES[clickInfo?.key];
    const beforeIndex = stepCurrentByStatus();
    if (
      currentStep + 1 > beforeIndex &&
      documentDealLoan?.status !== DEAL_STATUSES.DISBURSED
    ) {
      setCurrentStep(clickInfo?.key);
      await FormUtils.submitForm(
        { status: statusCurrent, dealId: documentDealLoan?.id },
        {
          nodeName: `deal-details/update-status/${dealDetail?.id}`,
          method: 'put',
        },
      );
    }
    if (
      statusCurrent === DEAL_STATUSES.LEND_APPROVAL ||
      statusCurrent === DEAL_STATUSES.DISBURSED ||
      statusCurrent === DEAL_STATUSES.TRIPARTITE_BLOCKADE
    ) {
      setDealFragments({ status: statusCurrent });
    }
  };

  const handleSharingWithOrg = async () => {
    await FormUtils.submitForm(
      {
        partnerId: dealDetail?.partnerId,
        partnerStaffId: dealDetail?.partnerStaffId,
        executePartnerId: dealDetail?.executePartnerId,
        dealId: documentDealLoan?.id,
      },
      {
        nodeName: `deal-details/sharing-with-bank/${dealDetail?.id}`,
        method: 'put',
        showSuccessMessage: false,
        useDefaultMessage: true,
        onGotSuccess: () => {
          notification.info({
            message: t('Data sharing', { vn: 'Chia sẻ dữ liệu' }),
            description: t('Data sharing with bank success.', {
              vn: 'Chia sẻ dữ liệu cho ngân hàng thành công.',
            }),
          });
          const sharingWithOrgIdsOld = documentDealLoan?.sharingWithOrgIds;
          setDealFragments({
            sharingWithOrgIds: [...sharingWithOrgIdsOld, dealDetail?.partnerId],
            status: DEAL_STATUSES.MOVED_TO_FINANCIAL_ORGANIZATION,
          });
        },
      },
    );
  };

  const result = mergeArrayObjects(
    Object.values(DEAL_BANK_STATUS),
    dealDetail?.statusHistories,
  );

  const GroupButtonDealSteps = () => {
    switch (DEAL_BANK_STATUS[DEAL_BANK_STATUSES[currentStep]]?.value) {
      case DEAL_DETAIL_STATUSES.LEND_APPROVAL:
        return (
          <>
            <ButtonDealSteps
              {...{
                currentStep,
                label: t(
                  DEAL_BANK_STATUS[DEAL_BANK_STATUSES[currentStep + 2]]?.name ||
                    '',
                ),
                disabled:
                  documentDealLoan?.status === DEAL_STATUSES.DISBURSED ||
                  dealDetail?.subStatus === 'reject',
                steps: Object.values(DEAL_BANK_STATUS),
                handleClickNextSteps: () => handleClickNextSteps(2),
                handleClickAStep,
              }}
            />
            <ButtonDealSteps
              {...{
                currentStep,
                label: t(
                  DEAL_BANK_STATUS[DEAL_BANK_STATUSES[currentStep + 1]]?.name ||
                    '',
                ),
                disabled:
                  documentDealLoan?.status === DEAL_STATUSES.DISBURSED ||
                  dealDetail?.subStatus === 'reject',
                steps: Object.values(DEAL_BANK_STATUS),
                handleClickNextSteps: () => handleClickNextSteps(1),
                handleClickAStep,
              }}
            />
          </>
        );
      case DEAL_DETAIL_STATUSES.TRIPARTITE_BLOCKADE:
        return (
          <>
            <ButtonDealSteps
              {...{
                currentStep,
                label: t('Open the three-way blockade', {
                  vn: 'Mở phong tỏa 3 bên',
                }),
                disabled:
                  documentDealLoan?.status === DEAL_STATUSES.DISBURSED ||
                  dealDetail?.subStatus === 'reject',
                steps: Object.values(DEAL_BANK_STATUS),
                handleClickNextSteps: () => handleClickNextSteps(1),
                handleClickAStep,
              }}
            />
          </>
        );
      default:
        return (
          <>
            {!(
              documentDealLoan?.status === DEAL_STATUSES.DISBURSED ||
              dealDetail?.subStatus === 'reject' ||
              (documentDealLoan?.status === DEAL_STATUSES.DISBURSING &&
                !allowed)
            ) && (
              <ButtonDealSteps
                {...{
                  currentStep,
                  label: t(
                    DEAL_BANK_STATUS[DEAL_BANK_STATUSES[currentStep + 1]]
                      ?.name || '',
                  ),
                  disabled:
                    documentDealLoan?.status === DEAL_STATUSES.DISBURSED ||
                    dealDetail?.subStatus === 'reject',
                  steps: Object.values(DEAL_BANK_STATUS),
                  handleClickNextSteps: () => handleClickNextSteps(1),
                  handleClickAStep,
                }}
              />
            )}
            <DisbursementProcessModal
              {...{ visible, dealDetail, isCheckedAmountEnough }}
            />
          </>
        );
    }
  };

  const isShowHistoriesDisbursement =
    [
      DEAL_DETAIL_STATUSES.LEND_APPROVAL,
      DEAL_DETAIL_STATUSES.DISBURSING,
      DEAL_DETAIL_STATUSES.DISBURSED,
    ].includes(dealDetail?.status) ||
    [
      DEAL_DETAIL_STATUSES.LEND_APPROVAL,
      DEAL_DETAIL_STATUSES.DISBURSING,
      DEAL_DETAIL_STATUSES.DISBURSED,
    ].includes(DEAL_BANK_STATUS[DEAL_BANK_STATUSES[currentStep]]?.value);
  return (
    <>
      <RenderDealSteps
        {...{
          currentStep,
          steps: result,
          dealDetail,
        }}
      />
      <ViewLoanInformationDetailWithBank
        {...{
          detail: documentDealLoan,
          onEditDocument: handleEditWithBank,
          dealDetail,
          isEditBank,
          setIsEditBank,
          currentStep,
        }}
      />
      {!dealDetail?.subStatus && (
        <Row
          justify={'end'}
          className={'m-b-20 m-t-20 deal-detail-with-bank__group-button'}
        >
          <HButtonSharingWithOrg
            {...{
              onSharingWithOrg: handleSharingWithOrg,
              isEditBank: documentDealLoan?.sharingWithOrgIds?.includes(
                dealDetail?.partnerId,
              ),
            }}
          />
          <WithPermission
            {...{
              permissions: [PERMISSION_BANK.UPDATE, PERMISSION_BANK.DELETE],
            }}
          >
            <HButtonControlDeal
              {...{
                isEdit: isEditBank,
                onEditDocument: handleEditWithBank,
                onCancelDocument: handleCancelWithBank,
              }}
            />
            {documentDealLoan?.sharingWithOrgIds?.includes(
              dealDetail?.partnerId,
            ) && <GroupButtonDealSteps />}
          </WithPermission>
        </Row>
      )}
      <BankProfileInformation
        {...{
          dealDetail,
          showFormBankProfile,
          setShowFormBankProfile,
          onGotSuccess: updateBankProfileGotSuccess,
          status: DEAL_DETAIL_STATUSES.LEND_APPROVAL,
        }}
      />
      <WithPermission
        {...{
          permissions: [PERMISSION_BANK.UPDATE, PERMISSION_BANK.DELETE],
        }}
      >
        <HistoriesDisbursement
          {...{
            detail: documentDealLoan,
            dealDetail,
            isShow: isShowHistoriesDisbursement && isHistoriesDisbursement,
            onReloadDealDetail: () => {
              reloadDealDetails();
            },
            cb: () => {
              const dealDetailsRefactor = documentDealLoan?.dealDetails?.map(
                (item: any) => {
                  if (item.id === dealDetail.id) {
                    item.status = DEAL_DETAIL_STATUSES.DISBURSING;
                  }
                  return item;
                },
              );
              setDealFragments({
                status: DEAL_STATUSES.DISBURSING,
                dealDetails: dealDetailsRefactor,
              });
            },
          }}
        />
      </WithPermission>
    </>
  );
};

const ViewHistoriesDisbursement = (props) => {
  const data = useTableSourceData();
  const dataSource: any[] = [];
  const { dealDetail } = props;

  if (
    !data ||
    !data[0] ||
    !data[0].transactionDetails ||
    data[0].transactionDetails.length <= 0
  ) {
    return <></>;
  }
  data[0].transactionDetails?.forEach((item) => {
    if (item.status === TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL) {
      dataSource.push(item);
    }
  });
  if (!dataSource) {
    return <></>;
  }

  return (
    <>
      <HTable
        schema={() => DisbursementProcessTableSchema({ dealDetail })}
        pagination={false}
        dataSource={dataSource}
        endpoint={endpoints.endpointWithApiDomain(
          '/transactions/update-transaction-deal',
        )}
      />
      <CloseDisbursement {...props} dataSource={dataSource} />
    </>
  );
};
