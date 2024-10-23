import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { useClientFeature } from '@schema-form/client-features/hooks/client-feature-hook';
import LoanListGridViewIcon from '../../bond-loan-item/icons/loan-list.grid-view-icon';
import LoanListListViewIcon from '../../bond-loan-item/icons/loan-list.list-view-icon';
import {
  getSortingResultOptions,
  getSortingResultSubmitData,
} from '../constants';

const ClientLoanListMainHeader = ({
  setHiddenValues = (f) => f,
  setGridView = (f) => f,
  gridView = false,
}) => {
  const { t } = useHTranslation('common');
  const sortingResultOptions = getSortingResultOptions(t);
  const { pagination, searchForm } = useClientFeature();

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
    return `client-loan-list-main-header__group__toggle-group__button ${activeCondition && 'client-loan-list-main-header__group__toggle-group__button-active'}`;
  };
  return (
    <div className="client-loan-list-main-header">
      <div className="client-loan-list-main-header__searching-result">
        {t('Has', { vn: 'Có' })}
        <span> {pagination?.total || 0} </span>
        {t('suitable home loan products', {
          vn: 'sản phẩm vay mua nhà phù hợp',
        })}
      </div>
      <div className="client-loan-list-main-header__group">
        <HSelect
          {...{
            options: sortingResultOptions,
            placeholder: t('Sort results', { vn: 'Sắp xếp kết quả' }),
            onChange: onSortChange,
          }}
        />
        <div className="client-loan-list-main-header__group__toggle-group">
          <div
            className={getToggleButtonClassName(!gridView)}
            onClick={disableGridView}
          >
            <LoanListListViewIcon />
          </div>
          <div
            className={getToggleButtonClassName(!!gridView)}
            onClick={enableGridView}
          >
            <LoanListGridViewIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoanListMainHeader;
