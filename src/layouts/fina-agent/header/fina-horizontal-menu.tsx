import React from 'react';
import { MenuSchema } from './menu';
import { useHTranslation } from '../../../lib/i18n';
import { SystemMenu } from '../../../components/shared/menu';

const FinaAgentHorizontalMenu = () => {
  const { t } = useHTranslation('common');
  const menuSchema = MenuSchema(t);
  return (
    <div className="client-fina-agent-header-menu">
      <SystemMenu {...{
        mode: 'horizontal',
        schema: menuSchema,
      }} />
    </div>
  );
};


export default FinaAgentHorizontalMenu;
