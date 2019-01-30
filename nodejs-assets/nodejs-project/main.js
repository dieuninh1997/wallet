// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

const rn_bridge = require('rn-bridge');

const ethers = require('ethers');
const EthereumjsWallet = require('ethereumjs-wallet');

// Echo every message received from react-native.
rn_bridge.channel.on('message', async (message) => {
  rn_bridge.channel.send(await handleMessage(message));
});

rn_bridge.channel.on('generateKeystore', async (message) => {
  rn_bridge.channel.post('generateKeystore', await handleMessage(message));
});

rn_bridge.channel.on('importWalletFromKeystore', async (message) => {
  rn_bridge.channel.post('importWalletFromKeystore', await handleMessage(message));
});

async function handleMessage(message) {
  const { action, data } = JSON.parse(message);

  switch (action) {
  case 'generateWallet':
    return generateWallet();
  case 'importWalletFromMnemonic':
    return await importWalletFromMnemonic(data);
  case 'generateKeystore':
    return await generateKeystore(data);
    case 'importWalletFromKeystore':
    return await importWalletFromKeystore(data);
  default:
    return true;
  }
}

function generateWallet() {
  const { Wallet } = ethers;
  const wallet = Wallet.createRandom();
  return JSON.stringify(wallet.signingKey);
}

async function importWalletFromMnemonic(mnemonic) {
  try {
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic);
    return JSON.stringify(wallet.signingKey);
  } catch (error) {
    throw new Error('Invalid mnemonic');
  }
}

function generateKeystore(data) {
  const { privateKey: userPrivateKey, password } = JSON.parse(data);
  const wallet = EthereumjsWallet.fromPrivateKey(Buffer.from(userPrivateKey, 'hex'));
  const keystore = wallet.toV3String(password);

  return JSON.stringify({
    privateKey: userPrivateKey,
    keystore,
  });
}

function importWalletFromKeystore(data) {
  const { keystore, password } = JSON.parse(data);
  try {
    const wallet = EthereumjsWallet.fromV3(keystore, password);
    return JSON.stringify({
      privateKey: wallet.getPrivateKey().toString('hex'),
      address: `0x${wallet.getAddress().toString('hex')}`,
    });
  } catch (error) {
    if (_.includes(error.message, 'wrong passphrase')) {
      throw new Error(Errors.INVALID_PASSWORD);
    }
    throw new Error(Errors.INVALID_KEYSTORE);
  }
};
