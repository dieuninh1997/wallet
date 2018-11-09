import Web3 from 'web3';
import axios from 'axios';
import urljoin from 'url-join';
import _ from 'lodash';
import moment from 'moment';

const EthUtil = require('ethereumjs-util');
const ethers = require('ethers');

const EthService = {
  network: 'ropsten',
  providerUrl: 'http://ropsten.infura.io',
  broadcastTransactionUrl: 'https://ropsten.etherscan.io',
};

export const web3 = new Web3(new Web3.providers.HttpProvider(EthService.providerUrl));

EthService.getApiUrl = () => {
  let ApiUrl = '';

  switch (EthService.network) {
  case 'mainnet':
    ApiUrl = 'https://api.etherscan.io';
    break;
  case 'ropsten':
    ApiUrl = 'https://api-ropsten.etherscan.io';
    break;
  default:
    ApiUrl = 'https://ropsten.etherscan.io';
  }

  return ApiUrl;
};

EthService.isValidAddress = address => EthUtil.isValidAddress(address);

EthService.generateWallet = () => {
  const { Wallet } = ethers;
  const wallet = Wallet.createRandom();
  wallet.provider = ethers.providers.getDefaultProvider(EthService.network);
  return wallet;
};

EthService.importWalletFromPrivateKey = async (userPrivateKey) => {
  const wallet = new ethers.Wallet(Buffer.from(userPrivateKey, 'hex'));
  // const keystore = await wallet.encrypt(password);
  return {
    privateKey: userPrivateKey,
    address: wallet.address,
    // mnemonic,
    // keystore,
  };
};

EthService.importWalletFromMnemonic = async (mnemonic) => {
  try {
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic);

    return wallet;
  } catch (error) {
    throw new Error('Invalid mnemonic');
  }
};

EthService.getTransactions = async (address, page, perPage) => {
  try {
    const ApiUrl = EthService.getApiUrl();

    const url = `${ApiUrl}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKeyToken&page=${page}&offset=${perPage}`;
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
      const value = Number(transaction.value) / (10 ** 18);
      const transactionUrl = urljoin(EthService.broadcastTransactionUrl, 'tx', transaction.hash);
      const transactionTime = moment(Number(transaction.timeStamp) * 1000).format('lll');
      const confirmations = Number(transaction.confirmations);
      let status = '';
      if (confirmations >= 1) {
        status = 'CONFIRMED';
      } else {
        status = 'PENDING';
      }

      memo.push({
        id: transactionId,
        sendAddress,
        receiveAddress,
        value,
        time: transactionTime,
        url: transactionUrl,
        status,
        confirmations,
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
    const ApiUrl = EthService.getApiUrl();

    const url = `${ApiUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`;
    const response = await axios.get(url);
    const balance = response.data.result;

    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    throw new Error(ERROR_TYPES.REQUEST_FAILED);
  }
};

EthService.sendTransaction = async (sendAddress, receiveAddress, privateKey, amount, fee) => {
  try {
    const wallet = new ethers.Wallet(privateKey, new ethers.providers.EtherscanProvider(EthService.network));
    console.log('wallet', wallet);

    const nonce = await wallet.getTransactionCount();
    console.log('nonce', nonce);

    const transactionInfo = {
      nonce: web3.utils.toHex(nonce),
      gasLimit: web3.utils.toHex(100000), // prevent known transaction
      gasPrice: ethers.utils.parseUnits(`${fee}`, 'gwei'),
      to: receiveAddress,
      from: sendAddress,
      value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
    };

    const transactionGas = await wallet.estimateGas(transactionInfo);
    const transaction = await wallet.sendTransaction(transactionInfo);
    transaction.transactionUrl = urljoin(EthService.broadcastTransactionUrl, 'tx', transaction.hash);

    return transaction;
  } catch (error) {
    throw new Error('Can not send transactions');
  }
};

EthService.getCurrentGasPrices = async () => {
  try {
    const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    return {
      slowly: response.data.safeLow / 10,
      regular: response.data.average / 10,
      fast: response.data.fast / 10,
    };
  } catch (error) {
    throw error;
  }
};

export default EthService;
