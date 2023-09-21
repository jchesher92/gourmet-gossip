const tokenName = 'gourmet-gossip-token'

export function setToken(token) {
  localStorage.setItem(tokenName, token)
}

export function getToken() {
  return localStorage.getItem(tokenName)
}

export function deleteToken() {
  return localStorage.removeItem(tokenName)
}