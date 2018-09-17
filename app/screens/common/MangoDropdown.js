import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonColors } from '../../utils/CommonStyles';


class MangoDropdown extends Component {
  constructor(props) {
    super(props);
    const listCoin = [
      {
        image: require('../../../assets/bitcoin/bitcoin.png'),
        name: 'Mango Coin',
      },
      {
        image: require('../../../assets/bitcoin/bitcoin.png'),
        name: 'Bitcoin',
      },
      {
        image: require('../../../assets/eth/ethereum.png'),
        name: 'Ethereum',
      },
    ];
    this.state = {
      coinSelected: listCoin[0],
      listCoin,
      isShowListCoin: false,
    };
  }

  _onShowListCoin = () => {
    const { isShowListCoin } = this.state;
    this.setState({
      isShowListCoin: !isShowListCoin,
    });
  }

  _hideModalListCoin = () => {
    this.setState({
      isShowListCoin: false,
    });
  }

  _selectCoin = (coinSelected) => {
    this.setState({
      isShowListCoin: false,
      coinSelected,
    });
  }

  _renderListCoin() {
    const { listCoin, isShowListCoin, coinSelected } = this.state;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isShowListCoin}
        avoidKeyboard
        useNativeDriver
        onBackButtonPress={() => this._hideModalListCoin()}
        onBackdropPress={() => this._hideModalListCoin()}

      >
        <View style={styles.modalListCoin}>
          {listCoin.map((item, index) => this._renderItemCoin(item, index, coinSelected))}
        </View>
      </Modal>
    );
  }

  _renderItemCoin(item, index, coinSelected) {
    return (
      <TouchableOpacity
        onPress={() => this._selectCoin(item)}
        key={index}
      >
        <View style={[styles.listSelectItemCoin, item.name === coinSelected.name ? styles.activeCoin : null]}>
          <Image
            source={item.image}
            style={styles.imageSelectItemCoin}
          />
          <Text style={styles.textSelectItemCoin}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCoinSelected() {
    const { coinSelected } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => this._onShowListCoin()}
      >
        <View
          style={styles.itemCoin}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#3875D7', '#2043B4']}
            style={styles.selectCoinContent}
          >
            <Image
              source={coinSelected.image}
              style={styles.imageCoin}
            />
            <Text style={styles.textCoin}>{coinSelected.name}</Text>
            <MaterialCommunityIcons
              style={styles.selectCoinIcon}
              name="chevron-down"
            />
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { isShowListCoin } = this.state;

    return (
      <View style={styles.selectCoinContainer}>
        {this._renderCoinSelected()}
        {isShowListCoin ? this._renderListCoin() : null}
      </View>
    );
  }
}
export default MangoDropdown;

const styles = ScaledSheet.create({

  // Section select coin
  selectCoinContainer: {
    backgroundColor: CommonColors.headerBarBgColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: '10@s',
    borderBottomWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  selectCoinContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#336ACF',
  },

  textCoin: {
    color: CommonColors.headerBarBgColor,
    fontSize: '18@s',
    marginHorizontal: '15@s',
  },

  coinIcon: {
    color: CommonColors.headerBarBgColor,
    fontSize: '30@s',
  },

  selectCoinIcon: {
    color: CommonColors.headerBarBgColor,
    fontSize: '18@s',
  },

  selectFeeIcon: {
    color: CommonColors.customBorderColor,
    fontSize: '24@s',
  },

  itemCoin: {
    flexDirection: 'row',
  },

  listSelectItemCoin: {
    flexDirection: 'row',
    paddingVertical: '5@s',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    borderRadius: '8@s',
  },
  activeCoin: {
    backgroundColor: '#dee3e9',
  },

  imageCoin: {
    width: '30@s',
    height: '30@s',
  },

  imageSelectItemCoin: {
    width: '30@s',
    height: '30@s',
    marginRight: '8@s',
  },

  textSelectItemCoin: {
    fontSize: '18@s',
  },

  modalListCoin: {
    position: 'absolute',
    justifyContent: 'center',
    top: '66@s',
    left: '60@s',
    width: '220@s',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
  },
});
