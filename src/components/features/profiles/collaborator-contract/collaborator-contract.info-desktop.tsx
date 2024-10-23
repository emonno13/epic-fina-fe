const CollaboratorContractInfoDesktop = (props) => {
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
      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <b>
          <span style={{ width: '7rem', display: 'inline-block' }}>CÔNG TY</span>: CÔNG TY CỔ PHẦN
					DỊCH VỤ TÀI CHÍNH BẤT ĐỘNG SẢN TULIP{' '}
        </b>
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Mã số thuế</span>: 0316008661
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Địa chỉ trụ sở</span>: L17-11, Tầng 17, Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, P.Bến Nghé, Quận 1, TP. Hồ Chí Minh
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Người đại diện</span>
        <b style={{ width: '12rem', display: 'inline-block' }}>: PHẠM ANH KHÔI</b>
        <span style={{ width: '7rem', display: 'inline-block' }}>Chức vụ</span>: Tổng Giám đốc
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Email</span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: ceo@fina.com.vn</span>
        <span style={{ width: '7rem', display: 'inline-block' }}>Số điện thoại</span>: 0857498668
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Số Tài khoản</span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: 111002804377 </span>
        <span style={{ width: '7rem', display: 'inline-block' }}>Ngân hàng </span>
        <span style={{ width: '12rem', display: 'inline-block' }}>: Vietinbank CN4 </span>
      </div>
      <span style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>(gọi tắt là “TULIP”)</span>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.5rem' }}>
        <b>VÀ</b>
      </div>
      <div>
        <b>
          <span style={{ width: '7rem', display: 'inline-block' }}>CÁ NHÂN</span>:{' '}
          {fullName || '__________________________'}{' '}
        </b>
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span
          style={{
            width: '12rem',
            display: 'inline-block',
          }}
        >
					CMND/CCCD/Hộ chiếu số
        </span>
				: {idNumber || '__________________________'}
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Ngày cấp</span>:{' '}
        <span style={{ width: '7rem', display: 'inline-block' }}>
          {issuedOn || '_____________'}
        </span>
				Nơi cấp: {placeOfIssue || '_____________'}
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Địa chỉ</span>:{' '}
        {address || '_____________'}
      </div>
      <div style={{ marginTop: '0.2rem', marginBottom: '0.2rem' }}>
        <span style={{ width: '7rem', display: 'inline-block' }}>Email</span>:{' '}
        <span style={{ width: '15rem', display: 'inline-block' }}>{email || '_____________'}</span>
				-Số điện thoại: {tel || '_____________'}
      </div>
      <div>
        <span style={{ width: '7rem', display: 'inline-block' }}>Số Tài khoản</span>:{' '}
        <span style={{ width: '15rem', display: 'inline-block' }}>
          {bankAccount || '_____________'}
        </span>
				-Ngân hàng: {bankName || '_____________'}
      </div>
    </>
  );
};

export default CollaboratorContractInfoDesktop;
