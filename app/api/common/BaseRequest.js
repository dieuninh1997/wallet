import AppConfig from '../../utils/AppConfig';
import Consts from '../../utils/Consts';
import axios from "axios";

export async function get(url, params = {}) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const fullUrl = `${_getFullUrl(url)}?${query}`;
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: _getHeader(),
  });

  _logRequest('GET', url, params);
  const responseGet = await _processResponse(response);
  return responseGet;
}

export async function post(url, params = {}) {
  const response = await fetch(_getFullUrl(url), {
    method: 'POST',
    headers: _getHeader(),
    body: JSON.stringify(params),
  });

  _logRequest('POST', url, params);
  return await _processResponse(response);
}

export async function put(url, params = {}) {
  const response = await fetch(_getFullUrl(url), {
    method: 'PUT',
    headers: _getHeader(),
    body: JSON.stringify(params),
  });

  _logRequest('PUT', url, params);
  return await _processResponse(response);
}

export async function del(url, params = {}) {
  const response = await fetch(_getFullUrl(url), {
    method: 'DELETE',
    headers: _getHeader(),
    body: JSON.stringify(params),
  });

  _logRequest('DELETE', url, params);
  return await _processResponse(response);
}

function _getFullUrl(url) {
  return `${AppConfig.getApiServer()}/api/${AppConfig.getApiVersion()}${url}`;
}

function _getHeader() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AppConfig.ACCESS_TOKEN}`,
  };
}

async function _processResponse(response) {
  await _checkResponseCode(response);

  const content = await
    response.text();
  let data;

  try {
    data = content ? JSON.parse(content) : {};
    _logResponse(response.status, data);
  } catch (error) {
    _logResponse(response.status, content);
    throw error;
  }

  return data;
}

async function _checkResponseCode(response) {
  console.log('response:', response);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(Consts.NOT_LOGIN);
    }

    const content = await
      response.text();
    let data;

    try {
      data = response ? JSON.parse(content) : {};
      _logResponse(response.status, data);
    } catch (error) {
      _logResponse(response.status, content);
      throw content;
    }

    throw data;
  }
}

function _logRequest(method, url, params) {
  if (__DEV__) {
    console.log(`${method}: ${url}`, params);
  }
}

function _logResponse(responseCode, data) {
  if (__DEV__) {
    console.log(responseCode, data);
  }
}

export async function getWallet(coin) {
  try {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD,JPY`;
    const response = await axios.get(url);
    const coinList = response.data.DISPLAY;
    console.log("data:", coinList)
    return coinList;
  } catch (error) {
    console.log("LoadWalletAPI._error:", error)
  }
}
