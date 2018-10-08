import React from 'react';
import { View, BackHandler, Alert, Platform, ToastAndroid } from "react-native";
import I18n from '../i18n/i18n';
import Consts from "../utils/Consts";

export default class BaseScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  navigate(screen, params) {
    const { navigate } = this.props.navigation;
    navigate({ routeName: screen, params: params, action: null, key: screen });
  }

  _onError(err, navigation) {

  }

  componentDidMount() {
    const socketEventHandlers = this.getSocketEventHandlers();
    for (let event in socketEventHandlers) {
      let handler = socketEventHandlers[event];
      window.GlobalSocket.bind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (let event in dataEventHandlers) {
      let handler = dataEventHandlers[event];
      window.EventBus.bind(event, handler);
    }
  }

  componentWillUnmount() {
    const socketEventHandlers = this.getSocketEventHandlers();
    for (let event in socketEventHandlers) {
      let handler = socketEventHandlers[event];
      window.GlobalSocket.unbind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (let event in dataEventHandlers) {
      let handler = dataEventHandlers[event];
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
