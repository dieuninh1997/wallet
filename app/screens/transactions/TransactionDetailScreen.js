import React, { Component } from 'react';
import {
  View, Text, Image, TextInput, Clipboard, Linking,
} from 'react-native';
import Moment from 'moment';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../utils/CommonStyles';
import MangoBackButton from '../common/MangoBackButton';
import I18n from '../../i18n/i18n';
import MangoGradientButton from '../common/MangoGradientButton';
import UIUtils from '../../utils/UIUtils';

export default class TransactionDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('transactionDetail.transactionDetail'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        coinInfo: {},
      },
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    console.log('params', params);

    this.setState({
      transaction: params,
    });
  }

  _handleCopyTxid = () => {
    const { transaction } = this.state;
    Clipboard.setString(transaction.id);
    UIUtils.showToastMessage(I18n.t('transactionDetail.copy_txid'));
  }

  _handleCheckExport = () => {
    const { transaction } = this.state;
    const urlLink = transaction.url;
    Linking.openURL(urlLink);
  }

  _showIconCoin = (transaction) => {
    return transaction.coinInfo.name === 'ETH' ? require('../../../assets/eth/eth.png') : require('../../../assets/mango-coin/mangocoin.png');
  }

  _showIconIsSend = (transaction) => {
    return transaction.isSend ? require('../../../assets/send/sent.png') : require('../../../assets/recieved/received.png');
  }

  render() {
    const { transaction } = this.state;

    return (
      <View style={styles.transactionDetail}>
        <View style={styles.transactionDetailContent}>
          <View style={styles.transactionHeader}>
            <View style={styles.coinIconHeader}>
              <Image
                source={this._showIconCoin(transaction)}
                style={styles.iconHeader}
              />
            </View>
            <View style={styles.coinInfoHeader}>
              <Text style={styles.fontText}>{transaction.coinInfo.name}</Text>
              <Text style={styles.fontTextName}>{transaction.coinInfo.showName}</Text>
            </View>
          </View>

          <View style={styles.transactionContentFirst}>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.amount')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.valueContent}>
                  {transaction.isSend ? '-' : '+'}
                  {transaction.value}
                  {` ${transaction.coinInfo.name}`}
                </Text>
              </View>
            </View>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.status')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Image
                  source={this._showIconIsSend(transaction)}
                  style={[styles.iconIsSend, transaction.status === 'CONFIRMED' ? '' : styles.blurImage]}
                />
                <Text style={styles.valueContent}>{ transaction.status }</Text>
              </View>
            </View>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.confirmation')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.valueContent}>{transaction.confirmations}</Text>
              </View>
            </View>
          </View>

          <View style={styles.transactionContentSecond}>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.address')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.valueContent} numberOfLines={1} ellipsizeMode="middle">{ transaction.sendAddress }</Text>
              </View>
            </View>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.txid')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.valueContent} numberOfLines={1} ellipsizeMode="middle">{ transaction.id }</Text>
              </View>
            </View>
            <View style={styles.amount}>
              <View style={styles.left}>
                <Text style={styles.label}>
                  {I18n.t('genneralText.date')}
:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.valueContent}>{Moment(transaction.time).format('YYYY-MM-DD HH:mm:ss')}</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.transactionBottom}>
          <MangoGradientButton
            btnText={I18n.t('transactionDetail.copy_txid')}
            btnStyle={styles.btnCopyTxid}
            colorOptions={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => this._handleCopyTxid()}
          />
          <MangoGradientButton
            btnText={I18n.t('transactionDetail.check_export')}
            btnStyle={styles.btnCheckExport}
            onPress={() => this._handleCheckExport()}
          />
        </View>

      </View>
    );
  }
}

const styles = ScaledSheet.create({
  transactionDetail: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
    fontSize: '18@ms',
  },
  transactionDetailContent: {
    marginTop: '25@s',
    width: '90%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '5@s',
  },
  transactionHeader: {
    height: '60@s',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(212, 217, 231)',
    flexDirection: 'row',
  },
  coinInfoHeader: {
    marginTop: '8@s',
  },
  iconHeader: {
    width: '48@s',
    height: '48@s',
    marginTop: '6@s',
    marginLeft: '6@s',
  },
  transactionContentFirst: {
    height: '136@s',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(212, 217, 231)',
    justifyContent: 'space-around',
    paddingBottom: '20@s',
    paddingTop: '20@s',
  },
  amount: {
    flexDirection: 'row',
    marginLeft: '16@s',
  },
  left: {
    width: '35%',
  },
  right: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: '16@ms',
    color: '#000000',
    ...Fonts.Ubuntu_Regular,
  },
  valueContent: {
    fontSize: '16@ms',
    color: 'rgb(47, 100, 209)',
    marginRight: '16@s',
    ...Fonts.Ubuntu_Regular,
  },
  transactionContentSecond: {
    height: '162@s',
    borderBottomColor: 'rgb(212, 217, 231)',
    justifyContent: 'space-around',
    paddingBottom: '20@s',
    paddingTop: '20@s',
  },
  fontText: {
    fontSize: CommonSize.inputFontSize,
    fontWeight: 'bold',
    color: '#000000',
    ...Fonts.Ubuntu_Medium,
  },
  fontTextName: {
    fontSize: '14@ms',
    color: 'rgb(38, 48, 77)',
    ...Fonts.Ubuntu_Light,
  },
  transactionBottom: {
    flexDirection: 'row',
    marginTop: '50@s',
  },
  btnCopyTxid: {
    marginBottom: '10@s',
    width: '149@s',
    height: '48@s',
    marginRight: '9@s',
    backgroundColor: '#ffffff',
    marginHorizontal: '5@s',
  },
  btnCheckExport: {
    marginBottom: '10@s',
    width: '149@s',
    height: '48@s',
    marginRight: '9@s',
    marginHorizontal: '5@s',
  },
  iconIsSend: {
    width: '28@s',
    height: '28@s',
    marginRight: '16@s',
    bottom: '5@s'
  },
  blurImage: {
    opacity: 0.3,
  },
});
