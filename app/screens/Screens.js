import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import SendScreen from './send/SendScreen';
import RequestScreen from './request/RequestScreen';
import TransactionsScreen from './transactions/TransactionsScreen';

export default {
  MainScreen: { screen: MainScreen, },
  TransactionsScreen: {
    screen: TransactionsScreen,
  },
  RequestScreen: {
    screen: RequestScreen,
  },
  SendScreen: {
    screen: SendScreen,
  },
  LandingScreen: {
    screen: LandingScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
};
