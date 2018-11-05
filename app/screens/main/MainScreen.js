import React from 'react';
import { TabNavigator } from 'react-navigation';
import { View } from 'react-native';
import TransactionsScreen from '../transactions/TransactionsScreen';
import RequestScreen from '../request/RequestScreen';
import SendScreen from '../send/SendScreen';
import DashboardScreen from '../dashboard/DashboardScreen';
import MangoHeader from '../common/MangoHeader';
import MangoTabBar from '../common/MangoTabBar';
import { CommonStyles } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';

const MainScreen = TabNavigator(
  {
    DashboardScreen: {
      screen: props => <DashboardScreen {...props} />,
    },
    RequestScreen: {
      screen: RequestScreen,
    },
    SendScreen: {
      screen: SendScreen,
    },
    TransactionScreen: {
      screen: TransactionsScreen,
    },
  },
  {
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'DashboardScreen',
    tabBarComponent: MangoTabBar,
    tabBarPosition: 'bottom',
  },
);

MainScreen.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;
  let headerStyle = CommonStyles.headerWithDropdown;

  switch (routeName) {
  case 'RequestScreen':
    headerTitle = I18n.t('request.title');
    break;
  case 'SendScreen':
    headerTitle = I18n.t('send.title');
    break;
  case 'TransactionScreen':
    headerTitle = I18n.t('transactions.title');
    break;
  default:
    headerTitle = I18n.t('dashboard.title');
    headerStyle = CommonStyles.header;
    break;
  }

  return {
    headerTitle,
    headerStyle,
    headerTitleStyle: CommonStyles.headerTitle,
    headerLeft: <MangoHeader navigation={navigation} />,
    headerRight: <View />,
  };
};

export default MainScreen;
