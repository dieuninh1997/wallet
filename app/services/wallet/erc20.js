import axios from 'axios';
import _ from 'lodash';
import urljoin from 'url-join';

const EthUtil = require('ethereumjs-util');
const ethers = require('ethers');
const EthereumjsWallet = require('ethereumjs-wallet');
const { BigNumber } = require('bignumber.js');
const Erc20ABI = require('./erc20.abi');
const Errors = require('./errors');

const Erc20Service = {
  network: 'ropsten',
  broadcastTransactionUrl: 'https://ropsten.etherscan.io',
  tokens: {
    mgc4: {
      symbol: 'mgc4',
      name: 'MGC004',
      decimal: 18,
      address: '0xebf0c068cc1dd9b343e92bc2cc09a2ca272d6511',
      transactionFee: 0.1,
    },
  },
};


Erc20Service.getApiUrl = () => {
  let ApiUrl = '';

  switch (Erc20Service.network) {
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

Erc20Service.isValidAddress = address => EthUtil.isValidAddress(address);

Erc20Service.isValidPrivateKey = (userPrivateKey) => {
  try {
    const wallet = new ethers.Wallet(Buffer.from(userPrivateKey, 'hex'), new ethers.providers.EtherscanProvider(Erc20Service.network));
    console.log('wallet', wallet);

    return true;
  } catch (error) {
    return false;
  }
};

Erc20Service.importWalletFromPrivateKey = (userPrivateKey) => {
  const wallet = new ethers.Wallet(Buffer.from(userPrivateKey, 'hex'), new ethers.providers.EtherscanProvider(Erc20Service.network));

  return {
    privateKey: userPrivateKey,
    address: wallet.address,
  };
};

Erc20Service.generateKeystore = (userPrivateKey, password) => {
  const wallet = EthereumjsWallet.fromPrivateKey(Buffer.from(userPrivateKey, 'hex'));
  const keystore = wallet.toV3String(password);

  return {
    privateKey: userPrivateKey,
    keystore,
  };
};

Erc20Service.importWalletFromKeystore = (keystore, password) => {
  try {
    const wallet = EthereumjsWallet.fromV3(keystore, password);
    return {
      privateKey: wallet.getPrivateKey().toString('hex'),
      address: `0x${wallet.getAddress().toString('hex')}`,
    };
  } catch (error) {
    if (_.includes(error.message, 'wrong passphrase')) {
      throw new Error(Errors.INVALID_PASSWORD);
    }
    throw new Error(Errors.INVALID_KEYSTORE);
  }
};

Erc20Service.importWalletFromMnemonic = async (mnemonic) => {
  try {
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic);

    return wallet;
  } catch (error) {
    throw new Error('Invalid mnemonic');
  }
};

Erc20Service.getAddressInfo = async (coin, address) => {
  const contractAddress = Erc20Service.tokens[coin].address;
  const ApiUrl = Erc20Service.getApiUrl();

  try {
    const url = `${ApiUrl}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=YourApiKeyToken`;
    const response = await axios.get(url);
    const balance = response.data.result;

    return {
      balance: (new BigNumber(balance)).dividedBy(Math.pow(10, Erc20Service.tokens[coin].decimal)).toNumber(),
    };
  } catch (error) {
    throw new Error(Errors.SERVER_ERROR);
  }
};

Erc20Service.getTransactions = async (coin, address, page = 1, perPage = 20) => {
  try {
    const ApiUrl = Erc20Service.getApiUrl();
    const contractAddress = Erc20Service.tokens[coin].address;
    const decimals = Erc20Service.tokens[coin].decimal;

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
      const value = Number(transaction.value) / (10 ** decimals);
      const transactionUrl = urljoin(Erc20Service.broadcastTransactionUrl, 'tx', transaction.hash);
      const transactionTime = Number(transaction.timeStamp) * 1000;
      const confirmations = Number(transaction.confirmations);
      let status = '';
      if (confirmations >= 1) {
        status = 'CONFIRMED';
      } else {
        status = 'PENDING';
      }

      return {
        id: transactionId,
        sendAddress,
        receiveAddress,
        value,
        time: transactionTime,
        url: transactionUrl,
        status,
        confirmations,
      };
    });

    return _.uniqBy(transactions, 'id');
  } catch (error) {
    console.log('error', error);

    throw new Error(Errors.SERVER_ERROR);
  }
};

Erc20Service.getAddressBalance = async (coin, address) => {
  const ApiUrl = Erc20Service.getApiUrl();
  const contractAddress = Erc20Service.tokens[coin].address;
  try {
    const url = `${ApiUrl}/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=YourApiKeyToken`;
    const response = await axios.get(url);
    const balance = response.data.result;

    return balance / (10 ** Erc20Service.tokens[coin].decimal);
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
    return Erc20ABI;
  }
};


Erc20Service.sendTransaction = async (sendAddress, receiveAddress, privateKey, amount, fee, coin) => {
  try {
    const options = {
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits(`${fee}`, 'gwei'),
    };

    // privateKey = Buffer.from(privateKey, 'hex');

    const wallet = new ethers.Wallet(privateKey, new ethers.providers.EtherscanProvider(Erc20Service.network));

    const contractAddress = Erc20Service.tokens[coin].address;
    const contractAbiFragment = await Erc20Service.getContractABI(contractAddress);

    const contract = new ethers.Contract(contractAddress, contractAbiFragment, new ethers.providers.EtherscanProvider(Erc20Service.network));
    const contractWithSigner = contract.connect(wallet);

    const decimals = Erc20Service.tokens[coin].decimal;
    const numberOfTokens = ethers.utils.parseUnits(amount.toString(), decimals);

    const transaction = await contractWithSigner.transfer(receiveAddress, numberOfTokens, options);
    transaction.transactionUrl = urljoin(Erc20Service.broadcastTransactionUrl, 'tx', transaction.hash);
    return transaction;
  } catch (error) {
    throw new Error('Can not send transactions');
  }
};

Erc20Service.getCurrentGasPrices = async () => {
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

export default Erc20Service;
