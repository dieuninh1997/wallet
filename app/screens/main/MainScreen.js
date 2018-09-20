import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View, Image, Text } from 'react-native';
import TransactionsScreen from '../transactions/TransactionsScreen';
import RequestScreen from '../request/RequestScreen';
import SendScreen from '../send/SendScreen';
import DashboardScreen from '../dashboard/DashboardScreen';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import MangoTabImages from '../common/MangoTabImages';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoHeader from '../common/MangoHeader';
import { CommonStyles } from '../../utils/CommonStyles';

const plusViewFocused = (
  <View style={{
    width: 126,
    height: 55,
    backgroundColor: 'red',
    borderTopLeftRadius: 108,
    borderTopRightRadius: 108,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
  }}
  >
    <Text>Focused</Text>
  </View>
);

const MainScreen = createBottomTabNavigator(
  {
    DashboardScreen: {
      screen: props => <DashboardScreen {...props} />,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabFocused}>
            <Image
              source={focused ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}
            />
          </View>
        ),
      }),
    },
    RequestScreen: {
      screen: RequestScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <View>
            {focused ? plusViewFocused : null}
            <Image
              source={focused ? MangoTabImages.requestTabFocused : MangoTabImages.requestTab}
            />
          </View>

        ),
      }),
    },
    SendScreen: {
      screen: SendScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}
          />
        ),
      }),
    },
    TransactionScreen: {
      screen: TransactionsScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Image
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
      activeBackgroundColor: '#FFD72F',
      showLabel: false,
      style: {
        backgroundColor: '#FFD72F',
        borderTopStartRadius: scale(20),
        height: scale(80),
      },
      labelStyle: {
        fontSize: scale(11),
        paddingBottom: scale(5),
      },
    },
    animationEnabled: false,
    swipeEnabled: false,
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
});
