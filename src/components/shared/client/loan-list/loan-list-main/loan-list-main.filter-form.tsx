import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { useClientFeature } from '@schema-form/client-features/hooks/client-feature-hook';
import ClientFeatureSearchForm from '@schema-form/client-features/search-form/client-feature-search-form';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getLoanFormSubmitData } from '../constants';
import { ClientLoanListMainFilterFormSchema } from './loan-list-main.filter-form-schema';

const ClientLoanListMainFilterForm = ({ hiddenValues = {} }) => {
  const { t } = useHTranslation('common');
  const { query } = useRouter();
  const [advanceSearch, setAdvanceSearch] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState(query?.categoryId);
  const { searchForm } = useClientFeature();
  const toggleAdvanceSearch = () => {
    setAdvanceSearch(!advanceSearch);
  };
  const advanceSearchText = useMemo(() => {
    if (advanceSearch) return t('Collapse', { vn: 'Thu gọn' });
    return t('Advance search', { vn: 'Tìm kiếm nâng cao' });
  }, [advanceSearch]);

  return (
    <div className="client-loan-list-main-filter-form">
      <ClientFeatureSearchForm
        {...{
          withRelations: ['product', 'org'],
          schema: (props) =>
            ClientLoanListMainFilterFormSchema(
              props,
              { advanceSearch },
              setCategoryId,
              categoryId,
            ),
          resetIfSuccess: false,
          hiddenValues,
          onDataReadyToSubmit: (values) => {
            return getLoanFormSubmitData({ ...values, categoryId });
          },
          isAppendData: true,
          hideControlButton: true,
        }}
      />
      <Button
        onClick={() => searchForm?.submit()}
        type="primary"
        className="client-loan-list-main-filter-form__search-btn"
      >
        {t('Search', { vn: 'Tìm kiếm' })}
      </Button>
      <div
        className="client-loan-list-main-filter-form__advance-search"
        onClick={toggleAdvanceSearch}
      >
        <span>{advanceSearchText}</span>
        {advanceSearch ? <UpOutlined /> : <DownOutlined />}
      </div>
    </div>
  );
};

export default ClientLoanListMainFilterForm;
