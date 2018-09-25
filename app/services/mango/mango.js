const ethers = require('ethers');

const Erc20Service = {};

Erc20Service.generateWallet = () => {
  const { Wallet } = ethers;
  // const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
  const wallet = Wallet.createRandom();
  wallet.provider = ethers.providers.getDefaultProvider('ropsten');
  return wallet;
};

export default Erc20Service;
