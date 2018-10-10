import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors, CommonStyles } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import AppPreferences from '../../utils/AppPreferences';
import AppConfig from '../../utils/AppConfig';

class BackupPassphraseScreen extends Component {
  static navigationOptions = () => ({
    headerLeft: <View />,
    title: I18n.t('backupPassphraseScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      mnemoric: AppConfig.MNEMORIC ? AppConfig.MNEMORIC : null,
    };
  }

  _handleCopyAddress = () => {
    const { mnemoric } = this.state;

    Clipboard.setString(mnemoric);
    AppPreferences.showToastMessage(I18n.t('request.copied'));
  }

  _navigateScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('AddPinScreen');
  }

  _renderQrCodeSection = () => {
    const { mnemoric } = this.state;

    return (
      <View style={styles.qrCodeSectionContainer}>
        <View style={styles.qrCodeContainer}>
          {!mnemoric ? null : (
            <QRCode
              value={mnemoric}
              size={scale(260)}
            />
          )}
        </View>
        <View style={styles.addressContainer}>
          <Text>{mnemoric}</Text>
        </View>
      </View>
    );
  }

  _renderBtnSection = () => (
    <View style={styles.groupBtnContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnUpContainer}
        onPress={() => this._navigateScreen()}
      >
        <Image
          source={require('../../../assets/go-right/go-right.png')}
          style={styles.btnUpImage}
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
    return (
      <View style={styles.container}>
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
export default BackupPassphraseScreen;

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
    marginBottom: '10@s',
    marginRight: '4@s',
  },
});
