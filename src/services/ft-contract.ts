import { wallet } from '~utils/near-utils';
import getConfig from '~config';

const config = getConfig();

const TOKEN_CONTRACT_ID = config.TOKEN_CONTRACT_ID;

export interface IViewFunctionOptions {
  methodName: string;
  args?: object;
}

export interface IFunctionCallOptions extends IViewFunctionOptions {
  gas?: string;
  amount?: string;
}

export const ftViewFunction = ({
  methodName,
  args
}: IFunctionCallOptions ) => {
  return wallet.account().viewFunction(TOKEN_CONTRACT_ID, methodName, args);
};

export const ftGetBalance = (accountId: string) => {
  return ftViewFunction({
    methodName: 'ft_balance_of',
    args: { account_id: accountId },
  }).catch((e) => console.log('ERROR', e));
};
