import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Clipboard,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Toast from 'react-native-root-toast';
import QRCode from 'react-native-qrcode-svg';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';

class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: null,
    };
  }

  async componentDidMount() {
    const walletAddress = await this._getWalletAddress();
    console.log('walletAddress', walletAddress);

    this.setState({
      walletAddress,
    });
  }

  _getWalletAddress = async () => {
    const walletAddress = await AsyncStorage.getItem('walletAddress');
    return walletAddress;
  }

  _handleCopyAddress = (address) => {
    Clipboard.setString(address);
    Toast.show('Copied', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  _renderQrCodeSection = () => {
    const { walletAddress } = this.state;
    console.log('type', typeof walletAddress);

    return (
      <View style={styles.qrCodeSectionContainer}>
        <View style={styles.qrCodeContainer}>
          {/* <Image
            source={require('../../../assets/qrcode/qr-code.png')}
            style={styles.qrCodeImage}
          /> */}
          {!walletAddress ? null : (
            <QRCode
              value={walletAddress}
              size={scale(260)}
            />
          ) }
        </View>
        <View style={styles.addressContainer}>
          <Text>{walletAddress}</Text>
        </View>
      </View>
    );
  }

  _renderBtnSection = () => (
    <View style={styles.groupBtnContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnUpContainer}
      >
        <Image
          source={require('../../../assets/up/up-arrow.png')}
          style={styles.btnUpImage}
        />
      </TouchableOpacity>
      <MangoGradientButton
        btnText={I18n.t('request.copyAddress')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => this._handleCopyAddress('0xb162e0cd09724b0296894eef352c16815cd610fb')}
      />
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <MangoDropdown />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {this._renderQrCodeSection()}
            {this._renderBtnSection()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default RequestScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  contentContainer: {
    padding: '10@s',
  },

  // Section qrCode
  qrCodeSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrCodeContainer: {
    width: '320@s',
    height: '320@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 4,
  },

  qrCodeImage: {
    width: '260@s',
    height: '260@s',
  },

  addressContainer: {
    width: '280@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
    paddingHorizontal: '16@s',
    paddingVertical: '14@s',
    backgroundColor: '#E4E9F1',
    marginBottom: '24@s',
  },

  // Section button
  groupBtnContainer: {
    flexDirection: 'row',
    width: '320@s',
    justifyContent: 'space-between',
  },

  btnUpContainer: {
    width: '70@s',
    height: '50@s',
    borderRadius: '25@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 4,
  },

  btnUpImage: {
    width: '24@s',
    height: '24@s',
  },

  btnCopyAddress: {
    width: '220@s',
    marginBottom: '4@s',
    marginRight: '4@s',
  },
});
