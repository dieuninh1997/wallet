import React from 'react';
import { createBottomTabNavigator, TabNavigator } from 'react-navigation';
import { View, Image, Text } from 'react-native';
import TransactionsScreen from '../transactions/TransactionsScreen';
import RequestScreen from '../request/RequestScreen';
import SendScreen from '../send/SendScreen';
import DashboardScreen from '../dashboard/DashboardScreen';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import MangoTabImages from '../common/MangoTabImages';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoHeader from '../common/MangoHeader';
import MangoTabBar from '../common/MangoTabBar';
import { CommonStyles } from '../../utils/CommonStyles';

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
    headerTitle = 'Request';
    break;
  case 'SendScreen':
    headerTitle = 'Send';
    break;
  case 'TransactionScreen':
    headerTitle = 'Transactions';
    break;
  default:
    headerTitle = 'DashBoard';
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
