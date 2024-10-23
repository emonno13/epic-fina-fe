import { HSelect } from '@components/shared/common-form-elements/select';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../../lib/i18n';
import { USER_TYPES } from '../../../shared/user/constants';

export const UserSharingSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Users'),
      rules: [
        {
          required: true,
          message: t('Users is required'),
        },
      ],
      name: 'shareForUserIds',
      componentProps: {
        mode: 'multiple',
        placeholder: 'Select users',
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: '/users/suggestion',
        hiddenValues: {
          type: USER_TYPES.STAFF,
          hasAccount: true,
        },
        optionsConverter: (document) => ({
          ...document,
          label:
            `${document?.fullName || ''} - ${document?.emails[0]?.email || ''}` ||
            '',
        }),
      },
    }),
  ];
};
