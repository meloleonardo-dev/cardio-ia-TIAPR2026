export function codificarSenha(senha) {
  return btoa(unescape(encodeURIComponent(senha)))
}
 
export function senhaConfere(digitada, guardada) {
  return codificarSenha(digitada) === guardada
}
