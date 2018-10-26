# Mango Wallet

### Pre-requisites

  - Node JS
  - Android SDK and Android emulator (Genymotion is strongly recommended)
  - XCode (MacOS only)

### First time setup
  - Install node modules. You only need to run this command again if there's any update in the file package.json
```sh
$ npm install
```

  - Install node modules for nodejs process
```sh
$ cd nodejs-assets/nodejs-project && npm install
```

  - Install react-native-cli
```sh
$ npm install -g react-native-cli
```

  - Install Facebook SDK: follow instructions at https://github.com/facebook/react-native-fbsdk
    + Download SDK https://developers.facebook.com/docs/react-native
    + Make sure that the Facebook SDK frameworks are installed in ~/Documents/FacebookSDK.

### Test it out
#### Android
```sh
$ react-native run-android
```

#### iOS
```sh
$ react-native run-ios
```
