import { BackHandler, ToastAndroid, Platform } from 'react-native';
import { StackNavigator, NavigationActions, StackActions } from 'react-navigation';
import { isEmpty } from 'lodash';
import I18n from '../i18n/i18n';
import App from '../../App';

export default class BackPressHandler {

  static defaultGetStateForAction;
  static _lastTimeBackPress = 0;

  static handleBackAction(callback) {
    BackPressHandler._lastTimeBackPress = 0;

    if (!BackPressHandler.defaultGetStateForAction) {
      BackPressHandler.defaultGetStateForAction = App.router.getStateForAction;
    }

    const mainScreen = ['MainScreen'];


    if (Platform.OS === 'android') {
      App.router.getStateForAction = (action, state) => {
        if (
          action.type === NavigationActions.BACK &&
          state.routes && !isEmpty(state.routes) &&
          mainScreen.indexOf(state.routes[state.index].routeName) >= 0
        ) {
          let now = new Date().getTime();
          if (BackPressHandler._lastTimeBackPress > 0 && now - BackPressHandler._lastTimeBackPress <= 500) {
            BackHandler.exitApp();
            return null;
          }

          if (BackPressHandler._lastTimeBackPress == 0)
            BackPressHandler._lastTimeBackPress = now;
          else
            BackPressHandler._lastTimeBackPress = 0;

          ToastAndroid.showWithGravity(
            I18n.t('exit.content'),
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );

          return BackPressHandler.defaultGetStateForAction({
            type: 'Navigation/COMPLETE_TRANSITION',
            key: 'StackRouterRoot'
          }, {
            ...state,
            isTransitioning: true
          });
        }

        return BackPressHandler.defaultGetStateForAction(action, state);
      };
    }
  }
}