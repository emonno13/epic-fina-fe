import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { HeaderShapeMedium, HotTagIcon } from '@icons';
import { InsuranceIcon } from '@icons/rsvgs/insurance-icon';
import { InvertIcon } from '@icons/rsvgs/invert-icon';
import { MinuteConsultationIcon } from '@icons/rsvgs/minute-consultation-icon';
import { MortgageLoanIcon } from '@icons/rsvgs/mortgage-loan-Icon';
import { TuitionLoanIcon } from '@icons/rsvgs/tuition-loan-icon';
import { UnsecuredLoanIcon } from '@icons/rsvgs/unsecured-loan-icon';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';

import './list-product.module.scss';

const { TabPane } = Tabs;

const ListProductFina = ({ props }) => {
  const valuePercent = props?.value?.[0]?.tags[0] || 7.59;
  const { locale } = useRouter();

  const listDataProduct = [
    {
      tabHeader: (
        <>
          <span>Học trước trả sau</span> <HotTagIcon />
        </>
      ),
      icon: <TuitionLoanIcon />,
      title:
        'Chương trình  <span class="text-loans-bold">“Học Trước Trả Sau”</span> là sản phẩm cho Vay Học Phí không có tài sản bảo đảm do FINA liên kết với các tổ chức giáo dục cung cấp với hình thức cấp hạn mức vay cho Khách Hàng theo học phí của Chương trình học.',
      contents: [
        'Hạn mức vay học tối đa lên đến <span class="text-loans-bold">100 triệu đồng.</span>',
        'Kỳ hạn vay tương ứng với thời gian khóa học, tối đa <span class="text-loans-bold">12 tháng.</span>',
        'Trả góp học phí <span class="text-loans-bold">100% online</span> với thông tin minh bạch, rõ ràng.',
        'Giải ngân nhanh chỉ trong vòng <span class="text-loans-bold">72 tiếng.</span>',
        'Hồ sơ <span class="text-loans-bold">100%</span> online, nhanh gọn, tiết kiệm thời gian.',
      ],
    },
    {
      tabHeader: (
        <>
          <span>Tài chính An cư</span> <HotTagIcon />
        </>
      ),
      icon: <MinuteConsultationIcon />,
      title:
        '30 phút tư vấn trực tiếp 1-1 cùng chuyên gia về các nhu cầu phát triển và các vấn đề về tài chính cá nhân',
      contents: [
        'Cung cấp tổng quát <span class="text-loans-bold">Danh mục tài sản</span> và <span class="text-loans-bold">Tỷ lệ phân bổ </span> giữa các lớp tài sản.',
        'Giúp giải đáp cụ thể loại Bất động sản <span class="text-loans-bold">nên mua? Mua ở đâu? Thời điểm mua?</span>',
        'Có nên vay và <span class="text-loans-bold">vay ở đâu</span> để có lãi suất tốt nhất.',
        'Cung cấp giỏ hàng với đa dạng lựa chọn đã được sàng lọc.',
        '<span class="text-loans-bold">Giảm thiểu các rủi ro</span> và <span class="text-loans-bold">tiết kiệm thời gian</span> cho khách hàng.',
      ],
    },
    {
      tabHeader: 'Sản phẩm Bảo hiểm',
      icon: <InsuranceIcon />,
      title:
        'Hãy lựa chọn bảo hiểm FINA CARE trở thành lá chắn vững vàng cho gia đình bạn trước mọi biến cố cuộc sống với rất nhiều ưu điểm hấp dẫn:',
      contents: [
        'Mức phí bảo hiểm chỉ từ <span class="text-loans-bold">4.234.530 đồng</span> nhận ngay quyền lợi bảo hiểm lên đến <span class="text-loans-bold">1 tỷ đồng.</span>',
        'Ưu đãi đến <span class="text-loans-bold">50%</span> chi phí bảo hiểm khi trở thành CTV của FINA.',
        'Thủ tục mua bảo hiểm cho bản thân và gia đình chưa tới <span class="text-loans-bold">5 phút.</span>',
        'Khám chữa bệnh tại <span class="text-loans-bold">286 hệ thống bệnh viện</span> trên toàn quốc.',
      ],
    },
    {
      tabHeader: 'Sản phẩm Thế chấp',
      icon: <MortgageLoanIcon />,
      title:
        'FINA liên kết cùng hơn 30 tổ chức tài chính trong và ngoài nước, đem đến các sản phẩm, dịch vụ  tài chính phù hợp với nhu cầu và điều kiện của từng khách hàng. Lựa chọn FINA là người đồng hành, bạn sẽ nhận được những lợi ích nổi bật:',
      contents: [
        `Lãi suất siêu cạnh tranh chỉ từ <span class="text-loans-bold">${valuePercent}%/năm</span>`,
        'Số tiền vay lên đến <span class="text-loans-bold">90%</span> giá trị tài sản bảo đảm',
        'Thời hạn vay lâu dài đến  <span class="text-loans-bold">30 năm</span>',
        'Phương thức trả nợ linh hoạt phù hợp nguồn trả nợ khách hàng',
      ],
    },
    {
      tabHeader: 'Sản phẩm Tín chấp',
      icon: <UnsecuredLoanIcon />,
      title:
        'Khoản vay gói tín chấp không cần tài sản đảm bảo, dựa hoàn toàn vào khả năng trả nợ của tất cả khách hàng, đã có mặt tại FINA. Bạn sẽ nhận được rất nhiều quyền lợi siêu hấp dẫn từ Gói vay tín chấp của FINA:',
      contents: [
        'Lãi suất ưu đãi chỉ từ <span class="text-loans-bold">0,99%/tháng</span>',
        'Hạn mức phê duyệt lên đến <span class="text-loans-bold">100 triệu đồng</span>',
        'Thời gian vay từ <span class="text-loans-bold">03 - 36 tháng</span>',
        'Thủ tục hồ sơ đơn giản chỉ cần CMND, Sổ hộ khẩu hoặc Giấy phép lái xe.',
      ],
    },
    {
      tabHeader: 'Sản phẩm Đầu tư',
      icon: <InvertIcon />,
      title:
        'Quỹ đầu tư <span class="text-loans-bold">Trái phiếu FINA</span> là nơi nhà đầu tư cá nhân song hành cùng các doanh nghiệp để đầu tư vào những trái phiếu doanh nghiệp, chứng chỉ tiền gửi, tín phiếu tốt nhất thị trường để tạo nguồn thu nhập ổn định dài hạn.',
      contents: [
        'Tỉ suất sinh lời hấp dẫn tới <span class="text-loans-bold">13%/năm.</span>',
        '<span class="text-loans-bold">Thu nhập ổn định</span> và <span class="text-loans-bold">ít rủi ro</span> so với các kênh đầu tư truyền thống.',
        '<span class="text-loans-bold">Không tốn phí</span> cho các bên trung gian.',
        '<span class="text-loans-bold">Miễn phí thường niên cho năm đầu tiên</span> khi phát hành thẻ tín dụng.',
        'Quỹ được giám sát bởi Uỷ Ban Chứng Khoán nhà nước & ngân hàng Standard Chartered',
      ],
    },
  ];

  return (
    <div id="product" className="loans-introduce-container">
      <HScrollAnimation>
        <div className="product-fina">
          <div className="title-product-fina">
            <span className="first-title-product">Các Sản Phẩm Của </span>
            <span className="last-title-product">FINA</span>
            <span className="first-title-product"> ? </span>
          </div>
          <div className="list-product">
            <Tabs defaultActiveKey="1">
              {listDataProduct?.map((product, index) => (
                <TabPane tab={product?.tabHeader} key={index + 1}>
                  <div className="product-item-loan">
                    <div className="product-item-loan-icon">
                      {product?.icon}
                    </div>
                    <div className="product-item-loan-content">
                      <div
                        className="product-item-loan-content-title"
                        dangerouslySetInnerHTML={{ __html: product?.title }}
                      />
                      <div className="product-item-loan-content-descriptions">
                        {product?.contents?.map((content, index) => (
                          <div
                            className="product-item-loan-content-descriptions-item"
                            key={index}
                          >
                            <HeaderShapeMedium />
                            <div
                              dangerouslySetInnerHTML={{ __html: content }}
                              className="product-item-loan-content-descriptions-item-content"
                            />
                          </div>
                        ))}

                        <HButton
                          className="button-register-fast"
                          type="link"
                          href={`/${locale}/loans-introduce#register`}
                        >
                          Đăng ký ngay
                        </HButton>
                      </div>
                    </div>
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default ListProductFina;
