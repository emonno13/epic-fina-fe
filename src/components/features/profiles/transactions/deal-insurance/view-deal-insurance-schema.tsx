import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { UserAvatar } from '@components/shared/common/h-avatar';
import HCard from '@components/shared/common/h-card';
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import moment from 'moment';
import { RenderSubStatus } from './common';

const ViewDealInsuranceSchema = () => {
  const { t } = useHTranslation('common');
  const dealInsuranceDocumentDetail = useDocumentDetail();
  return (
    <HScrollAnimation>
      <div className="informatio-detail">
        <DealInsuranceDetailInformation
          {...{
            dealInsuranceDocumentDetail,
            t,
          }}
        />

        <div className="information">
          <ContractOwnerDetail
            {...{
              user: dealInsuranceDocumentDetail?.createdBy,
              t,
              title: t('Contract owner', { vn: 'Chủ hợp đồng' }),
              className: 'contract-owner-infomation-component',
            }}
          />
          <ContractOwnerDetail
            {...{
              user: dealInsuranceDocumentDetail?.user,
              t,
              title: t('User', { vn: 'Khách hàng' }),
              className: 'contract-owner-infomation-component',
            }}
          />
        </div>
      </div>
    </HScrollAnimation>
  );
};

export default ViewDealInsuranceSchema;

interface Props {
  user?: any;
  t: Function;
  title?: any;
  className?: string;
}

const ContractOwnerDetail = ({ user, t, title, className }: Props) => {
  return (
    <div className={className}>
      <HCard
        {...{
          className: '',
          title,
          titleProps: {
            tooltip: title,
            style: {
              color: '#064DD6',
              fontWeight: 700,
            },
          },
        }}
      >
        {user && (
          <div className="infomation-cantract-owner">
            <UserAvatar {...{ user }} />
            <div className="infomation-cantract-owner-fullName">
              {user?.fullName}
            </div>
          </div>
        )}
        <FiledViewer
          {...{
            label: t('Phone', { vn: 'Điện thoại' }),
            value:
              user &&
              user?.tels.map((tel) => <span key={tel.tel}>{tel.tel}</span>),
          }}
        />
        <FiledViewer
          {...{
            label: t('Email', { vn: 'Email' }),
            value:
              user &&
              user?.emails.map((email) => (
                <span key={email.email}>{email.email}</span>
              )),
          }}
        />
      </HCard>
    </div>
  );
};

interface DealInsuranceProps {
  dealInsuranceDocumentDetail: any;
}

const DealInsuranceDetailInformation = ({
  dealInsuranceDocumentDetail,
}: DealInsuranceProps) => {
  const { t } = useHTranslation('common');
  const pricePacket =
    dealInsuranceDocumentDetail?.meta?.amount ||
    dealInsuranceDocumentDetail?.meta?.pricePacket ||
    dealInsuranceDocumentDetail?.meta?.price;
  const startTime = dealInsuranceDocumentDetail?.meta?.time?.startTime;
  const endTime = dealInsuranceDocumentDetail?.meta?.time?.endTime;

  return (
    <>
      <HCard
        {...{
          title: t('Infrmattion', { vn: 'Thông tin' }),
          titleProps: {
            tooltip: t('Infrmattion', { vn: 'Thông tin' }),
            style: {
              color: '#064DD6',
              fontWeight: 700,
            },
          },
        }}
      >
        <FiledViewer
          {...{
            label: t('Code', { vn: 'Mã' }),
            value: dealInsuranceDocumentDetail?.code || '__',
          }}
        />
        <FiledViewer
          {...{
            label: t('Status', { vn: 'Trạng thái' }),
            value: dealInsuranceDocumentDetail.status
              ? RenderSubStatus(dealInsuranceDocumentDetail.status, t)
              : '__',
          }}
        />
        <FiledViewer
          {...{
            label: t('Origin', { vn: 'Tổ chức' }),
            value: dealInsuranceDocumentDetail?.org?.name || '__',
          }}
        />
        <FiledViewer
          {...{
            label: t('Product', { vn: 'Sản phẩm' }),
            value: dealInsuranceDocumentDetail?.product?.name || '__',
          }}
        />
        <FiledViewer
          {...{
            label: t('Deal insurance', { vn: 'Gói bảo hiểm' }),
            value: dealInsuranceDocumentDetail?.meta?.name || '__',
          }}
        />
        <FiledViewer
          {...{
            label: t('Contract period', { vn: 'Thời hạn hợp đồng' }),
            value: dealInsuranceDocumentDetail
              ? `${startTime ? moment(startTime).format('DD/MM/YYYY') : '__'} - ${endTime ? moment(endTime).format('DD/MM/YYYY') : '__'}`
              : '',
          }}
        />
        <FiledViewer
          {...{
            label: t('Price', { vn: 'Thanh toán' }),
            value: ConverterUtils.formatNumber(pricePacket),
          }}
        />
      </HCard>
    </>
  );
};
