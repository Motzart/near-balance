import { Near, keyStores } from 'near-api-js';
import NearWallet from '~services/NearWallet';

import getConfig from '../config';
const config = getConfig();

export const near = new Near({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  ...config,
});

export const wallet = new NearWallet(near, 'vesting-app');
