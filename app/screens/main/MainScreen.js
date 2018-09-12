import React from "react";
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import TransactionScreen from "../transactions/TransactionScreen";
import RequestScreen from "../request/RequestScreen";
import SendScreen from "../send/SendScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import { View, Image } from "react-native";
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import MangoTabImages from "../common/MangoTabImages";

let MangoTabNavigator;

class MainScreen extends React.PureComponent {
  _initTabNavigator() {
    return createBottomTabNavigator(
      {
        DashboardScreen: { screen: DashboardScreen },
        RequestScreen: { screen: RequestScreen },
        SendScreen: { screen: SendScreen },
        TransactionScreen: { screen: TransactionScreen },
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'DashboardScreen') {
              iconName = MangoTabImages.dashboardTab;
            } else if (routeName === 'RequestScreen') {
              iconName = MangoTabImages.requestTab;
            } else if (routeName === 'SendScreen') {
              iconName = MangoTabImages.sendTab;
            } else if (routeName === 'TransactionScreen') {
              iconName = MangoTabImages.transactionTab;
            }

            const styleFocused = { width: scale(35), height: scale(35), marginTop: scale(5) };
            const styleUnFocused = { width: scale(15), height: scale(15), marginTop: scale(5) };

            return <Image resizeMode={'contain'} style={focused ?  styleFocused : styleUnFocused }
                          source={iconName}/>
          },
          gesturesEnabled: false
        }),
        tabBarOptions: {
          activeTintColor: '#FFF',
          inactiveTintColor: '#FFF',
          activeBackgroundColor: '#0f2d6b',
          showLabel: false,
          style: {
            backgroundColor: '#FFD72F',
            height: scale(50),

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
      <View>
        <MangoTabNavigator/>
      </View>
    )
  }
}

export default MainScreen;
