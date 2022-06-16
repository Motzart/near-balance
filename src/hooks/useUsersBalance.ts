import { useEffect, useState } from 'react';
import { getUsersBalance } from '~state/user';

export interface UserLockupsView {
  account_id: string,
  schedule: [],
  claimed_balance: string,
  termination_config: null,
  timestamp: number,
  total_balance: string,
  unclaimed_balance: string,
}

export const useUsersBalance = () => {
  const [usersBalance, setUsersBalance] = useState<any>();

  useEffect(() => {
    getUsersBalance()
      .then((data: any) => {
        return setUsersBalance(data);
      })
      .catch(() => setUsersBalance([]));
  }, []);

  return usersBalance;
};
