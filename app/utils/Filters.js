import { isNil } from 'lodash';
import Numeral from '../libs/numeral';
import Consts from './Consts';
import I18n from '../i18n/i18n';

function formatCoin(amount, currency, zeroValue) {
  let numberOfDecimalDigits = 2;
  if (['btc', 'eth'].indexOf(currency) >= 0) {
    numberOfDecimalDigits = 4;
  }
  const format = numberOfDecimalDigits == 0
    ? '0,0'
    : `0,0.${Array(numberOfDecimalDigits + 1).join('0')}`;
  if (isNil(zeroValue)) {
    zeroValue = '';
  }
  return amount ? Numeral(amount).format(format) : zeroValue;
}

function getCoinName(value) {
  return value ? value.toUpperCase() : value;
}

function getCoinFullName(coin) {
  return I18n.t(`coin.${coin}.fullname`);
}

export {
  formatCoin,
  getCoinName,
  getCoinFullName,
};
