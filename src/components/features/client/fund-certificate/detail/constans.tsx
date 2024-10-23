import { TYPE_OF_FUND } from '../../../fina/products/fund/constants';

export const MAPPING_INFO_FUND = {
  [TYPE_OF_FUND.STOCK]: 'Quỹ đầu tư cổ phiếu là một loại quỹ hình thành từ việc nhận vốn góp từ những nhà đầu tư, sau đó dùng chúng đem đi đầu tư vào chứng khoán cũng như những dạng tài sản đầu tư khác, trong có có cả bất động sản cũng như nhà cửa, máy móc, thiết bị,…',
  [TYPE_OF_FUND.BOND]: 'Quỹ trái phiếu là Quỹ mở được đầu tư chủ yếu (từ 80% giá trị tài sản ròng trở lên) vào các loại trái phiếu như trái phiếu Chính phủ, trái phiếu Chính quyền địa phương hay trái phiếu Doanh nghiệp, và các loại giấy tờ có giá khác.' +
  '' +
  'Trái phiếu là một loại chứng khoán nợ do một tổ chức phát hành cho nhà đầu tư (hay còn gọi là trái chủ). Tổ chức phát hành trái phiếu có thể là Chính phủ, Chính quyền địa phương hay Doanh nghiệp. Số tiền huy động từ việc phát hành trái phiếu được Tổ chức phát hành sử dụng cho nhiều mục đích, như tài trợ các dự án xây dựng cơ sở hạ tầng (trái phiếu Chính phủ), tài trợ cho các dự án xây dựng nhà máy hay bổ sung vốn lưu động nhằm mở rộng sản xuất kinh doanh (trái phiếu Doanh nghiệp).',
  [TYPE_OF_FUND.BALANCED]: 'Quỹ cân bằng là Quỹ mở đầu tư vào cả cổ phiếu và trái phiếu. Loại quỹ này thường có mức rủi ro trung bình, phù hợp với nhà đầu tư mong muốn sinh lời ở tầm trung và ổn định, đầu tư trung và dài hạn. Một Quỹ cân bằng điển hình sẽ có danh mục đầu tư chiếm 50% cổ phiếu và 50% trái phiếu trên tổng tài sản.',
  [TYPE_OF_FUND.IPO]: 'Quỹ tiền tệ',
};

export const CODE_FUND = {
  VFF: 'VFF',
  VEOF: 'VEOF',
  VESAF: 'VESAF',
  VIBF: 'VIBF',
  VLBF: 'VLBF',
};

export const MAPPING_REPORT_FUND = {
  [CODE_FUND.VFF]: [
    {
      name: 'VINACAPITAL-VFF – Báo cáo tháng 10 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/11/20221114-Monthly-factsheet_VINACAPITAL-VFF_202210_VN.pdf',

    },
    {
      name: 'VINACAPITAL-VFF – Báo cáo tháng 9 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/10/20221012-VINACAPITAL-VFF-Bao-cao-thang-9-2022.pdf',

    },
    {
      name: 'VINACAPITAL-VFF Monthly Factsheet – T8 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/09/20220915-Monthly-factsheet_VINACAPITAL-VFF_202208_VN.pdf',

    },
  ],
  [CODE_FUND.VEOF]: [
    {
      name: 'VINACAPITAL-VEOF – Báo cáo tháng 10 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/11/20221114-Monthly-factsheet_VINACAPITAL-VEOF_202210_VN.pdf',

    },
    {
      name: 'VINACAPITAL-VEOF – Báo cáo tháng 9 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/10/20221012-VINACAPITAL-VEOF-Bao-cao-thang-9-2022.pdf',

    },
    {
      name: 'VINACAPITAL-VEOF Monthly Factsheet – T8 2022 ',
      link: 'https://vinacapital.com/wp-content/uploads/2022/09/20220915-Monthly-factsheet_VINACAPITAL-VEOF_202208_VN.pdf',

    },
  ], [CODE_FUND.VESAF]: [
    {
      name: 'VINACAPITAL-VESAF – Báo cáo tháng 10 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/11/20221114-Monthly-factsheet_VINACAPITAL-VESAF_202210_VN.pdf',

    },
    {
      name: 'VINACAPITAL-VESAF – Báo cáo tháng 9 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/10/20221012-VINACAPITAL-VESAF-Bao-cao-thang-9-2022.pdf',

    },
    {
      name: 'VINACAPITAL-VESAF Monthly Factsheet – T8 2022 ',
      link: 'https://vinacapital.com/wp-content/uploads/2022/09/20220915-Monthly-factsheet_VINACAPITAL-VESAF_202208_VN.pdf',

    },
  ],
  [CODE_FUND.VIBF]: [
    {
      name: 'VINACAPITAL-VIBF – Báo cáo tháng 10 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/11/20221114-Monthly-factsheet_VINACAPITAL-VIBF_202210_VN.pdf',

    },
    {
      name: 'VINACAPITAL-VIBF – Báo cáo tháng 9 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/10/20221012-VINACAPITAL-VIBF-Bao-cao-thang-9-2022.pdf',
    },
    {
      name: 'VINACAPITAL-VIBF Monthly Factsheet – T8 2022 ',
      link: 'https://vinacapital.com/wp-content/uploads/2022/09/20220915-Monthly-factsheet_VINACAPITAL-VIBF_202208_VN.pdf',

    },
  ],
  [CODE_FUND.VLBF]:  [
    {
      name: 'VINACAPITAL-VLBF – Báo cáo tháng 10 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/11/20221114-Monthly-factsheet_VINACAPITAL-VLBF_202210_VN.pdf',

    },
    {
      name: 'VINACAPITAL-VLBF – Báo cáo tháng 9 2022',
      link: 'https://vinacapital.com/wp-content/uploads/2022/10/20221012-VINACAPITAL-VLBF-Bao-cao-thang-9-2022.pdf',
    },
    {
      name: 'Quỹ VINACAPITAL-VLBF – Báo cáo tháng 8/2022 ',
      link: 'https://vinacapital.com/wp-content/uploads/2022/09/20220915-Monthly-factsheet_VINACAPITAL-VLBF_202208_VN.pdf',
    },
  ],
};
