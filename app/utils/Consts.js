export default class Consts {
  static CURRENCIES = ['USD', 'PHP'];

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

  static LOGIN_TYPES = {
    PHONE_NUMBER: 0,
    EMAIL: 1,
    PASSPORT: 2,
    FACEBOOK: 3,
  };

  static USER_SETTINGS = {
    CURRENCY: 'currency',
    EMAIL_NOTIFICATION: 'email_notification',
  };

  static PIN = 'pin';

  static ACCESS_TOKEN_TITLE = 'access_token';

  static CODE_PIN = 'code_pin';

  static FINGER_PRINT = 'finger_print';

  static PER_PAGE = 10

  static LIST_COIN = [
    {
      image: require('../../assets/mango-coin/mangocoin.png'),
      showName: 'Mango Coin',
      name: 'MGC',
      symbol: 'mgc4',
    },
    {
      image: require('../../assets/eth/eth.png'),
      showName: 'Ethereum',
      name: 'ETH',
      symbol: 'eth',
    },
    // {
    //   image: require('../../assets/bitcoin/bitcoin.png'),
    //   showName: 'Bitcoin',
    //   name: 'BTC',
    //   symbol: 'btc',
    // },
  ];

  static MANGO_STEP_OVAL = {
    first: 'first',
    second: 'second',
    last: 'last',
  }

  static GOOGLE_AUTHEN_LINK = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en';

  static FACEBOOK_LOGIN_PERMISSIONS = ['public_profile', 'email']
}
