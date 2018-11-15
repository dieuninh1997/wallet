import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import { createGoogleOtpSecret } from '../../../api/user/UserRequest';
import UIUtils from '../../../utils/UIUtils';
import Consts from '../../../utils/Consts';

export default class DownloadAndInstallScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.downloadAndInstallTitle'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  _handleNext = (googleOtpKey) => {
    const { navigation } = this.props;

    navigation.navigate('BackupKeyScreen', googleOtpKey);
  }

  _handleCreateOtp = async () => {
    try {
      const responseOtp = await createGoogleOtpSecret();
      this._handleNext(responseOtp.data.key);
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        UIUtils.showToastMessage(error.message, 'error');
      }
    }
  }

  render() {
    const googleAuthLink = Consts.GOOGLE_AUTHEN_LINK;
    return (
      <View style={styles.downloadAndInstall}>
        <View style={styles.imageBlock}>
          <Image
            source={require('../../../../assets/setting/graphicGauthLogo.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.textGuide}>
            {I18n.t('setting2fa.downloadAndInstall')}
            <Text style={styles.textLink} onPress={() => Linking.openURL(googleAuthLink)}>
              {' '}
              {I18n.t('setting2fa.googleAuthenticator')}
              {' '}
            </Text>
            {I18n.t('setting2fa.onYourPhone')}
          </Text>
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('backupPassphrase.btnNext')}
            btnStyle={styles.btnNext}
            onPress={() => this._handleCreateOtp()}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  downloadAndInstall: {
    paddingTop: '44@s',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  imageBlock: {
    height: '140@s',
    marginBottom: '24@s',
  },
  image: {
    width: '140@s',
    height: '140@s',
  },
  textBlock: {
    alignItems: 'center',
  },
  textGuide: {
    width: '295@s',
    textAlign: 'center',
    lineHeight: '20.8@ms',
    color: 'rgb(28, 28, 28)',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  textLink: {
    color: 'rgb(30, 104, 255)',
  },
  btnBlock: {
    marginTop: '40@s',
  },
  btnNext: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  },
});
