import { Button } from 'antd';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useIsAuthenticated } from '@lib/providers/auth';
import { useMobile } from '../../hooks/login-drawer-hooks';

const CarouselItem = ({ img, content }) => {
  const isAuthenticated = useIsAuthenticated();
  const { setLoginDrawerVisible } = useMobile();
  const onClick = async () => {
    if (!isAuthenticated) {
      setLoginDrawerVisible(true);
      return;
    }
    await RouteUtils.redirect('/admin/profiles/account-identifier');
  };
  return (
    <div
      {...{
        onClick,
        className: 'carounsel-wrapper',
        style: {
          backgroundImage: `linear-gradient(90deg, rgba(0, 28, 82, 0.9) 0%, rgba(0, 32, 95, 0) 78.95%), url(${img})`,
        },
      }}
    >
      <h1>{content}</h1>
      <Button className="carounsel-wrapper__button">THAM GIA</Button>
    </div>
  );
};

export default CarouselItem;
