import { HeadGenerateItem } from '@lib/head-utils';
import AlmaFoodIcon from './icons/alma-food-icon';
import AlmaParkIcon from './icons/alma-park-icon';
import AlmaSpaIcon from './icons/alma-spa-icon';
import AlmaVipIcon from './icons/alma-vip-icon';
import AlmaVVipIcon from './icons/alma-vvip-icon';
import AlmaServicePanelFoodDetail from './service/service-panel/service-panel.food-detail';
import AlmaServicePanelParkDetail from './service/service-panel/service-panel.park-detail';
import AlmaServicePanelSpaDetail from './service/service-panel/service-panel.spa-detail';

export const AlmaSpecialOfferData = (t) => [
  {
    icon: <AlmaVipIcon />,
    desc: t(
      'Free offer <span>04 days 03 nights</span> accommodation at ALMA Resort for family including <span>02 adults and 02 children</span> (under 11 years old).',
      {
        vn: 'Tặng ưu đãi miễn phí <span>04 ngày 03 đêm</span> phòng nghỉ tại ALMA Resort cho gia đình gồm <span>02 người lớn và 02 trẻ em</span> (dưới 11 tuổi).',
      },
    ),
    applicableObject: t(
      'For customers with a real estate purchase contract worth at least 2,000,000,000 (two billion) VND.',
      {
        vn: 'Dành cho khách hàng có Hợp đồng mua bất động sản trị giá tối thiểu 2.000.000.000 (hai tỷ) đồng.',
      },
    ),
    headerLabel: t('Special offer for VIP customers', {
      vn: 'Chương trình ưu đãi dành cho khách hàng VIP',
    }),
  },
  {
    icon: <AlmaVVipIcon />,
    desc: t(
      'Free offer <span>04 days 03 nights</span> accommodation at ALMA Resort for family including <span>02 adults and 02 children</span> (under 11 years old) and voucher for meals at any restaurant in the resort worth <span>1 million VND</span>.',
      {
        vn: 'Tặng ưu đãi miễn phí <span>04 ngày 03 đêm</span> phòng nghỉ tại ALMA Resort cho gia đình gồm <span>02 người lớn và 02 trẻ em</span> (dưới 11 tuổi) và voucher ăn uống tại bất kỳ nhà hàng trong resort trị giá <span>1 triệu đồng</span>.',
      },
    ),
    applicableObject: t(
      'For customers who have real estate purchase contracts worth at least 4,000,000,000 (four billion) VND.',
      {
        vn: 'Dành cho khách hàng có Hợp đồng mua bất động sản trị giá tối thiểu 4.000.000.000 (bốn tỷ) đồng.',
      },
    ),
    headerLabel: t('Special offer for VVIP customers', {
      vn: 'Chương trình ưu đãi dành cho khách hàng VVIP',
    }),
  },
];

export const AlmaConditionData = (t) => [
  t(
    'Customers who are married and enjoy vacation with spouse (family), do not go alone. Couple Customers are over 30 years old (or spouse).',
    {
      vn: 'Khách hàng đã kết hôn và hưởng ưu đãi kỳ nghỉ cùng vợ/chồng (gia đình), không đi 1 mình. Cặp đôi Khách hàng có độ tuổi trên 30 tuổi (hoặc vợ hoặc chồng).',
    },
  ),
  t('Offer is only applicable once for a couple during the offer period.', {
    vn: 'Ưu đãi chỉ áp dụng một lần duy nhất đối với một cặp vợ chồng trong thời gian ưu đãi.',
  }),
  t(
    "To confirm eligibility for the offer, Customers need to provide and present a legal copy of the couple's ID/CCCD/Passport.",
    {
      vn: 'Để xác nhận đủ điều kiện ưu đãi, Khách hàng cần phải cung cấp và xuất trình bản sao hợp pháp CMND/CCCD/Hộ chiếu của hai vợ chồng.',
    },
  ),
  t(
    'Customers must attend the event at ALMA resort organized by Party A and stay at least 01 hour.',
    {
      vn: 'Khách hàng phải tham dự sự kiện tại ALMA resort do Bên A tổ chức và ở lại ít nhất 01 tiếng.',
    },
  ),
  t('Customers make reservations at least 14 days before departure date.', {
    vn: 'Khách hàng thực hiện việc đặt phòng trước tối thiểu 14 ngày trước ngày khởi hành.',
  }),
];

export const AlmaServiceData = (t) => [
  {
    icon: <AlmaSpaIcon />,
    title: 'Spa',
    desc: t(
      'Le Spa has 13 treatment rooms, including rooms for couples. Services include deep-tissue massages, hot stone massages, Swedish massages, and...',
      {
        vn: 'Le Spa có 13 phòng trị liệu, gồm phòng cho các cặp đôi. Các dịch vụ gồm massage mô sâu, massage đá nóng, massage Thụy Điển và...',
      },
    ),
    detail: <AlmaServicePanelSpaDetail />,
    images: [
      'alma-service-spa-image-1.webp',
      'alma-service-spa-image-2.webp',
      'alma-service-spa-image-3.webp',
    ],
    thumbImage: 'alma-service-spa-thumb-image.jpeg',
  },
  {
    icon: <AlmaFoodIcon />,
    title: t('Food court', { vn: 'Khu ẩm thực' }),
    desc: t(
      'Alma Garden - This buffet restaurant specializes in local and international cuisine and serves breakfast and dinner. La Casa - this restaurant...',
      {
        vn: 'Alma Garden - nhà hàng buffet này chuyên về món địa phương và quốc tế và phục vụ bữa sáng và bữa tối. La Casa - nhà hàng này...',
      },
    ),
    detail: <AlmaServicePanelFoodDetail />,
    images: [
      'alma-service-food-image-1.webp',
      'alma-service-food-image-2.webp',
      'alma-service-food-image-3.webp',
    ],
    thumbImage: 'alma-service-food-thumb-image.jpeg',
  },
  {
    icon: <AlmaParkIcon />,
    title: t('Recreational grounds', { vn: 'Khuôn viên giải trí' }),
    desc: t(
      'There are Sports Areas, Outdoor Tennis Courts, Sauna Sauna, Sauna, On-site Tennis Courts, Indoor Basketball Courts...',
      {
        vn: 'Có các Khu thể thao, Sân quần vợt ngoài trời, Phòng tắm hơi sauna, Phòng tắm hơi, Sân quần vợt trong khuôn viên, Sân bóng rổ trong...',
      },
    ),
    detail: <AlmaServicePanelParkDetail />,
    images: [
      'alma-service-park-image-1.webp',
      'alma-service-park-image-2.webp',
      'alma-service-park-image-3.webp',
    ],
    thumbImage: 'alma-service-park-thumb-image.jpeg',
  },
];

export const AlmaCamRanhResortImages = [
  'alma-cam-ranh-image-1.webp',
  'alma-cam-ranh-image-2.jpg',
  'alma-cam-ranh-image-3.jpg',
];

export const AlmaImageListImage = [
  'alma-image-1.png',
  'alma-image-2.jpg',
  'alma-image-3.jpg',
  'alma-image-4.jpg',
];

export const AlmaReviewsData = (t) => [
  {
    avatar: 'alma-customer-avatar-1.png',
    customerName: 'Minh',
    rate: 4.5,
    review: t(
      'The resort scenery is very beautiful, the food is delicious and well-organized, the staff is enthusiastic and cheerful, there are many swimming pools, the airport pick up and drop off is also fast, everything is great, there is a chance I will come here again Thank you very much resort.',
      {
        vn: 'Phong cảnh resort rất đẹp, thức ăn ngon và chỉnh chu, nhân viên phục vụ vui vẻ nhiệt tình, có nhiều hồ bơi, đón tiễn sân bay cũng nhanh lẹ, mọi thứ đều tuyệt vời, có cơ hội tôi sẽ đến đây lần nữa, cảm ơn resort rất nhiều.',
      },
    ),
    imageName: 'alma-review-image-1.webp',
    shortReview: t('Everything is wonderful', { vn: 'Mọi thứ đều tuyệt vời' }),
  },
  {
    avatar: 'alma-customer-avatar-2.png',
    customerName: 'Tiến',
    rate: 4.5,
    review: t(
      'Alma has many recreational facilities, especially many swimming pools, a very large beach and water park, video games area, 18 holes golf... experience all the services here, many restaurants and food stalls at the foodcourt area, so the kids love it. Worth the money for a 2 day 1 night stay.',
      {
        vn: 'Alma có nhiều tiện nghi để giải trí, đặc biệt nhiều hồ bơi, có công viên nước và bãi biển rất rộng, khu trò chơi điện tử, đánh gôn 18 lỗ.... Gia đình đi 2 ngày không đủ thời gian để trải nghiệm hết các dịch vụ ở đây, nhiều nhà hàng và quầy đồ ăn tại khu foodcourt nên bọn trẻ rất thích. Đáng tiền cho kỳ nghỉ 2 ngày 1 đêm.',
      },
    ),
    imageName: 'alma-review-image-2.webp',
    shortReview: t('Excellent', { vn: 'Xuất sắc' }),
  },
  {
    avatar: 'alma-customer-avatar-3.png',
    customerName: 'Linh',
    rate: 4,
    review: t(
      "The Resort offered a very qualified breakfast with a lot of choices for the whole family, especially families with young children.The resort has various indoor and outdoor activities whole family. My family especially my kids were loved the resort's water park which is modernly equipped with many slides, lazy river and wave pool. We that we had a great time together at night, enjoying the outdoor cinema at the resort's beach",
      {
        vn: 'Resort phục vụ bữa sáng rất chất lượng với nhiều sự lựa chọn cho cả gia đình, đặc biệt là gia đình có trẻ nhỏ. Khu nghỉ dưỡng có nhiều hoạt động trong nhà và ngoài trời cho cả gia đình. Gia đình tôi đặc biệt là các con tôi rất thích công viên nước của khu nghỉ mát được trang bị hiện đại với nhiều cầu trượt, sông lười và hồ tạo sóng.',
      },
    ),
    imageName: 'alma-review-image-3.webp',
    shortReview: t(
      'We had a amazing vacation at Alma Resort. We definitely come back in coming time',
      {
        vn: 'Chúng tôi đã có một kỳ nghỉ tuyệt vời tại Alma Resort. Chúng tôi chắc chắn sẽ trở lại trong thời gian tới',
      },
    ),
  },
  {
    avatar: 'alma-customer-avatar-3.png',
    customerName: 'An',
    rate: 4,
    review: t(
      'I had a great stay at Alma Resort. Especially, I appreciate the way the staff greets, advises warmly and enthusiastically. Besides, the room is quite large, designed with pleasant harmonious colors, very beautiful view. Thank you for giving me a wonderful dinner right on the sand in front of the sea and extremely satisfied and memorable. Will definitely recommend family and friends to experience. I will give you the maximum points as a thank you.',
      {
        vn: 'Mình đã có một kỳ nghỉ thật tuyệt tại Alma Resort. Đặc biệt mình đánh giá cao cách các bạn nhân viên chào đón, tư vấn niềm nở và nhiệt tình. Bên cạnh đó, phòng khá rộng, thiết kế gam màu hài hoà dễ chịu, view cực đẹp. Cảm ơn đã mang đến cho mình buổi ăn tối tuyệt vời ngay tại bãi cát trước biển và cực kỳ hài lòng, đáng nhớ. Nhất định sẽ giới thiệu gia đình và bạn bè trải nghiệm. Mình sẽ dành cho các bạn điểm tối đa xem như một lời cảm ơn.',
      },
    ),
    imageName: 'alma-review-image-4.webp',
    shortReview: t('Warm and wonderful experience', {
      vn: 'Trải nghiệm ấm áp và tuyệt vời',
    }),
  },
];

export const AlmaReviewsFaqData = (t) => [
  {
    panel: t('Does ALMA Resort have parking on site?', {
      vn: 'ALMA Resort có chỗ đậu xe trong khuôn viên hay không?',
    }),
    content: t('Yes, free self parking is available.', {
      vn: 'Có, có bãi đậu xe tự phục vụ miễn phí.',
    }),
  },
  {
    panel: t('Does ALMA Resort have a pool?', {
      vn: 'ALMA Resort có hồ bơi không?',
    }),
    content: t(
      "There are 12 outdoor pools and a children's pool at this property. Guests can use the swimming pool from 06:30 to 18:30.",
      {
        vn: 'Có 12 hồ bơi ngoài trời và hồ bơi dành cho trẻ em tại nơi lưu trú này. Khách có thể sử dụng hồ bơi từ 06:30 đến 18:30.',
      },
    ),
  },
  {
    panel: t('Are pets allowed at ALMA Resort?', {
      vn: 'ALMA Resort có cho phép mang theo vật nuôi hay không?',
    }),
    content: t(
      'Unfortunately, you are not allowed to bring pets or disability assistance pets.',
      {
        vn: 'Rất tiếc, bạn không được mang theo thú cưng lẫn vật nuôi hỗ trợ người khuyết tật.',
      },
    ),
  },
  {
    panel: t('What time is check-in and check-out at ALMA Resort?', {
      vn: 'Giờ nhận phòng và trả phòng tại ALMA Resort?',
    }),
    content: t(
      'You can check in from 14:00 until midnight. Early check-in fee will be charged (amount may vary, subject to room availability). Check-out time is 12:00. Late check-out is possible at an additional charge of 50% (subject to availability).',
      {
        vn: 'Bạn có thể nhận phòng từ 14:00 đến nửa đêm. Thu phí khi nhận phòng sớm (khoản tiền có thể khác nhau, tùy theo tình trạng phòng thực tế). Giờ trả phòng là 12:00. Khách có thể trả phòng muộn, phụ phí 50% (tùy tình hình thực tế).',
      },
    ),
  },
  {
    panel: t('Are there restaurants at or near ALMA Resort?', {
      vn: 'Có nhà hàng nào tại khuôn viên hoặc gần ALMA Resort không?',
    }),
    content: t(
      'Yes, there are 5 restaurants on site offering beach dining and local and international cuisine.',
      {
        vn: 'Có, có 5 nhà hàng trong khuôn viên, phục vụ dùng bữa trên bãi biển và món địa phương và quốc tế.',
      },
    ),
  },
  {
    panel: t('Does ALMA Resort have an airport shuttle?', {
      vn: 'ALMA Resort có cung cấp đưa đón sân bay hay không?',
    }),
    content: t(
      'There is an airport shuttle. The transfer fee is VND 672000 per room one way.',
      {
        vn: 'Có xe đưa đón sân bay. Phí đưa đón là 672000 VNĐ mỗi phòng một chiều.',
      },
    ),
  },
  {
    panel: t(
      'What recreational activities are there at ALMA Resort and the surrounding area?',
      {
        vn: 'Có những hoạt động giải trí, thư giãn nào tại ALMA Resort và khu vực lân cận?',
      },
    ),
    content: t(
      'Enjoy recreational activities on site, such as kayaking or volleyball, and practice at the on-site tennis court. Other on-site recreational activities include basketball, volleyball and yoga classes. Enjoy treatments at the spa and swim in one of the 12 outdoor swimming pools. ALMA Resort also features 4 bars, a private beach and lazy river, plus a sauna, steam room and garden.',
      {
        vn: 'Bạn có thể tham gia các hoạt động giải trí ngay trong khuôn viên như chèo thuyền kayak hay đánh bóng chuyền và luyện tại sân tennis trong khuôn viên. Trong khuôn viên còn có các hoạt động giải trí khác, gồm bóng rổ, bóng chuyền và lớp yoga. Tận hưởng các gói trị liệu tại khu spa và bơi lội tại một trong 12 hồ bơi ngoài trời. ALMA Resort còn có 4 quán bar, bãi biển riêng và dòng sông lười, cùng phòng tắm hơi, phòng xông hơi và vườn.',
      },
    ),
  },
];

export const AlmaOtherOffersFixedData = [
  {
    slug: 'nha-du-an-gem-sky-world-vpbank-lai-suat-890-uu-dai-12-thang-60e54fdc442b6522372836da',
    fileName: 'alma-other-offer-default-image-2.jpg',
    name: 'Nhà Dự Án | GEM SKY WORLD | VPBank | Lãi suất 8.90% | Ưu đãi 12 tháng',
  },
  {
    slug: 'bat-dong-san-nhadat-ab-bank-lai-suat-59-co-dinh-6-thang-dau-60e54fdc442b652237283724',
    fileName: 'alma-other-offer-default-image-4.jpg',
    name: 'Nhà Dự Án | TPB| West gate Bình Chánh',
  },
  {
    slug: 'ocb-cho-vay-nha-du-an-6107a92c9ec74bc0170a8167',
    fileName: 'alma-other-offer-default-image-1.jpg',
    name: 'Nhà Dự Án | TPB| Opal Boulevard',
  },
  {
    slug: 'nha-du-an-one-palace-tp-bank-lai-suat-72-uu-dai-12-thang-60e54fdc442b65223728373e',
    fileName: 'alma-other-offer-default-image-3.jpg',
    name: 'Nhà có sổ | One Palace | TP Bank | Lãi suất 7.2% | Ưu đãi 12 tháng',
  },
];

export const AlmaResortImagesData = [
  {
    original: '/assets/images/alma-resort-image-1.webp',
    thumbnail: '/assets/images/alma-resort-image-1.webp',
  },
  {
    original: '/assets/images/alma-resort-image-2.webp',
    thumbnail: '/assets/images/alma-resort-image-2.webp',
  },
  {
    original: '/assets/images/alma-resort-image-3.webp',
    thumbnail: '/assets/images/alma-resort-image-3.webp',
  },
  {
    original: '/assets/images/alma-resort-image-4.webp',
    thumbnail: '/assets/images/alma-resort-image-4.webp',
  },
];

export const ALMA_CUSTOM_HEAD_TAGS: HeadGenerateItem[] = [
  {
    key: 'PAGE_TITLE',
    tag: 'title',
    children: 'Ưu đãi ALMA',
  },
  {
    key: 'META_TITLE',
    tag: 'meta',
    props: {
      name: 'title',
      content: 'Ưu đãi ALMA dành riêng cho khách hàng của FINA',
    },
  },
  {
    key: 'META_DESCRIPTION',
    tag: 'meta',
    props: {
      name: 'description',
      content:
        'Kỳ nghỉ dưỡng 4 ngày 3 đêm tại ALMA resort 5 sao Khánh Hòa. Ưu đãi ALMA dành tặng riêng cho khách hàng của FINA.',
    },
  },
  {
    key: 'META_OG_URL',
    tag: 'meta',
    props: {
      property: 'og:url',
      content: '/alma-landing-page',
    },
  },
  {
    key: 'META_OG_TITLE',
    tag: 'meta',
    props: {
      property: 'og:title',
      content: 'Ưu đãi ALMA dành riêng cho khách hàng của FINA',
    },
  },
  {
    key: 'META_OG_DESCRIPTION',
    tag: 'meta',
    props: {
      property: 'og:description',
      content:
        'Kỳ nghỉ dưỡng 4 ngày 3 đêm tại ALMA resort 5 sao Khánh Hòa. Ưu đãi ALMA dành tặng riêng cho khách hàng của FINA.',
    },
  },
  {
    key: 'META_OG_IMAGE',
    tag: 'meta',
    props: {
      property: 'og:image',
      content:
        'https://storage.googleapis.com/image-fina/upload/fina/banner_website_desktop_1638936056897.jpg',
    },
  },
  {
    key: 'META_OG_IMAGE_WIDTH',
    tag: 'meta',
    props: {
      property: 'og:image:width',
      content: '2880',
    },
  },
  {
    key: 'META_OG_IMAGE_HEIGHT',
    tag: 'meta',
    props: {
      property: 'og:image:height',
      content: '600',
    },
  },
];
