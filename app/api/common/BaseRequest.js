import AppConfig from '../../utils/AppConfig';
import Consts from '../../utils/Consts';

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
  const responsePost = await _processResponse(response);
  return responsePost;
}

export async function put(url, params = {}) {
  const response = await fetch(_getFullUrl(url), {
    method: 'PUT',
    headers: _getHeader(),
    body: JSON.stringify(params),
  });

  _logRequest('PUT', url, params);
  const responsePut = await _processResponse(response);
  return responsePut;
}

export async function del(url, params = {}) {
  const response = await fetch(_getFullUrl(url), {
    method: 'DELETE',
    headers: _getHeader(),
    body: JSON.stringify(params),
  });

  _logRequest('DELETE', url, params);
  const responseDel = await _processResponse(response);
  return responseDel;
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
