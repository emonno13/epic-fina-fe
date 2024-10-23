import {
  HInput,
  HInputNumber,
} from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { ArrowDownIconSvg, DropDownSvg, IconInfoRoundYellow } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { NumberUtils } from '@lib/utils/number';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Collapse, Form, notification, Row } from 'antd';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContentFee } from '../detail/client-fund-certificate-detail';
import { InvestNow } from '../detail/common/invest-now';
import { createFundTransactionRequested } from '../store';
import { BuyFundContext } from './context';

const FormInfoFund = ({
  fund,
  navHistory,
  callBack,
  setTransactionDaftId,
  programProductId,
}) => {
  const { info = {} } = fund;
  const { fees, setFees, volume, setVolume } = useContext(BuyFundContext);
  const [form] = Form.useForm();
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleSubmit = async () => {
    setLoadingOrder(true);
    try {
      const values = await form?.validateFields();
      dispatch(
        createFundTransactionRequested({
          ...values,
          productId: fund?.id,
          onGotSuccess: (response) => {
            setLoadingOrder(false);
            setTransactionDaftId(response?.id);
            callBack();
          },
          onGotError: ({ error }) => {
            setLoadingOrder(false);
            notification.error({
              message: 'Không thành công',
              description: error?.message,
            });
          },
        }),
      );
    } catch (e) {
      setLoadingOrder(false);
      FormUtils.showFormValidateFailMessage();
    }
  };

  return (
    <div className="form-info-fund">
      <div className="form-info-fund-header">
        <Row gutter={[10, 10]}>
          {isMobile && (
            <>
              <Col {...{ xs: 15, sm: 12, md: 12 }}>
                <div className="form-info-item">
                  <div className="form-info-fund-label">Phiên giao dịch</div>
                  <div className="form-info-fund-value">
                    {ConverterUtils.dateConverter(
                      info?.nextOrderMatchingSession,
                    )}
                  </div>
                </div>

                <div className="form-info-item">
                  <div className="form-info-fund-label">
                    Thời hạn đặt lệnh (giờ VN)
                  </div>
                  <div className="form-info-fund-value">
                    {info?.closedOrderBookTime
                      ? `${ConverterUtils.dateConverterToString(info.closedOrderBookTime, 'HH:mm, DD/MM/YYYY')}`
                      : ''}
                  </div>
                </div>

                <div className="form-info-item">
                  <div className="form-info-fund-label">
                    Thời hạn thanh toán (giờ VN)
                  </div>
                  <div className="form-info-fund-value">
                    {info?.orderAndTransferMoneyToBuyDate
                      ? `${ConverterUtils.dateConverterToString(info.orderAndTransferMoneyToBuyDate, 'HH:mm, DD/MM/YYYY')}`
                      : ''}
                  </div>
                </div>
              </Col>
              <Col {...{ xs: 9, sm: 12, md: 12 }}>
                <div className="form-info-fund-label">Giá gần nhất</div>
                <div className="form-info-fund-value form-info-fund-value-large">
                  {`${ConverterUtils.formatNumber(NumberUtils.toFixed(navHistory?.[0]?.nav, 0))}`}
                  <sup>đ</sup>
                </div>
              </Col>
            </>
          )}
          {!isMobile && (
            <>
              <Col
                {...{ xs: 15, sm: 12, md: 24 }}
                className={classNames({
                  'flex-between': !isMobile,
                })}
              >
                <div className="form-info-item">
                  <div className="form-info-fund-label">Phiên giao dịch</div>
                  <div className="form-info-fund-value">
                    {ConverterUtils.dateConverter(
                      info?.nextOrderMatchingSession,
                    )}
                  </div>
                </div>

                <div className="form-info-item">
                  <div className="form-info-fund-label">
                    Thời hạn đặt lệnh (giờ VN)
                  </div>
                  <div className="form-info-fund-value">
                    {info?.closedOrderBookTime
                      ? `${ConverterUtils.dateConverterToString(info.closedOrderBookTime, 'HH:mm, DD/MM/YYYY')}`
                      : ''}
                  </div>
                </div>

                <div className="form-info-item">
                  <div className="form-info-fund-label">
                    Thời hạn thanh toán (giờ VN)
                  </div>
                  <div className="form-info-fund-value">
                    {info?.orderAndTransferMoneyToBuyDate
                      ? `${ConverterUtils.dateConverterToString(info.orderAndTransferMoneyToBuyDate, 'HH:mm, DD/MM/YYYY')}`
                      : ''}
                  </div>
                </div>

                <div className="form-info-item">
                  <div className="form-info-fund-label">Giá gần nhất</div>
                  <div className="form-info-fund-value form-info-fund-value-large">
                    {`${ConverterUtils.formatNumber(NumberUtils.toFixed(navHistory?.[0]?.nav, 0))}`}
                    <sup>đ</sup>
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>

      <div className="form-info-fund-content">
        <HForm
          {...{
            form,
            schema: FormInfoFundSchema,
            endpoint: endpoints.endpointWithApiDomain(
              '/transactions/create-transaction-buy-fund',
            ),
            method: 'post',
            transport: {
              fund,
              form,
              navHistory,
              setFees,
              setVolume,
              programProductId,
            },
            hideControlButton: true,
          }}
        />

        <p className={'form-info-fund-content_header'}>
          Thông tin giao dịch tạm tính
        </p>

        <HForm
          {...{
            schema: FormInfoFundProvisionalSchema,
            transport: { volume },
            hideControlButton: true,
          }}
        />
      </div>
      <Collapse
        expandIcon={() => <ArrowDownIconSvg />}
        expandIconPosition="right"
      >
        <Collapse.Panel header="Biểu phí" key="1">
          <Row gutter={[10, 10]}>
            <Col {...{ xs: 24, sm: 12, md: 12 }}>
              <div className="fund-detail__left--content__investment">
                <ContentFee type={'BUY'} fees={fees} />
              </div>
            </Col>
            <Col {...{ xs: 24, sm: 12, md: 12 }}>
              <div className="fund-detail__left--content__investment">
                <ContentFee type={'SELL'} fees={fees} />
              </div>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>

      <div className="form-info-fund-action">
        <InvestNow
          text="Đặt lệnh mua"
          loading={loadingOrder}
          handleClickInvestNow={handleSubmit}
          className={isMobile ? 'fixed-bottom' : ''}
        />
      </div>
    </div>
  );
};

export default FormInfoFund;

const FormInfoFundSchema = ({ transport }) => {
  const { t } = useHTranslation('admin-common');
  const form = transport?.form;
  const funds = transport?.fund?.productDetails || [];
  const navHistory = transport?.navHistory;
  const setVolume = transport?.setVolume;
  const [program, setProgram] = useState<any>(
    funds.find((item: any) => item?.id === transport?.programProductId) || {},
  );
  const setFees = transport?.setFees;

  useEffect(() => {
    setFees(program?.fees);
    form?.setFieldsValue({ productProgramId: transport?.programProductId });
  }, []);

  const mappingProgram = funds.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));

  const onChange = (e) => {
    const program = funds.find((item: any) => item?.id === e) || {};
    setProgram(program);
    setFees(program?.fees);
  };

  const handlePriceChange = (e) => {
    const amount = form?.getFieldValue('amount');
    if (amount < program?.buyMinValue) {
      return;
    }
    setVolume(
      ConverterUtils.formatNumber(
        NumberUtils.toFixed(amount / navHistory?.[0]?.nav, 2),
      ) || '',
    );
  };

  const beginBuyAuto =
    program?.productSchemeIsAutoBuy === 'true'
      ? [
          createSchemaItem({
            Component: HInputNumber,
            name: 'beginBuyAutoStartDate',
            label: t('Nhập ngày đầu tư định kỳ'),
            rules: [{ required: true, message: 'Nhập ngày đầu tư định kỳ' }],
            colProps: { xs: 24, sm: 24, md: 12 },
            componentProps: {
              modernLabel: true,
              placeholder: t('Day 1 - 31 of the month', {
                vn: 'Ngày 1 - 31 trong tháng',
              }),
              max: 31,
              min: 1,
            },
          }),
        ]
      : [];

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'productProgramId',
      colProps: { xs: 24, md: 12 },
      rowProps: { gutter: { xs: 8, md: 12 } },
      label: t('Chọn chương trình'),
      rules: [
        {
          required: true,
          message: t('Program is required', { vn: 'Chương trình là bắt buộc' }),
        },
      ],
      componentProps: {
        suffixIcon: <DropDownSvg />,
        modernLabel: true,
        onChange: onChange,
        defaultValue: transport?.programProductId,
        options: mappingProgram,
      },
    }),
    createSchemaItem({
      Component: HInputNumber,
      name: 'amount',
      label: t('Số tiền bạn muốn đầu tư'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: t('Money is required', { vn: 'Số tiền là bắt buộc' }),
        },
      ],
      extra: (
        <div className="form-info-fund-warning-content">
          <IconInfoRoundYellow />
          {`Số tiền đầu tư tối thiểu ${ConverterUtils.formatNumber(program?.buyMinValue)} vnđ`}
        </div>
      ),
      componentProps: {
        onChange: debounce(handlePriceChange, 300),
        modernLabel: true,
        min: program?.buyMinValue || 0,
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        placeholder: t(
          `Bắt đầu từ ${ConverterUtils.formatNumber(program?.buyMinValue)} vnđ`,
        ),
      },
    }),
    ...beginBuyAuto,
  ];
};

const FormInfoFundProvisionalSchema = ({ transport }) => {
  const { t } = useHTranslation('admin-common');
  const volume = transport?.volume;

  return [
    createSchemaItem({
      Component: HInput,
      name: 'volume',
      label: t('Số CCQ tạm tính'),
      colProps: { xs: 24, md: 12 },
      rowProps: { gutter: { xs: 8, md: 12 } },
      componentProps: {
        defaultValue: volume,
        disabled: true,
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        placeholder: t('Số CCQ tạm tính'),
        modernLabel: true,
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'purchaseFee',
      colProps: { xs: 24, md: 12 },
      label: t('Phí mua'),
      componentProps: {
        defaultValue: 0,
        disabled: true,
        placeholder: t('Phí mua'),
        modernLabel: true,
      },
    }),
  ];
};
