import { HSelect } from '@components/shared/common-form-elements/select';
import { ArrowDownSmallIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { usePagination, useSearchForm } from '@schema-form/features/hooks';

export const getSortingResultOptions = (t) => [
  {
    label: t('Highest interest rate', { vn: 'Ngày tạo lâu nhất' }),
    value: 'createdAt-low',
  },
  {
    label: t('Lowest interest rate', { vn: 'Ngày tạo gần nhất' }),
    value: 'createdAt-high',
  },
];

export const getSortingResultSubmitData = (values) => {
  const { sort } = values;
  if (!sort) {
    return {};
  }
  const splitSort = sort.split('-');
  const field = `${splitSort[0]}`;
  let sortDirect;
  if (splitSort[1] === 'high') {
    sortDirect = 'DESC';
  }
  if (splitSort[1] === 'low') {
    sortDirect = 'ASC';
  }
  return {
    order: `${field} ${sortDirect}`,
  };
};

const ClientRealEstateInvestmentListMainHeader = ({ setHiddenValues }) => {
  const pagination = usePagination();
  const { t } = useHTranslation('common');
  const sortingResultOptions = getSortingResultOptions(t);
  const searchForm = useSearchForm();

  const onSortChange = (value) => {
    const submitData = getSortingResultSubmitData({ sort: value });
    setHiddenValues({
      filter: {
        ...submitData,
      },
    });
    searchForm?.submit();
  };

  return (
    <div className="client-bond-list-main-header">
      <div className="client-bond-list-main-header__searching-result">
        {t('Has', { vn: 'Có' })}
        <span> {pagination?.total || 0} </span>
        {t('suitable real estate', { vn: 'bất động sản phù hợp' })}
      </div>
      <div className="client-bond-list-main-header__group">
        <HSelect
          {...{
            options: sortingResultOptions,
            placeholder: t('Sort results', { vn: 'Sắp xếp kết quả' }),
            onChange: onSortChange,
            suffixIcon: <ArrowDownSmallIcon />,
          }}
        />
      </div>
    </div>
  );
};

export default ClientRealEstateInvestmentListMainHeader;
