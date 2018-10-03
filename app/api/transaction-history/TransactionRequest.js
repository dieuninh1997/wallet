import {
  get, post, put, del,
} from '../common/BaseRequest';

export function getTrasactionHistory(params) {
  const url = '/transactions';

  return get(url, params);
}

export function saveTransactionHistory(params) {
  const url = '/transactions';

  return post(url, params);
}

export function getOrdersPending(params) {
  const url = '/orders/pending';
  return get(url, params);
}
