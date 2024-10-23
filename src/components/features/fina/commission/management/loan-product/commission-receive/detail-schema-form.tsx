import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Checkbox, Col, Row, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEqual } from 'underscore';

import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { useTranslation } from 'next-i18next';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { HFeature, HTable } from '../../../../../../../schema-form/features';
import { HFeatureForm } from '../../../../../../../schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '../../../../../../../schema-form/features/hooks';
import { useHideDocumentDetail } from '../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { HDocumentModalPanel } from '../../../../../../../schema-form/features/panels';
import { HSearchFormHiddenAble } from '../../../../../../../schema-form/features/search-form';
import { HButton } from '../../../../../../shared/common-form-elements/h-confirmation-button';
import { USER_TYPES_LABEL_MAPPING } from '../../../../../../shared/user/constants';
import { PreViewUser } from '../../../../deals/deals-component-common/preview-user';
import { useTaxVAT } from '../../../hooks';
import {
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
  METHODS,
} from '../../../settings/loan-product/constant';
import { CommissionSpendSearchResultTableSchema } from '../../commission-spend-search-result-table-schema';
import { GroupInformation, GroupInformationItem } from '../../common-block';

const LoanProductCommissionReceiveDetailSchemaForm = (): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const commission = useDocumentDetail();
  const VAT = useTaxVAT();
  const [actualTotalAmountSpend, setActualTotalAmountSpend] = useState(0);

  const deal = commission?.deal;
  const dealDetail = commission?.dealDetail;
  const transaction = commission?.transaction;
  const transactionDetail = commission?.transactionDetail;
  const customer = transaction?.customer;
  const partner = transaction?.partner;
  const commissionSettingReceive = commission?.commissionSettingReceive;
  const commissionSettingSpend = commission?.commissionSettingSpend;
  const commissionAmount = commission?.amount || 0;
  const commissionAmountBeforeTax = commissionAmount / (1 + VAT);
  const actualCommissionReceiveNorm =
    (commissionAmount / transactionDetail.amount) * 100;
  const commissionSpendNormSetting =
    commissionSettingSpend?.formula?.commissionRate || 0;

  const disbursementForControl = transactionDetail?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
  );
  const commissionForControl = commission?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
  );
  const commissionCancelled = commission?.statusHistories?.find(
    (item) => item.status === COMMISSION_STATUSES.CANCELLED,
  );

  const formulaMapping = {
    [METHODS.PERCENT]: [
      {
        label: t('Phương thức tính'),
        value: `${commissionSettingReceive?.formula?.percentCommission || 0}% / STGN`,
      },
      {
        label: t('Hoa hồng tối đa'),
        value: FormatterUtils.formatAmount(
          commissionSettingReceive?.formula?.maxCommission || 0,
          'VND',
        ),
      },
      {
        label: t('Hoa hồng ghi nhận'),
        value: FormatterUtils.formatAmount(commissionAmount, 'VND'),
      },
      {
        label: t('Hoa hồng trước thuế'),
        value: FormatterUtils.formatAmount(commissionAmountBeforeTax, 'VND'),
      },
    ],
    [METHODS.FIXED]: [
      {
        label: t('Phương thức tính'),
        value: `${FormatterUtils.formatAmount(commissionSettingReceive?.formula?.fixCommission || 0, 'VND')} / STGN`,
      },
      {
        label: t('Hoa hồng ghi nhận'),
        value: FormatterUtils.formatAmount(commissionAmount, 'VND'),
      },
      {
        label: t('Hoa hồng trước thuế'),
        value: FormatterUtils.formatAmount(commissionAmountBeforeTax, 'VND'),
      },
    ],
  };

  const forControlMapping = {
    [COMMISSION_STATUSES.NOT_FOR_CONTROL]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
    ],
    [COMMISSION_STATUSES.FOR_CONTROL]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
      {
        label: t('Ngày đối soát'),
        value: ConverterUtils.dateConverterToString(
          commissionForControl?.updatedAt,
        ),
      },
      {
        label: t('Người đối soát'),
        value: commissionForControl ? (
          <PreViewUser
            user={commissionForControl?.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionForControl?.updatedBy?.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn'),
        value: commission?.forControlMessage || '',
      },
    ],
    [COMMISSION_STATUSES.CANCELLED]: [
      {
        label: t('Trạng thái'),
        value: (
          <Tag color={COMMISSION_STATUS_COLOR_MAPPING[commission.status]}>
            {COMMISSION_STATUS_LABEL_MAPPING[commission.status] || ''}
          </Tag>
        ),
      },
      {
        label: t('Ngày huỷ'),
        value: ConverterUtils.dateConverterToString(
          commissionCancelled?.updatedAt,
        ),
      },
      {
        label: t('Người huỷ'),
        value: commissionCancelled ? (
          <PreViewUser
            user={commissionCancelled.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionCancelled.updatedBy.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn'),
        value: commission?.cancelReason || '',
      },
    ],
  };

  const formulaCommissionSpend = commissionSettingSpend?.formula;
  let ratioApplied = formulaCommissionSpend?.lessThanRateInfo;
  if (
    Number(actualCommissionReceiveNorm) >= Number(commissionSpendNormSetting)
  ) {
    ratioApplied = formulaCommissionSpend?.greaterThanRateInfo;
  }

  const amountSpendMax =
    ((ratioApplied?.spendMax || 0) / 100) * commissionAmountBeforeTax;
  const featureData = useSelector((state: any) => {
    return state?.featureStore['commissionSpendViewerInReceiveDetailForm'];
  }, isEqual);
  useEffect(() => {
    const metadata = featureData?.metadata || {};

    setActualTotalAmountSpend(
      (metadata?.totalForControl || 0) +
        (metadata?.totalNotForControl || 0) +
        (metadata?.totalPaid || 0),
    );
  }, [featureData]);

  return [
    createSchemaItem({
      Component: () => {
        return (
          <>
            <Row gutter={24}>
              <Col md={12}>
                <GroupInformation
                  title={t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' })}
                >
                  <GroupInformationItem
                    {...{
                      label: t('Mã HSV'),
                      value: deal?.code || '',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Khách hàng'),
                      value: ConverterUtils.getFullNameUser(customer),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('CMT/CCCD'),
                      value: customer?.idNumber || '',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Đối tác'),
                      value: partner?.name || '',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Mã hồ sơ phía đối tác'),
                      value: dealDetail?.info?.codeBankProfile || '-',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Mã khách hàng phía đối tác'),
                      value: dealDetail?.info?.codeBankCustomer || '-',
                    }}
                  />
                </GroupInformation>

                <GroupInformation title={t('HOA HỒNG FINA NHẬN')}>
                  {formulaMapping[
                    commissionSettingReceive?.formula?.method
                  ]?.map((item: any, index: number) => (
                    <p key={index}>
                      <strong>{item?.label}:</strong> {item?.value}
                    </p>
                  ))}
                </GroupInformation>

                <GroupInformation title={t('HOA HỒNG FINA TRẢ')}>
                  <GroupInformationItem
                    {...{
                      label: t('Định mức thực tế'),
                      value: `${commissionSettingSpend?.formula?.commissionRate || 0}%`,
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Hoa hồng chi trả tối đa'),
                      value: `${FormatterUtils.formatAmount(amountSpendMax, 'VND')} (${ratioApplied?.spendMax || 0}%)`,
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Hoa hồng chi trả thực tế'),
                      value: `${FormatterUtils.formatAmount(actualTotalAmountSpend, 'VND')} (${amountSpendMax ? ((actualTotalAmountSpend / amountSpendMax) * 100).toFixed(2) : 0}% hạn mức chi trả tối đa)`,
                    }}
                  />
                </GroupInformation>
              </Col>
              <Col md={12}>
                <GroupInformation
                  title={t('DISBURSEMENT INFORMATION', {
                    vn: 'Thông tin giải ngân',
                  })}
                >
                  <GroupInformationItem
                    {...{
                      label: t('Số tiền giải ngân'),
                      value: FormatterUtils.formatAmount(
                        transactionDetail?.amount,
                        'VND',
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Ngày giải ngân'),
                      value: ConverterUtils.dateConverterToString(
                        transactionDetail?.paymentDate,
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Người đối soát'),
                      value: disbursementForControl && (
                        <PreViewUser
                          user={disbursementForControl.updatedBy}
                          userTitle={t(
                            USER_TYPES_LABEL_MAPPING[
                              disbursementForControl.updatedBy.type
                            ],
                          )}
                        />
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Ngày đối soát'),
                      value: disbursementForControl
                        ? ConverterUtils.dateConverterToString(
                            disbursementForControl.updatedAt,
                          )
                        : '',
                    }}
                  />
                </GroupInformation>

                <GroupInformation title={t('THÔNG TIN ĐỐI SOÁT')}>
                  {forControlMapping[commission.status]?.map(
                    (item: any, index: number) => (
                      <GroupInformationItem
                        key={index}
                        {...{
                          label: item?.label,
                          value: item?.value,
                        }}
                      />
                    ),
                  )}
                </GroupInformation>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col md={24}>
                <HFeature
                  {...{
                    featureId: 'commissionSpendViewerInReceiveDetailForm',
                    documentIdName: 'commissionSpendViewerInReceiveDetailId',
                    nodeName: 'commissions',
                    documentRelations: [
                      'commissionReceive',
                      'transactionDetail',
                      {
                        relation: 'user',
                        scope: {
                          include: [{ relation: 'org' }],
                        },
                      },
                      {
                        relation: 'transaction',
                        scope: {
                          include: [
                            { relation: 'partner' },
                            {
                              relation: 'product',
                              scope: {
                                include: [{ relation: 'org' }],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  }}
                >
                  <HSearchFormHiddenAble
                    {...{
                      hiddenFields: {
                        type: 'spend',
                        transactionId: transaction.id,
                        commissionReceiveId: commission.id,
                      },
                      withRelations: [
                        'commissionReceive',
                        'transactionDetail',
                        {
                          relation: 'user',
                          scope: {
                            include: [{ relation: 'org' }],
                          },
                        },
                        {
                          relation: 'transaction',
                          scope: {
                            include: [
                              { relation: 'partner' },
                              {
                                relation: 'product',
                                scope: {
                                  include: [{ relation: 'org' }],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    }}
                  />

                  <HTable
                    schema={() => CommissionSpendSearchResultTableSchema(true)}
                  />
                </HFeature>
              </Col>
            </Row>
          </>
        );
      },
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
    }),
  ];
};

const ModalFooterControls = () => {
  const { t } = useTranslation('common');
  const commission = useDocumentDetail();
  const closeCommissionDetailModal = useHideDocumentDetail();
  const setCommission = useSetDocumentDetail();

  const handleClickButton = (action: string) => {
    closeCommissionDetailModal();
    setTimeout(() => {
      setCommission({ ...commission, action });
    }, 500);
  };

  const commissionStatus = commission.status;
  const allowStatuses = [COMMISSION_STATUSES.NOT_FOR_CONTROL];

  return (
    <div className="item-align-right">
      {allowStatuses.includes(commissionStatus) && (
        <HButton
          onClick={() => handleClickButton('for_control')}
          type="primary"
        >
          {t('Phê duyệt')}
        </HButton>
      )}

      {allowStatuses.includes(commissionStatus) && (
        <HButton
          onClick={() => handleClickButton('cancelled')}
          type={'primary'}
          className="m-l-10"
          danger
        >
          {t('Huỷ')}
        </HButton>
      )}

      <HButton onClick={closeCommissionDetailModal} className="m-l-10">
        {t('close')}
      </HButton>
    </div>
  );
};

export const LoanProductCommissionReceiveDetailForm = () => {
  const { t } = useHTranslation('admin-common');
  const commissionReceive = useDocumentDetail();

  if (
    commissionReceive?.action === COMMISSION_STATUSES.FOR_CONTROL ||
    commissionReceive?.action === COMMISSION_STATUSES.CANCELLED
  ) {
    const messageNameMapping = {
      [COMMISSION_STATUSES.FOR_CONTROL]: {
        name: 'forControlMessage',
        label: t(
          'Phê duyệt đối soát hoa hồng Fina nhận? Việc phê duyệt đồng thời có thể phê duyệt cả Hoa hồng FINA trả liên quan.',
        ),
        placeholder: t('Leave message', { vn: 'Để lại lời nhắn' }),
        checkBoxClassName: '',
      },
      [COMMISSION_STATUSES.CANCELLED]: {
        name: 'cancelReason',
        label: t(
          'Huỷ bỏ đối soát hoa hồng? Thông tin hoa hồng fina chi trả liên quan cũng sẽ bị huỷ bỏ đống thời',
        ),
        placeholder: t('Lý do từ chối duyệt'),
        checkBoxClassName: 'hidden',
      },
    };

    return (
      <HDocumentModalPanel
        width="450px"
        {...{
          visible: true,
          title: t('Xác nhận'),
          hideSubmitAndContinueButton: true,
          submitButtonLabel: t('Đồng ý'),
        }}
      >
        <HFeatureForm
          {...{
            schema: () => [
              createSchemaItem({
                Component: TextArea,
                name: messageNameMapping[commissionReceive?.action]?.name,
                colProps: { span: 24 },
                label:
                  messageNameMapping[commissionReceive?.action]?.label || '',
                componentProps: {
                  placeholder:
                    messageNameMapping[commissionReceive?.action]
                      ?.placeholder || '',
                },
              }),
              createSchemaItem({
                Component: Checkbox,
                initialValue: true,
                name: 'allowForControlCommissionSpend',
                valuePropName: 'checked',
                colProps: { span: 24 },
                componentProps: {
                  className:
                    messageNameMapping[commissionReceive?.action]
                      ?.checkBoxClassName,
                  children: t('Phê duyệt đồng thời hoa hồng FINA trả'),
                },
              }),
            ],
            hiddenValues: { status: commissionReceive?.action },
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentModalPanel>
    );
  }

  return (
    <HDocumentModalPanel
      {...{
        title: t('Thông tin chi tiết'),
        hideSubmitAndContinueButton: true,
        submitButtonLabel: t('Phê duyệt'),
        footer: <ModalFooterControls />,
      }}
    >
      <HFeatureForm
        {...{
          schema: LoanProductCommissionReceiveDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}
      />
    </HDocumentModalPanel>
  );
};
