/* eslint-disable react/style-prop-object */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Form, message, Spin } from 'antd';

import { HModal } from '@components/shared/common/h-modal';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useRequest } from '@umijs/hooks';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { RootStateOrAny, useSelector } from 'react-redux';
import ClientLeaveInfoForm from '../leave-info-form';
import { PAYMENT_METHOD } from '../loan-calculator/constants';
import { getCalcResult } from '../loan-calculator/utils';
import CustomTable from './components/CustomTable';
import FormSendToMail from './components/FormSendToMail';
import OverView from './components/OverView';
import { LOAN_ESTIMATE_COLUMNS } from './constant';

import './loan-estimate.module.scss';

interface LoanEstimateProps {
  systemConfig?: any;
  dataSendEmail?: any;
}

const LoanEstimate = ({
  systemConfig = {},
  dataSendEmail,
}: LoanEstimateProps) => {
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser();
  const [handleData, setHandleData] = useState<any>({});
  const [isDownload, setIsDownload] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const calc = useSelector((state: RootStateOrAny) => state.loanCalcObj);
  const { push, query } = useRouter();
  const [form] = Form.useForm();

  const onCancelForm = () => {
    setIsDownload(false);
    form.resetFields();
  };

  const currentUserName = useMemo(() => {
    const { fullName, firstName, lastName } = currentUser;
    if (fullName) {
      return fullName;
    }
    if (lastName && firstName) {
      return `${lastName} ${firstName}`;
    }
    return '';
  }, [currentUser]);

  const nowDate = useMemo(() => {
    return moment().format('DD [Tháng] MM, YYYY');
  }, []);

  const firstMonthTotalPay = useMemo(() => {
    const { monthlyPayment } = handleData || {};

    if (Array.isArray(monthlyPayment) && monthlyPayment.length > 0) {
      const firstMonthData = monthlyPayment[0] || {};

      return numeral(firstMonthData.totalPaymentPerMonth || 0).format(
        '0,0,0,0',
      );
    }
    return 0;
  }, [handleData]);

  const prepaymentPenalty = useMemo(() => {
    if (handleData && Object.keys(handleData).length > 0) {
      const { prepaymentPenalty } = handleData;

      return numeral(prepaymentPenalty).format('0,0,0,0');
    }
    return 0;
  }, [handleData]);

  const asyncGetCalcResult = useRequest(getCalcResult, {
    manual: true,
    onSuccess: (res) => {
      setHandleData(res);
    },
  });

  const handleRedirect = useCallback(() => {
    const loanCalcLink = '/cong-cu-tinh-khoan-vay';
    try {
      const redirectData = JSON.parse((query?.redirect as string) || '{}');

      if (Object.keys(redirectData).length > 0) {
        push({
          pathname: redirectData.pathname || loanCalcLink,
          query: redirectData.query || {},
        });
      } else {
        push(loanCalcLink);
      }
    } catch (error) {
      push(loanCalcLink);
    }
  }, [query]);

  useEffect(() => {
    if (calc) {
      asyncGetCalcResult.run(calc);
    }
  }, [calc]);

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const downloadPdf = () => {
    FormUtils.submitForm(
      {
        ...calc,
        note:
          'Thông tin khoản vay:  ' +
          Object.keys(calc)
            .map((i) => i + ': ' + calc[i])
            .join(' ; '),
        fullName: dataSendEmail?.fullName,
        email: dataSendEmail?.email,
        phone: dataSendEmail?.phone,
      },
      {
        nodeName: 'calculator',
        method: 'post',
        onGotSuccess: (res) => {
          message.success(
            t('Sent to your email, please check your mailbox', {
              vn: 'Đã gửi qua email của bạn, hãy kiểm tra hộp mail',
            }),
          );

          if (res?.linkFile) {
            window.open(res?.linkFile, '_blank');
          }
        },
      },
    );
  };

  return (
    <div>
      <ClientLeaveInfoForm />
      <div className="w1100">
        <div className="loan-estimate-wrapper-button-detail">
          {/* <Button
						onClick={handleRedirect}
						className={'backButton'}
						icon={<FontAwesomeIcon className="backButtonIcon" icon={faLongArrowAltLeft} />}
					>
          				&nbsp;&nbsp; {t('Back to the loan calculator', {vn :'Quay trở lại bảng tính'})}
					</Button> */}
          <Button
            onClick={() => downloadPdf()}
            className="pdfButton"
            icon={
              <FontAwesomeIcon
                className="backButtonIcon"
                icon={faFileDownload}
              />
            }
          >
            &nbsp;&nbsp; {t('Get pdf file', { vn: 'Nhận file PDF' })}
          </Button>
        </div>

        {calc && handleData ? (
          <div className="Fn_LoanEstimate_Wrapper">
            <div className="Fn_LoanEstimate_Infor">
              <div className="Fn_LoanEstimate_Infor_Groups">
                <div className="Fn_LoanEstimate_Infor_Group_Up">
                  <div className="Fn_LoanEstimate_Infor_Logo">
                    <h2>
                      {t('Joint Stock Company', { vn: 'Công ty CP' })} <br />{' '}
                      {t('Tulip Financial Services', {
                        vn: 'Dịch vụ Tài chính Tulip',
                      })}
                    </h2>
                    <div className="description-phone">
                      Hotline: <span>0857498668</span>
                    </div>
                    <div className="description-web">
                      Website:{' '}
                      <a
                        href="https://fina.com.vn/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        fina.com.vn
                      </a>
                    </div>
                  </div>
                  <div className="Fn_LoanEstimate_Infor_Group_Wrapper">
                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>{t('Customer', { vn: 'Khách hàng' })}</span>
                        <h2>{dataSendEmail?.fullName || '_'}</h2>
                      </div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>
                          {t('Amount to borrow', { vn: 'Số tiền cần vay' })}
                        </span>
                        <h2>
                          {(calc &&
                            Object.keys(calc).length > 1 &&
                            calc.propertyPrice &&
                            calc.ratio &&
                            numeral(calc.propertyPrice * calc.ratio).format(
                              '0,0,0,0',
                            )) ||
                            0}{' '}
                          vnđ
                        </h2>
                      </div>
                    </div>
                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>{t('Phone', { vn: 'Số điện thoại' })}</span>
                        <h2>{dataSendEmail?.phone || '_'}</h2>
                      </div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>
                          {t('Preferential interest rate', {
                            vn: 'Lãi suất ưu đãi',
                          })}
                        </span>
                        <h2>
                          {' '}
                          {(calc &&
                            Object.keys(calc).length > 1 &&
                            new BigNumber(calc.introRate)
                              .times(100)
                              .toNumber()) ||
                            0}{' '}
                          %
                        </h2>
                      </div>
                    </div>
                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>{t('Email', { vn: 'Địa chỉ email' })}</span>
                        <h2>{dataSendEmail?.email || '_'}</h2>
                      </div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>
                          {t('Interest rate after preferential treatment', {
                            vn: 'Lãi suất sau ưu đãi',
                          })}
                        </span>
                        <h2>
                          {(calc &&
                            Object.keys(calc).length > 1 &&
                            new BigNumber(calc.rate).times(100).toNumber()) ||
                            0}{' '}
                          %
                        </h2>
                      </div>
                    </div>
                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail"></div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>{t('Tenor', { vn: 'Thời hạn vay' })}</span>
                        <h2>
                          {calc?.months || 0}{' '}
                          {t(calc?.months > 1 ? 'Months' : 'Month', {
                            vn: 'Tháng',
                          })}
                        </h2>
                      </div>
                    </div>

                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail"></div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>
                          {t('Offer period', { vn: 'Thời gian ưu đãi' })}
                        </span>
                        <h2>
                          {calc?.introMonths || 0}{' '}
                          {t(calc?.introMonths > 1 ? 'Months' : 'Month', {
                            vn: 'Tháng',
                          })}
                        </h2>
                      </div>
                    </div>

                    <div className="Fn_LoanEstimate_Infor_Group">
                      <div className="Fn_LoanEstimate_Infor_Detail"></div>
                      <div className="Fn_LoanEstimate_Infor_Detail">
                        <span>
                          {t('Debt payment method', { vn: 'Hình thức trả nợ' })}
                        </span>
                        <h2>{calc && PAYMENT_METHOD[calc.paymentMethod]}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Spin spinning={asyncGetCalcResult?.loading}>
              <div className="Fn_LoanEstimate_Table">
                <div className="Fn_LoanEstimate_Table_Header_Wrapper">
                  <div className="Fn_LoanEstimate_Table_Header">
                    <div className="Fn_LoanEstimate_Table_Header_Quote">
                      <h3>
                        {t('Estimated loan payable by period', {
                          vn: 'Bảng ước tính khoản vay phải trả theo từng kỳ',
                        })}
                      </h3>
                    </div>
                    <div className="Fn_LoanEstimate_Table_Header_StartDate">
                      <span>
                        {t('Tabulation date', { vn: 'Ngày lập bảng' })} <br />{' '}
                        {nowDate}
                      </span>
                    </div>
                  </div>
                  <OverView
                    calc={calc}
                    prepaymentPenalty={prepaymentPenalty}
                    firstMonthTotalPay={firstMonthTotalPay}
                  />
                </div>

                <div id="table-data">
                  <div className="Fn_LoanEstimate_Mobile_Infor">
                    <div className="Fn_LoanEstimate_Mobile_Infor_Group">
                      <span>{t('Borrowing rate', { vn: 'Tỷ lệ vay' })}</span>
                      <h3>{calc && (calc.ratio * 100).toFixed(2)} %</h3>
                    </div>
                    <div className="Fn_LoanEstimate_Mobile_Infor_Group">
                      <span>
                        {t('Need to pay in advance', { vn: 'Cần trả trước' })}
                      </span>
                      <h3>
                        {handleData &&
                          numeral(handleData.deposit).format('0,0,0,0')}{' '}
                        đ
                      </h3>
                    </div>
                    <div className="Fn_LoanEstimate_Mobile_Infor_Group">
                      <span>
                        {t('Interest rate after preferential treatment', {
                          vn: 'Lãi suất sau ưu đãi',
                        })}
                      </span>
                      <h3>{calc && (calc.rate * 100).toFixed(2)} %</h3>
                    </div>
                    <div className="Fn_LoanEstimate_Mobile_Infor_Group">
                      <span>
                        {t('Original to be paid', { vn: 'Gốc cần trả' })}
                      </span>
                      <h3>
                        {handleData &&
                          numeral(handleData.principlePayment).format(
                            '0,0,0,0',
                          )}{' '}
                        đ
                      </h3>
                    </div>
                    <div className="Fn_LoanEstimate_Mobile_Infor_Group">
                      <span>
                        {t('The money have to pay', { vn: 'Số tiền phải trả' })}
                      </span>
                      <h3>
                        {handleData &&
                          numeral(handleData.totalPayment).format(
                            '0,0,0,0',
                          )}{' '}
                        đ
                      </h3>
                    </div>
                  </div>

                  <CustomTable
                    dataSource={(handleData?.monthlyPayment || []).map((i) => ({
                      ...i,
                      key: i.period,
                    }))}
                    columns={LOAN_ESTIMATE_COLUMNS({ isMobile, t })}
                    scroll={isMobile ? { x: 1000, y: 400 } : { y: 500 }}
                  />
                  <div className="Fn_LoanEstimate_SubCode">
                    <span>
                      *
                      {t(
                        'The spreadsheet is for reference only. Please contact the consultant directly to receive the most accurate information.',
                        {
                          vn: 'Bảng tính chỉ có giá trị tham khảo. Vui lòng liên hệ tư vấn trực tiếp để nhận được thông tin chính xác nhất.',
                        },
                      )}
                    </span>
                  </div>
                  <div className="Fn_LoanEstimate_introl">
                    <h2>
                      {t(
                        'Copyright belongs to Tulip Financial Services Joint Stock Company',
                        {
                          vn: 'Bản quyền thuộc về Công ty CP Dịch vụ Tài chính Tulip',
                        },
                      )}{' '}
                      <br />
                      {t(
                        'Address: 2W Ung Van Khiem, Ward 25, Binh Thanh District, City. Ho Chi Minh',
                        {
                          vn: 'Địa chỉ: 2W Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Tp. Hồ Chí Minh',
                        },
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </Spin>
          </div>
        ) : (
          <div>
            {t("You don't have any loans", {
              vn: 'Bạn không có khoản vay nào',
            })}
          </div>
        )}
      </div>
      <HModal
        visible={isDownload}
        centered
        footer={null}
        title={null}
        width="370px"
        onCancel={onCancelForm}
      >
        <FormSendToMail
          {...{
            hiddenValues: {
              ...calc,
              note:
                'Thông tin khoản vay:  ' +
                Object.keys(calc)
                  .map((i) => i + ': ' + calc[i])
                  .join(' ; '),
            },
            form,
            onGotSuccess: onCancelForm,
          }}
        />
      </HModal>
    </div>
  );
};

export default LoanEstimate;
