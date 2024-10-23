import { Card } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '../../../../../../../schema-form/h-form';
import { GeneralInfoSchema } from './general-info-schema';

export const GeneralInfo = () => {
  const { t } = useHTranslation('admin-common');

  return (
    <Card type="inner" title="General info">
      <HSubForm
        {...{
          schema: GeneralInfoSchema,
        }}
      />
    </Card>
  );
};
