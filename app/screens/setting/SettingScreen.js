import React, { Component } from 'react';
import {
  View, Text, ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-switch';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting.title'),
    headerTitleStyle: styles.headerTitle,
    headerRight: (<View />),
  })

  _onChangeSwitch = () => {

  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.titleTable}>{I18n.t('setting.profile')}</Text>
              <View style={styles.borderTable}>
                <View style={styles.borderWalletId}>
                  <Text>{I18n.t('setting.walletId')}</Text>
                  <Text>jasjasjdjbjbkdkbdskvjhdasdas</Text>
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.email')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text style={styles.textVerified}>
                      {I18n.t('setting.verified')}
                    </Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElement}>
                  <Text>{I18n.t('setting.mobileNumber')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text style={styles.textUnVerified}>{I18n.t('setting.unverified')}</Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.logIntoWebWallet')}</Text>
                  <View style={styles.activiRightGroup}>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.textPerferences}>
              <Text style={styles.titleTable}>{I18n.t('setting.perferences')}</Text>
              <View style={styles.borderTable}>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.emailNotification')}</Text>
                  <Switch
                    containerStyle={styles.switchBorder}
                    backgroundActive="#16ec7e"
                    backgroundInactive="#fff"
                    changeValueImmediately="true"
                    onValueChange={() => this._onChangeSwitch}
                  />
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.localCurrency')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text>U.S Dollar ($)</Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.textPerferences}>
              <Text style={styles.titleTable}>{I18n.t('setting.security')}</Text>
              <View style={styles.borderTable}>
                <View style={styles.borderElement}>
                  <Text>{I18n.t('setting.verification')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.disabled')}
                    </Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.changePassword')}</Text>
                  <View style={styles.activiRightGroup}>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElement}>
                  <Text>{I18n.t('setting.recoveryPhrase')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.unconfirmed')}
                    </Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElement}>
                  <Text>{I18n.t('setting.changePin')}</Text>
                  <View style={styles.activiRightGroup}>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.useFaceIdAsPin')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Switch
                      containerStyle={styles.switchBorder}
                      backgroundActive="#16ec7e"
                      backgroundInactive="#fff"
                      changeValueImmediately="true"
                      onValueChange={() => this._onChangeSwitch()}
                    />
                  </View>
                </View>
                <View style={styles.borderElementBottom}>
                  <Text>{I18n.t('setting.swipeToReceive')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Switch
                      containerStyle={styles.switchBorder}
                      backgroundActive="#16ec7e"
                      backgroundInactive="#fff"
                      changeValueImmediately="true"
                      value="true"
                      onValueChange={() => this._onChangeSwitch()}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '14@s',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
  titleTable: {
    fontSize: '15@s',
    marginLeft: '15@s',
    marginBottom: '5@s',
    marginTop: '10@s',
    color: '#3399FF',
  },
  borderTable: {
    borderRadius: '13@s',
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderWidth: 0.5,
  },
  borderWalletId: {
    borderBottomWidth: 0.5,
    padding: '10@s',
  },
  borderElement: {
    borderBottomWidth: 0.5,
    padding: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderElementBottom: {
    padding: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activiRightGroup: {
    flexDirection: 'row',
  },
  textVerified: {
    marginRight: '5@s',
    color: '#85ec81',
  },
  textUnVerified: {
    marginRight: '5@s',
    color: '#f6367a',
  },
  iconChevronRight: {
    fontSize: '25@s',
  },
  switchBorder: {
    borderWidth: 0.3,
    borderColor: '#000',
  },
  textPerferences: {
    marginTop: '15@s',
  },
});
