const { serialize, parse } = require('cookie');

const TOKEN_NAME = 'token'
const MAX_AGE = 60 * 60 * 8 // 8 hours

function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

function parseCookies(req) {
  if (req.cookies) return req.cookies

  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

module.exports = {
  setTokenCookie,
  removeTokenCookie,
  parseCookies,
  getTokenCookie
};