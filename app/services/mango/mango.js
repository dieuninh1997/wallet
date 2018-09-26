const ethers = require('ethers');
const axios = require('axios');

const Erc20Service = {};

Erc20Service.generateWallet = () => {
  const { Wallet } = ethers;
  const wallet = Wallet.createRandom();
  wallet.provider = ethers.providers.getDefaultProvider('ropsten');
  return wallet;
};

Erc20Service.getAddressTransactions = async (address) => {
  try {
    const url = `http://api.ethplorer.io/getAddressTransactions/${address}?apiKey=freekey&showZeroValues=1&limit=50`;
    const transactions = await axios.get(url);
    return transactions.data;
  } catch (error) {
    console.log('Erc20Service._error', error);
  }
};

export default Erc20Service;
