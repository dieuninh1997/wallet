export default class Consts {
  static CURRENCY_BTC = 'btc';

  static CURRENCY_ETH = 'eth';

  static CURRENCY_KRW = 'krw';

  static ORDER_TYPE_LIMIT = 'limit';

  static ORDER_TYPE_MARKET = 'market';

  static ORDER_TYPE_STOP_LIMIT = 'stop_limit';

  static ORDER_TYPE_STOP_MARKET = 'stop_market';

  static DEPOSITE_HISTORY = 'Deposite History';

  static WITHDRAW_HISTORY = 'Withdraw History';

  static TRADE_TYPE_BUY = 'buy';

  static TRADE_TYPE_SELL = 'sell';

  // Google authenticator action
  static GOOGLE_2FA_DISABLED_ACT = 'disable2FA';

  static GOOGLE_2FA_CHANGE_PASSWORD = 'changePassWord';

  // Transaction History
  static DEPOSITS_HISTORY = 'deposits_history';

  static WITHDRAWLS_HISTORY = 'withdrawls_history';

  static DEPOSIT_DETAIL = 'Deposit detail';

  static WITHDRAW_DETAIL = 'Withdraw detail';

  static NOT_LOGIN = 'not login';

  static DEFAULT_ORDER_BOOK_SETTING = {
    click_to_order: 0,
    created_at: null,
    notification: 1,
    notification_canceled: 1,
    notification_created: 1,
    notification_matched: 1,
    order_confirmation: 1,
    price_group: 1,
    show_empty_group: 0,
    updated_at: null,
  };

  static DEFAULT_USER_ORDER_BOOK = {
    buy: [],
    sell: [],
  }
}
