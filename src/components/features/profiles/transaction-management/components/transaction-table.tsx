import { TransactionTableSchema } from './transaction-table-schema';
import { HTable } from '../../../../../schema-form/features';

export const TransactionTable = ({ type }) => {
  return (
    <HTable
      scroll={{ x: 'max-content' }}
      bordered={true}
      schema={() => TransactionTableSchema({ type })}
    />
  );
};
