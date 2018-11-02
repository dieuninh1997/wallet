import React, { Component } from 'react';
import TextInputMask from 'react-native-text-input-mask';

export default class MangoCurrencyInput extends Component {
  state = {
    value: '',
    precision: 0,
  };

  componentDidMount() {
    const { value, precision } = this.props;

    this.setState({
      value: value || '',
      precision,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value, precision } = this.state;

    if (value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
    if (precision !== nextProps.precision) {
      this.setState({ precision: nextProps.precision });
    }
  }

  render() {
    const { value, precision } = this.state;
    const parseValue = value ? value.toString() : value;

    const props = {
      ...this.props,
      value: parseValue,
      precision,
    };

    return (
      <TextInputMask
        mask="currency"
        {...props}
      />
    );
  }
}
