import { MapIconBySteps } from '@components/features/fina/deals/loans/detail/deal-steps';
import {
  DEAL_BANK_STATUS,
  DEAL_STATUS,
  DEAL_STATUSES,
  mergeArrayObjects,
} from '@components/features/fina/deals/utils';
import { Phones } from '@components/shared/stringee';
import { CloseIconLargeSvg } from '@icons';
import { ConverterUtils, useGenerateConcealContent } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { Col, Modal, Row, Steps } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IconBack } from '../../affiliate/components/icons/icon-back';
import { StatusDeals } from '../deals-loan.table-schema';
import { ModalViewLoanDetail } from './modal-deal-detail-loan';

const { Step } = Steps;
const DEAL_BANK_STATUSES = Object.keys(DEAL_BANK_STATUS);

export const ViewLoanInformationDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const detail = useDocumentDetail();
  const { currentUser } = useAuth();
  const generateConcealContent = useGenerateConcealContent();
  const setDocumentDetail = useSetDocumentDetail();
  // const [visible, setVisible] = useState<boolean>(false);
  const [dealDetail, setDealDetail] = useState(undefined);
  const { setOpenDetail } = props;

  if (!detail) {
    return <></>;
  }

  const [statusInit, setStatusInit] = useState(detail?.status);
  const stepCurrentByStatus = () => {
    return DEAL_BANK_STATUSES.indexOf(statusInit);
  };
  const [currentStep, setCurrentStep] = useState(stepCurrentByStatus);

  useEffect(() => {
    setStatusInit(detail?.status);
    setCurrentStep(DEAL_BANK_STATUSES.indexOf(detail?.status));
  }, [detail?.status]);

  const { user = {}, assignee = {}, product = {}, dealDetails = [] } = detail;

  let width = 0,
    height = 0;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  let steps = Object.values(DEAL_STATUS).filter(
    (item: any) => !['Cancel'].includes(item?.name),
  );

  if (detail?.status === DEAL_STATUSES.CANCELLED) {
    steps = Object.values(DEAL_STATUS)
      .filter((item: any) => !['Cancel'].includes(item?.name))
      .map((el) => {
        return { ...el, status: 'error', updatedAt: '' };
      });
  }

  const result = mergeArrayObjects(steps, detail?.statusHistories);

  const infoDeal = [
    { title: 'Mã hồ sơ', value: <>{detail?.code}</> },
    { title: 'Loại hồ sơ', value: <>{'Vay vốn'}</> },
    {
      title: 'Số tiền vay',
      value: (
        <>
          {FormatterUtils.formatAmount(detail?.loanMoney || 0, '')}
          <sup>đ</sup>
        </>
      ),
    },
    { title: 'Thời gian vay', value: <>{detail?.timeLoan} Tháng</> },
    {
      title: 'Ngày tạo hồ sơ',
      value: <>{moment(detail?.createdAt).format('DD-MM-YYYY')}</>,
    },
    {
      title: 'Chuyên viên hỗ trợ',
      value: <>{ConverterUtils.getFullNameUser(assignee)}</>,
    },
  ];

  const infoCustomer = [
    { title: 'Chủ sở hữu', value: <>{ConverterUtils.getFullNameUser(user)}</> },
    {
      title: 'Số điện thoại',
      value: (
        <>
          <Phones phones={user?.tels} userInfo={user} />
        </>
      ),
    },
    {
      title: 'Địa chỉ email',
      value: <> {generateConcealContent(`${user?.emails?.[0]?.email}`)}</>,
    },
    { title: 'Địa chỉ liên hệ', value: <>{user?.address}</> },
    {
      title: 'Tài sản vay',
      value: (
        <>
          {product?.name}{' '}
          {detail?.realEstateInfo?.apartmentCode
            ? `- ${detail?.realEstateInfo?.apartmentCode}`
            : ''}
        </>
      ),
    },
  ];

  const Item = (el) => (
    <div className="info">
      <div className="info-title">{el?.title}</div>
      <div className="info-value">{el?.value}</div>
    </div>
  );

  return (
    <div className="profile-information-deal-detail-container">
      <div className="profile-information-title">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{ marginRight: '10px' }}
            onClick={() => {
              setOpenDetail(false);
              setDocumentDetail(undefined);
            }}
          >
            <IconBack />
          </span>
          <div>{detail?.code}</div>
        </div>

        <StatusDeals {...{ document: detail, currentUser }} />
      </div>
      <Row gutter={[16, 16]} className="profile-information-deal-detail">
        <Col span={12}>
          <div className="detail-section">
            <p className="title">Thông tin hồ sơ</p>
            {infoDeal?.map((el, index) => {
              return <div key={index}>{Item(el)}</div>;
            })}
          </div>
        </Col>
        <Col span={12}>
          <div className="detail-section">
            <p className="title">Thông tin chủ hồ sơ</p>
            {infoCustomer?.map((el, index) => {
              return <div key={index}>{Item(el)}</div>;
            })}
          </div>
        </Col>
        <Col span={24} className="deal-detail-list">
          <p className="title">Trạng thái hồ sơ duyệt</p>
          <Row gutter={[16, 16]}>
            {dealDetails?.map((el, index) => {
              return (
                <Col
                  span={8}
                  key={index}
                  className="deal-detail-list-item"
                  onClick={() => {
                    setDealDetail(el);
                  }}
                >
                  <img
                    src={el?.executePartner?.avatar?.url}
                    alt=""
                    width={48}
                    height={48}
                    style={{
                      backgroundColor: `${el?.partner?.backgroundColor || '#fff'}`,
                    }}
                  />

                  <div className="deal-detail-list-item-org">
                    <div className="deal-detail-list-item-org-item">
                      <div className="deal-detail-list-item-org-code">
                        {el?.executePartner?.code}
                      </div>
                      <StatusDeals {...{ document: el, currentUser }} />
                    </div>
                    <div></div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col span={24}>
          <p className="title">Lịch sử duyệt hồ sơ</p>
          {result?.length > 0 && (
            <Steps
              current={+currentStep}
              labelPlacement={'vertical'}
              size={'small'}
              direction={width < 768 ? 'vertical' : 'horizontal'}
            >
              {result.map((step: any, index) => (
                <Step
                  key={`${step}-${index}`}
                  {...{
                    icon: MapIconBySteps(step?.value),
                    title: (
                      <div>
                        <div>{t(step?.name)}</div>
                        <div className={'time-updatedAt'}>
                          {ConverterUtils.dateConverterToString(
                            step?.updatedAt,
                          )}
                        </div>
                      </div>
                    ),
                    status: detail?.subStatus ? 'error' : step?.status,
                    disabled: step?.disable || false,
                  }}
                />
              ))}
            </Steps>
          )}
        </Col>
      </Row>

      <Modal
        {...{
          title: 'Chi tiết hồ sơ duyệt',
          visible: dealDetail,
          onCancel: () => {
            setDealDetail(undefined);
          },
          footer: null,
          width: 560,
          closeIcon: <CloseIconLargeSvg />,
          className: 'profile-info-modal view-loan-detail-modal',
        }}
      >
        {dealDetail && <ModalViewLoanDetail dealDetail={dealDetail} />}
      </Modal>
    </div>
  );
};
