import { useOpenUserInfoModal } from './hooks';

const TransactionInformationCount = ({ label, count, record = {}, tabKey = 'loan' }) => {
  const onOpenUserInfoModal = useOpenUserInfoModal();
  return (
    <div className="transaction-information-count">
      {label}: <span onClick={() => onOpenUserInfoModal(record, tabKey)}>{count}</span>
    </div>
  );
};

export default TransactionInformationCount;