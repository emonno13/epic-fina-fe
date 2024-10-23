import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { IconLink } from './icons/icon-link';

const NoDataSurvey = ({ next }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <div className="profile-affiliate-no-data">
      <IconLink />
      <p className="profile-affiliate-no-data-des">
        Bạn chưa có tài khoản chứng chỉ quỹ/ trái phiếu nào được liên kết. Liên
        kế tài khoản ngay để dễ dàng thực hiện các giao dịch ngay trên FINA nhé.
      </p>
      <Button className="profile-affiliate-no-data-button" onClick={next}>
        Liên kết ngay
      </Button>
    </div>
  );
};

export default NoDataSurvey;
