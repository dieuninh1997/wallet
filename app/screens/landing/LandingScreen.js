import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  SafeAreaView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoButton from '../common/MangoButton';
import { CommonColors, Fonts } from '../../utils/CommonStyles';
import BaseScreen from '../BaseScreen';

class LandingScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  static LIST_LANGUAGE = [
    { key: 'en', name: 'English', show: 'Eng' },
    { key: 'il', name: 'Ilocano', show: 'Il' },
    { key: 'jp', name: 'Japanese', show: 'Jp' },
    { key: 'ta', name: 'Tagalog', show: 'Ta' },
    { key: 'vi', name: 'Vietnamese', show: 'Vi' },
    { key: 'vis', name: 'Visayan', show: 'Vis' },
  ];

  constructor(props) {
    super(props);

    const listLanguage = LandingScreen.LIST_LANGUAGE;
    const languageSelected = listLanguage[0];

    this.state = {
      languageSelected,
      listLanguage,
      isShowListLanguage: false,
    };
  }

  isRootScreen() {
    return true;
  }

  componentWillMount = async () => {
    await this._getLanguage();
  }

  _getLanguage = async () => {
    const { listLanguage } = this.state;

    const value = await AsyncStorage.getItem('user_locale');
    let languageSelect = 0;
    switch (value) {
    case 'vis':
      languageSelect = 5;
      break;
    case 'vi':
      languageSelect = 4;
      break;
    case 'ta':
      languageSelect = 3;
      break;
    case 'jp':
      languageSelect = 2;
      break;
    case 'il':
      languageSelect = 1;
      break;
    default:
      languageSelect = 0;
      break;
    }
    this.setState({
      languageSelected: listLanguage[languageSelect],
    });
  }

  _handleShowListLanguage = () => {
    this.setState({
      isShowListLanguage: true,
    });
  }

  _hideListLanguage = () => {
    this.setState({
      isShowListLanguage: false,
    });
  }

  _changeLanguageLayout = async (locale) => {
    I18n.locale = locale;
    await AsyncStorage.setItem('user_locale', locale);
    // RNRestart.Restart();
  }

  _handleSelectLanguage = async (item) => {
    this.setState({
      languageSelected: item,
      isShowListLanguage: false,
    });
    await this._changeLanguageLayout(item.key);
  }

  _navigateScreen = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  _renderListLanguageItem = (item, index) => (
    <TouchableWithoutFeedback
      onPress={() => this._handleSelectLanguage(item)}
      key={index}
    >
      <View style={styles.selectLanguageContainer}>
        <Text style={styles.textLanguageItem}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  _renderListSelectLanguage = () => {
    const { listLanguage, isShowListLanguage } = this.state;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isShowListLanguage}
        avoidKeyboard
        useNativeDriver
        onBackButtonPress={() => this._hideListLanguage()}
        onBackdropPress={() => this._hideListLanguage()}
        backdropOpacity={0}
      >
        <ImageBackground source={require('../../../assets/modal-bg-high/modalBgHigh.png')} style={styles.imageBackgroundModal} resizeMode="stretch">
          {listLanguage.map((item, index) => this._renderListLanguageItem(item, index))}
        </ImageBackground>

      </Modal>
    );
  }

  _renderSelectLanguage = () => {
    const { languageSelected } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleShowListLanguage()}
      >
        <View style={styles.showLanguageContainer}>
          <View style={styles.showLanguageContent}>
            <Image
              source={require('../../../assets/language/language-blue.png')}
              style={styles.imageSelectLanguage}
            />
            <Text style={styles.textLanguage}>{languageSelected.show}</Text>
            <Image
              source={require('../../../assets/arrow-down/down-arrow-blue.png')}
              style={styles.imageSelectLanguage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderLogoGroup = () => (
    <View style={styles.logoGroupContainer}>
      <Image source={require('../../../assets/logo/logoMangocoinNotxt.png')} style={styles.logoImage} />
      <Text style={styles.logoContent}>{I18n.t('landing.coinName')}</Text>
      <Text style={styles.logoDescription}>{I18n.t('landing.coinDescription')}</Text>
    </View>
  )

  _renderButtonGroup = () => (
    <View style={styles.btnGroupContainer}>
      <MangoButton
        title={I18n.t('landing.createWallet')}
        btnStyle={styles.btnCreateWalletContainer}
        btnTextStyle={styles.btnTextCreateWalletStyle}
        onPressBtn={() => this._navigateScreen('CreateWalletScreen')}
      />
      <MangoButton
        title={I18n.t('landing.signin')}
        btnStyle={styles.btnAuthContainer}
        btnTextStyle={styles.btnTextAuthStyle}
        onPressBtn={() => this._navigateScreen('LoginListScreen')}
      />
      <MangoButton
        title={I18n.t('landing.restoreAccount')}
        btnStyle={styles.btnAuthContainer}
        btnTextStyle={styles.btnTextAuthStyle}
        onPressBtn={() => this._navigateScreen('RestoreWalletScreen')}
      />
    </View>
  )

  render() {
    const { isShowListLanguage } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          { this._renderSelectLanguage() }
          {isShowListLanguage ? this._renderListSelectLanguage() : null}
          { this._renderLogoGroup() }
        </View>
        <ImageBackground
          source={require('../../../assets/background/bg1.png')}
          style={{ flex: 1, height: undefined, width: '100%' }}
          resizeMode="stretch"
        >
          { this._renderButtonGroup() }
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default LandingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },

  showLanguageContainer: {
    marginTop: '10@s',
  },

  showLanguageContent: {
    flexDirection: 'row',
    width: '114@s',
    height: '36@s',
    borderRadius: '18@s',
    borderWidth: '1@s',
    borderColor: '#b8c3e6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBackgroundModal: {
    position: 'absolute',
    top: '28@s',
    left: '60@s',
    width: '220@s',
    height: '330@s',
    paddingTop: '8@s',
  },

  selectLanguageContainer: {
    paddingTop: '12@s',
    alignItems: 'center',
  },

  textLanguageItem: {
    color: '#2f64d1',
    fontSize: '20@ms',
    marginHorizontal: '8@s',
    marginVertical: '2@s',
    ...Fonts.Ubuntu_Light,
  },

  textLanguage: {
    color: '#006AEB',
    fontSize: '18@ms',
    marginHorizontal: '8@s',
    ...Fonts.Ubuntu_Regular,
  },

  imageSelectLanguage: {
    width: '18@s',
    height: '18@s',
  },

  logoGroupContainer: {
    alignItems: 'center',
    marginTop: '40@s',
  },

  logoImage: {
    width: '140@s',
    height: '140@s',
  },

  logoContent: {
    color: '#2f64d1',
    fontWeight: 'bold',
    fontSize: '32@ms',
  },

  logoDescription: {
    color: '#BAC5E6',
  },

  btnGroupContainer: {
    alignItems: 'center',
    paddingTop: '80@s',
  },

  btnCreateWalletContainer: {
    width: '290@s',
    height: '56@s',
    borderRadius: '28@s',
    backgroundColor: CommonColors.headerBarBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2@s',
    elevation: 4,
  },

  btnTextCreateWalletStyle: {
    color: '#1F42B3',
    fontSize: '19@ms',
    ...Fonts.Ubuntu_Regular,
  },

  btnAuthContainer: {
    width: '210@s',
    height: '36@s',
    borderRadius: '20@s',
    backgroundColor: '#DBA92F',
    borderColor: CommonColors.headerTitleColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@s',
  },

  btnTextAuthStyle: {
    fontSize: '16@ms',
    color: CommonColors.headerBarBgColor,
  },

  modalListLanguage: {
    position: 'absolute',
    justifyContent: 'center',
    top: '28@s',
    left: '105@s',
    width: '128@s',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    top: 0,
  },
});
