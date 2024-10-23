import RecentCallList from './recent-calls-list';

export  const RecentCallGroup = ({ title, recentCall = [], onClose }) => {
  return (
    <div>
      <div className="phone-call-list-group__title">{title}</div>
      <RecentCallList {...{ recentCall, onClose }} />
    </div>
  );
};