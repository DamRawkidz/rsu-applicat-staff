export const environment = {
  hideForm: true,
  production: true,
  rsuCommon: 'https://rsu.71dev.com/edu-api',
  baseUrl: 'https://rsu.71dev.com/app-api',
  clientSettings: {
    authority: 'https://rsu-iam.71dev.com',
    client_id: 'rsu-staff-login-dev2',
    redirect_uri: 'https://rsu.71dev.com/rsu-web-staff/load',
    post_logout_redirect_uri: 'https://rsu.71dev.com/rsu-web-staff',
    response_type:"token",
    scope:"rsu_staff",
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
