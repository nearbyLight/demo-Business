//  因为 cookie 的 set 无法使用， 所以使用 localStorage
export function setCookies(userInfo) {
  localStorage.setItem('username', userInfo.username);
  localStorage.setItem('appkey', userInfo.appkey);
  localStorage.setItem('role', userInfo.role);
  localStorage.setItem('email', userInfo.email);
  return true;
}

export function getCookies() {
  return {
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    email: localStorage.getItem('email'),
    appkey: localStorage.getItem('appkey'),
  };
}

export function removeCookies() {
  localStorage.removeItem('username');
  localStorage.removeItem('appkey');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  return true;
}
