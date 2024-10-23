import { Card } from 'antd';

import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '../../../../../../../schema-form/h-form';
import { MessageSchema } from './message-schema';

export const Message = () => {
  const { t } = useHTranslation('admin-common');

  return (
    <Card type="inner" title="Message">
      <HSubForm
        {...{
          schema: MessageSchema,
        }}
      />
    </Card>
  );
};
