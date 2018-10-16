// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

const rn_bridge = require('rn-bridge');

const ethers = require('ethers');

// Echo every message received from react-native.
rn_bridge.channel.on('message', async (message) => {
  rn_bridge.channel.send(await handleMessage(message));
});

async function handleMessage(message) {
  const { action, data } = JSON.parse(message);

  switch (action) {
  case 'generateWallet':
    return generateWallet();
  case 'importWalletFromMnemonic':
    return await importWalletFromMnemonic(data);
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
    console.log('Wallet', wallet.signingKey);

    return JSON.stringify(wallet.signingKey);
  } catch (error) {
    throw new Error('Invalid mnemonic');
  }
}
