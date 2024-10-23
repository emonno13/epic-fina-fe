import { Col, Row, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'next-i18next';

import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { HFeatureForm } from '../../../../../../../schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '../../../../../../../schema-form/features/hooks';
import { useHideDocumentDetail } from '../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { HDocumentModalPanel } from '../../../../../../../schema-form/features/panels';
import { HButton } from '../../../../../../shared/common-form-elements/h-confirmation-button';
import { Link } from '../../../../../../shared/link';
import { USER_TYPES_LABEL_MAPPING } from '../../../../../../shared/user/constants';
import { PreViewUser } from '../../../../deals/deals-component-common/preview-user';
import { TRANSACTION_TYPE } from '../../../../transaction/constant';
import { useTaxVAT } from '../../../hooks';
import {
  COMMISSION_REASON_SPEND_MAPPING,
  COMMISSION_ROLE_SPECIFY_LABEL_MAPPING,
  COMMISSION_STATUS_COLOR_MAPPING,
  COMMISSION_STATUS_LABEL_MAPPING,
  COMMISSION_STATUSES,
  METHODS,
} from '../../../settings/loan-product/constant';
import { GroupInformation, GroupInformationItem } from '../../common-block';

const calculateCommissionReceiveBySettingAndAmount = (
  setting: any,
  amount: number,
): number => {
  const method = setting?.formula?.method;

  if (method === METHODS.FIXED) {
    return +(setting?.formula?.fixCommission || 0);
  }

  const commissionSettingMax = +(setting?.formula?.maxCommission || 0);
  const commissionByRatio =
    amount * (+(setting?.formula?.percentCommission || 0) / 100);

  return Math.min(commissionSettingMax, commissionByRatio);
};

const LoanProductCommissionSpendDetailSchemaForm = (): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const VAT = useTaxVAT();
  const commission = useDocumentDetail();

  const transaction = commission?.transaction;
  const transactionDetail = commission?.transactionDetail;
  const recipient = commission?.user;
  const commissionSettingReceive = commission?.commissionSettingReceive;
  const commissionAmount = commission?.amount || 0;
  const commissionHistories = commission?.statusHistories || [];
  const ratioApplied = commission?.ratioApplied;

  const commissionPaid = commissionHistories.find(
    (item) => item.status === COMMISSION_STATUSES.PAID,
  );
  const commissionForControl = commissionHistories.find(
    (item) => item.status === COMMISSION_STATUSES.FOR_CONTROL,
  );
  const commissionCancelled = commissionHistories.find(
    (item) => item.status === COMMISSION_STATUSES.CANCELLED,
  );

  const forControlInfoMapping = {
    [COMMISSION_STATUSES.FOR_CONTROL]: [
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
        label: t('Lời nhắn đối soát'),
        value: commission?.forControlMessage || '',
      },
    ],
    [COMMISSION_STATUSES.PAID]: [
      {
        label: t('Ngày thanh toán'),
        value: ConverterUtils.dateConverterToString(commissionPaid?.updatedAt),
      },
      {
        label: t('Người thanh toán'),
        value: commissionPaid ? (
          <PreViewUser
            user={commissionPaid?.updatedBy}
            userTitle={t(
              USER_TYPES_LABEL_MAPPING[commissionPaid?.updatedBy?.type],
            )}
          />
        ) : (
          ''
        ),
      },
      {
        label: t('Lời nhắn thanh toán'),
        value: commission?.paidMessage || '',
      },
    ],
    [COMMISSION_STATUSES.CANCELLED]: [
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
        label: t('Lời nhắn huỷ'),
        value: commission?.cancelReason || '',
      },
    ],
  };

  const data = commissionHistories
    .map((history: any) => forControlInfoMapping[history.status])
    .flat();

  let commissionTotalAmountReceived =
    calculateCommissionReceiveBySettingAndAmount(
      commissionSettingReceive,
      transactionDetail?.amount,
    );
  const commissionAmountShouldReceivedBeforeTax =
    commissionTotalAmountReceived / (1 + VAT);

  let amountSpendMax =
    ((ratioApplied?.spendMax || 0) / 100) *
    commissionAmountShouldReceivedBeforeTax;

  let usersMapping = {};
  const transactionType = commission.transactionType;

  if (transactionType === TRANSACTION_TYPE.LOAN) {
    const receivers = ratioApplied?.receivers || [];

    usersMapping = {
      [TRANSACTION_TYPE.LOAN]: {
        ['source']: {
          label: t('Người giới thiệu / CTV'),
          value: ratioApplied?.source,
        },
        ['handlingStaff']: {
          label: t('Nhân viên xử lý'),
          value: ratioApplied?.handlingStaff,
        },
      },
    };

    for (const receiver of receivers) {
      usersMapping[TRANSACTION_TYPE.LOAN][receiver.position] = {
        label: receiver?.positionModel?.name || '',
        value: receiver?.commissionPercent,
      };
    }
  } else {
    const percentCommissionReceive =
      commission?.commissionSettingReceive?.percentCommission;
    const percentCommissionSpend =
      commission?.commissionSettingSpend?.personal?.percentCommission;

    commissionTotalAmountReceived =
      transactionDetail.amount * (percentCommissionReceive / 100);
    amountSpendMax =
      ((transactionDetail.amount * (percentCommissionReceive / 100)) /
        (1 + VAT)) *
      (percentCommissionSpend / 100);

    usersMapping = {
      [TRANSACTION_TYPE.INSURANCE]: {
        [commission.userId]: {
          label:
            !commission?.level || commission?.level === 1
              ? t('CTV bán BH')
              : `${t('Quản lý cấp')} ${commission?.level}`,
          value:
            commission?.commissionSettingSpend?.personal[
              `collaborator${commission.level || 1}`
            ],
        },
      },
    };
  }

  const receiveInfo =
    usersMapping[transactionType][
      transactionType === TRANSACTION_TYPE.LOAN
        ? commission.roleBusiness
        : recipient.id
    ];

  return [
    createSchemaItem({
      Component: () => {
        return (
          <>
            <Row gutter={24}>
              <Col md={12}>
                <GroupInformation
                  title={t('Recipient information', {
                    vn: 'Thông tin người nhận',
                  })}
                >
                  <GroupInformationItem
                    {...{
                      label: t('Người nhận'),
                      value: recipient ? (
                        <PreViewUser
                          user={recipient}
                          userTitle={t(
                            USER_TYPES_LABEL_MAPPING[recipient.type],
                          )}
                        />
                      ) : (
                        ''
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Tư cách'),
                      value:
                        COMMISSION_ROLE_SPECIFY_LABEL_MAPPING[
                          commission?.roleSpecify
                        ] || '',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Tổ chức'),
                      value: recipient?.org?.name || '',
                    }}
                  />
                </GroupInformation>

                <GroupInformation title={t('THÔNG TIN HOA HỒNG')}>
                  <GroupInformationItem
                    {...{
                      label: t('HH chi trả tối đa'),
                      value: `${FormatterUtils.formatAmount(amountSpendMax, 'VND')} (${ratioApplied?.spendMax || 0}%)`,
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Vai trò'),
                      value: receiveInfo?.label || '',
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Tỷ lệ'),
                      value: `${receiveInfo?.value || 0}%`,
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('HH nhận được'),
                      value: FormatterUtils.formatAmount(
                        commissionAmount,
                        'VND',
                      ),
                    }}
                  />
                </GroupInformation>
              </Col>
              <Col md={12}>
                <GroupInformation title={t('THÔNG TIN NGUỒN CHI TRẢ')}>
                  <GroupInformationItem
                    {...{
                      label: t('Lý do chi trả'),
                      value: COMMISSION_REASON_SPEND_MAPPING[transactionType],
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Mã GN'),
                      value: (
                        <Link
                          href={`/admin/transaction?documentId=${transaction?.id}`}
                        >{`#${transaction?.code}`}</Link>
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('Số tiền GN'),
                      value: FormatterUtils.formatAmount(
                        transactionDetail.amount,
                        'VND',
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('HH FINA nhận sau thuế'),
                      value: FormatterUtils.formatAmount(
                        commissionTotalAmountReceived,
                        'VND',
                      ),
                    }}
                  />
                  <GroupInformationItem
                    {...{
                      label: t('HH FINA nhận trước thuế'),
                      value: FormatterUtils.formatAmount(
                        commissionTotalAmountReceived / (1 + VAT),
                        'VND',
                      ),
                    }}
                  />
                </GroupInformation>

                <GroupInformation title={t('THÔNG TIN ĐỐI SOÁT')}>
                  <GroupInformationItem
                    {...{
                      label: t('Trạng thái'),
                      value: (
                        <Tag
                          color={
                            COMMISSION_STATUS_COLOR_MAPPING[commission.status]
                          }
                        >
                          {COMMISSION_STATUS_LABEL_MAPPING[commission.status] ||
                            ''}
                        </Tag>
                      ),
                    }}
                  />

                  {data.map((item: any, index: number) => (
                    <GroupInformationItem
                      key={index}
                      {...{
                        label: item?.label,
                        value: item?.value,
                      }}
                    />
                  ))}
                </GroupInformation>
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
  const allowForControlStatuses = [COMMISSION_STATUSES.NOT_FOR_CONTROL];
  const allowPaymentStatuses = [
    COMMISSION_STATUSES.NOT_FOR_CONTROL,
    COMMISSION_STATUSES.FOR_CONTROL,
  ];
  const allowCancelStatuses = [COMMISSION_STATUSES.NOT_FOR_CONTROL];

  return (
    <div className="item-align-right">
      {allowForControlStatuses.includes(commissionStatus) && (
        <HButton
          onClick={() => handleClickButton('for_control')}
          type="primary"
        >
          {t('Phê duyệt')}
        </HButton>
      )}

      {allowPaymentStatuses.includes(commissionStatus) && (
        <HButton
          onClick={() => handleClickButton('paid')}
          type={'primary'}
          className="m-l-10"
          ghost
        >
          {t('Thanh toán')}
        </HButton>
      )}

      {allowCancelStatuses.includes(commissionStatus) && (
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

export const LoanProductCommissionSpendDetailForm = () => {
  const { t } = useHTranslation('admin-common');
  const commissionReceive = useDocumentDetail();

  if (
    commissionReceive?.action === COMMISSION_STATUSES.FOR_CONTROL ||
    commissionReceive?.action === COMMISSION_STATUSES.PAID ||
    commissionReceive?.action === COMMISSION_STATUSES.CANCELLED
  ) {
    const messageNameMapping = {
      [COMMISSION_STATUSES.FOR_CONTROL]: {
        name: 'forControlMessage',
        label: t('Phê duyệt đối soát hoa hồng FINA trả?'),
        placeholder: t('Leave message', { vn: 'Để lại lời nhắn' }),
      },
      [COMMISSION_STATUSES.PAID]: {
        name: 'paidMessage',
        label: t('Khoản hoa hồng này đã được thanh toán?'),
        placeholder: t('Leave message', { vn: 'Để lại lời nhắn' }),
      },
      [COMMISSION_STATUSES.CANCELLED]: {
        name: 'cancelReason',
        label: t('Không đồng ý phê duyệt khoản hoa hồng này?'),
        placeholder: t('Lý do từ chối duyệt'),
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
        footer: <ModalFooterControls />,
      }}
    >
      <HFeatureForm
        {...{
          schema: LoanProductCommissionSpendDetailSchemaForm,
          hideSubmitAndContinueButton: true,
          hideControlButton: true,
        }}
      />
    </HDocumentModalPanel>
  );
};
