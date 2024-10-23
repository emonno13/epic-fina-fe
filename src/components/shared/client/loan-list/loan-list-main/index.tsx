import { useIsMobile } from '@lib/hooks/use-media';
import { useEffect, useState } from 'react';
import ClientLoanListMainFilterForm from './loan-list-main.filter-form';
import ClientLoanListMainHeader from './loan-list-main.header';
import ClientLoanListMainList from './loan-list-main.list';

const ClientLoanListMain = () => {
  const [hiddenValues, setHiddenValues] = useState<any>({});
  const [gridView, setGridView] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setGridView(true);
  }, [isMobile]);

  return (
    <div className="client-loan-list-main">
      {!isMobile && (
        <ClientLoanListMainHeader
          {...{ setHiddenValues, gridView, setGridView }}
        />
      )}
      <div className="client-loan-list-main__body">
        <ClientLoanListMainFilterForm {...{ hiddenValues }} />
        {isMobile && (
          <ClientLoanListMainHeader
            {...{ setHiddenValues, gridView, setGridView }}
          />
        )}
        <ClientLoanListMainList {...{ gridView }} />
      </div>
    </div>
  );
};

export default ClientLoanListMain;
