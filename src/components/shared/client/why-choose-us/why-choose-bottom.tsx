import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';

const ClientWhyChooseUsBottom = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-why-choose-us-bottom max-w-1100 m-auto">
      <div className="client-why-choose-us-bottom__background">
        <i />
      </div>
      <div className="client-why-choose-us-bottom__content">
        <h3 className="client-why-choose-us-bottom__content__title">
          {t('All you need to know', { vn: 'Tất cả những điều bạn cần biết' })}
          <br />
          {t('to prepare a loan to buy your home', {
            vn: 'để chuẩn bị cho vay mua mái ấm của mình',
          })}
        </h3>
        <p className="client-why-choose-us-bottom__content__desc">
          {t(
            'Loan to buy house - land is a credit product to support capital to help customers pay expenses',
            {
              vn: 'Vay mua nhà - đất là sản phẩm tín dụng nhằm hỗ trợ nguồn vốn giúp khách hàng thanh toán các chi phí',
            },
          )}
          <br />
          {t(
            'for the purpose of buying/receiving the transfer of houses and residential land.',
            { vn: 'cho mục đích mua/ nhận chuyển nhượng nhà ở, đất ở.' },
          )}
        </p>
        <div className="client-why-choose-us-bottom__content__group-btns">
          <Button
            type="primary"
            className="client-why-choose-us-bottom__content__group-btns__discover-now"
          >
            {t('Discover now', { vn: 'Khám phá ngay' })}
          </Button>
          <Button
            type="primary"
            className="client-why-choose-us-bottom__content__group-btns__schedule"
          >
            {t('Schedule a consultation with us', {
              vn: 'Đặt lịch tư vấn với chúng tôi',
            })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientWhyChooseUsBottom;
