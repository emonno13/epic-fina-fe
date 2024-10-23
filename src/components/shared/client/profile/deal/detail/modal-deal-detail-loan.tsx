/* eslint-disable @next/next/no-img-element */
import { MapIconBySteps } from '@components/features/fina/deals/loans/detail/deal-steps';
import {
  DEAL_BANK_STATUS,
  DEAL_STATUS,
  DEAL_STATUSES,
  mergeArrayObjects,
} from '@components/features/fina/deals/utils';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { useSetDocumentDetail } from '@schema-form/features/hooks';
import { Col, Row, Steps } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StatusDeals } from '../deals-loan.table-schema';

const { Step } = Steps;
const DEAL_BANK_STATUSES = Object.keys(DEAL_BANK_STATUS);

export const ModalViewLoanDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();
  const setDocumentDetail = useSetDocumentDetail();
  const { dealDetail } = props;

  if (!dealDetail) {
    return <></>;
  }

  const [statusInit, setStatusInit] = useState(dealDetail?.status);
  const stepCurrentByStatus = () => {
    return DEAL_BANK_STATUSES.indexOf(statusInit);
  };
  const [currentStep, setCurrentStep] = useState(stepCurrentByStatus);

  useEffect(() => {
    setStatusInit(dealDetail?.status);
    setCurrentStep(DEAL_BANK_STATUSES.indexOf(dealDetail?.status));
  }, [dealDetail?.status]);

  const { user = {}, assignee = {}, product = {} } = dealDetail;

  let width = 0,
    height = 0;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  let steps = Object.values(DEAL_STATUS).filter(
    (item: any) => !['Cancel'].includes(item?.name),
  );

  if (dealDetail?.status === DEAL_STATUSES.CANCELLED) {
    steps = Object.values(DEAL_STATUS)
      .filter((item: any) => !['Cancel'].includes(item?.name))
      .map((el) => {
        return { ...el, status: 'error', updatedAt: '' };
      });
  }

  const result = mergeArrayObjects(steps, dealDetail?.statusHistories);

  const infoDeal = [
    { title: 'Mã hồ sơ', value: <>{dealDetail?.code}</> },
    { title: 'Loại hồ sơ', value: <>{'Vay vốn'}</> },
    {
      title: 'Số tiền vay',
      value: (
        <>
          {FormatterUtils.formatAmount(dealDetail?.loanMoney || 0, '')}
          <sup>đ</sup>
        </>
      ),
    },
    { title: 'Thời gian vay', value: <>{dealDetail?.timeLoan} Tháng</> },
    {
      title: 'Ngày tạo hồ sơ',
      value: <>{moment(dealDetail?.createdAt).format('DD-MM-YYYY')}</>,
    },
    {
      title: 'Chuyên viên hỗ trợ',
      value: <>{ConverterUtils.getFullNameUser(assignee)}</>,
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
      <div className="profile-information-deal-detail-container-header">
        <div className="profile-information-deal-detail-container-header-left">
          <img
            src={dealDetail?.executePartner?.avatar?.url}
            alt=""
            width={50}
            height={50}
            style={{
              backgroundColor: `${dealDetail?.partner?.backgroundColor || '#fff'}`,
            }}
          />
          <div>
            <div className="deal-detail-list-item-org-code">
              {dealDetail?.executePartner?.code}
            </div>
            <div className="deal-detail-list-item-org-name">
              {dealDetail?.executePartner?.name}
            </div>
          </div>
        </div>

        <div className="deal-detail-list-item-org">
          <StatusDeals {...{ document: dealDetail, currentUser }} />
        </div>
      </div>

      <Row gutter={[16, 16]} className="profile-information-deal-detail">
        <Col span={24}>
          <div className="detail-section">
            <p className="title">Thông tin hồ sơ</p>
            {infoDeal?.map((el, index) => {
              return <div key={index}>{Item(el)}</div>;
            })}
          </div>
        </Col>

        <Col span={24}>
          <p className="title">Lịch sử duyệt</p>
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
                        <div className="title-step">{t(step?.name)}</div>
                        <div className={'time-updatedAt'}>
                          {ConverterUtils.dateConverterToString(
                            step?.updatedAt,
                          )}
                        </div>
                      </div>
                    ),
                    status: dealDetail?.subStatus ? 'error' : step?.status,
                    disabled: step?.disable || false,
                  }}
                />
              ))}
            </Steps>
          )}
        </Col>
      </Row>
    </div>
  );
};
