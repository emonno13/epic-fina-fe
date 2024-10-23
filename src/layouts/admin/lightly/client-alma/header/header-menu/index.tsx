import { useHTranslation } from '@lib/i18n';
import { SystemMenu } from '@components/shared/menu';
import { AlmaMenuSchema } from '../../alma-menu-schema';

const ClientAlmaHeaderMenu = () => {
  const { t } = useHTranslation('common');
  const menuSchema = AlmaMenuSchema(t);
  return (
    <div className="client-alma-header-menu">
      <SystemMenu
        {...{
          mode: 'horizontal',
          schema: menuSchema,
        }}
      />
    </div>
  );
};

export default ClientAlmaHeaderMenu;
