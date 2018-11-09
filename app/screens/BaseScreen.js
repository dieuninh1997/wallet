import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

export default class BaseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate(screen, params) {
    const { navigation } = this.props;
    const { navigate } = navigation;

    navigate({
      routeName: screen, params, action: null, key: screen,
    });
  }

  navigateAndClearStack(screen, params) {
    const { navigation } = this.props;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screen, params })],
    });
    navigation.dispatch(resetAction);
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
    // const socketEventHandlers = this.getSocketEventHandlers();
    // for (const event in socketEventHandlers) {
    //   const handler = socketEventHandlers[event];
    //   window.GlobalSocket.bind(event, handler);
    // }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.bind(event, handler);
    }
  }

  componentWillUnmount() {
    // const socketEventHandlers = this.getSocketEventHandlers();
    // for (const event in socketEventHandlers) {
    //   const handler = socketEventHandlers[event];
    //   window.GlobalSocket.unbind(event, handler);
    // }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.unbind(event, handler);
    }
  }

  // getSocketEventHandlers() {
  //   return {};
  // }

  getDataEventHandlers() {
    return {};
  }

  notify(event, data) {
    window.EventBus.notify(event, data);
  }
}
