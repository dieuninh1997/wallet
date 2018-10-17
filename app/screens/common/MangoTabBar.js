import React, { Component } from 'react';
import {
  Dimensions, Image, TouchableOpacity, View,
} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import { CommonSize } from '../../utils/CommonStyles';
import MangoTabImages from './MangoTabImages';

export default class MangoTabBar extends Component {
  TABS = ['DashboardScreen', 'RequestScreen', 'SendScreen', 'TransactionScreen'];

  static TABS_RE = ['DashboardScreen', 'RequestScreen', 'SendScreen', 'TransactionScreen']

  state = {
    activeTab: 0,
  }

  _onTabPress(index) {
    this.setState({ activeTab: index });

    const { jumpTo, navigation } = this.props;
    const currentIndex = navigation.state.index;

    if (currentIndex === index) {
      const childRoute = navigation.state.routes[index];
      if (childRoute.hasOwnProperty('index') && childRoute.index > 0) {
        navigation.dispatch(
          StackActions.popToTop({ key: childRoute.key }),
        );
      } else {
        // TODO: do something to scroll to top
      }
    } else {
      jumpTo(MangoTabBar.TABS_RE[index]);
    }
  }

  render() {
    const { activeTab } = this.state;
    return (
      <View style={styles.tabbar}>
        <Image
          style={styles.background}
          source={MangoTabImages.background}
        />
        <View style={styles.tabs}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(0)}
          >
            <Image
              style={activeTab === 0 ? styles.tabActive : styles.tab}
              resizeMode="stretch"
              source={activeTab === 0 ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(1)}
          >
            <Image
              style={activeTab === 1 ? styles.centerTabActive : styles.centerTab}
              resizeMode="stretch"
              source={activeTab === 1 ? MangoTabImages.requestTabFocused : MangoTabImages.requestTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(2)}
          >
            <Image
              style={activeTab === 2 ? styles.centerTabActive : styles.centerTab}
              resizeMode="stretch"
              source={activeTab === 2 ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(3)}
          >
            <Image
              style={activeTab === 3 ? styles.tabActive : styles.tab}
              resizeMode="stretch"
              source={activeTab === 3 ? MangoTabImages.transactionTabFocused : MangoTabImages.transactionTab}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const tabbarHeight = scale(119);
const tabbarTop = height - tabbarHeight - CommonSize.headerHeight - UIUtils.getStatusBarHeight()
                  + UIUtils.getIphoneXBottomInsetHeight() - UIUtils.getBottomInsetHeight();

const tabStyle = {
  width: scale(48),
  height: scale(48),
  marginLeft: scale(15),
  marginRight: scale(15),
}

const activeTabStyle = {
  width: scale(86),
  height: scale(86),
  marginLeft: -scale(4),
  marginRight: -scale(4),
}

const styles = ScaledSheet.create({
  tabbar: {
    width: '100%',
    height: tabbarHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    top: tabbarTop,
    backgroundColor: '#0000',
  },
  background: {
    flex: 1,
    width: '100%',
    marginTop: '20@s',
    backgroundColor: '#0000',
  },
  tabs: {
    width: '100%',
    height: '100@s',
    marginTop: '20@s',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: UIUtils.getIphoneXBottomInsetHeight(),
    left: 0,
  },
  tab: {
    ...tabStyle,
    marginTop: '2@s'
  },
  tabActive: {
    ...activeTabStyle,
    marginTop: '18@s'
  },
  centerTab: {
    ...tabStyle,
    marginBottom: '2@s'
  },
  centerTabActive: {
    ...activeTabStyle,
    marginTop: '10@s'
  }
});
