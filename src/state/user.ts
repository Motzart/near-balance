import getConfig from '~config';
import { ftGetBalance } from '~services/ft-contract';

const config = getConfig();

const USER_ACCOUNTS = config.USER_ACCOUNTS;

export const getUsersBalance = async () => {
  const tasks = USER_ACCOUNTS.map(async(userId) => {
    return {
      userId,
      balance: await ftGetBalance(userId)
    }
  })
  return Promise.all(tasks);
}
