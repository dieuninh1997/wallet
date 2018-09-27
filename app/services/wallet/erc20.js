import axios from 'axios';
import urljoin from 'url-join';
import _ from 'lodash';

import ERROR_TYPES from '../../configs/errorTypes';
import erc20Tokens from '../../configs/eth/erc20_tokens';
import erc20ABI from '../../configs/eth/erc20_abi';
import TRANSACTION from '../../configs/Transaction';


import coinList from '../../configs/coinList';

const ethers = require('ethers');

const ApiUrl = coinList.eth.apiUrl;
const { provider, broadcastTransactionUrl } = coinList.eth;


export const Erc20Service = {};


Erc20Service.importWalletFromPrivateKey = async (userPrivateKey, mnemonic, password) => {
  const wallet = new ethers.Wallet(Buffer.from(userPrivateKey, 'hex'));
  const keystore = await wallet.encrypt(password);

  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic,
    keystore,
  };
};


Erc20Service.importWalletFromKeystore = async (keystore, password) => {
  try {
    const wallet = await ethers.Wallet.fromEncryptedWallet(keystore, password);

    return {
      privateKey: wallet.privateKey,
      address: wallet.address,
      mnemonic: '',
      keystore,
    };
  } catch (error) {
    if (error.message === 'invalid password') {
      throw new Error(ERROR_TYPES.INVALID_PASSWORD);
    }
    throw new Error(ERROR_TYPES.INVALID_KEYSTORE);
  }
};


Erc20Service.getAddressBalance = async (coin, address) => {
  const contractAddress = erc20Tokens[coin].address;
  try {
    const url = `${ApiUrl}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=YourApiKeyToken`;
    const response = await axios.get(url);
    const balance = response.data.result;

    return balance / (10 ** erc20Tokens[coin].decimal);
  } catch (error) {
    throw new Error(ERROR_TYPES.REQUEST_FAILED);
  }
};


Erc20Service.getTransactions = async (coin, address, page = 1, perPage = 20) => {
  try {
    const contractAddress = erc20Tokens[coin].address;
    const decimals = erc20Tokens[coin].decimal;

    const url = `${ApiUrl}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&sort=desc&apikey=YourApiKeyToken&page=${page}&offset=${perPage}`;
    const response = await axios.get(url);
    const rawTransactions = response.data.result;

    const transactions = _.map(rawTransactions, (transaction) => {
      if (transaction.isError === '1') {
        return memo;
      }

      const transactionId = transaction.hash;
      const sendAddress = transaction.from;
      const receiveAddress = transaction.to;
      const value = Number(transaction.value) / Math.pow(10, decimals);
      const transactionUrl = urljoin(broadcastTransactionUrl, 'tx', transaction.hash);
      const transactionTime = Number(transaction.timeStamp) * 1000;
      const confirmations = Number(transaction.confirmations);

      let actionType = '';
      if (sendAddress.toLowerCase() === receiveAddress.toLowerCase()) {
        actionType = TRANSACTION.ACTION.SELF;
      } else if (sendAddress.toLowerCase() === address.toLowerCase()) {
        actionType = TRANSACTION.ACTION.SENDER;
      } else if (receiveAddress.toLowerCase() === address.toLowerCase()) {
        actionType = TRANSACTION.ACTION.RECEIVER;
      }

      let status = '';
      if (confirmations >= 16) {
        status = TRANSACTION.STATUS.CONFIRMED;
      } else {
        status = TRANSACTION.STATUS.PENDING;
      }

      return {
        id: transactionId,
        sendAddress,
        receiveAddress,
        actionType,
        value,
        time: transactionTime,
        status,
        url: transactionUrl,
      };
    });

    return _.uniqBy(transactions, 'id');
  } catch (error) {
    throw new Error(ERROR_TYPES.REQUEST_FAILED);
  }
};


Erc20Service.getContractABI = async (contractAddress) => {
  try {
    const url = `${ApiUrl}/api?module=contract&action=getabi&address=${contractAddress}&apikey=YourApiKeyToken`;
    const response = await axios.get(url);

    if (response.data.status === '0') {
      throw new Error(response.data.message);
    }

    return response.data.result;
  } catch (error) {
    return erc20ABI;
  }
};


Erc20Service.sendTransaction = async (sendAddress, receiveAddress, privateKey, amount, fee = 0, coin) => {
  try {
    privateKey = Buffer.from(privateKey, 'hex');

    const wallet = new ethers.Wallet(privateKey);
    wallet.provider = ethers.providers.getDefaultProvider(provider);

    const contractAddress = erc20Tokens[coin].address;
    const contractAbiFragment = await Erc20Service.getContractABI(contractAddress);

    const contract = new ethers.Contract(contractAddress, contractAbiFragment, wallet);

    const decimals = erc20Tokens[coin].decimal;
    const numberOfTokens = ethers.utils.parseUnits(amount.toString(), decimals);

    const transaction = await contract.transfer(receiveAddress, numberOfTokens);

    return transaction;
  } catch (error) {
    throw error;
  }
};


export default Erc20Service;
