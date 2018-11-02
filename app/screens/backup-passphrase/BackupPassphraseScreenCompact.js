import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Clipboard,
  BackHandler,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles, CommonColors, Fonts } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import AppConfig from '../../utils/AppConfig';


class BackupPassphraseScreenCompact extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <View />,
    title: I18n.t('backupPassphrase.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  })

  _didFocusSubcription;

  _willBlurSubcription;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: AppConfig.MNEMONIC ? AppConfig.MNEMONIC : null,
    };
  }

  componentWillMount() {
    this._didFocusSubcription = this.props.navigation.addListener('didFocus', payload => BackHandler.addEventListener('hardwareBackPress', this._onBackAndroidPress));
  }

  componentDidMount() {
    this._willBlurSubcription = this.props.navigation.addListener('willBlur', payload => BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroidPress));
  }

  componentWillUnmount() {
    this._didFocusSubcription && this._didFocusSubcription.remove();
    this._willBlurSubcription && this._willBlurSubcription.remove();
  }

  _onBackAndroidPress = () => true


  _handleCopyAddress = () => {
    const { mnemonic } = this.state;

    Clipboard.setString(mnemonic);
    UIUtils.showToastMessage(I18n.t('backupPassphrase.copied'), 'success');
  }

  _onBtnNext = () => {
    const { navigation } = this.props;

    navigation.navigate('AddPinScreen');
  }

  _renderQrCodeSection = () => {
    const { mnemonic } = this.state;

    return (
      <View style={styles.qrCodeSectionContainer}>
        <View style={styles.viewMnemonic}>
          <Text style={[styles.txtNote, { color: '#000000' }]}>
            {I18n.t('backupPassphrase.note')}
          </Text>
        </View>

        <View style={styles.qrCodeSectionContainer}>
          <View style={styles.qrCodeContainer}>
            {!mnemonic ? null : (
              <QRCode
                value={mnemonic}
                size={scale(230)}
              />
            ) }
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{mnemonic}</Text>
          </View>
        </View>

        <View style={styles.viewMnemonic}>
          <Text style={styles.txtNote}>
            {I18n.t('backupPassphrase.important')}
          </Text>
        </View>

      </View>
    );
  }

  _renderBtnSection = () => (
    <View style={styles.groupBtnContainer}>
      <MangoGradientButton
        btnText={I18n.t('backupPassphrase.btnCopy')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => this._handleCopyAddress()}
      />

      <MangoGradientButton
        btnText={I18n.t('backupPassphrase.btnNext')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => this._onBtnNext()}
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
export default BackupPassphraseScreenCompact;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.screenBgColor,
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
    width: '290@s',
    height: '290@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
  },

  addressContainer: {
    width: '250@s',
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
    fontSize: '15@ms',
    ...Fonts.Ubuntu_Light,
  },

  viewMnemonic: {
    marginLeft: '20@s',
    marginRight: '20@s',
    marginBottom: '10@s',
  },

  // Section button
  groupBtnContainer: {
    flexDirection: 'row',
    marginTop: '20@s',
    marginLeft: '20@s',
    marginRight: '20@s',
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
    width: '140@s',
    marginBottom: '15@s',
    marginHorizontal: '5@s',
  },

  txtNote: {
    textAlign: 'center',
    fontSize: '14@ms',
    color: CommonColors.highlightRed,
    ...Fonts.Ubuntu_Light,
  },
});
