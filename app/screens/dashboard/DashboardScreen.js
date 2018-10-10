import React from 'react';
import {
  View, Text, ScrollView, Dimensions, Image, RefreshControl,
} from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
import SocketIOClient from 'socket.io-client';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { getPrices } from '../../api/common/BaseRequest';
import { getUserSettings } from '../../api/user/UserRequest';
import { formatCoin, getCoinName, getCoinFullName } from '../../utils/Filters';
import { Fonts } from '../../utils/CommonStyles';
import AppPreferences from '../../utils/AppPreferences';
import Consts from '../../utils/Consts';
import Events from '../../utils/Events';
import UIUtils from '../../utils/UIUtils';
import WalletService from '../../services/wallet';
import BaseScreen from '../BaseScreen';
import BackPressHandler from '../../utils/BackPressHandler';

const { width } = Dimensions.get('window');
const CURRENCY_SYMBOLS = {
  USD: '$',
  JPY: '¥',
  PHP: '₱',
};
const COINS = ['BTC', 'ETH'];
const WALLET_COIN = 'MGC';
const ALL_COINS = [WALLET_COIN, ...COINS];
const COIN_COLORS = {
  [WALLET_COIN]: '#FFD82F',
  BTC: '#FFA034',
  ETH: '#2650BF',
};

class DashboardScreen extends BaseScreen {
  static _updateCoinValue = (newValue = []) => {
    // console.log('DashboardScreen', newValue);
  }

  constructor(props) {
    super(props);
    this.state = {
      balances: {},
      prices: {},
      currency: 'USD',
      refreshing: false,
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._loadData();
    this.setState({ refreshing: false });
  }

  async componentDidMount() {
    super.componentDidMount();
    BackPressHandler.handleBackAction();

    await this._loadData();
    const socket = SocketIOClient('https://streamer.cryptocompare.com/');
    const subscription = ['2~Poloniex~BTC~USD', '2~Poloniex~ETH~USD'];
    // socket.emit('SubAdd', { subs: subscription });
    // socket.on('m', (message) => {
    //   const newValue = message.split('~');
    //   DashboardScreen._updateCoinValue(newValue);
    // });
  }

  getDataEventHandlers() {
    return {
      [Events.USER_SETTINGS_UPDATED]: this._loadData.bind(this),
    };
  }

  async _loadData() {
    await this._loadUserSettings();
    await Promise.all([
      this._loadPrices(),
      this._loadBalances(),
    ]);
  }

  async _loadUserSettings() {
    try {
      const response = await getUserSettings();
      const settings = response.data;
      for (const setting of settings) {
        if (setting.key == Consts.USER_SETTINGS.CURRENCY) {
          this.setState({ currency: setting.value });
          break;
        }
      }
    } catch (e) {
      console.log('DashboardScreen._loadUserSettings', e);
    }
  }

  async _loadPrices() {
    const coinList = COINS.reduce((a, b) => `${a},${b}`);
    const prices = await getPrices(coinList);
    this.setState({ prices });
  }

  async _loadBalances() {
    try {
      const address = await AppPreferences.getEthAddress();
      const balances = await Promise.all([
        WalletService.getAddressBalance('mgc', address),
        WalletService.getAddressBalance('eth', address),
      ]);
      this.setState({
        balances: {
          MGC: balances[0],
          ETH: balances[1],
          BTC: 0,
        },
      });
    } catch (e) {
      console.log('DasgboardScreen._loadBalances', e);
    }
  }

  _hasData() {
    const { prices } = this.state;

    return !!prices.RAW;
  }

  _getDisplayObject(coin) {
    const { currency, prices } = this.state;
    if (!prices.DISPLAY) return {};
    if (!prices.DISPLAY[coin]) return {};
    return prices.DISPLAY[coin][currency] || {};
  }

  _getDisplayPrice(coin) {
    const { currency } = this.state;
    const price = this._getPrice(coin);
    if (price) {
      return `${this._getCurrencySymbol()} ${formatCoin(price, currency)}`;
    }
    return price;
  }

  _getDisplayPC(coin) {
    if (coin === WALLET_COIN) {
      const pcChange = this._getPrecentChange(coin);
      if (pcChange) {
        return formatCoin(pcChange, 'USD', 0);
      }
      return pcChange;
    }
    return this._getDisplayObject(coin).CHANGEPCT24HOUR || '';
  }

  _getPrecentChange(coin) {
    if (coin === WALLET_COIN) {
      return (this._getPrecentChange('BTC') || 0) * 1.3;
    }
    return this._getRawObject(coin).CHANGEPCT24HOUR;
  }

  _getRawObject(coin) {
    const { currency, prices } = this.state;
    if (!prices.RAW) return {};
    if (!prices.RAW[coin]) return {};
    return prices.RAW[coin][currency] || {};
  }

  _getPrice(coin) {
    if (coin === WALLET_COIN) {
      const btcPrice = this._getPrice('BTC');
      if (btcPrice) {
        return btcPrice * 0.0013;
      }
      return btcPrice;
    }
    return this._getRawObject(coin).PRICE;
  }

  _getCurrencySymbol() {
    const { currency } = this.state;

    return CURRENCY_SYMBOLS[currency] || '';
  }

  _getCoinValue(coin) {
    const { balances } = this.state;
    const balance = balances[coin];
    const price = this._getPrice(coin);
    let amount = 0;

    if (balance && price) {
      amount = balance * price;
    }
    return amount;
  }

  _renderPieChart = () => {
    let btcValue = this._getCoinValue('BTC');
    let ethValue = this._getCoinValue('ETH');
    let mgcValue = this._getCoinValue('MGC');
    if (!btcValue && !ethValue && !mgcValue) {
      btcValue = 1;
      ethValue = 1;
      mgcValue = 1;
    }
    const data = [
      {
        population: btcValue,
        color: { r: 255, g: 169, b: 52 },
      },
      {
        population: ethValue,
        color: { r: 38, g: 80, b: 191 },
      }, {
        population: mgcValue,
        color: { r: 255, g: 216, b: 47 },
      },
    ];

    const options = {
      width: scale(335),
      height: scale(335),
      animate: {
        enabled: false,
      },
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Pie
            style={styles.pieContainer}
            data={data}
            options={options}
            accessorKey="population"
            r={scale(105)}
            R={scale(135)}
          />
        </View>
        {this._renderSumSerires()}
      </View>
    );
  }

  _renderItemInforData(coin) {
    const { currency, balances } = this.state;
    const balance = balances[coin];
    let amount = '';
    if (this._hasData()) {
      amount = `${this._getCurrencySymbol()} ${formatCoin(this._getCoinValue(coin), currency, 0)}`;
    }

    return (
      <View style={styles.itemGroup} key={coin}>
        <View style={[{ backgroundColor: COIN_COLORS[coin] }, styles.itemColor]} />
        <Text style={styles.itemCount}>{amount}</Text>
        <Text style={styles.itemCountCoin}>
          {formatCoin(balance, coin, 0)}
          {' '}
          {getCoinName(coin)}
        </Text>
      </View>
    );
  }

  _renderItemWallet(coin) {
    const isPriceDown = this._getPrecentChange(coin) < 0;
    return (
      <View style={styles.walletContainer} key={coin}>
        <View style={styles.walletGroup}>
          <Text style={styles.walletFullname}>{getCoinFullName(coin)}</Text>
          <Text style={styles.walletPrice}>{this._getDisplayPrice(coin)}</Text>

          {this._hasData() && (
            <View style={styles.changeGroup}>
              {isPriceDown
                ? <Image source={require('../../../assets/icon-change-price/changeDown.png')} style={styles.imgChangePrice} />
                : <Image source={require('../../../assets/icon-change-price/changeUp.png')} style={styles.imgChangePrice} />
              }
              <Text style={isPriceDown ? styles.walletPriceDown : styles.walletPriceUp}>
                {this._getDisplayPC(coin)}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Image source={require('../../../assets/dashboard/chart.png')} style={styles.chart} />
        </View>
      </View>
    );
  }

  _renderListWallet() {
    return (
      <View style={styles.listWallet}>
        {ALL_COINS.map(coin => this._renderItemWallet(coin))}
      </View>
    );
  }

  _renderInforData() {
    return (
      <View style={styles.inforGroup}>
        {ALL_COINS.map(coin => this._renderItemInforData(coin))}
      </View>
    );
  }

  _renderSumSerires() {
    const { currency } = this.state;
    let total = '';
    if (this._hasData()) {
      for (const coin of ALL_COINS) {
        total = (total || 0) + this._getCoinValue(coin);
      }
      total = this._getCurrencySymbol() + formatCoin(total, currency, 0);
    }

    return (
      <View style={styles.sumSeriresGroup}>
        <Text style={styles.titleBalance}>{I18n.t('dashboard.balance')}</Text>
        <Text style={styles.sumSerires}>{total}</Text>
      </View>
    );
  }

  render() {
    const { refreshing } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.dashboardScreen}
        showsHorizontalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this._onRefresh()}
          />
        )}
      >
        {this._renderPieChart()}
        {this._renderInforData()}
        {this._renderListWallet()}
        {UIUtils.createBottomPadding()}
      </ScrollView>
    );
  }
}

export default DashboardScreen;

const styles = ScaledSheet.create({
  dashboardScreen: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3',
  },
  container: {
    marginTop: '2@s',
  },
  sumSeriresGroup: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: '132@s',
    zIndex: 3,
  },
  sumSerires: {
    color: '#000',
    fontSize: '32@ms',
    ...Fonts.Ubuntu_Medium,
  },
  titleBalance: {
    color: '#8d93a6',
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },
  inforGroup: {
    flexDirection: 'row',
    marginTop: -scale(5),
  },
  itemGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  itemColor: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
  },
  itemCount: {
    color: '#26304d',
    fontSize: '14@s',
    marginTop: '8@s',
    marginBottom: '2@s',
    ...Fonts.Ubuntu_Bold,
  },
  itemCountCoin: {
    color: '#26304d',
    fontSize: '15@s',
    ...Fonts.Ubuntu_Light,
  },
  listWallet: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: '10@s',
    marginBottom: '10@s',
    marginLeft: 0,
  },
  walletContainer: {
    flex: 1,
    height: '101@s',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '8@s',
    marginLeft: '20@s',
    marginRight: '20@s',
    marginTop: '20@s',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  walletGroup: {
    flexDirection: 'column',
    marginLeft: '16@s',
  },
  walletFullname: {
    color: '#26304d',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },
  walletPrice: {
    color: '#26304d',
    fontSize: '20@ms',
    marginTop: '3@s',
    marginBottom: '3@s',
    ...Fonts.Ubuntu_Medium,
  },
  walletPriceUp: {
    color: '#7fbf36',
    fontSize: '14@ms',
    marginLeft: '7@s',
    ...Fonts.Ubuntu_Regular,
  },
  walletPriceDown: {
    color: '#D30023',
    fontSize: '14@ms',
    marginLeft: '7@s',
    ...Fonts.Ubuntu_Regular,
  },
  changeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgChangePrice: {
    width: '11@s',
    height: '11@s',
  },
  chart: {
    resizeMode: 'contain',
    width: '180@s',
    marginTop: '12@s',
    marginBottom: '12@s',
    marginRight: '16@s',
  },
});
