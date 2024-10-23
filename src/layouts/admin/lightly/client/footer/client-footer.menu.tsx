import { Link } from '@components/shared/link';
import { Divider } from 'antd';
import ClientFooterSubMenu, {
  ClientFooterSubMenuProps,
} from './client-footer.sub-menu';

interface ClientFooterMenuProps extends ClientFooterSubMenuProps {
  title: string;
  href?: string;
}

const ClientFooterMenu = ({
  title,
  href = '',
  subMenu = [],
}: ClientFooterMenuProps) => {
  return (
    <div className="ui-lightly-client-footer__menu">
      <Link href={href}>
        <div className="ui-lightly-client-footer__menu__title">{title}</div>
      </Link>
      <Divider className="ui-lightly-client-footer__menu__divider" />
      <ClientFooterSubMenu {...{ subMenu }} />
    </div>
  );
};

export default ClientFooterMenu;
