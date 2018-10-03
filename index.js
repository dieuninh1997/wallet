/** @format */
import 'node-libs-react-native/globals';
import './global';
import 'core-js';
import 'babel-polyfill';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];
// console.ignoredYellowBox = ['Remote debugger'];
// YellowBox.ignoreWarnings([
//   'Warning: isMounted(...) is deprecated',
//   'Module RCTImageLoader',
//   'Module RNOS requires',
//   'Method `jumpToIndex` is deprecated.',
// ]);

AppRegistry.registerComponent(appName, () => App);
