import { SearchSmallIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import HSearchForm, {
  HResetPaginationButton,
} from '@schema-form/features/search-form';
import { ClientBondListMainFilterFormSchema } from './bond-list-main.filter-form-schema';

const ClientBondListMainFilterForm = ({ hiddenValues = {} }) => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-bond-list-main-filter-form">
      <HSearchForm
        {...{
          withRelations: ['org', 'category'],
          schema: (props) => ClientBondListMainFilterFormSchema(props),
          resetIfSuccess: false,
          hiddenValues: {
            ...hiddenValues,
          },
          onDataReadyToSubmit: (formValues) => {
            const param = {
              ...formValues,
              'info.parValueShares':
                formValues['info.parValueShares'] || undefined,
              'info.interestRate.rate': {
                between: formValues['info.interestRate.rate'],
              },
            };

            if (formValues.name) {
              return {
                ...param,
                name: {
                  like: formValues.name,
                  options: 'i',
                },
              };
            }

            return {
              ...param,
              name: {
                like: formValues.name,
              },
            };
          },
          isAppendData: true,
        }}
      />
      <HResetPaginationButton
        {...{
          className: 'client-bond-list-main-filter-form__search-btn',
        }}
      >
        <SearchSmallIcon /> {t('Search', { vn: 'Tìm kiếm' })}
      </HResetPaginationButton>
    </div>
  );
};

export default ClientBondListMainFilterForm;
