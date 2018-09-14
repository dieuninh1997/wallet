import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import ScaledSheet from "../../libs/reactSizeMatter/ScaledSheet";
import Modal from "react-native-modal";

class MangoHeader extends React.PureComponent {
  state = {
    isShowMenu: false
  };

  _toggleMenu() {
    const { isShowMenu } = this.state;

    this.setState({ isShowMenu: !isShowMenu });
  }

  _hideMenu() {
    this.setState({ isShowMenu: false });
  }

  _renderIconToggleMenu() {
    return (
      <TouchableWithoutFeedback onPress={() => this._toggleMenu()}>
        <View>
          <Image source={require('../../../assets/menu/menu.png')} style={styles.imgMenu}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderItemMenu(item) {
    return (
      <View style={styles.itemMenuGroup} key={item.source}>
        <Image source={item.source} style={styles.imgMenuOption}/>
        <Text style={styles.contentMenuOption}>{item.title}</Text>
      </View>
    )
  }

  _renderMenuOptions() {
    const { isShowMenu } = this.state;
    const menus = [
      {
        source: require('../../../assets/setting/settings.png'),
        title: 'Settings'
      },
      {
        source: require('../../../assets/question/question.png'),
        title: 'Support'
      },
      {
        source: require('../../../assets/sing-out/logout.png'),
        title: 'Sign out'
      }
    ];

    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isShowMenu}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='transparent'
        onBackButtonPress={() => this._hideMenu()}
        onBackdropPress={() => this._hideMenu()}
        style={styles.modalListCoin}
      >
        <View style={styles.menuGroup}>
          {menus.map(menu => this._renderItemMenu(menu))}
        </View>
      </Modal>
    )
  }

  render() {
    const { isShowMenu } = this.state;

    return (
      <View style={styles.mangoHeader}>
        {this._renderIconToggleMenu()}
        {isShowMenu ? this._renderMenuOptions() : null}
      </View>
    )
  }
}

export default MangoHeader;

const styles = ScaledSheet.create({
  mangoHeader: {},
  imgMenu: {
    width: '20@s',
    height: '20@s',
    marginLeft: '10@s'
  },
  menuGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20@s',
    paddingRight: '20@s',
    height: '140@s',
    width: '140@s',
    position: 'absolute',
    top: '20@s',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@s'
  },
  imgGroup: {
    flexDirection: 'column',
    flex: 1
  },
  contentMenuOption: {
    color: '#000000',
    fontSize: '15@s',
    marginLeft: '15@s'
  },
  imgMenuOption: {
    width: '20@s',
    height: '20@s',
  },
  itemMenuGroup: {
    flexDirection: 'row',
    flex: 1
  }
});