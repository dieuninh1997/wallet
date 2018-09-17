import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import I18n from '../../i18n/i18n';
import MangoMenuButton from '../common/MangoMenuButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';

class RequestScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoMenuButton navigation={navigation} />,
    title: I18n.t('request.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.headerWithDropdown,
  })

  _renderQrCodeSection = () => (
    <View style={styles.qrCodeSectionContainer}>
      <View style={styles.qrCodeContainer}>
        <Image
          source={require('../../../assets/qrcode/qr-code.png')}
          style={styles.qrCodeImage}
        />
      </View>
      <View style={styles.addressContainer}>
        <Text>0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855</Text>
      </View>
    </View>
  )

  _renderBtnSection = () => (
    <View style={styles.groupBtnContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnUpContainer}
      >
        <Image
          source={require('../../../assets/up/up-arrow.png')}
          style={styles.btnUpImage}
        />
      </TouchableOpacity>
      <MangoGradientButton
        btnText={I18n.t('request.copyAddress')}
        btnStyle={styles.btnCopyAddress}
        onPress={() => true}
      />
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <MangoDropdown />
        {this._renderQrCodeSection()}
        {this._renderBtnSection()}
      </View>
    );
  }
}
export default RequestScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  // Section qrCode
  qrCodeSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10@s',
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
    marginBottom: '30@s',
  },

  // Section button
  groupBtnContainer: {
    flexDirection: 'row',
  },

  btnUpContainer: {
    height: '50@s',
    width: '70@s',
    borderRadius: '25@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 5,
  },

  btnUpImage: {
    width: '24@s',
    height: '24@s',
  },

  btnCopyAddress: {
    width: '220@s',
    marginLeft: '18@s',
  },
});
