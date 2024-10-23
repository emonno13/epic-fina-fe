import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import ClientHomeProcedureList from './client-home.procedure.list';

const ClientHomeProcedure = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <div className="client-home-procedure-wrapper">
      <div className="client-home-procedure max-w-1100 m-auto">
        <div className="client-home-procedure__image">
          <img src="/assets/images/client_home_procedure.png" />
        </div>
        <div className="client-home-procedure__content">
          <div className="client-home-procedure__content__title">
            {t('client_home_procedure_title', {
              en: 'Outstanding features from the app',
              vn: 'Tính năng vượt trội từ ứng dụng',
            })}
          </div>
          <ClientHomeProcedureList />
          <Button type="primary">
            {t('client_home_procedure_start', {
              en: 'Experience now',
              vn: 'Trải nghiệm ngay',
            })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientHomeProcedure;
