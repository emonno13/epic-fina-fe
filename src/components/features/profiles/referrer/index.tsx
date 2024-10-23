import { RelateToReferrer } from '@components/features/organizations/users';
import { ListReferrer } from '@components/features/organizations/users/list-referrer';
import { useFetchCurrentUser } from './hooks';

const Referrer = () => {
  // did not use useCurrentUser because when another user (like admin)
  // changes referral user, the customer user must re-login to see new your referral user.
  const currentUser = useFetchCurrentUser();

  return (
    <div>
      <RelateToReferrer documentDetail={currentUser} />
      <ListReferrer documentDetail={currentUser} />
    </div>
  );
};

export default Referrer;
