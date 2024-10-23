import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { HModal } from '@components/shared/common/h-modal';
import HSteps from '@components/shared/common/h-step';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, InputNumber } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { checkStatust, TYPE_ACTION_CLAIM_MONEY } from '../contants';
import {
  DEAL_CLAIM_INSURANCE_STATUSES,
  mappingLabelDealClaimInsurance,
} from '../utils';

import './shema-detail-claim.module.scss';

export const ClaimInsuranceSchemaDetailForm = (props) => {
  const { transport } = props;
  const { initialValues, isFormClaimMoney, setIsFormClaimMeney } = transport;
  const searchForm = useSearchForm();
  const { t } = useHTranslation('admin-crm');
  const documentDetail = useDocumentDetail();

  const [currentStep, setCurrentStep] = useState<number>(0);
  let steps = mappingLabelDealClaimInsurance;
  const STATUS = mappingLabelDealClaimInsurance.map((step) => step?.value);

  const isStatust = checkStatust(documentDetail);

  useEffect(() => {
    setCurrentStep(STATUS.indexOf(documentDetail?.status));
  }, [documentDetail, DEAL_CLAIM_INSURANCE_STATUSES]);

  if (
    documentDetail?.status ===
    DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER
  ) {
    steps = mappingLabelDealClaimInsurance.map((step) => ({
      ...step,
      status: 'error',
    }));
  }

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
    createSchemaLabelItem({
      colProps: { span: 12 },
      componentProps: {
        label: 'THÔNG TIN',
        titleTooltip: 'THÔNG TIN',
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 12 },
      componentProps: {
        label: 'THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM',
        titleTooltip: 'THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM',
      },
    }),
    createSchemaItem({
      Component: () => (
        <>
          <div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Người yêu cầu bồi thường: </p>
              <PreViewUser user={documentDetail?.source} />
            </div>
            <div>
              <FiledViewer
                {...{
                  label: 'Sản phẩm bảo hiểm',
                  value: documentDetail?.product?.name || '',
                }}
              />
            </div>
            {documentDetail?.meta?.images && (
              <div>
                <p style={{ fontWeight: 'bold' }}>Hình ảnh claim bảo hiểm: </p>
                {documentDetail?.meta?.images?.map((el, index) => {
                  if (el?.isImage)
                    return (
                      <img
                        src={el?.url}
                        key={index}
                        width={70}
                        height={70}
                        alt="imge_cliam"
                        style={{ margin: '0 10px' }}
                      />
                    );
                  return <></>;
                })}
              </div>
            )}
          </div>
        </>
      ),
      colProps: { span: 12 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    }),
    createSchemaItem({
      Component: () => (
        <>
          <div>
            <div>
              <PreViewUser user={documentDetail?.user} />
            </div>
            <div>
              <FiledViewer
                {...{
                  label: 'CMND/CCCD',
                  value: documentDetail?.user?.IdNumber || '',
                }}
              />
            </div>
            <div>
              <FiledViewer
                {...{
                  label: 'Gói bảo hiểm',
                  value: documentDetail?.meta?.dealMetadata?.name || '',
                }}
              />
            </div>
            <div>
              <FiledViewer
                {...{
                  label: 'Số tiền Yêu cầu bồi thường',
                  value: documentDetail?.claimMoney
                    ? FormatterUtils.formatAmount(
                        documentDetail?.claimMoney,
                        'VNĐ',
                      )
                    : '',
                }}
              />
              <EditClaimMoney
                checkStatus={isStatust}
                documentDetail={documentDetail}
                isFormClaimMoney={isFormClaimMoney}
                setIsFormClaimMeney={setIsFormClaimMeney}
              />
            </div>
          </div>
        </>
      ),
      colProps: { span: 12 },
      componentProps: {
        style: {
          width: '100%',
        },
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Presenter', { vn: 'Nhân viên xử lý' }),
      name: 'assigneeId',
      colProps: { xs: 24, sm: 24, md: 12 },
      isNewRow: true,
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        mode: 'single',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
      },
    }),
  ];
};

const EditClaimMoney = ({
  checkStatus,
  documentDetail,
  isFormClaimMoney,
  setIsFormClaimMeney,
}) => {
  const searchForm = useSearchForm();
  const setDeailInsuranceDocument = useSetDocumentDetail();
  const [form] = Form.useForm();
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser();

  if (!checkStatus) return <></>;

  return (
    <>
      <HButton
        className="button-edit-form"
        onClick={() =>
          setIsFormClaimMeney({
            isVisible: !isFormClaimMoney?.isVisible,
            typeAction: TYPE_ACTION_CLAIM_MONEY.BUTTON_ACTION,
          })
        }
      >
        {t('Sửa tiền bồi thường bảo hiểm', {
          vn: 'Sửa tiền bồi thường bảo hiểm',
          en: 'Edit claim insuransi',
        })}
      </HButton>
      <HModal
        {...{
          title: t('Số tiền bồi thường bảo hiểm', {
            vn: 'Số tiền bồi thường bảo hiểm',
            en: 'Claim insuransi number',
          }),
          visible: isFormClaimMoney?.isVisible,
          onCancel: () => setIsFormClaimMeney(false),
          className: 'edit-claim-insuran',
          footer: <></>,
        }}
      >
        <HForm
          {...{
            form,
            endpoint: endpoints.generateNodeEndpoint(
              `deals/${documentDetail?.id}`,
            ),
            method: 'put',
            onDataReadyToSubmit: (value) => {
              const indexStatus = mappingLabelDealClaimInsurance.findIndex(
                (step) => step?.value === documentDetail?.status,
              );
              const statusUpdated =
                isFormClaimMoney?.typeAction ===
                TYPE_ACTION_CLAIM_MONEY.BUTTON_ACTION
                  ? documentDetail?.status
                  : mappingLabelDealClaimInsurance[indexStatus + 1].value;
              const historyLog = {
                createdAt: new Date(),
                createdById: currentUser.id,
                status: statusUpdated,
                message: `Hồ sơ đã được chuyển sang trạng thái ${statusUpdated}`,
                createdBy: currentUser,
              };
              const dataNew = {
                history: documentDetail?.statusHistories
                  ? [...documentDetail.statusHistories, historyLog]
                  : [historyLog],
                status: statusUpdated,
                claimMoney: Number(value.claimMoney),
              };
              return dataNew;
            },
            schema: () => [
              createSchemaItem({
                Component: InputNumber,
                label: 'Số tiền Yêu cầu bồi thường:',
                name: 'claimMoney',
                colProps: { span: 24 },
                className: 'claim-money-input',
                rules: [
                  {
                    required: true,
                    message: t('Claim money is required', {
                      vn: 'Xin vui lòng nhập tiền bồi thường',
                    }),
                  },
                ],
                componentProps: {
                  style: { width: '100%' },
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
                },
              }),
            ],
            onGotSuccess: (res) => {
              if (!res || isEmpty(res)) return;
              searchForm?.submit();
              setIsFormClaimMeney(false);
              setDeailInsuranceDocument(res);
            },
          }}
        />
      </HModal>
    </>
  );
};
