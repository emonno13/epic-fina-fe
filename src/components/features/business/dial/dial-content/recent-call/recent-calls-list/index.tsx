
import { RecentCallListItem } from './recent-call-list-item';

const RecentCallList = ({ recentCall }) => {
  if (!Array.isArray(recentCall) || recentCall.length < 1) {
    return null;
  }
  return (
    <>
      {recentCall.map((recentCallData, index) => (
        <RecentCallListItem
          key={`phone-call-item-${index}`}
          {...{ recentCallData }}
        />
      ))}
    </>
  );
};

export default RecentCallList;
