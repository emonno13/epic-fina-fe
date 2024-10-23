import React from 'react';
import { MenuSchema } from './menu';
import { useHTranslation } from '../../../lib/i18n';
import { SystemMenu } from '../../../components/shared/menu';

const FinancialAdviceHorizontalMenu = () => {
  const { t } = useHTranslation('common');
  const menuSchema = MenuSchema(t);

  return (
    <div className="client-financial-advice-header-menu">
      <SystemMenu {...{
        mode: 'horizontal',
        schema: menuSchema,
      }} />
    </div>
  );
};


export default FinancialAdviceHorizontalMenu;
