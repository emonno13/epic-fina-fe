import { UserOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Avatar } from 'antd';
import { useMemo } from 'react';

const CounsellingFormDescription = ({ data }) => {
  const { avatar, advancedInformation } = data;
  const { t } = useHTranslation('common');

  const quote = useMemo(() => {
    return (
      advancedInformation?.quote ||
      t(
        'Want to buy a house but hesitate because the financial is not enough?',
        { vn: 'MUỐN MUA NHÀ NHƯNG CHẦN CHỪ VÌ TÀI CHÍNH CHƯA ĐỦ?' },
      )
    );
  }, [advancedInformation]);

  const quoteDescription = useMemo(() => {
    return (
      advancedInformation?.quoteDescription ||
      t(
        'Together with FINA, confidently realize the dream of building a home!\nLeave your information to be supported by a financial specialist of FINA.',
        {
          vn: 'Cùng FINA, tự tin thực hiện giấc mơ xây dựng tổ ấm!\nĐể lại thông tin để được chuyên viên tài chính của FINA hỗ trợ.',
        },
      )
    );
  }, [advancedInformation]);

  return (
    <div className="counselling-form-description">
      <Avatar
        {...{
          src: avatar,
          size: 136,
          icon: <UserOutlined />,
        }}
      />
      <div className="counselling-form-description-wrapper">
        <h2>{quote}</h2>
        <p>{quoteDescription}</p>
      </div>
    </div>
  );
};

export default CounsellingFormDescription;
