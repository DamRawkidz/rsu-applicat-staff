export const environment = {
    hideForm: false,
    production: true,
    rsuCommon: 'https://rsu.71dev.com/edu-api',
    apiName:'https://uat-app.rsu.ac.th/app-api',
    baseUrl:'https://uat-app.rsu.ac.th/app-api',
    
    clientSettings: {
      authority: 'https://uat-iam.rsu.ac.th/',
      client_id: 'rsu-staff-login-product-test2',
      redirect_uri: 'https://uat-app.rsu.ac.th/rsu-staff-web/load',
      post_logout_redirect_uri: 'https://uat-app.rsu.ac.th/rsu-staff-web/load',
      response_type:"id_token token",
      scope:"openid profile school.read school.write address.write address.read course.write course.read application.read",
      filterProtocolClaims: true,
      loadUserInfo: true
    }
  };
  