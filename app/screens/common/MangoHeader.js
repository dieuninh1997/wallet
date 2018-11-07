import React from 'react';
import {
  View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import { Fonts } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';

class MangoHeader extends React.Component {
  state = {
    isShowMenu: false,
  };

  _toggleMenu() {
    const { isShowMenu } = this.state;

    this.setState({ isShowMenu: !isShowMenu });
  }

  _hideMenu() {
    this.setState({ isShowMenu: false });
  }

  async _navigateSetting(routerName) {
    const { navigation } = this.props;

    this.setState({ isShowMenu: false });

    if (routerName === 'LandingScreen') {
      await AppPreferences.removeAccessToken();
      window.GlobalSocket.disconnect();
      RNRestart.Restart();
    } else {
      navigation.navigate(routerName);
    }
  }

  _renderIconToggleMenu() {
    return (
      <TouchableWithoutFeedback onPress={() => this._toggleMenu()}>
        <View style={styles.viewMenu}>
          <Image source={require('../../../assets/menu/hamburger.png')} style={styles.imgMenu} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderItemMenu(item, index) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._navigateSetting(item.routerName)}
        key={index}
      >
        <View style={styles.itemMenuGroup} key={item.source}>
          <Image source={item.source} style={styles.imgMenuOption} />
          <Text style={styles.contentMenuOption}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderMenuOptions() {
    const { isShowMenu } = this.state;
    const menus = [
      {
        source: require('../../../assets/setting/settings.png'),
        title: I18n.t('mangoHeader.settings'),
        routerName: 'SettingScreen',
      },
      {
        source: require('../../../assets/sing-out/logout.png'),
        title: I18n.t('mangoHeader.signout'),
        routerName: 'LandingScreen',
      },
    ];

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isShowMenu}
        avoidKeyboard
        useNativeDriver
        onBackButtonPress={() => this._hideMenu()}
        onBackdropPress={() => this._hideMenu()}
        style={styles.modalListCoin}
      >
        <View style={styles.menuGroup}>
          <View style={styles.menuGroupItem}>
            {menus.map((menu, index) => this._renderItemMenu(menu, index))}
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { isShowMenu } = this.state;

    return (
      <View>
        {this._renderIconToggleMenu()}
        {isShowMenu ? this._renderMenuOptions() : null}
      </View>
    );
  }
}

export default MangoHeader;

const styles = ScaledSheet.create({
  viewMenu: {
    width: '80@s',
    height: '100%',
    justifyContent: 'center',
  },
  imgMenu: {
    width: '28@s',
    height: '28@s',
    marginLeft: '16@s',
  },
  menuGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10@s',
    paddingBottom: '10@s',
    //paddingRight: '26@s',
    height: '110@s',
    width: '170@s',
    position: 'absolute',
    top: '20@s',
    backgroundColor: '#FFFFFF',
    borderRadius: '8@s',
  },
  contentMenuOption: {
    color: '#000000',
    fontSize: '18@ms',
    marginLeft: '8@s',
    ...Fonts.Ubuntu_Light,
  },
  imgMenuOption: {
    width: '34@s',
    height: '34@s',
  },
  menuGroupItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemMenuGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
