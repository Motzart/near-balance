const defaultEnv = process.env.NEAR_ENV || 'testnet';

export default function getConfig(env: string = defaultEnv) {
  switch (env) {
    case 'mainnet':
      return  {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        LOCKUP_CONTRACT_ID: 'lockup.pembrock.near',
        TOKEN_CONTRACT_ID: 'token.pembrock.near',
        USER_ACCOUNTS: [
          'yaigor.near',
          'valeriiya.near',
          'dimidar.near',
          'olhamin.near',
          'dashamin.near',
          'elainili.near',
          'evamama.near',
          'ivannili.near',
          'urahan.near',
          'jazzmini.near',
          'beornottobe.near',
          'oyaniuk-pem.near',
          'lp.pembrock.near',
        ],
        headers: {}
      }
    default:
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        TOKEN_CONTRACT_ID: 'token.pembrock.testnet',
        USER_ACCOUNTS: [
          'motzart2.testnet',
        ],
        headers: {}
      }
  }
}
