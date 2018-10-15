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
              style={[styles.tab, activeTab === 0 ? styles.tabActive : {}]}
              resizeMode="center"
              source={activeTab === 0 ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(1)}
          >
            <Image
              style={[styles.tab, activeTab === 1 ? styles.tabActive : {}]}
              resizeMode="center"
              source={activeTab === 1 ? MangoTabImages.requestTabFocused : MangoTabImages.requestTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(2)}
          >
            <Image
              style={[styles.tab, activeTab === 2 ? styles.tabActive : {}]}
              resizeMode="center"
              source={activeTab === 2 ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => this._onTabPress(3)}
          >
            <Image
              style={[styles.tab, activeTab === 3 ? styles.tabActive : {}]}
              resizeMode="center"
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
    flex: 1,
    width: '100%',
    marginTop: '20@s',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: UIUtils.getIphoneXBottomInsetHeight(),
    left: 0,
  },
  tab: {
    width: '86@s',
    height: '86@s',
    marginLeft: -scale(4),
    marginRight: -scale(4),
  },
  tabActive: {
    marginTop: '5@s',
  },
});
