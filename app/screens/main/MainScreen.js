import React from "react";
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import TransactionScreen from "../transactions/TransactionScreen";
import RequestScreen from "../request/RequestScreen";
import SendScreen from "../send/SendScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import { View, Image, Text } from "react-native";
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import MangoTabImages from "../common/MangoTabImages";
import ScaledSheet from "../../libs/reactSizeMatter/ScaledSheet";
import MangoHeader from "../common/MangoHeader";

let MangoTabNavigator;

const plusViewFocused = <View style={{ width: 126,
  height: 55,
  backgroundColor: 'red',
  borderTopLeftRadius: 108,
  borderTopRightRadius: 108,
  borderBottomLeftRadius: 95,
  borderBottomRightRadius: 95}}>
  <Text>Focused</Text>
</View>;

class MainScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoHeader navigation={navigation} />,
  });

  _initTabNavigator() {
    return createBottomTabNavigator(
      {
        DashboardScreen: {
          screen: DashboardScreen,
          navigationOptions: () => ({
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabFocused}>
                <Image
                  source={focused ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}
                />
              </View>
            )
          })
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

            )
          })
        },
        SendScreen: {
          screen: SendScreen,
          navigationOptions: () => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}
              />
            )
          })
        },
        TransactionScreen: {
          screen: TransactionScreen,
          navigationOptions: () => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? MangoTabImages.transactionTabFocused : MangoTabImages.transactionTab}
              />
            )
          })
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
            paddingBottom: scale(5)
          }
        },
        animationEnabled: false,
        swipeEnabled: false,
      }
    )
  }

  constructor(props) {
    super(props);
    MangoTabNavigator = this._initTabNavigator();
  }

  render() {
    return (
        <MangoTabNavigator/>
    )
  }
}

export default MainScreen;

const styles = ScaledSheet.create({
  viewFocused: {
    // backgroundColor: 'red',
    width: '100@s',
    height: '50@s'
  }
});

