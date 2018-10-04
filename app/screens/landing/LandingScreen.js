import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoButton from '../common/MangoButton';
import { CommonColors } from '../../utils/CommonStyles';

class LandingScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  static LIST_LANGUAGE = ['en', 'vi', 'jp'];

  constructor(props) {
    super(props);
    const listLanguage = LandingScreen.LIST_LANGUAGE;
    const languageSelected = 'en';

    this.state = {
      languageSelected,
      listLanguage,
      isShowListLanguage: false,
    };
  }

  async componentWillMount() {
    this._getLanguage();
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

  _changeLanguageLayout = (locale) => {
    I18n.locale = locale;
    AsyncStorage.setItem('user_locale', locale);
    RNRestart.Restart();
  }

  _handleSelectLanguage = (item) => {
    this.setState({
      languageSelected: item,
      isShowListLanguage: false,
    });
    this._changeLanguageLayout(item);
  }

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

      >
        <View style={styles.modalListLanguage}>
          {listLanguage.map((item, index) => this._renderListLanguageItem(item, index))}
        </View>
      </Modal>
    );
  }


  _renderListLanguageItem = (item, index) => (
    <TouchableWithoutFeedback
      onPress={() => this._handleSelectLanguage(item)}
      key={index}
    >
      <View style={styles.selectLanguageContainer}>
        <View style={styles.selectLanguageContent}>
          <Image
            source={require('../../../assets/language/language-blue.png')}
            style={styles.imageSelectLanguage}
          />
          <Text style={styles.textLanguage}>{item}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  _navigateScreen = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  _renderSelectLanguage = () => {
    const { languageSelected } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleShowListLanguage()}
      >
        <View style={styles.selectLanguageContainer}>
          <View style={styles.selectLanguageContent}>
            <Image
              source={require('../../../assets/language/language-blue.png')}
              style={styles.imageSelectLanguage}
            />
            <Text style={styles.textLanguage}>{languageSelected}</Text>
            <Image
              source={require('../../../assets/arrow-down/down-arrow-blue.png')}
              style={styles.imageSelectLanguage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  async _getLanguage() {
    let value = await AsyncStorage.getItem('user_locale');
    switch (value) {
    case 'vi':
      value = 'Vn';
      break;
    case 'jp':
      value = 'Jp';
      break;
    default:
      value = 'Eng';
      break;
    }
    this.setState({
      languageSelected: value,
    });
  }

  _renderLogoGroup() {
    return (
      <View style={styles.logoGroupContainer}>
        <Image source={require('../../../assets/logo/logo.png')} />
        <Text style={styles.logoContent}>{I18n.t('landing.coinName')}</Text>
        <Text style={styles.logoDescription}>{I18n.t('landing.coinDescription')}</Text>
      </View>
    );
  }

  _renderButtonGroup() {
    return (
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
          onPressBtn={() => this._navigateScreen('LoginScreen')}
        />
        <MangoButton
          title={I18n.t('landing.restoreAccount')}
          btnStyle={styles.btnAuthContainer}
          btnTextStyle={styles.btnTextAuthStyle}
          onPressBtn={() => this._navigateScreen('RestoreWalletScreen')}
        />
      </View>
    );
  }

  render() {
    const { isShowListLanguage } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          { this._renderSelectLanguage() }
          {isShowListLanguage ? this._renderListSelectLanguage() : null}
          { this._renderLogoGroup() }
          { this._renderButtonGroup() }
        </View>
      </SafeAreaView>

    );
  }
}
export default LandingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFCB38',
  },

  selectLanguageContainer: {
    marginTop: '10@s',
  },

  selectLanguageContent: {
    flexDirection: 'row',
    width: '124@s',
    height: '36@s',
    borderRadius: '18@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  textLanguage: {
    color: '#006AEB',
    fontSize: '18@s',
    marginHorizontal: '8@s',
  },

  imageSelectLanguage: {
    width: '18@s',
    height: '18@s',
  },

  logoGroupContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: '40@s',
  },

  logoContent: {
    color: '#1F42B3',
    fontWeight: 'bold',
    fontSize: '32@s',
  },

  logoDescription: {
    color: '#BAC5E6',
  },

  btnGroupContainer: {
    flex: 3,
    alignItems: 'center',
    paddingTop: '80@s',
  },

  btnCreateWalletContainer: {
    width: '290@s',
    height: '56@s',
    borderRadius: '28@s',
    backgroundColor: CommonColors.headerBarBgColor,
    borderColor: CommonColors.headerTitleColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2@s',
    elevation: 4,
  },

  btnTextCreateWalletStyle: {
    color: '#1F42B3',
    fontSize: '20@s',
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
    color: CommonColors.headerBarBgColor,
    fontSize: '18@s',
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
});
