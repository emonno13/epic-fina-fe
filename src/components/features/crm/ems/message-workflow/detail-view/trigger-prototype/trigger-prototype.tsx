import { Card } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { HSubForm } from '../../../../../../../schema-form/h-form';
import { TriggerPrototypeSchema } from './trigger-prototype-schema';

export const TriggerPrototype = () => {
  const { t } = useHTranslation('admin-common');
  const messageWorkflow = useDocumentDetail();

  return (
    <Card type="inner" title={t('Trigger')}>
      <HSubForm
        {...{
          schema: TriggerPrototypeSchema,
          transport: {
            triggerPrototype: messageWorkflow?.triggerPrototype,
          },
        }}
      />
    </Card>
  );
};
