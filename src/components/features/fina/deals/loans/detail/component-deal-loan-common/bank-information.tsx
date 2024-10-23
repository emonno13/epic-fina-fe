import HCard from '@components/shared/common/h-card';
import { useHTranslation } from '@lib/i18n';
import { useTransactionsOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { Col, Row } from 'antd';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';
import { FiledViewer } from '../../../../../../shared/common/configuration/field-viewer';
import { USER_TYPES } from '../../../../../crm/tasks/constans';
import { calculationUnreconciledAmount } from '../../../utils';
import { CustomerInformation } from './customer-infomation';

export const BankInformation = ({
  isEditBank,
  dealDetail,
  onEditDocument,
  currentStep,
  detail,
}) => {
  const { t } = useHTranslation('admin-common');
  const { id } = dealDetail;
  const currentUser = useCurrentUser();
  const isOnyViewPermission = [
    USER_TYPES.customer,
    USER_TYPES.collaborator,
  ].includes(currentUser.type);
  const editDocumentComponent = isOnyViewPermission ? (
    '_'
  ) : (
    <a onClick={onEditDocument}>{t('add', { en: 'Add', vn: 'Bổ sung' })}</a>
  );
  const transactionsOfDeal = useTransactionsOfDeal(`transactions-${id}`);
  const { totalAmountPaid = 0, transactionDetails = [] } = transactionsOfDeal;
  const stepDisbursing = 5;
  const isDisbursing = currentStep === stepDisbursing;
  if (isEditBank) {
    return null;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col {...{ xs: 24, sm: 24, md: 12 }}>
        <CustomerInformation {...{ detail, onEditDocument }} />
      </Col>
      <Col {...{ xs: 24, sm: 24, md: 12 }}>
        <HCard
          {...{
            title: t('Result'),
            titleProps: {
              tooltip: t('Result'),
              style: {
                color: '#064DD6',
                fontWeight: 700,
              },
            },
          }}
        >
          <FiledViewer
            {...{
              label: t('Approval Amount'),
              value: dealDetail?.info?.approvalAmount
                ? FormatterUtils.formatAmount(
                    dealDetail?.info?.approvalAmount || 0,
                    'vnđ',
                  )
                : editDocumentComponent,
            }}
          />
          {isDisbursing && (
            <>
              <FiledViewer
                {...{
                  label: t('Counter amount'),
                  value: FormatterUtils.formatAmount(totalAmountPaid, 'vnđ'),
                }}
              />
              <FiledViewer
                {...{
                  label: t('Unreconciled amount'),
                  value: FormatterUtils.formatAmount(
                    calculationUnreconciledAmount(transactionDetails),
                    'vnđ',
                  ),
                }}
              />
            </>
          )}
          <FiledViewer
            {...{
              label: t('Borrow time (month)', { vn: 'Thời gian vay (tháng)' }),
              value: dealDetail?.info?.borrowTime || editDocumentComponent,
            }}
          />
          <FiledViewer
            {...{
              label: t('Approval Date'),
              value: dealDetail?.info?.approvalDate
                ? ConverterUtils.fullDatetimeConverter(
                    `${dealDetail?.info?.approvalDate}`,
                  )
                : editDocumentComponent,
            }}
          />
          <FiledViewer
            {...{
              label: t('Code Bank Profile', {
                vn: 'Mã hồ sơ vay phía ngân hàng',
              }),
              value: dealDetail?.info?.codeBankProfile || editDocumentComponent,
            }}
          />
          <FiledViewer
            {...{
              label: t('Code Customer Profile', {
                vn: 'Mã khách hàng phía ngân hàng',
              }),
              value:
                dealDetail?.info?.codeBankCustomer || editDocumentComponent,
            }}
          />
        </HCard>
      </Col>
    </Row>
  );
};
