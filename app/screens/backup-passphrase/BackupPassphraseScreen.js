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
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles, CommonColors, CommonSize } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import AppPreferences from '../../utils/AppPreferences';
import AppConfig from '../../utils/AppConfig';

class BackupPassphraseScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: navigation.getParam('isFromSettingScreen')? <MangoBackButton navigation={navigation} /> : <View />,
    title: I18n.t('backupPassphrase.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  })

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

  _onBtnNext = () => {
    const { navigation } = this.props;
    navigation.navigate('AddPinScreen');
  }

  _renderQrCodeSection = () => {
    const { mnemoric } = this.state;
    console.log('Mnemoric: ', mnemoric);

    return (
      <View style={styles.qrCodeSectionContainer}>
        <View style = {styles.viewMnemoric}>
          <Text style = {[styles.txtNote, {color: '#000000'}]}>
              {I18n.t("backupPassphrase.note")}
          </Text>
        </View>
        
        <View style={styles.qrCodeContainer}>
          {!mnemoric ? null : (
            <QRCode
              value={mnemoric}
              size={scale(200)}
            />
          )}
        </View>

        <View style={styles.addressContainer}>
          <Text style = {styles.txtMnemoric}>{mnemoric}</Text>
        </View>

        <View style = {styles.viewMnemoric}>
          <Text style = {styles.txtNote}>
              {I18n.t("backupPassphrase.important")}
          </Text>
        </View>
        
      </View>
    );
  }

  _renderBtnSection = () => (
    <View style={[styles.groupBtnContainer, {justifyContent: 'space-between'}]}>
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

  _renderBtnSectionSetting = () => (
    <View style={[styles.groupBtnContainer, {justifyContent: 'center'}]}>
      <MangoGradientButton
        btnText={I18n.t('backupPassphrase.btnCopy')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => this._handleCopyAddress()}
      />
    </View>
  )

  render() {
    const {isFromSettingScreen} = this.props.navigation.getParam('isFromSettingScreen', false);

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {this._renderQrCodeSection()}
            {isFromSettingScreen ? this._renderBtnSectionSetting():this._renderBtnSection()}
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
    width: '260@s',
    height: '260@s',
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

  viewMnemoric: {
    marginLeft: '20@s',
    marginRight: '20@s',
    marginBottom: '20@s',
    //height: '300@s',
  },

  addressContainer: {
    width: '260@s',
    borderRadius: '8@s',
    backgroundColor: '#E4E9F1',
    marginBottom: '24@s',
    marginTop: '10@s',
    marginRight: '20@s',
    marginLeft: '20@s',
  },

  // Section button
  groupBtnContainer: {
    flexDirection: 'row',
    marginLeft: '20@s',
    marginRight: '20@s',
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
    marginBottom: '10@s',
  },

  txtNote: {
    fontSize: CommonSize.inputFontSize,
    color: CommonColors.highlightRed,
  },

  txtMnemoric: {
    fontSize: '16@s',
    color: CommonColors.highlightBlue,
    fontWeight: 'bold',
    paddingHorizontal: '10@s',
    paddingVertical: '10@s',
  }
});
