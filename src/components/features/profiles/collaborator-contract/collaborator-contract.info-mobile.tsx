const CollaboratorContractInfoMobileItem = ({ label, value }) => (
  <div className="contract-collaborator-content-info">
    <span className="contract-collaborator-content-info__label">{label}:</span>
    <span className="contract-collaborator-content-info__">
      {value || '__________________________'}
    </span>
  </div>
);

const CollaboratorContractInfoMobile = (props) => {
  const {
    fullName,
    idNumber,
    issuedOn,
    placeOfIssue,
    address,
    email,
    tel,
    bankAccount,
    bankName,
  } = props;
  return (
    <>
      <CollaboratorContractInfoMobileItem
        {...{
          label: 'CÔNG TY',
          value: <b>CÔNG TY CỔ PHẦN DỊCH VỤ TÀI CHÍNH BẤT ĐỘNG SẢN TULIP</b>,
        }}
      />
      <CollaboratorContractInfoMobileItem {...{ label: 'Mã số thuế', value: '0316008661' }} />
      <CollaboratorContractInfoMobileItem
        {...{
          label: 'Địa chỉ trụ sở',
          value: 'L17-11, Tầng 17, Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, P.Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        }}
      />
      <CollaboratorContractInfoMobileItem
        {...{ label: 'Người đại diện', value: 'PHẠM ANH KHÔI' }}
      />
      <CollaboratorContractInfoMobileItem {...{ label: 'Chức vụ', value: 'Tổng Giám đốc' }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Email', value: 'ceo@fina.com.vn' }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Số điện thoại', value: '0857498668' }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Số Tài khoản', value: '111002804377' }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Ngân hàng', value: 'Vietinbank CN4' }} />
      <span style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>(gọi tắt là “TULIP”)</span>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.5rem' }}>
        <b>VÀ</b>
      </div>
      <CollaboratorContractInfoMobileItem
        {...{ label: 'CÁ NHÂN', value: fullName ? <b>{fullName}</b> : '' }}
      />
      <CollaboratorContractInfoMobileItem
        {...{ label: 'CMND/CCCD/Hộ chiếu số', value: idNumber }}
      />
      <CollaboratorContractInfoMobileItem {...{ label: 'Ngày cấp', value: issuedOn }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Nơi cấp', value: placeOfIssue }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Địa chỉ', value: address }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Email', value: email }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Số điện thoại', value: tel }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Số Tài khoản', value: bankAccount }} />
      <CollaboratorContractInfoMobileItem {...{ label: 'Ngân hàng', value: bankName }} />
    </>
  );
};

export default CollaboratorContractInfoMobile;
