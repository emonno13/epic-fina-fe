import { HSelect } from '@components/shared/common-form-elements/select';
import { HTable } from '@schema-form/features';
import HFeature from '@schema-form/features/feature';
import HSearchForm from '@schema-form/features/search-form';
import { createSchemaItem } from '@schema-form/h-types';
import { useHTranslation } from 'lib/i18n';
import { TYPE_SMS_MESSAGE, TYPE_SMS_MESSAGE_MAPPING } from './constans';
import { SmsMessageTableSchema } from './sms-message-table-schema';

const SMSMessage = () => {
  const { t } = useHTranslation('admin-crm');
  return (
    <HFeature
      {...{
        featureId: 'sms-messages',
        nodeName: 'sms-messages',
      }}
    >
      <HSearchForm
        {...{
          resetIfSuccess: false,
          initialValues: {
            type: TYPE_SMS_MESSAGE.SMS,
          },
          advancedSchema: () => [
            createSchemaItem({
              label: t('Type', { vn: 'Phân loại' }),
              Component: HSelect,
              colProps: { xs: 24, sm: 24, md: 12 },
              name: 'type',
              componentProps: {
                optionValues: [
                  TYPE_SMS_MESSAGE_MAPPING?.[TYPE_SMS_MESSAGE.SMS],
                  TYPE_SMS_MESSAGE_MAPPING?.[TYPE_SMS_MESSAGE.EMAIL],
                ],
              },
            }),
          ],
          withRelations: ['user'],
        }}
      />

      <HTable schema={SmsMessageTableSchema} />
    </HFeature>
  );
};

export default SMSMessage;
