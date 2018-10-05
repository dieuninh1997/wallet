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
import { formatCoin, getCoinName, getCoinFullName } from '../../utils/Filters';
import AppPreferences from '../../utils/AppPreferences';
import WalletService from '../../services/wallet';

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

class DashboardScreen extends React.Component {
  static _updateCoinValue = () => {
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
    await this._loadData();
    const socket = SocketIOClient('https://streamer.cryptocompare.com/');
    const subscription = ['2~Poloniex~BTC~USD', '2~Poloniex~ETH~USD'];
    socket.emit('SubAdd', { subs: subscription });
    socket.on('m', (message) => {
      const newValue = message.split('~');
      DashboardScreen._updateCoinValue(newValue);
    });
  }

  async _loadData() {
    await Promise.all([
      this._loadPrices(),
      this._loadBalances(),
    ]);
  }

  async _loadUserSettings() {

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
      width: scale(350),
      height: scale(350),
      animate: {
        enabled: false,
      },
    };

    return (
      <View style={styles.container}>
        <Pie
          style={styles.pieContainer}
          data={data}
          options={options}
          accessorKey="population"
          r={scale(120)}
          R={scale(150)}
        />
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
          <Image source={require('../../../assets/right-arrow/right-arrow.png')} style={styles.imgArrowRight} />
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
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this._onRefresh()}
          />
        )}
      >
        {this._renderPieChart()}
        {this._renderSumSerires()}
        {this._renderInforData()}
        {this._renderListWallet()}
      </ScrollView>
    );
  }
}

export default DashboardScreen;

const styles = ScaledSheet.create({
  dashboardScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3',
  },
  sumSeriresGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '150@s',
    zIndex: 3,
  },
  sumSerires: {
    color: '#1D42B4',
    fontWeight: '500',
    fontSize: '28@s',
  },
  titleBalance: {
    color: '#A1A6B5',
    fontSize: '18@s',
  },
  inforGroup: {
    flexDirection: 'row',
    marginTop: '10@s',
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
    color: '#000',
    fontSize: '14@s',
    fontWeight: '500',
    marginTop: '5@s',
    marginBottom: '5@s',
  },
  itemCountCoin: {
    color: '#474F66',
    fontSize: '15@s',
  },
  listWallet: {
    marginTop: '10@s',
    marginBottom: '10@s',
  },
  walletContainer: {
    width: width - scale(20),
    backgroundColor: '#FFF',
    height: '80@s',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '5@s',
    paddingLeft: '20@s',
    paddingRight: '20@s',
    marginTop: '20@s',
    justifyContent: 'space-between',
  },
  walletGroup: {
    flexDirection: 'column',
  },
  walletFullname: {
    color: '#707688',
    fontSize: '13@s',
  },
  walletPrice: {
    color: '#2A334D',
    fontSize: '17@s',
  },
  walletPriceUp: {
    color: '#7DBF44',
    fontSize: '11@s',
    marginLeft: '7@s',
  },
  walletPriceDown: {
    color: '#D30023',
    fontSize: '11@s',
    marginLeft: '7@s',
  },
  changeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgChangePrice: {
    width: '11@s',
    height: '11@s',
  },
  imgArrowRight: {
    width: '30@s',
    height: '30@s',
  },
});
