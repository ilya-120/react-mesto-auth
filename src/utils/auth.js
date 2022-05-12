const BASE_URL = 'https://auth.nomoreparties.co';

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.status === 201 ? res.json() : res);
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('email', data.email);

      return data;
    });
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.status === 200 ? res.json() : res);
};
