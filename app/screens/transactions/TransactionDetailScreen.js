import React, { Component } from 'react';
import {
  View, Text, Image, TextInput, Clipboard, Linking,
} from 'react-native';
import Moment from 'moment';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import AppConfig from '../../utils/AppConfig';
import MangoBackButton from '../common/MangoBackButton';
import I18n from '../../i18n/i18n';
import MangoGradientButton from '../common/MangoGradientButton';
import AppPreferences from '../../utils/AppPreferences';

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
      transaction: new Object(),
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      transaction: params,
    });
  }

  _handleCopyTxid = () => {
    const { transaction } = this.state;
    Clipboard.setString(transaction.id);
    AppPreferences.showToastMessage(I18n.t('transactionDetail.copy_txid'));
  }

  _handleCheckExport = () => {
    const { transaction } = this.state;
    const urlLink = `https://ropsten.etherscan.io/tx/${transaction.id}`;
    Linking.openURL(urlLink);
  }

  render() {
    const { transaction } = this.state;

    return (
      <View style={styles.transactionDetail}>
        <View style={styles.transactionDetailContent}>
          <View style={styles.transactionHeader}>
            <View style={styles.coinIconHeader}>
              <Image
                source={require('../../../assets/mango-coin/mangocoin.png')}
                style={styles.iconHeader}
              />
            </View>
            <View style={styles.coinInfoHeader}>
              <Text style={styles.fontText}>MGC</Text>
              <Text>MangoCoin</Text>
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
                  {'+'}
                  {transaction.value}
                  {' MGC'}
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
    fontSize: '18@s',
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
    width: '65%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: '16@s',
    color: '#000000',
  },
  valueContent: {
    fontSize: '16@s',
    color: 'rgb(47, 100, 209)',
    marginRight: '16@s',
  },
  transactionContentSecond: {
    height: '162@s',
    borderBottomColor: 'rgb(212, 217, 231)',
    justifyContent: 'space-around',
    paddingBottom: '20@s',
    paddingTop: '20@s',
  },
  fontText: {
    fontSize: '18@s',
    fontWeight: 'bold',
    color: '#000000',
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
  },
  btnCheckExport: {
    marginBottom: '10@s',
    width: '149@s',
    height: '48@s',
    marginRight: '9@s',
  },
});
