const ethers = require('ethers');

const { Wallet } = ethers;
const wallet = Wallet.createRandom();
// wallet.provider = ethers.providers.getDefaultProvider('ropsten');
console.log(wallet);
