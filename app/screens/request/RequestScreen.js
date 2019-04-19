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
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { withNetworkConnectivity } from 'react-native-offline';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors, Fonts } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import MangoConnectionLost from '../common/MangoConnectionLost';

class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: null,
    };
  }

  async componentDidMount() {
    const walletAddress = await AsyncStorage.getItem('address');
    this.setState({
      walletAddress,
    });
  }

  _onSharePress = () => {
    const { walletAddress } = this.state;
    const options = {
      message: walletAddress,
    };

    Share.open(options)
      .then(() => {})
      .catch(() => {});
  }

  _handleCopyAddress = () => {
    const { walletAddress } = this.state;

    Clipboard.setString(walletAddress);
    UIUtils.showToastMessage(I18n.t('request.copied'), 'success');
  }

  _renderQrCodeSection = () => {
    const { walletAddress } = this.state;

    return (
      <View style={styles.qrCodeSectionContainer}>
        <View style={styles.qrCodeContainer}>
          {!walletAddress ? null : (
            <QRCode
              value={walletAddress}
              size={scale(230)}
            />
          ) }
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{walletAddress}</Text>
        </View>

        {/* <View style={styles.textNoticeContainer}>
          <Text style={styles.textNotice}>{I18n.t('request.notice')}</Text>
        </View> */}
      </View>
    );
  }

  _renderBtnSection = () => (
    <View style={styles.groupBtnContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnUpContainer}
        onPress={() => this._onSharePress()}
      >
        <Image
          source={require('../../../assets/share/share.png')}
          style={styles.btnShareImage}
        />
      </TouchableOpacity>
      <MangoGradientButton
        btnText={I18n.t('request.copyAddress')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => this._handleCopyAddress()}
      />
    </View>
  )

  render() {
    const { isConnected } = this.props;
    if (!isConnected) {
      return <MangoConnectionLost />;
    }
    return (
      <View style={styles.container}>
        <MangoDropdown />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {this._renderQrCodeSection()}
            {this._renderBtnSection()}
            {UIUtils.createBottomPadding()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNetworkConnectivity()(RequestScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },

  contentContainer: {
    padding: '10@s',
    alignItems: 'center',
  },

  // Section qrCode
  qrCodeSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrCodeContainer: {
    width: '300@s',
    height: '300@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
  },

  qrCodeImage: {
    width: '290@s',
    height: '290@s',
  },

  addressContainer: {
    width: '260@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
    paddingHorizontal: '16@s',
    paddingVertical: '12@s',
    backgroundColor: '#E4E9F1',
    marginBottom: '20@s',
  },

  addressText: {
    textAlign: 'center',
    color: '#2f64d1',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },

  textNoticeContainer: {
    width: '320@s',
    marginBottom: '15@s',
  },

  textNotice: {
    textAlign: 'center',
    color: 'red',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  groupBtnContainer: {
    flexDirection: 'row',
    width: '320@s',
    paddingTop: '3@s',
    justifyContent: 'space-between',
  },

  btnUpContainer: {
    width: '66@s',
    height: '48@s',
    borderRadius: '28@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
  },

  btnShareImage: {
    width: '38@s',
    height: '38@s',
  },

  btnCopyAddress: {
    width: '220@s',
    marginBottom: '10@s',
    marginRight: '4@s',
  },
});
