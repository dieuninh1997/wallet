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
      navigationOptions: () => ({
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.titleTabFocused : styles.titleTab}>
            Dashboard
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabFocused}>
            <Image
              style={styles.iconTab}
              source={focused ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}
            />
          </View>
        ),
      }),
    },
    RequestScreen: {
      screen: RequestScreen,
      navigationOptions: () => ({
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.titleTabFocused : styles.titleTab}>
            Request
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <View>
            <Image
              style={styles.iconTab}
              source={focused ? MangoTabImages.requestTabFocused : MangoTabImages.requestTab}
            />
          </View>

        ),
      }),
    },
    SendScreen: {
      screen: SendScreen,
      navigationOptions: () => ({
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.titleTabFocused : styles.titleTab}>
            Send
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            style={styles.iconTab}
            source={focused ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}
          />
        ),
      }),
    },
    TransactionScreen: {
      screen: TransactionsScreen,
      navigationOptions: () => ({
        tabBarLabel: ({ focused }) => (
          <Text style={focused ? styles.titleTabFocused : styles.titleTab}>
            Transactions
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            style={styles.iconTab}
            source={focused ? MangoTabImages.transactionTabFocused : MangoTabImages.transactionTab}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF',
      showLabel: true,
      style: {
        backgroundColor: '#f3f5fa',
        height: scale(60),
      },
      labelStyle: {
        fontSize: scale(11),
        paddingBottom: scale(5),
      },
    },
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'DashboardScreen',
    tabBarComponent: MangoTabBar,
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

const styles = ScaledSheet.create({
  viewFocused: {
    // backgroundColor: 'red',
    width: '100@s',
    height: '50@s',
  },
  titleTab: {
    fontSize: '12@s',
    textAlign: 'center',
  },
  titleTabFocused: {
    fontSize: '12@s',
    textAlign: 'center',
    color: '#F5C400',
  },
  iconTab: {
    width: '30@s',
    height: '30@s',
  },
});
