import { endpoints } from '@lib/networks/endpoints';
import { HFeature } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { TransactionTable } from './transaction-table';

export const TransactionWithTable = ({ type }) => {
  return (
    <HFeature
      {...{
        featureId: `transactions-with-mio-${type}`,
        endpoint: endpoints.endpointWithApiDomain('/users/transactions'),
      }}
    >
      <HSearchFormHiddenAble
        hiddenValues={{
          filter: {
            where: {
              type,
            },
          },
        }}
      />
      <TransactionTable type={type} />
    </HFeature>
  );
};
