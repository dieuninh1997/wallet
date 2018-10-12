// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

const rn_bridge = require('rn-bridge');

const ethers = require('ethers');

// Echo every message received from react-native.
rn_bridge.channel.on('message', (message) => {
  rn_bridge.channel.send(handleMessage(message));
});

function handleMessage(message) {
  switch (message) {
  case 'generateWallet':
    return generateWallet();
  }
}

function generateWallet() {
  const { Wallet } = ethers;
  const wallet = Wallet.createRandom();
  return JSON.stringify(wallet.signingKey);
}
