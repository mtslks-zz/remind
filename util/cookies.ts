import { serialize } from 'cookie';

export function createSerializedSessionTokenCookie(token: string) {
  // Detect whether we're in a production environment
  // eg. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 60 * 24; // 24 hours
  return serialize('sessionToken', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,

    path: '/',

    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}

// 5' timeout for registration process
export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 5;
  return serialize('sessionTokenRegister', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    httpOnly: true,
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
