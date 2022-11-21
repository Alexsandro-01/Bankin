export function setUserOnStorage(token: string) {
  sessionStorage.setItem('token', token)
}

export function getUserOnStorage() {
  const token = sessionStorage.getItem('token');

  return token;
}