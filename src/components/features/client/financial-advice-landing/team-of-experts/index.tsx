/* eslint-disable @next/next/no-img-element */
import HCarousel from '@components/shared/common/h-carousel';
import { useIsMobile } from '@lib/hooks/use-media';
import { Col, Row } from 'antd';

import './team-of-experts.module.scss';

const ArrowRight = () => {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.29 0.710007C0.899998 1.10001 0.899998 1.73001 1.29 2.12001L5.17 6.00001L1.29 9.88001C0.899998 10.27 0.899998 10.9 1.29 11.29C1.68 11.68 2.31 11.68 2.7 11.29L7.29 6.70001C7.68 6.31001 7.68 5.68001 7.29 5.29001L2.7 0.700007C2.32 0.320007 1.68 0.320007 1.29 0.710007Z" />
    </svg>
  );
};

export const FinancialAdviceTeamOfExperts = () => {
  const teamOfExperts = [
    {
      image: '/assets/images/mr-alex-pham.png',
      title: 'Financial Planner',
      name: 'Mr. Alex Pham',
      position:
        'Tổng giám đốc Công ty Cổ phần dịch vụ Tài chính Bất động sản Tulip (FINA)',
      certificate: [
        'Hơn 20 năm trong ngành Bất động sản, Tài chính và Công nghệ.',
        'Đảm nhiệm các vị trí cấp cao trong các công ty đa quốc gia như CBRE, Colliers….',
        'Thành viên Hiệp hội Bất Động Sản Úc Châu (API); Thành viên Ban Quản Trị Hiệp hội Doanh nhân Việt Nam tại Sydney (VEAS) và Câu lạc bộ Trợ giúp Khởi nghiệp cho các Doanh nghiệp Việt Nam tại Úc (VBSC).',
        'Giảng viên ngành Kinh tế Bất Động Sản tại Đại học Tây Sydney (Western Sydney University).',
        'Nghiên cứu viên cao cấp của Viện Nghiên cứu Kinh doanh, Đại học Kinh tế TP.HCM.',
      ],
    },
    {
      image: '/assets/images/mr-huan.png',
      title: 'Financial Planner',
      name: 'Mr. Ngô Thành Huấn',
      position: 'Giám đốc khối Tài chính cá nhân FIDT',
      certificate: [
        'Thạc sĩ Hoạch định tài chính cá nhân - Đại học Griffith, Úc',
        '10 năm Quản lý gia sản và Tư vấn Tài chính cá nhân (Úc, Việt Nam)',
        '10 năm Quản lý tài chính doanh nghiệp (CFO/ FM)',
        'Đã tư vấn hơn 500 khách hàng (Úc, Việt Nam)',
        'Đang quản lý giá trị tài sản hơn 1,500 tỷ đồng',
      ],
    },
    {
      image: '/assets/images/mr-tim-do.png',
      title: 'Financial Planner',
      name: 'Mr. Tim Do',
      position:
        'Phó Tổng giám đốc Công ty cổ phần dịch vụ Tài chính Bất động sản Tulip (FINA)',
      certificate: [
        'Nhiều năm kinh nghiệm làm việc trong ngành dịch vụ tài chính, bất động sản.',
        'Từng làm việc tại bộ phận kiểm toán, phân tích dữ liệu và Đổi mới sáng tạo tại KPMG Australia với các khách hàng như Citibank, Blackrock, Perpetual, Bank of New York, GPT, Goodman, Centeria, SunCorp, Allianz,…',
        'Giám đốc Sen Capital, một công ty quản lý quỹ bất động sản tại Australia.',
        'Đồng sáng lập FINA, fintech dịch vụ tài chính tại TP.HCM.',
      ],
    },
    {
      image: '/assets/images/mr-mark.png',
      title: 'Financial Planner',
      name: 'Mr. Mark Knight',
      position: 'Cố vấn Wealth Management FINA',
      certificate: [
        'Chuyên gia quản lý tài chính trong hơn 20 năm.',
        'Thành viên sáng lập và giám đốc điều hành của Australian Financial Wealth Advisers (AFWA).',
        'Đảm nhiệm các vị trí Giám đốc điều hành của Knight Capital; Giám đốc khu vực của Dịch vụ tài chính cao cấp Westpac; CEO của Pivotal Financial Services; Giám đốc điều hành của Financial Wealth Services,…',
        'Tốt nghiệp Dux tại Royal Australian Naval College (Cao đẳng Hải quân Hoàng gia Úc).',
        'Có bằng MBA từ UWS (University of Western Sydney), bằng Thạc sỹ Nghiên cứu Chiến lược RANC.',
      ],
    },
  ];

  return (
    <>
      <div id="team" className="financial-advice-team-of-experts">
        <div className="financial-advice-team-of-experts-wrapper">
          <div className="financial-advice-small-container">
            <h2 className="financial-advice-team-of-experts__title">
              đội ngũ chuyên gia
            </h2>
            <HCarousel
              {...{
                autoplay: false,
                speed: 300,
                slidesToShow: 1,
                dots: true,
                arrows: true,
                nextArrow: (
                  <span>
                    <ArrowRight />
                  </span>
                ),
              }}
            >
              {teamOfExperts?.map((expert, index) => (
                <AdviceTeamOfExpertsManager expert={expert} key={index} />
              ))}
            </HCarousel>
          </div>
        </div>
        <div
          className="financial-advice-container"
          style={{ marginTop: '-213px' }}
        >
          <AdviceTeamOutstandingStaff />
        </div>
      </div>
    </>
  );
};

export default FinancialAdviceTeamOfExperts;

const AdviceTeamOfExpertsManager = ({ expert }) => {
  const isMobile = useIsMobile();

  return (
    <div className="financial-advice__manager">
      {!isMobile && (
        <>
          <p className="financial-advice__manager__label">{expert?.title}</p>
          <p className="financial-advice__manager__name">{expert?.name}</p>
        </>
      )}

      <Row gutter={{ xs: 24, md: 40 }}>
        <Col {...{ xs: 14, md: 14 }}>
          <div className="financial-advice__manager__wrapper">
            {isMobile && (
              <>
                <p className="financial-advice__manager__label">
                  {expert?.title}
                </p>
                <p className="financial-advice__manager__name">
                  {expert?.name}
                </p>
              </>
            )}

            <p className="financial-advice__manager__title">
              {expert?.position}
            </p>
            {!isMobile && (
              <div className="financial-advice__manager__info">
                {expert?.certificate?.map((item, i) => (
                  <div
                    key={i}
                    className="financial-advice__manager__info-item advice-team-outstanding-staff-item__body__info__item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
            {!isMobile && (
              <a
                href="https://fina.com.vn/vn/tin-tuc/financial-planning-la-gi-cau-chuyen-cua-nguoi-lam-nghe-634e7f142b6b61ddfb34c920"
                target="_blank"
                rel="noreferrer"
                className="financial-advice-team-of-experts__link"
              >
                <div className="financial-advice-team-of-experts__see-more">
                  Tìm hiểu thêm
                </div>
              </a>
            )}
          </div>
        </Col>

        {isMobile && (
          <>
            <Col {...{ xs: 10, md: 0 }}>
              <img
                {...{
                  src: expert?.image,
                  alt: 'director',
                  className: 'manager-image',
                }}
              />
            </Col>
            <Col
              className="financial-advice__manager__info"
              {...{ xs: 24, md: 17 }}
            >
              {expert?.certificate?.map((item, i) => (
                <div
                  key={i}
                  className="financial-advice__manager__info-item advice-team-outstanding-staff-item__body__info__item"
                >
                  {item}
                </div>
              ))}
            </Col>

            <a
              href="https://fina.com.vn/vn/tin-tuc/financial-planning-la-gi-cau-chuyen-cua-nguoi-lam-nghe-634e7f142b6b61ddfb34c920"
              target="_blank"
              rel="noreferrer"
              className="financial-advice-team-of-experts__link"
            >
              <div className="financial-advice-team-of-experts__see-more">
                Tìm hiểu thêm
              </div>
            </a>
          </>
        )}

        {!isMobile && (
          <Col {...{ xs: 8, md: 10 }}>
            <img
              {...{
                src: expert?.image,
                alt: 'director',
                className: 'manager-image desktop',
              }}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

const AdviceTeamOutstandingStaff = () => {
  const isMobile = useIsMobile();

  const outstandingStaffs = [
    {
      image: '/assets/images/nguyen-anh-quoc.png',
      title: 'Chief Business Officer',
      name: 'Mr. Nguyễn Anh Quốc',
      certificate: [
        'Hơn 10 năm kinh nghiệm trong lĩnh vực tín dụng ngân hàng.',
        'Đã tư vấn và xử lý hồ sơ vay cho 10,000 khách, tổng giá trị hơn 20,000 tỷ.',
        'Đã trải qua khóa đào tạo chuyên sâu về Hoạch định Tài chính Cá nhân.',
        'Phong cách làm việc hướng tới dịch vụ hoàn hảo, tối ưu hóa ngân sách cho khách hàng.',
      ],
    },
    {
      image: '/assets/images/nguyen-thi-thuy-chi.png',
      title: 'TP.HCM - Financial Planner',
      name: 'Ms. Nguyễn Thị Thùy Chi',
      certificate: [
        'Thạc sĩ Hoạch định tài chính cá nhân - Đại học Griffith, Úc',
        '10 năm Quản lý gia sản và Tư vấn tài chính cá nhân (Úc, Việt Nam)',
        '10 năm Quản lý Tài chính Doanh nghiệp (CFO/ FM)',
        'Đã tư vấn hơn 500 khách hàng (Úc, Việt Nam)',
        'Đang quản lý giá trị tài sản hơn 1,500 tỷ đồng',
      ],
    },
    {
      image: '/assets/images/nguyen-thi-thanh-tam.png',
      title: 'Mortgage Advisor',
      name: 'Ms. Nguyễn Thị Thanh Tâm',
      certificate: [
        'Cử nhân Chuyên ngành Tài chính - Ngân hàng tại ĐH Ngân hàng.',
        '3 năm kinh nghiệm trong ngành Tài chính',
        'Doanh số giải ngân hơn 300 tỷ',
        'Đã tư vấn hơn 900 KH với hơn 1500 giờ tư vấn khách hàng.',
        'Đã trải qua khóa đào tạo chuyên sâu về Hoạch định Tài chính Cá nhân.',
      ],
    },
    {
      image: '/assets/images/le-bao-quoc.png',
      title: 'TP.HCM - Financial Planner',
      name: 'Mr. Lê Bảo Quốc',
      certificate: [
        'Thạc sĩ Kế Toán và Tài Chính (ĐH Victoria, Úc)',
        'Hơn 8 năm kinh nghiệm về Hoạch định Tài Chính Cá Nhân tại Úc',
        'Chứng chỉ Hoạch định Tài chính cá nhân (DFP - Úc)',
        'Đã tư vấn hơn 120 khách hàng',
        'Giá trị tài sản đang quản lý hơn 200 tỷ đồng',
      ],
    },
    {
      image: '/assets/images/nguyen-thu-giang.png',
      title: 'Hà Nội - Associate Financial Planner',
      name: 'Ms. Nguyễn Thu Giang',
      certificate: [
        'Thạc sỹ Kinh tế quốc tế - ĐH Ceram Sophia Antipolis (Pháp)',
        'Chuyên gia tư vấn - Chuyên mục "Tài chính cá nhân" (Trang báo aFamily)',
        'Đồng tác giả sách "Cẩm nang quản lý tài chính cho sinh viên',
        'Founder khóa học "Tự tin Tài chính',
        'Đã tư vấn hơn 60 khách hàng',
        'Giá trị tài sản đang quản lý hơn 150 tỷ đồng',
      ],
    },
    {
      image: '/assets/images/nguyen-thi-mi-chi.png',
      title: 'Mortgage Advisor',
      name: 'Ms. Nguyễn Thị Mỹ Chi',
      certificate: [
        'Cử nhân Ngành Quản Trị Kinh Doanh tại ĐH Quốc Tế (ĐHQG TPHCM)',
        '3 năm kinh nghiệm trong ngành Tài chính',
        'Doanh số giải ngân hơn 250 tỷ',
        'Đã tư vấn hơn 745 KH với hơn 1500 giờ tư vấn khách hàng.',
        'Đã trải qua khóa đào tạo chuyên sâu về Hoạch định Tài chính Cá nhân.',
      ],
    },
    {
      image: '/assets/images/nguyen-thanh-minh.png',
      title: 'Hà Nội - Associate Financial Planner',
      name: 'Mr. Nguyễn Thanh Minh',
      certificate: [
        '6 năm kinh nghiệm Quản lý Tài sản (Wealth Management) tại VNDIRECT và MBBank',
        'Cử nhân Kinh tế ',
        'Đã tư vấn hơn 100 khách hàng',
        'Giá trị tài sản đang quản lý hơn 150 tỷ đồng',
      ],
    },
  ];

  return (
    <Row gutter={[24, 24]} className={`${!isMobile ? 'justify-center' : ''}`}>
      {outstandingStaffs.map((staff, i) => (
        <Col {...{ xs: 12, sm: 12, md: 6, lg: 6 }} key={i}>
          <AdviceTeamOutstandingStaffItem staff={staff} />
        </Col>
      ))}
    </Row>
  );
};

const AdviceTeamOutstandingStaffItem = ({ staff }) => {
  return (
    <div className="advice-team-outstanding-staff-item">
      <div className="advice-team-outstanding-staff-item__image">
        <img
          {...{
            src: staff.image,
            alt: staff.name,
          }}
        />
      </div>
      <div className="advice-team-outstanding-staff-item__body">
        <p className="advice-team-outstanding-staff-item__body__label">
          {staff.title}
        </p>
        <p className="advice-team-outstanding-staff-item__body__name">
          {staff.name}
        </p>

        <div className="financial-advice__manager__info advice-team-outstanding-staff-item__body__info">
          {staff.certificate.map((item, i) => (
            <div key={i} className="financial-advice__manager__info-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
