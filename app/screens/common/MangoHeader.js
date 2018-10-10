import React from 'react';
import {
  View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';

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
        <View>
          <Image source={require('../../../assets/menu/menu.png')} style={styles.imgMenu} />
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
        title: 'Settings',
        routerName: 'SettingScreen',
      },
      {
        source: require('../../../assets/sing-out/logout.png'),
        title: 'Sign out',
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
          {menus.map((menu, index) => this._renderItemMenu(menu, index))}
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
  imgMenu: {
    width: '20@s',
    height: '20@s',
    marginLeft: '10@s',
  },
  menuGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20@s',
    paddingRight: '20@s',
    height: '100@s',
    width: '140@s',
    position: 'absolute',
    top: '20@s',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@s',
  },
  imgGroup: {
    flexDirection: 'column',
    flex: 1,
  },
  contentMenuOption: {
    color: '#000000',
    fontSize: '15@s',
    marginLeft: '15@s',
  },
  imgMenuOption: {
    width: '20@s',
    height: '20@s',
  },
  itemMenuGroup: {
    flexDirection: 'row',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
