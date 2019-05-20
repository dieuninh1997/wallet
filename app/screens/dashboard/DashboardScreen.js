import React from 'react';
import {
  View, Text, ScrollView, Image, RefreshControl, TouchableOpacity,
} from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
import SplashScreen from 'react-native-splash-screen';
import { withNetworkConnectivity } from 'react-native-offline';
import LinearGradient from 'react-native-linear-gradient';
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
import ChartModal from './ChartModal';
import MangoConnectionLost from '../common/MangoConnectionLost';

class DashboardScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      balances: {},
      prices: {},
      currency: 'USD',
      refreshing: false,
    };

    this.CURRENCY_SYMBOLS = {
      USD: '$',
      JPY: '¥',
      PHP: '₱',
    };

    this.COINS = ['ETH'];
    this.WALLET_COIN = 'MGC';
    this.ALL_COINS = [this.WALLET_COIN, ...this.COINS];

    this.COIN_COLORS = {
      [this.WALLET_COIN]: ['#ffdd00', '#fcc203'],
      BTC: '#FFA034',
      ETH: ['#3c78dd', '#2f64d1'],
    };

    this.CHART_COLORS = {
      [this.WALLET_COIN]: { r: 255, g: 216, b: 47 },
      BTC: { r: 255, g: 169, b: 52 },
      ETH: { r: 38, g: 80, b: 191 },
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._loadData();
    this.setState({ refreshing: false });
  }

  isRootScreen() {
    return true;
  }

  async componentDidMount() {
    super.componentDidMount();
    SplashScreen.hide();
    BackPressHandler.handleBackAction();
    this._loadData();
  }

  getDataEventHandlers() {
    return {
      [Events.USER_SETTINGS_UPDATED]: this._loadData,
    };
  }

  _loadData = async () => {
    await this._loadUserSettings();
    await Promise.all([
      this._loadPrices(),
      this._loadBalances(),
    ]);
  }

  _loadUserSettings = async () => {
    try {
      const response = await getUserSettings();
      const settings = response.data;
      for (const setting of settings) {
        if (setting.key === Consts.USER_SETTINGS.CURRENCY) {
          this.setState({ currency: setting.value });
          break;
        }
      }
    } catch (e) {
      console.log('DashboardScreen._loadUserSettings', e);
    }
  }

  _loadPrices = async () => {
    const coinList = this.ALL_COINS.reduce((a, b) => `${a},${b}`);
    const prices = await getPrices(coinList);
    this.setState({ prices });
  }

  _loadBalances = async () => {
    try {
      const address = await AppPreferences.getEthAddress();
      console.log('address', address);

      const balances = await Promise.all([
        WalletService.getAddressBalance('mgc4', address),
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
      console.log('DashboardScreen._loadBalances', e);
    }
  }

  _hasData() {
    const { prices } = this.state;
    return prices.ETH_PRICE !== undefined;
  }

  _getDisplayObject(coin) {
    const { currency, prices } = this.state;
    
    if (prices.ETH_PRICE === undefined) return {};
    const priceData = (coin ==="ETH") ? prices.ETH_PRICE : prices.MGC_PRICE;
   
    return priceData.DISPLAY[coin][currency] || {};
  }

  _getDisplayPrice(coin) {
    try {
      const { currency } = this.state;
      const priceDisplay = this._getPriceDisplay(coin);
      const price = this._getPrice(coin);
      
      if (priceDisplay === '-') {
        return `${this._getCurrencySymbol()} ${price}`;
      }
      if (price) {
        return `${this._getCurrencySymbol()} ${formatCoin(price, currency)}`;
      }
      return price;
    } catch (error) {
      console.log('error', error);
    }
  }

  _getDisplayPC(coin) {
    return this._getDisplayObject(coin).CHANGEPCT24HOUR || '';
  }

  _getPrecentChange(coin) {
    return this._getRawObject(coin).CHANGEPCT24HOUR;
  }

  _getRawObject(coin) {
    const { currency, prices } = this.state;
    if (prices.ETH_PRICE === undefined) return {};
    const priceData = (coin ==="ETH") ? prices.ETH_PRICE : prices.MGC_PRICE;
    return priceData.RAW[coin][currency] || {};
  }

  _getPrice(coin) {
    return this._getRawObject(coin).PRICE;
  }

  _getPriceDisplay(coin) {
    return this._getDisplayObject(coin).PRICE;
  }

  _getCurrencySymbol() {
    const { currency } = this.state;

    return this.CURRENCY_SYMBOLS[currency] || '';
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
    const allCoins = [].concat(this.ALL_COINS).reverse();

    const values = [];
    for (const coin of allCoins) {
      values.push(this._getCoinValue(coin));
    }

    const isAllValueZero = !Math.max(...values);

    const data = [];
    if (isAllValueZero) {
      for (const coin of allCoins) {
        data.push({
          population: 1,
          color: this.CHART_COLORS[coin],
        });
      }
    } else {
      for (const i in allCoins) {
        if (values[i] > 0) {
          data.push({
            population: values[i],
            color: this.CHART_COLORS[allCoins[i]],
          });
        }
      }
    }

    const options = {
      width: scale(270),
      height: scale(270),
      animate: {
        enabled: false,
      },
      color: 'red',
      margin: {
        top: 0, left: 0, right: 0, bottom: 0,
      },
    };

    return (
      <View style={{ flex: 1 }}>
        {this._renderSumSerires()}
        <View style={styles.container}>
          <Pie
            data={data}
            options={options}
            monoItemInnerFillColor="#ECEEF3"
            accessorKey="population"
            r={scale(105)}
            R={scale(134)}
          />
        </View>
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
        {/* <View style={[{ backgroundColor: this.COIN_COLORS[coin] }, styles.itemColor]} /> */}
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={this.COIN_COLORS[coin]}
          style={styles.itemColor}
        />
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
    const { currency } = this.state;
    const isPriceDown = this._getPrecentChange(coin) < 0;
    return (
      <TouchableOpacity key={coin} onPress={() => this._chartModal.show(currency, coin, this)}>
        <View style={styles.walletContainer}>
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
      </TouchableOpacity>
    );
  }

  _renderListWallet() {
    return (
      <View style={styles.listWallet}>
        {this.ALL_COINS.map(coin => this._renderItemWallet(coin))}
      </View>
    );
  }

  _renderInforData() {
    return (
      <View style={styles.inforGroup}>
        {this.ALL_COINS.map(coin => this._renderItemInforData(coin))}
      </View>
    );
  }

  _renderSumSerires() {
    const { currency } = this.state;
    let total = '';
    if (this._hasData()) {
      for (const coin of this.ALL_COINS) {
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

  _renderChart = () => (
    <ChartModal ref={ref => this._chartModal = ref} />
  )

  render() {
    const { refreshing } = this.state;
    const { isConnected } = this.props;

    if (!isConnected) {
      return <MangoConnectionLost />;
    }
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.dashboardScreen}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          )}
        >
          {this._renderPieChart()}
          {this._renderInforData()}
          {this._renderListWallet()}
          {UIUtils.createBottomPadding()}
        </ScrollView>
        {this._renderChart()}
      </View>
    );
  }
}

export default withNetworkConnectivity()(DashboardScreen);

const styles = ScaledSheet.create({
  dashboardScreen: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3',
  },
  container: {
    marginTop: '20@s',
    borderRadius: '135@s',
    shadowColor: '#0530b0',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginBottom: '30@s',
    backgroundColor: '#ffffff',
  },
  sumSeriresGroup: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: '132@s',
    zIndex: 10000,
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
    marginBottom: '5@s',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    elevation: 1,
    shadowColor: '#0530b0',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
