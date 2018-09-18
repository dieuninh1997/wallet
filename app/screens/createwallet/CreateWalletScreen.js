import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class CreateWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWallet.title'),
    headerTitleStyle: styles.headerTitle,
    headerRight: (<Text>Sign In</Text>),
  })


  _onClickCreatePhoneNumber = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateWalletPhoneNumberScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.createBaseIcon}>
          <Image style={styles.iconWallet} source={require('../../../assets/createwalet/wallet.png')} />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.viewItem}
            onPress={() => this._onClickCreatePhoneNumber()}
          >
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/phone.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.phoneNumber')}
            </Text>
          </TouchableOpacity>

          <View style={styles.viewItem}>
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/email.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.emailAddress')}
            </Text>
          </View>

          <View style={styles.viewItem}>
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/phone.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.passportNumber')}
            </Text>
          </View>

          <View style={styles.viewItem}>
            <Image style={styles.iconCreate} source={require('../../../assets/createwalet/FacebookIcon.png')} />
            <Text style={styles.textCreate}>
              {I18n.t('createWallet.facebook')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F7FA',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
  createBaseIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '20@s',
    borderRadius: '20@s',
    marginRight: '40@s',
    marginLeft: '40@s',
    borderColor: '#fff',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 4,
  },
  iconWallet: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '200@s',
    height: '200@s',
  },
  iconCreate: {
    width: '30@s',
    height: '30@s',
    marginLeft: '25@s',
  },
  textCreate: {
    fontSize: '20@s',
    marginLeft: '15@s',
    color: '#0066CC',
  },
});
