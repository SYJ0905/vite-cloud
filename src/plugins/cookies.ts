import Cookies from 'js-cookie';

const login = 'session';

const loginToken = (loginToken: string) => ({
  get() {
    const data = Cookies.get(loginToken) ? Cookies.get(loginToken) : '';
    return data;
  },
  set(data: string) {
    Cookies.set(loginToken, data);
  },
  remove() {
    Cookies.remove(loginToken);
  },
});

export const LOGIN_TOKEN = loginToken(login);
export const LOGIN = login;
