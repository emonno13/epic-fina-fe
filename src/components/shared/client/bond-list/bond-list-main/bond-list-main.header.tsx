import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { usePagination, useSearchForm } from '@schema-form/features/hooks';
import { ArrowDownSmallIcon } from 'icons';
import {
  getSortingResultOptions,
  getSortingResultSubmitData,
} from '../constants';

const ClientBondListMainHeader = ({
  setHiddenValues = (f) => f,
  setGridView = (f) => f,
  gridView = false,
}) => {
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

  const enableGridView = () => {
    setGridView(true);
  };

  const disableGridView = () => {
    setGridView(false);
  };

  const getToggleButtonClassName = (activeCondition) => {
    return `client-bond-list-main-header__group__toggle-group__button ${activeCondition && 'client-bond-list-main-header__group__toggle-group__button-active'}`;
  };

  return (
    <div className="client-bond-list-main-header">
      <div className="client-bond-list-main-header__searching-result">
        {t('Has', { vn: 'Có' })}
        <span> {pagination?.total || 0} </span>
        {t('suitable home bond products', { vn: 'trái phiếu phù hợp' })}
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
        {/* <div className="client-bond-list-main-header__group__toggle-group">
					<div className={getToggleButtonClassName(!gridView)} onClick={disableGridView}>
						<LoanListListViewIcon />
					</div>
					<div className={getToggleButtonClassName(!!gridView)} onClick={enableGridView}>
						<LoanListGridViewIcon />
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default ClientBondListMainHeader;
