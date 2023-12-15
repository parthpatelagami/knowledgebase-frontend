// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth/login`,
  logoutEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/jwt/logout`,
  registerEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/register_new_user`,
  refreshEndpoint: `${process.env.REACT_APP_API_ENDPOINT}/refresh_token`,
  
  // ** This will be prefixed in authorization header with token
  // ** Authorization: Bearer <token>
  tokenType: 'Bearer',
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
