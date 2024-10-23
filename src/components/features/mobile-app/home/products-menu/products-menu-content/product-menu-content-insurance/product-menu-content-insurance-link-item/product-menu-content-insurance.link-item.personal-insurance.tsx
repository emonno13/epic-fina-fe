import { EyeOutlined } from '@ant-design/icons';
import { MESSAGE_TYPE } from '@constants/mobile-app';
import { useHTranslation } from '@lib/i18n';
import { MessageUtils } from '@lib/utils/message';
import { message } from 'antd';
import ProductsMenuContentInsuranceLinkItem from './index';

const LinkItemPersonalProduct = ({ data }) => {
  const { t } = useHTranslation('mobile');
  const { metaData } = data;
  const contentDetailData = [
    {
      label: t('Code', {
        vn: 'Mã',
        en: 'Code',
      }),
      field: 'code',
      render: (value) => (
        <span className="insurance-content-detail-code">#{value}</span>
      ),
    },
    {
      label: t('Certificate', {
        vn: 'Chứng chỉ',
        en: 'Code',
      }),
      render: () => <EyeOutlined style={{ color: '#064DD6' }} />,
    },
  ];
  const onItemClick = () => {
    const certLink = metaData?.certLink || '';
    if (!certLink) {
      message.info(
        t('Does not have cert link', {
          en: 'No certificate yet. Please contact admin',
          vn: 'Chưa có giấy chứng nhận. Vui lòng liên hệ admin',
        }),
      );
      return;
    }
    MessageUtils.postMessageToWebview(
      MESSAGE_TYPE.OPEN_OUTSIDE_BROWSER,
      certLink,
    );
  };
  return (
    <ProductsMenuContentInsuranceLinkItem
      {...{ data, onClick: onItemClick, contentDetailData }}
    />
  );
};

export default LinkItemPersonalProduct;
