import { Col, Row } from 'antd';
import { COMMISSION_REASON_SPEND_MAPPING } from '@components/features/fina/commission/settings/loan-product/constant';
import { HModal } from '@components/shared/common/h-modal';
import { CloseIconLargeSvg } from 'icons';
import { ConverterUtils } from '@lib/converter';
import { FormatterUtils } from '@lib/formatter';
import { IconRose } from './constants';
import { MappingRole } from './my-commission-search-result-table-schema';

const ModalViewDetail = (props) => {
  const { isVisible, setIsVisible, record, status } = props;
  const { transactionDetail, transactionType, transaction, createdAt } = record;
  const dataIncomeDetail = [
    { label: 'Mã ghi nhận', value: transaction?.code },
    {
      label: 'Ngày ghi nhận',
      value: ConverterUtils.dateConverterToString(createdAt),
    },
    {
      label: 'Lý do chi trả',
      value: COMMISSION_REASON_SPEND_MAPPING[transactionType],
    },
    { label: 'Trạng thái', value: status },
    {
      label: 'Giá trị giao dịch',
      value: (
        <span className="earnings-commissions-viewer-money">
          {FormatterUtils.formatAmount(
            transactionDetail?.amount?.toFixed(0) || 0,
            '',
          )}
          <sup>đ</sup>
        </span>
      ),
    },
    { label: 'Vai trò', value: MappingRole(record) },
  ];

  return (
    <HModal
      {...{
        title: ' ',
        closeIcon: <CloseIconLargeSvg />,
        visible: isVisible,
        onCancel: () => {
          setIsVisible(false);
        },
        footer: null,
        width: 600,
        className: 'profile-earnings-commissions-modal',
      }}
    >
      <h2 className="profile-earnings-commissions-modal-title">
        Chi tiết thu nhập
      </h2>

      <div className="profile-earnings-commissions-modal-top">
        <div className="profile-earnings-commissions-modal-top-left">
          <div className="profile-earnings-commissions-modal-top-icon">
            <IconRose />
          </div>
          <div>
            <div className="profile-earnings-commissions-modal-top-label">
              Tỉ lệ hoa hồng
            </div>
            <div className="profile-earnings-commissions-modal-top-value">{`~ ${Number(((record.amount || 0) / (transactionDetail?.amount || 0)) * 100).toFixed(2)}%`}</div>
          </div>
        </div>

        <div className="profile-earnings-commissions-modal-top-right">
          <div className="profile-earnings-commissions-modal-top-label">
            Phí hoa hồng
          </div>
          <div className="profile-earnings-commissions-modal-top-value">
            {record.amount?.toFixed(0) || 0}
          </div>
        </div>
      </div>

      <Row
        gutter={[24, 24]}
        className="profile-earnings-commissions-modal-content"
      >
        {dataIncomeDetail?.map((el, i) => (
          <Col {...{ xs: 24, sm: 12, md: 12 }} key={i}>
            <EarningsCommissionsViewer {...el} />
          </Col>
        ))}
      </Row>
    </HModal>
  );
};

export default ModalViewDetail;

const EarningsCommissionsViewer = (props) => {
  const { label, value } = props;

  return (
    <div className="earnings-commissions-viewer">
      <span className="earnings-commissions-viewer-label">{label}</span>
      <span className="earnings-commissions-viewer-value">{value}</span>
    </div>
  );
};
