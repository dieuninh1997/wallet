import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
// import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import { getOrdersPending } from "../../api/transaction-history/TransactionRequest";

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    const listTranasctions = [
      {
        type: 'recieved',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'recieved',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'send',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'recieved',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'pendding',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'recieved',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
      {
        type: 'recieved',
        time: 'Aug 31 22:53',
        address: '0xb162e0cd09724b0296894eef352c16815cd610fb5870c334ec73bbe5dcea3855',
        value: '0.00321',
        coin: 'MGC',
      },
    ];
    this.state = {
      listTranasctions,
    };
  }

  async _loadData() {
    try {
      const params = { currency: 'tenge', page: 1, limit: 20 };

      const responseOrder = await getOrdersPending(params);
      console.log("getOrderPending", responseOrder)
    } catch (err) {
      console.log("LoadDatas._error:", err)
    }
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
    this._loadData();
    // if (Platform.OS === 'android' && this.props.navigation) {
    //   this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
    //     //console.log("payload willBlur", payload)
    //     return BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid.bind(this))
    //   }
    //   );
    // }
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
    return {
      TransactionCreated: this.onTransactionCreated.bind(this),
      OrderListUpdated: this._onOpenOrderUpdated.bind(this)
    }
  }

  onTransactionCreated(data) {
    // const { transactions } = this.state;
    //
    // transactions.push(data);
    // this.setState({transactions});
  }

  _onOpenOrderUpdated(data) {
    const { currency } = this.props;

    if (data.currency !== currency) {
      return;
    }

    this._loadData();
  }

  getDataEventHandlers() {
    return {};
  }

  notify(event, data) {
    window.EventBus.notify(event, data);
  }


  _renderTransactonsList = () => {
    const { listTranasctions } = this.state;
    const images = [
      require('../../../assets/send/right-arrow.png'),
      require('../../../assets/recieved/left-arrow.png'),
      require('../../../assets/loadding/rotate.png'),
    ];

    return (
      <View style={styles.transactionsContainer}>
        <View style={styles.textYearContainer}>
          <Text style={styles.textYear}>2018</Text>
        </View>
        {listTranasctions.map((item, index) => this._renderTransactonsItem(item, index, images))}

        <View style={styles.textYearContainer}>
          <Text style={styles.textYear}>2017</Text>
        </View>
        {listTranasctions.map((item, index) => this._renderTransactonsItem(item, index, images))}
      </View>
    );
  }

  _renderTransactonsItem = (item, index, images) => (
    <View key={index} style={styles.transactionItemContainer}>
      <View style={styles.transactionImageContainer}>
        <Image
          source={item.type === 'recieved' ? images[1] : images[0]}
          style={styles.transactionImageItem}
        />
      </View>
      <View style={styles.transactionInfoContainer}>
        <Text>{item.time}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.addressInfo}
        >
          {item.address}
        </Text>
      </View>
      <View style={styles.transactionValueItem}>
        <Text style={[styles.textCoinValue, item.type === 'recieved' ? styles.textRecieved : styles.textSend]}>
          {item.type === 'recieved' ? '+' : '-'}
          {item.value}
          {' '}
          {item.coin}
        </Text>
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <MangoDropdown/>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this._renderTransactonsList()}
        </ScrollView>
      </View>
    );
  }
}

export default TransactionsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  transactionsContainer: {
    alignItems: 'center',
    width: '360@s',
  },

  textYearContainer: {
    width: '360@s',
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.customBorderColor,
    paddingVertical: '10@s',
  },

  textYear: {
    fontWeight: 'bold',
    fontSize: '28@s',
    color: CommonColors.headerTitleColor,
  },

  transactionItemContainer: {
    flexDirection: 'row',
    width: '340@s',
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.customBorderColor,
    paddingVertical: '12@s',
  },

  transactionImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10@s',
  },

  transactionImageItem: {
    width: '20@s',
    height: '20@s',
  },

  transactionInfoContainer: {
    marginRight: '10@s',
    width: '170@s',
  },

  addressInfo: {
    color: CommonColors.headerTitleColor,
  },

  transactionValueItem: {
    width: '120@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  textCoinValue: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },

  textSend: {
    color: '#F52036',
  },

  textRecieved: {
    color: '#2E62CC',
  },
});
