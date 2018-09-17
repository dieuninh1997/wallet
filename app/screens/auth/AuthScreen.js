import React, { Component } from 'react';
import {
  View,
  Alert,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';

class AuthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: 'Touch ID',
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
  })

  _renderBtnLogin = () => (
    <MangoGradientButton
      btnText="Auth with Touch ID"
      btnStyle={styles.btnSigninContainer}
      onPress={this._pressHandler}
    />
  )

  _pressHandler() {
    const optionalConfigObject = {
      title: 'Authentication Required',
      color: '#e00606',
      fallbackLabel: 'Show Passcode',
    };
    TouchID.authenticate('Touch to unlock you phone', optionalConfigObject)
      .then((success) => {
        console.log('success', success);
        Alert.alert('Authenticated Successfully');
      })
      .catch((error) => {
        console.log('error', error);
        Alert.alert('Authentication Failed');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderBtnLogin()}
      </View>
    );
  }
}
export default AuthScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.screenBgColor,
  },
  btnSigninContainer: {
    width: '220@s',
  },
});
