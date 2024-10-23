import { useIsMobile } from '@lib/hooks/use-media';
import { useEffect, useState } from 'react';
import ClientBondListMainFilterForm from './bond-list-main.filter-form';
import ClientBondListMainHeader from './bond-list-main.header';
import ClientBondListMainList from './bond-list-main.list';

const ClientBondListMain = () => {
  const [hiddenValues, setHiddenValues] = useState<any>({});
  const [gridView, setGridView] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setGridView(true);
  }, [isMobile]);

  return (
    <div className="client-bond-list-main">
      {!isMobile && (
        <ClientBondListMainHeader
          {...{ setHiddenValues, gridView, setGridView }}
        />
      )}

      <div className="client-bond-list-main__body">
        <ClientBondListMainFilterForm {...{ hiddenValues }} />

        {isMobile && (
          <ClientBondListMainHeader
            {...{ setHiddenValues, gridView, setGridView }}
          />
        )}

        <ClientBondListMainList {...{ gridView }} />
      </div>
    </div>
  );
};

export default ClientBondListMain;
