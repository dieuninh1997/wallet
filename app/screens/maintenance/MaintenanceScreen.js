import React from 'react';
import {
  AppState, View, Text, Dimensions, WebView
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import RNRestart from 'react-native-restart';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { getServerStatus } from '../../api/common/MiscRequest';
import { CommonStyles, Fonts } from '../../utils/CommonStyles';
import Consts from '../../utils/Consts';
import AppConfig from '../../utils/AppConfig';
import BaseScreen from '../BaseScreen';

class MaintenanceScreen extends BaseScreen {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t(`http._${navigation.getParam('code')}`),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerLeft: (<View />),
    headerRight: (<View />),
  });

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const code = navigation.getParam('code');
    this.state = {
      code,
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    super.componentDidMount();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this._checkServerStatus();
    }
    this.setState({appState: nextAppState});
  }

  _checkServerStatus = async () => {
     try {
      await getServerStatus();
      RNRestart.Restart();
     } catch (error) {
      console.log('MaintenanceScreen._checkServerStatus', error);
     }
  }

  render() {
    return (
      <WebView
        ref={ref => this._webView = ref}
        source={{ uri: this._getUrl() }}
        style={{flex: 1}} />
    );
  }

  _getUrl() {
    const { code } = this.state;
    return `${AppConfig.getAssetServer()}/${code}`;
  }
}

export default withNavigationFocus(MaintenanceScreen);

const styles = ScaledSheet.create({

});
