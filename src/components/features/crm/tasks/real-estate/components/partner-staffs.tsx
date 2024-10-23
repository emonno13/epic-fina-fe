import { isEmpty } from 'lodash';
import { AnyObject } from '@components/shared/atom/type';
import { ConverterUtils } from '@lib/converter';

export const PartnerStaffs = ({ users }: { users: AnyObject[] }) => {
  if (isEmpty(users)) {
    return <></>;
  }
  const total = users.length - 1;

  return (
    <div>
      {users.map((user, index) => {
        if (isEmpty(user)) {
          return <></>;
        }

        let displayUser = `${ConverterUtils.getFullNameUser(user)} - ${user.org.code}`;
        if (index < total) {
          displayUser += ' , ';
        }

        return displayUser;
      })}
    </div>
  );
};
