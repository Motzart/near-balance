import * as nearAPI from 'near-api-js';
import { wallet, near } from '~utils/near-utils';

export const {
  utils: {
    format: {
      formatNearAmount,
    }
  }
} = nearAPI;

type Store = {
  update: Function,
  dispatch: Function,
  state: Object
}

type InitNear = {
  near: Object,
  wallet: Object,
  account: Object
}

export const initNear = () => async ({ update }: Store): Promise<InitNear> => {
  console.log('initNear');

  wallet.signIn = () => wallet.requestSignIn();
  const signOut = wallet.signOut;

  wallet.signOut = () => {
    signOut.call(wallet);
    update('wallet.signedIn', false);
    update('', { account: null });
  };

  wallet.signedIn = wallet.isSignedIn();

  let account;

  if (wallet.signedIn) {
    account = wallet.account();
    wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 4);
    await update('', { near, wallet, account });
  } else {
    await update('', { near, wallet });
  }

  return { near, wallet, account };
};
