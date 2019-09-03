/** @format */
import 'node-libs-react-native/globals';
import './global';
import 'core-js';
import 'babel-polyfill';

import { AppRegistry, YellowBox } from 'react-native';
import Reactotron from 'reactotron-react-native';
import App from './App';
import { name as appName } from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer', 'Remote debugger'];
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNOS requires',
  'Method `jumpToIndex` is deprecated.',
]);

Reactotron
  .configure({
    name: 'MangoWallet',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

AppRegistry.registerComponent(appName, () => App);
