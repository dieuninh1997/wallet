import AppConfig from '../utils/AppConfig';
import Consts from '../utils/Consts';

export default class BaseRequest {
  async get(url, params = {}) {
    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    const fullUrl = `${this._getFullUrl(url)}?${query}`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this._getHeader(),
    });

    this._logRequest('GET', url, params);
    const responseGet = await this._processResponse(response);
    return responseGet;
  }

  async post(url, params = {}) {
    const response = await fetch(this._getFullUrl(url), {
      method: 'POST',
      headers: this._getHeader(),
      body: JSON.stringify(params),
    });

    this._logRequest('POST', url, params);
    const responsePost = await this._processResponse(response);
    return responsePost;
  }

  async put(url, params = {}) {
    const response = await fetch(this._getFullUrl(url), {
      method: 'PUT',
      headers: this._getHeader(),
      body: JSON.stringify(params),
    });

    this._logRequest('PUT', url, params);
    const responsePut = await this._processResponse(response);
    return responsePut;
  }

  async del(url, params = {}) {
    const response = await fetch(this._getFullUrl(url), {
      method: 'DELETE',
      headers: this._getHeader(),
      body: JSON.stringify(params),
    });

    this._logRequest('DELETE', url, params);
    const responseDel = await this._processResponse(response);
    return responseDel;
  }

  _getFullUrl(url) {
    return `${AppConfig.getApiServer()}/api/${AppConfig.getApiVersion()}${url}`;
  }

  _getHeader() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AppConfig.ACCESS_TOKEN}`,
    };
  }

  async _processResponse(response) {
    await this._checkResponseCode(response);

    const content = await response.text();
    let data;

    try {
      data = content ? JSON.parse(content) : {};
      this._logResponse(response.status, data);
    } catch (error) {
      this._logResponse(response.status, content);
      throw error;
    }

    return data;
  }

  async _checkResponseCode(response) {
    console.log('response:', response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(Consts.NOT_LOGIN);
      }

      const content = await response.text();
      let data;

      try {
        data = response ? JSON.parse(content) : {};
        this._logResponse(response.status, data);
      } catch (error) {
        this._logResponse(response.status, content);
        throw content;
      }

      throw data;
    }
  }

  _logRequest(method, url, params) {
    if (__DEV__) {
      console.log(`${method}: ${url}`, params);
    }
  }

  _logResponse(responseCode, data) {
    if (__DEV__) {
      console.log(responseCode, data);
    }
  }
}
