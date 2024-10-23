import { Link } from '@components/shared/link';

export interface ClientFooterSubMenuProps {
  subMenu?: any[];
}

const ClientFooterSubMenuItem = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className="ui-lightly-client-footer__menu__sub-menu__title">
        {title}
      </div>
    </Link>
  );
};

const ClientFooterSubMenu = ({ subMenu }: ClientFooterSubMenuProps) => {
  if (!Array.isArray(subMenu) || subMenu.length < 1) {
    return null;
  }
  return (
    <div className="ui-lightly-client-footer__menu__sub-menu">
      {subMenu.map(({ title, href }, index) => (
        <ClientFooterSubMenuItem
          key={`client-footer-menu-${index}-${title}`}
          {...{ title, href }}
        />
      ))}
    </div>
  );
};

export default ClientFooterSubMenu;
