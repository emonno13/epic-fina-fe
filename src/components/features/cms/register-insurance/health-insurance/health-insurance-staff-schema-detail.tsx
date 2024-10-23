import { blue, cyan, green, red, yellow } from '@ant-design/colors';
import {
  GroupInformation,
  GroupInformationItem,
} from '@components/features/fina/commission/management/common-block';
import {
  PreViewCompany,
  PreViewUser,
} from '@components/features/fina/deals/deals-component-common/preview-user';
import { HComment } from '@components/shared/common-form-elements/h-comment';
import HSteps from '@components/shared/common/h-step';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { createSchemaItem } from '@schema-form/h-types';
import {
  AppraisalProgressIcon,
  LendApprovalIcon,
  ProcessIcon,
  WaitProcessIcon,
} from 'icons';
import { ConverterUtils } from 'lib/converter';
import { FormatterUtils } from 'lib/formatter';
import { useHTranslation } from 'lib/i18n';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { DEAL_INSURANCE_STATUSES, dealInsuranceSteps } from '../constants';
import { appendStepContent } from '../utils';

export const HealthInsuranceStaffSchemaDetail = ({
  currentStep,
  setCurrentStep,
}) => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const [steps, setSteps] = useState<any[]>([]);
  const statusHistories = useMemo(
    () => documentDetail?.statusHistories || [],
    [documentDetail],
  );
  const status = useMemo(() => documentDetail?.status, [documentDetail]);

  const getStepsByDealStatusAndStatusHistories = (
    status: string,
    statusHistories: any[],
  ) => {
    let stepsByDealStatus: any[] = [];
    const stepsWithoutCancelledStatus = dealInsuranceSteps.filter(
      (stepName) => stepName !== DEAL_INSURANCE_STATUSES.CANCELLED,
    );
    if (status === DEAL_INSURANCE_STATUSES.CANCELLED) {
      stepsByDealStatus = stepsWithoutCancelledStatus.map((status) => {
        const historyStep = statusHistories?.find(
          (history) => history?.status === status,
        );
        return {
          name: getStepByDealInsuranceStatus[status]?.name || '',
          value: status,
          status: 'error',
          updatedAt: historyStep?.updatedAt,
        };
      });
    } else {
      stepsByDealStatus = appendStepContent(
        stepsWithoutCancelledStatus,
        statusHistories,
      );
    }

    return stepsByDealStatus;
  };

  useEffect(() => {
    setSteps(getStepsByDealStatusAndStatusHistories(status, statusHistories));
  }, [status, statusHistories]);

  useEffect(() => {
    setCurrentStep(dealInsuranceSteps.indexOf(documentDetail?.status));
  }, [documentDetail?.status, setCurrentStep]);
  return [
    createSchemaItem({
      Component: () => (
        <HSteps
          {...{
            currentStep,
            steps,
          }}
        />
      ),
    }),
    createSchemaItem({
      Component: () => {
        return (
          <>
            <GroupInformation title={t('Information', { vn: 'Thông tin' })}>
              <GroupInformationItem
                {...{
                  label: t('Organizations'),
                  value:
                    ConverterUtils.showOrgConverter(documentDetail?.org) || '_',
                }}
              />
              <GroupInformationItem
                {...{
                  label: t('Product', { vn: 'Sản phẩm' }),
                  value: documentDetail?.product?.name || '_',
                }}
              />
              <GroupInformationItem
                {...{
                  label: t('Insurance package', { vn: 'Gói bảo hiểm' }),
                  value: documentDetail?.meta?.name,
                }}
              />
              <GroupInformationItem
                {...{
                  label: t('Payment', { vn: 'Thanh toán' }),
                  value: FormatterUtils.formatAmount(
                    documentDetail?.meta?.amount,
                    'VND',
                  ),
                }}
              />
              <GroupInformationItem
                {...{
                  label: t('Time', { vn: 'Thời gian hợp đồng' }),
                  value: `${moment(documentDetail?.meta?.time?.startTime).format('DD/MM/YYYY')} - ${moment(documentDetail?.meta?.time?.endTime).format('DD/MM/YYYY')}`,
                }}
              />
              {!isEmpty(documentDetail?.insuranceCertificate) && (
                <GroupInformationItem
                  {...{
                    label: t('Insurance Certificate', {
                      vn: 'Hợp đồng bảo hiểm',
                    }),
                    value: (
                      <a
                        href={
                          documentDetail?.insuranceCertificate?.[
                            documentDetail?.insuranceCertificate?.length - 1
                          ]?.link || ''
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t('Download', { vn: 'Tải về' })}
                      </a>
                    ),
                  }}
                />
              )}
            </GroupInformation>
          </>
        );
      },
      colProps: { span: 12 },
    }),
    createSchemaItem({
      Component: () => {
        const { company, createdBy, user } = documentDetail || {};
        return (
          <>
            <GroupInformation
              title={t('Chủ hợp đồng / Tổ chức', {
                vn: 'Chủ hợp đồng / Tổ chức',
              })}
            >
              {!isEmpty(company) ? (
                <PreViewCompany {...{ company }} />
              ) : (
                <PreViewUser user={createdBy} />
              )}
            </GroupInformation>
            <GroupInformation title={t('Customer', { vn: 'Khách hàng' })}>
              <PreViewUser user={user} />
            </GroupInformation>
          </>
        );
      },
      colProps: { span: 12 },
    }),
    createSchemaItem({
      Component: () => {
        return (
          <GroupInformation title={t('Note')}>
            <HComment
              {...{
                className: 'm-t-10',
                documentId: documentDetail?.id,
              }}
            />
          </GroupInformation>
        );
      },
      colProps: { span: 24 },
    }),
  ];
};

export const getStepByDealInsuranceStatus = {
  [DEAL_INSURANCE_STATUSES.WAIT_PROCESSING]: {
    icon: <WaitProcessIcon />,
    name: 'Chờ xử lý',
    color: blue[5],
  },
  [DEAL_INSURANCE_STATUSES.PENDING]: {
    icon: <ProcessIcon />,
    name: 'Chờ xác nhận thanh toán',
    color: yellow[5],
  },
  [DEAL_INSURANCE_STATUSES.LEND_APPROVAL]: {
    icon: <LendApprovalIcon />,
    name: 'Thẩm định',
    color: cyan[5],
  },
  [DEAL_INSURANCE_STATUSES.CERTIFICATED]: {
    icon: <AppraisalProgressIcon />,
    name: 'Cấp giấy chứng nhận',
    color: green[5],
  },
  [DEAL_INSURANCE_STATUSES.CANCELLED]: {
    name: 'Đóng - do không đạt yêu cầu',
    color: red[5],
  },
};
