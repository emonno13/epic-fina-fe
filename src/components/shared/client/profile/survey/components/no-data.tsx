import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { Button } from 'antd';

import { IconSearch } from './icon-search';

const NoDataSurvey = ({ next }) => {
  const currentUser: any = useCurrentUser();
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');

  if (!currentUser) return <></>;

  return (
    <div className="profile-survey-no-data">
      <IconSearch />
      <p className="profile-survey-no-data-des">
        Khi tham gia khảo sát nâng cao , FINA sẽ gửi đến bạn những thông tin đầu
        tư, ưu đãi khoản vay, ưu đãi bảo hiểm phù hợp với nhu cầu và tài chính
        dựa trên thông tin cung cấp một cách nhanh chóng, dễ dàng nhất.
      </p>
      <Button className="profile-survey-no-data-button" onClick={next}>
        Khảo sát ngay
      </Button>
    </div>
  );
};

export default NoDataSurvey;
