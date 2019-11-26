const TOKEN_KEY = 'LOGININFO'
const sessionStorage = window.sessionStorage
export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}

export const setToken = MsysOpr => {
  return sessionStorage.setItem(TOKEN_KEY, MsysOpr)
}

export const removeToken = () => {
  return sessionStorage.removeItem(TOKEN_KEY)
}
