import Web3 from 'web3';
import axios from 'axios';
import urljoin from 'url-join';
import _ from 'lodash';
import moment from 'moment';

import coinList from '../../configs/coinList';

const bip39 = require('bip39');
const hdkey = require('hdkey');

const ethers = require('ethers');

const ApiUrl = coinList.eth.apiUrl;
const { provider, providerUrl, broadcastTransactionUrl } = coinList.eth;

export const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const EthService = {};

EthService.generateWallet = () => {
  const { Wallet } = ethers;
  const wallet = Wallet.createRandom();
  wallet.provider = ethers.providers.getDefaultProvider('ropsten');
  return wallet;
};

EthService.importWalletFromPrivateKey = async (userPrivateKey, mnemonic, password) => {
  const wallet = new ethers.Wallet(Buffer.from(userPrivateKey, 'hex'));
  const keystore = await wallet.encrypt(password);
  return {
    privateKey: userPrivateKey,
    address: wallet.address,
    mnemonic,
    keystore,
  };
};

EthService.getTransactions = async (address) => {
  try {
    const url = `${ApiUrl}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKeyToken&page=1&offset=100`;
    const response = await axios.get(url);
    const rawTransactions = response.data.result;
    console.log('rawTransactions', rawTransactions);

    const transactions = _.reduce(rawTransactions, (memo, transaction) => {
      if (transaction.isError === '1') {
        return memo;
      }

      const transactionId = transaction.hash;
      const sendAddress = transaction.from;
      const receiveAddress = transaction.to;
      const value = Number(transaction.value) / Math.pow(10, 18);
      const transactionUrl = urljoin(broadcastTransactionUrl, 'tx', transaction.hash);
      const transactionTime = moment(Number(transaction.timeStamp) * 1000).format('lll');

      memo.push({
        id: transactionId,
        sendAddress,
        receiveAddress,
        value,
        url: transactionUrl,
        time: transactionTime,
      });

      return memo;
    }, []);

    return _.uniqBy(transactions, 'id');
  } catch (error) {
    throw new Error(ERROR_TYPES.REQUEST_FAILED);
  }
};

EthService.getAddressBalance = async (address) => {
  try {
    const url = `${ApiUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`;
    const response = await axios.get(url);
    const balance = response.data.result;

    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    throw new Error(ERROR_TYPES.REQUEST_FAILED);
  }
};

EthService.makeTransaction = async (sendAddress, receiveAddress, privateKey, amount) => {
  try {
    const wallet = new ethers.Wallet(Buffer.from(privateKey, 'hex'));
    wallet.provider = ethers.providers.getDefaultProvider(provider);

    privateKey = Buffer.from(privateKey, 'hex');

    const nonce = await wallet.getTransactionCount();

    const transaction = {
      nonce: web3.utils.toHex(nonce),
      gasLimit: web3.utils.toHex(25000), // prevent known transaction
      gasPrice: web3.utils.toHex(10e9), // 10 Gwei
      to: receiveAddress,
      from: sendAddress,
      value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
    };

    const transactionGas = await wallet.estimateGas(transaction);

    return {
      transaction,
      fee: transactionGas.toNumber() * 0.00000002,
    };
  } catch (error) {
    throw error;
  }
};

EthService.sendTransaction = async (transaction, privateKey) => {
  try {
    const wallet = new ethers.Wallet(Buffer.from(privateKey, 'hex'));
    wallet.provider = ethers.providers.getDefaultProvider(provider);

    await wallet.sendTransaction(transaction);
  } catch (error) {
    throw error;
  }
};

export default EthService;
