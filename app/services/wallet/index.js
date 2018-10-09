import axios from 'axios';
import _ from 'lodash';

import erc20Tokens from '../../configs/eth/erc20_tokens';
import EthService from './eth';
import Erc20Servcie from './erc20';


const WalletService = {};

const erc20Symbols = _.keys(erc20Tokens);

WalletService.importWalletFromPrivateKey = (coin, privateKey, mnemonic, password) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.importWalletFromPrivateKey(privateKey, mnemonic, password);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.importWalletFromPrivateKey(privateKey, mnemonic, password);
    }
  }
};

WalletService.importWalletFromMnemonic = (coin, mnemonic) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.importWalletFromMnemonic(mnemonic);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.importWalletFromMnemonic(mnemonic);
    }
  }
};


WalletService.importWalletFromKeystore = (coin, keystore, password) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.importWalletFromKeystore(keystore, password);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.importWalletFromKeystore(keystore, password);
    }
  }
};


WalletService.getAddressBalance = (coin, address) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.getAddressBalance(address);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.getAddressBalance(coin, address);
    }
    return -1;
  }
};


WalletService.getCoinPrice = async (coin) => {
  try {
    const coinUpperCase = coin.toUpperCase();
    const apiUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinUpperCase}&tsyms=USD,JPY`;
    const response = await axios.get(apiUrl);
    const coinInfo = response.data.RAW[coinUpperCase];

    return {
      priceUSD: coinInfo.USD.PRICE,
      priceJPY: coinInfo.JPY.PRICE,
      percentChange24hUsd: coinInfo.USD.CHANGEPCT24HOUR,
      percentChange24hJpy: coinInfo.JPY.CHANGEPCT24HOUR,
    };
  } catch (error) {
    throw error;
  }
};


WalletService.sendTransaction = (coin, sendAddress, receiveAddress, privateKey, amount, fee) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.sendTransaction(sendAddress, receiveAddress, privateKey, amount, fee);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.sendTransaction(sendAddress, receiveAddress, privateKey, amount, fee, coin);
    }
  }
};


WalletService.getTransactions = (coin, address, page, perPage) => {
  switch (coin.toLowerCase()) {
  case 'eth':
    return EthService.getTransactions(address, page, perPage);
  default:
    if (_.includes(erc20Symbols, coin)) {
      return Erc20Servcie.getTransactions(coin, address, page, perPage);
    }
    return [];
  }
};

export default WalletService;
