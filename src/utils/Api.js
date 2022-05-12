class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, { headers: this._headers })
      .then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.description })
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, { headers: this._headers })
      .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  updateCardLike(id, liked) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: liked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38/',
  headers: {
    authorization: 'fa48ff2e-d2a9-4324-9dba-bc9235b793c8',
    'Content-Type': 'application/json'
  }
});

export { api }