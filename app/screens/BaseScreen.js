import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  View, BackHandler, Alert, Platform, ToastAndroid,
} from 'react-native';
import I18n from '../i18n/i18n';
import Consts from '../utils/Consts';

export default class BaseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate(screen, params) {
    const { navigate } = this.props.navigation;
    navigate({
      routeName: screen, params, action: null, key: screen,
    });
  }

  navigateAndClearStack(screen, params) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screen, params })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _onError(err, navigation) {
  }

  isRootScreen() {
    return false;
  }

  componentDidMount() {
    if (this.isRootScreen()) {
      window.rootScreen = this;
    }
    const socketEventHandlers = this.getSocketEventHandlers();
    for (const event in socketEventHandlers) {
      const handler = socketEventHandlers[event];
      window.GlobalSocket.bind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.bind(event, handler);
    }
  }

  componentWillUnmount() {
    const socketEventHandlers = this.getSocketEventHandlers();
    for (const event in socketEventHandlers) {
      const handler = socketEventHandlers[event];
      window.GlobalSocket.unbind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.unbind(event, handler);
    }
  }

  getSocketEventHandlers() {
    return {};
  }

  getDataEventHandlers() {
    return {};
  }

  notify(event, data) {
    window.EventBus.notify(event, data);
  }
}
