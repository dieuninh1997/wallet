import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import Modal from 'react-native-modal';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import I18n from '../../i18n/i18n';
import { getCoinFullName } from '../../utils/Filters';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import AppConfig from '../../utils/AppConfig';
import UIUtils from '../../utils/UIUtils';
import {
  CommonColors, Fonts,
} from '../../utils/CommonStyles';

export default class ChartModal extends React.Component {
  state = {
    currency: 'USD',
    timeRange: 4,
    modalVisible: false,
  };

  TIME_RANGS = ['all', '12m', '1m', '7d', '1d'];

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!visible) {
      this.closeCallback && this.closeCallback();
      this._parent = undefined;
    }
  }

  show = (currency, coin, parent) => {
    this._parent = parent;
    this.setState({
      currency,
      coin,
      modalVisible: true,
    });
  }

  _onCancelPress() {
    this.setModalVisible(false);
  }

  _onPressTimeRange = (timeRange) => {
    this.setState({ timeRange });
  }

  render() {
    const { coin, modalVisible } = this.state;
    const allCoins = this._parent ? this._parent.ALL_COINS : [];
    const page = allCoins.indexOf(coin);
    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={modalVisible}
          style={styles.modal}
          backdropColor={CommonColors.modalBackdropColor}
          backdropOpacity={CommonColors.modalBackdropAlpha}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.setModalVisible(false)}
          >
            <Image
              source={require('../../../assets/common/close.png')}
              resizeMode="stretch"
              style={styles.closeImage}
            />
          </TouchableOpacity>
          <IndicatorViewPager
            ref={ref => this._viewPager = ref}
            initialPage={page}
            style={styles.viewPager}
            indicator={this._renderDotIndicator()}
          >
            {allCoins.map(coins => this._renderPage(coins))}
          </IndicatorViewPager>
        </Modal>
      </View>
    );
  }

  _renderDotIndicator() {
    const allCoins = this._parent ? this._parent.ALL_COINS : [];
    return (
      <PagerDotIndicator
        style={styles.indicator}
        pageCount={allCoins.length}
        dotStyle={styles.dotStyle}
        selectedDotStyle={styles.selectedDotStyle}
      />
    );
  }

  _renderPage(coin) {
    return (
      <View style={styles.page} key={coin}>
        <View style={styles.popup}>
          {this._renderCoinInfo(coin)}
          {this._renderContent(coin)}
          {this._renderTimeRanges()}
        </View>
      </View>
    );
  }

  _renderCoinInfo(coin) {
    const hasData = this._parent && this._parent._hasData();
    let isPriceDown = false;
    let price = ' ';
    let changePercent = ' ';

    if (hasData) {
      isPriceDown = this._parent._getPrecentChange(coin) < 0;
      price = this._parent._getDisplayPrice(coin);
      changePercent = this._parent._getDisplayPC(coin);
    }

    return (
      <View>
        <Text style={styles.coinName}>{getCoinFullName(coin)}</Text>
        <View style={styles.priceGroup}>
          <Text style={styles.price}>{price}</Text>
          { hasData
            && (
              <View>
                { isPriceDown
                  ? (
                    <Image
                      source={require('../../../assets/icon-change-price/changeDown.png')}
                      style={styles.changeImage}
                    />
                  )
                  : (
                    <Image
                      source={require('../../../assets/icon-change-price/changeUp.png')}
                      style={styles.changeImage}
                    />
                  )
                }
              </View>
            )
          }
          <Text style={isPriceDown ? styles.priceDown : styles.priceUp}>{changePercent}</Text>
        </View>
      </View>
    );
  }

  _renderContent(coin) {
    return (
      <View style={styles.content}>
        <WebView
          ref={ref => this._webView = ref}
          source={{ uri: this._getChartUrl(coin) }}
          style={styles.webView}
        />
      </View>
    );
  }

  _getChartUrl(coin) {
    try {
      const { currency, timeRange } = this.state;
      const range = this.TIME_RANGS[timeRange];
      const params = `coin=${coin}&currency=${currency}&range=${range}`;
      return `${AppConfig.getAssetServer()}/chart?${params}`;
    } catch (error) {
      console.log('_getChartUrl', error);
    }
  }

  _renderTimeRanges() {
    const { timeRange } = this.state;
    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => this._onPressTimeRange(0)}>
          <Text style={[styles.timeButton, timeRange === 0 ? styles.selectedTimeButton : {}]}>
            {I18n.t('chart.allTime')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._onPressTimeRange(1)}>
          <Text style={[styles.timeButton, timeRange === 1 ? styles.selectedTimeButton : {}]}>1Y</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._onPressTimeRange(2)}>
          <Text style={[styles.timeButton, timeRange === 2 ? styles.selectedTimeButton : {}]}>1M</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._onPressTimeRange(3)}>
          <Text style={[styles.timeButton, timeRange === 3 ? styles.selectedTimeButton : {}]}>1W</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._onPressTimeRange(4)}>
          <Text style={[styles.timeButton, timeRange === 4 ? styles.selectedTimeButton : {}]}>24h</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const popupWidth = width - 2 * scale(16);

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },

  closeButton: {
    width: '44@s',
    height: '44@s',
    alignSelf: 'flex-end',
    marginRight: '16@s',
    backgroundColor: 'white',
    borderRadius: '22@s',
    ...UIUtils.generatePopupShadow(),
  },

  closeImage: {
    width: '36@s',
    height: '36@s',
    margin: '4@s',
  },

  viewPager: {
    width: '100%',
    height: '456@s',
    marginBottom: '20@s',
  },

  indicator: {
    bottom: -scale(17),
  },

  dotStyle: {
    width: '12@s',
    height: '12@s',
    marginLeft: '6@s',
    marginRight: '6@s',
    borderRadius: '6@s',
    backgroundColor: 'white',
  },

  selectedDotStyle: {
    width: '20@s',
    height: '20@s',
    marginLeft: '6@s',
    marginRight: '6@s',
    borderRadius: '10@s',
    borderWidth: '4@s',
    borderColor: 'white',
    backgroundColor: '#0000',
  },

  page: {
    flex: 1,
  },
  popup: {
    width: popupWidth,
    height: '420@s',
    margin: '16@s',
    backgroundColor: 'white',
    borderRadius: '8@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow(),
  },

  coinName: {
    marginTop: '24@s',
    marginLeft: '24@s',
    fontSize: '18@ms',
    color: '#26304d',
    ...Fonts.Ubuntu_Light,
  },

  priceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8@s',
  },

  price: {
    marginLeft: '24@s',
    fontSize: '36@ms',
    color: '#26304d',
    ...Fonts.Ubuntu_Medium,
  },

  changeImage: {
    width: '11@s',
    height: '11@s',
    marginLeft: '12@s',
  },

  priceUp: {
    color: '#7fbf36',
    fontSize: '18@ms',
    marginLeft: '3@s',
    ...Fonts.Ubuntu_Regular,
  },

  priceDown: {
    color: '#D30023',
    fontSize: '18@ms',
    marginLeft: '3@s',
    ...Fonts.Ubuntu_Regular,
  },

  content: {
    flex: 1,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
  },

  webView: {
    flex: 1,
    margin: -5,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30@s',
    marginTop: '5@s',
    marginBottom: '15@s',
    marginLeft: '20@s',
    marginRight: '20@s',
  },

  timeButton: {
    fontSize: '18@ms',
    color: '#26304d',
    paddingLeft: '8@s',
    paddingRight: '8@s',
    paddingTop: '1@s',
    paddingBottom: '1@s',
    ...Fonts.Ubuntu_Light,
  },

  selectedTimeButton: {
    color: 'white',
    backgroundColor: '#2f64d1',
    borderRadius: '15@s',
  },
});
