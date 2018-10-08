import React, {Component} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import MangoTabImages from './MangoTabImages';

export default class MangoTabBar extends Component {

  TABS = ['DashboardScreen', 'RequestScreen', 'SendScreen', 'TransactionScreen'];

  state = {
    activeTab: 0
  }

  _onTabPress(index) {
    const { navigation } = this.props;

    this.setState({activeTab: index});
    navigation.navigate(this.TABS[index]);
  }

  render() {
    const { activeTab } = this.state;
    return (
      <View style={styles.tabbar}>
        <Image
            style={styles.background}
            source={MangoTabImages.background}/>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => this._onTabPress(0)}>
            <Image
              style={[styles.tab, activeTab == 0 ? styles.tabActive : {}]}
              resizeMode='center'
              source={activeTab == 0 ? MangoTabImages.dashboardTabFocused : MangoTabImages.dashboardTab}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onTabPress(1)}>
            <Image
              style={[styles.tab, activeTab == 1 ? styles.tabActive : {}]}
              resizeMode='center'
              source={activeTab == 1 ? MangoTabImages.requestTabFocused : MangoTabImages.requestTab}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onTabPress(2)}>
            <Image
              style={[styles.tab, activeTab == 2 ? styles.tabActive : {}]}
              resizeMode='center'
              source={activeTab == 2 ? MangoTabImages.sendTabFocused : MangoTabImages.sendTab}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onTabPress(3)}>
            <Image
              style={[styles.tab, activeTab == 3 ? styles.tabActive : {}]}
              resizeMode='center'
              source={activeTab == 3 ? MangoTabImages.transactionTabFocused : MangoTabImages.transactionTab}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  tabbar: {
    width: '100%',
    height: '99@s',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -UIUtils.getIphoneXBottomInsetHeight() + UIUtils.getBottomInsetHeight(),
    backgroundColor: '#0000'
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000'
  },
  tabs: {
    width: '100%',
    height: '100%',
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
    marginRight: -scale(4)
  },
  tabActive: {
    marginTop: '5@s'
  }
});
