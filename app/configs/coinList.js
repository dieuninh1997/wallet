import _ from 'lodash';

import erc2Tokens from './eth/erc20_tokens';

const coinList = {
  eth: {
    symbol: 'eth',
    name: 'Ethereum',
    type: 'coin',
    isEnabled: false,

    // Addiction info,
    decimals: 10 ** 8,
    apiUrl: 'https://api-ropsten.etherscan.io',
    broadcastTransactionUrl: 'https://ropsten.etherscan.io',
    provider: 'ropsten',
    providerUrl: 'http://ropsten.infura.io',
    transactionFee: 0.0005,
  },
};

// Build ERC20 tokens
_.forEach(erc2Tokens, (token, symbol) => {
  coinList[symbol] = {
    symbol: token.symbol,
    name: token.name,
    type: 'erc20_token',
    isEnabled: true,

    // Addiction info,
    decimals: token.decimal,
    transactionFee: token.transactionFee,
  };
});


export default coinList;
