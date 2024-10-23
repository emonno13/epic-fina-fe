import { useHTranslation } from '@lib/i18n';
import { useRouter } from 'next/router';
import { getMenuData } from '../constants';

const RecruitLayoutMenu = (props) => {
  const { t } = useHTranslation('admin-common');
  const { root } = props;
  const { push } = useRouter();

  const onClick = async (path) => {
    await push(path);
  };

  return (
    <>
      {getMenuData(t).map((menu) => (
        <div
          onClick={() => onClick(menu.path)}
          key={menu.key}
          className={`recruit-${root}__menu__item cursor-pointer`}
        >
          {menu.label}
        </div>
      ))}
    </>
  );
};

export default RecruitLayoutMenu;
