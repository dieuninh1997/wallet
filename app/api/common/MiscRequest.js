import AppConfig from '../../utils/AppConfig';
import {
  get, post, put,
} from '../common/BaseRequest';


export function getServerStatus() {
  const url = '/server-status';
  return get(url);
}

