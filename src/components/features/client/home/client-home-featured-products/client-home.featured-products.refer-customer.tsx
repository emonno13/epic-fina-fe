import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { getInformationSurveyData } from '../../information-survey/constants';
import ClientHomeReferCustomerIcon from '../icons/client-home.refer-customer-icon';
import ClientHomeWantLoanIcon from '../icons/client-home.want-loan-icon';

const ClientHomeFeaturedProductsReferCustomerButton = ({
  title,
  className = '',
  icon,
  ...rest
}) => (
  <Button
    {...rest}
    type="primary"
    className={`client-home-refer-customer__button ${className}`}
  >
    <div className="client-home-refer-customer__button__icon">{icon}</div>
    <span>{title}</span>
  </Button>
);

const ClientHomeFeaturedProductsReferCustomer = () => {
  const { t } = useHTranslation('common');
  const slug = RouteUtils.getAdminFeatureNames()?.[0] || 'vay-mua-nha';
  const { push } = useRouter();
  const informationSurveyData = getInformationSurveyData(t);
  const existInformationSurveyData = informationSurveyData[slug] || {};

  const onWantLoanClick = () => {
    push({
      pathname: '/khao-sat-thong-tin-tu-van',
      query: {
        categoryType: slug,
      },
    });
  };
  const onCheckLoanAbility = () => {
    push({
      pathname: '/calculators-toolkit/calculating-loan-capacity',
    });
  };
  return (
    <Row gutter={[24, 24]}>
      <Col {...{ xs: 24, sm: 24, md: 12 }}>
        <ClientHomeFeaturedProductsReferCustomerButton
          {...{
            icon: <ClientHomeWantLoanIcon />,
            title: existInformationSurveyData?.title,
            className: 'client-home-refer-customer__want-loan-button',
            onClick: onWantLoanClick,
          }}
        />
      </Col>
      <Col {...{ xs: 24, sm: 24, md: 12 }}>
        <ClientHomeFeaturedProductsReferCustomerButton
          {...{
            icon: <ClientHomeReferCustomerIcon />,
            title: t('Check your ability to borrow money', {
              vn: 'Kiểm tra khả năng vay vốn',
            }),
            className: 'client-home-refer-customer__introduce-button',
            onClick: onCheckLoanAbility,
          }}
        />
      </Col>
    </Row>
  );
};

export default ClientHomeFeaturedProductsReferCustomer;
