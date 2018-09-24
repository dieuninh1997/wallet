import { get, post, put, del} from '../common/BaseRequest';

export function getTrasactionHistory(params) {
  let url = '/transactions';

  return get(url, params);
}

export function saveTransactionHistory(params) {
  let url = '/transactions';

  return post(url, params);
}