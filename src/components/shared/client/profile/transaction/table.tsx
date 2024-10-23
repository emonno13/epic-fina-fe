import { endpoints } from '@lib/networks/endpoints';
import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { TransactionTableSchema } from './transaction-table-schema';

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
      <HTable
        scroll={{ x: 'max-content' }}
        bordered={false}
        schema={() => TransactionTableSchema({ type })}
      />
    </HFeature>
  );
};
