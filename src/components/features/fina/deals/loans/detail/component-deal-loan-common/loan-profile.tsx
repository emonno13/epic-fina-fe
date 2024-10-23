import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import HCard from '@components/shared/common/h-card';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useHTranslation } from '@lib/i18n';
import { ORGANIZATION_TYPES, USER_TYPES } from 'types/organization';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';
import { FiledViewer } from '../../../../../../shared/common/configuration/field-viewer';

export const DealLoanProfile = (props: any) => {
  const { detail, onEditDocument, dealDetail, type } = props;
  const currentUser: any = useCurrentUser();
  const isOnyViewPermission = [
    USER_TYPES.customer,
    USER_TYPES.collaborator,
  ].includes(currentUser.type);
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const { t } = useHTranslation('admin-common');
  const editDocumentComponent = isOnyViewPermission ? (
    '_'
  ) : (
    <a onClick={onEditDocument}>{t('add', { en: 'Add', vn: 'Bổ sung' })}</a>
  );
  const { locale } = useRouter();

  return (
    <HCard
      {...{
        title: t('Loans profile'),
        titleProps: {
          style: {
            color: '#064DD6',
            fontWeight: 700,
          },
          tooltip: t('Loans profile'),
        },
        className: 'loan-profile',
      }}
    >
      <Row>
        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <FiledViewer
            {...{
              label: t('Loans profile'),
              value: detail?.code,
            }}
          />
          <FiledViewer
            {...{
              label: t('Apartment Code Investor', { vn: 'Mã SP CĐT' }),
              value:
                isOrgStaff &&
                !detail?.apartmentCodeInvestor &&
                type === ORGANIZATION_TYPES.SUB_ORG
                  ? editDocumentComponent
                  : detail?.apartmentCodeInvestor,
            }}
          />
          <RealEstateInfo {...{ detail, editDocumentComponent, type }} />
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 12 }}>
          <FiledViewer
            {...{
              label: t('Consultation request code'),
              value: detail?.task?.code ? (
                <ClickableOpacity
                  onClick={() => {
                    window.open(
                      `${window.location.origin}/${locale}/admin/tasks/task?documentId=${detail?.task?.id}`,
                      '_blank',
                    );
                  }}
                >
                  <a>{detail?.task?.code}</a>
                </ClickableOpacity>
              ) : (
                '_'
              ),
            }}
          />
          <FiledViewer
            {...{
              label: t('Product'),
              value: detail?.product?.name || '',
            }}
          />
          <FiledViewer
            {...{
              label: t('Amount requested by the customer to borrow', {
                vn: 'Số tiền khách yêu cầu vay',
              }),
              value:
                isOrgStaff &&
                !detail?.loanMoney &&
                type === ORGANIZATION_TYPES.SUB_ORG
                  ? editDocumentComponent
                  : FormatterUtils.formatAmount(detail?.loanMoney || 0, 'vnđ'),
            }}
          />
          <FiledViewer
            {...{
              label: t('Borrow time'),
              value:
                isOrgStaff &&
                !detail?.timeLoan &&
                type === ORGANIZATION_TYPES.SUB_ORG
                  ? editDocumentComponent
                  : detail?.timeLoan
                    ? `${detail?.timeLoan} (${t('year', { vn: 'Năm' })})`
                    : '',
            }}
          />
          <FiledViewer
            {...{
              label: t('Created at'),
              value: detail?.createdAt
                ? ConverterUtils.fullDatetimeConverter(`${detail.createdAt}`)
                : '',
            }}
          />
          {type !== ORGANIZATION_TYPES.SUB_ORG && dealDetail.sharingTime && (
            <FiledViewer
              {...{
                label: t('Sharing Time', { vn: 'Thời gian chuyển giao' }),
                value: ConverterUtils.fullDatetimeConverter(
                  `${dealDetail.sharingTime}`,
                ),
              }}
            />
          )}
        </Col>
      </Row>
    </HCard>
  );
};

const RealEstateInfo = ({ detail, editDocumentComponent, type }) => {
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const { t } = useHTranslation('admin-common');
  if (detail?.category?.productCategory == ORGANIZATION_TYPES.REAL_ESTATE) {
    return (
      <>
        <FiledViewer
          {...{
            label: t('Apartment code'),
            value:
              isOrgStaff &&
              !detail?.realEstateInfo?.apartmentCode &&
              type === ORGANIZATION_TYPES.SUB_ORG
                ? editDocumentComponent
                : (detail?.realEstateInfo?.apartmentCode ?? ''),
          }}
        />
        <FiledViewer
          {...{
            label: t('Address'),
            value:
              isOrgStaff &&
              !detail?.realEstateInfo?.address &&
              type === ORGANIZATION_TYPES.SUB_ORG
                ? editDocumentComponent
                : (detail?.realEstateInfo?.address ?? ''),
          }}
        />
      </>
    );
  }
  return null;
};
