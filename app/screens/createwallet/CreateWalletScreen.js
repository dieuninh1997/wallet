import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles } from '../../utils/CommonStyles';

export default class CreateWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWallet.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerRight: <View />,
  })

  static SCREEN = {
    CREATE_BY_EMAIL: 'CreateWalletByEmailScreen',
    CREATE_BY_PHONE: 'CreateWalletPhoneNumberScreen',
  }

  _handleClickCreateWallet = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageWalletContainer}>
          <Image style={styles.imageWallet} source={require('../../../assets/createwalet/wallet.png')} />
        </View>

        <View style={styles.groupBtnContainer}>
          <TouchableOpacity
            style={[styles.btnCreateWalletContainer, styles.btnCreateByPhone]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_PHONE)}
          >
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/phone.png')} />
            <Text style={styles.textCreateByPhone}>
              {I18n.t('createWallet.phoneNumber')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_EMAIL)}
          >
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/email.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.emailAddress')}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_EMAIL)}
          >
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/phone.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.passportNumber')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_EMAIL)}
          >
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/FacebookIcon.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.facebook')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  imageWalletContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWallet: {
    width: '150@s',
    height: '150@s',
  },

  groupBtnContainer: {
    flex: 1,
  },

  btnCreateWalletContainer: {
    flexDirection: 'row',
    marginBottom: '20@s',
    marginHorizontal: '40@s',
    alignItems: 'center',
  },

  btnCreateByPhone: {
    height: '56@s',
    borderRadius: '28@s',
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },

  btnCreateDisable: {
    height: '48@s',
    borderRadius: '24@s',
    backgroundColor: '#e6ebf2',
  },

  iconCreate: {
    width: '36@s',
    height: '36@s',
    marginLeft: '25@s',
  },

  textCreateByPhone: {
    fontSize: '20@s',
    marginLeft: '15@s',
    color: '#1c43b8',
    fontWeight: '300',
  },
  textCreate: {
    fontSize: '18@s',
    marginLeft: '15@s',
    color: '#526fc7',
    fontWeight: '100',
  },
});
