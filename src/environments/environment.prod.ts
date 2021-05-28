//General Service
let BASE_PATH = "https://tradecomm-invoice.ffdcdev.fusionfabric.io/";
 
// Invoice Service Url 8080
let serviePath_1 = "https://tradecomm-invoice.ffdcdev.fusionfabric.io/";
 
// Bidding Service Url 8081
let serviePath_2 = "https://tradecomm-finance.ffdcdev.fusionfabric.io/";
let serviePath_3 = "https://tradecomm-finance.ffdcdev.fusionfabric.io/";
 
// Limit Path
let serviePath_4 = "https://tradecomm-limits.ffdcdev.fusionfabric.io/";
 
//Financier onboard path
let financierServicePath="https://tradecomm-userprofile.ffdcdev.fusionfabric.io/";
 
// Coriolis service path
let coriolisServicePath="https://tradecomm-common.ffdcdev.fusionfabric.io/"

//Redirect URL
let SMEURL = "https://tradecomm-ui.ffdcdev.fusionfabric.io/sme-dashboard"
let FINANCEURL = "https://tradecomm-ui.ffdcdev.fusionfabric.io/financier-dashboard"
let ICCURL = "https://tradecomm-ui.ffdcdev.fusionfabric.io/icc-dashboard"
 
//Dashboard  Service Url
let dboardServerPath1 = "http://dboardServPath1/";
let getSumOfOpenFinBidding = "https://tradecomm-invoice.ffdcdev.fusionfabric.io/";
let dboardServerPath3 ="http://dboardServPath3/";
let dboardServerPath4 ="http://dboardServPath4/";
let dboardServerPath5 ="http://dboardServPath5/";
let dboardServerPath6 ="http://dboardServPath6/";
 
export const environment = {
  production: true,
  api_url: `${BASE_PATH}`,
  serviePath_1: `${serviePath_1}`,
  serviePath_2: `${serviePath_2}`,
  serviePath_3: `${serviePath_3}`,
  serviePath_4: `${serviePath_4}`,
 
  dboardServerPath1: `${dboardServerPath1}`,
  getSumOfOpenFinBidding: `${getSumOfOpenFinBidding}`,
  dboardServerPath3: `${dboardServerPath3}`,
  dboardServerPath4: `${dboardServerPath4}`,
  dboardServerPath5: `${dboardServerPath5}`,
  dboardServerPath6: `${dboardServerPath6}`,
  financierServicePath: `${financierServicePath}`,
  coriolisServicePath:`${coriolisServicePath}`,
  SMEURL : `${SMEURL}`,
  FINANCEURL:`${FINANCEURL}`,
  ICCURL:`${ICCURL}`,
 
  keycloak : {
    // Url of the Identity Provider
    // issuer: 'http://localhost:8080/auth/realms/Icctradecomm', //local
    // issuer:"https://tradecomm-keycloak.ffdcdev.fusionfabric.io/auth/realms/icctradecomm", // old live
    issuer:"https://tradecomm-keycloak-admin.ffdcdev.fusionfabric.io/auth/realms/icctradecomm", // new live
    // issuer:"https://tradecomm-keycloak-admin.ffdcdev.fusionfabric.io/auth/realms/icccloak",
 
  
    // URL of the SPA to redirect the user to after login
    // redirectUri: 'http://localhost:4200/finanicer-dashboard/',
  
    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    // clientId: 'finanicer-dashboard',
      redirectUri: "https://tradecomm-ui.ffdcdev.fusionfabric.io",
      // clientId:  "Iccmarketplace", //local
      clientId:  "IccMarketplace", //live
 
 
      // clientId:"admin-spring-boot"
 
     secretId:"00b11311-73bd-4527-ae4d-7889ee0fcd35",
  
      // URL of the SPA to redirect the user to after login
      // redirectUri: 'http://localhost:4200/finanicer-dashboard/',
    
      // The SPA's id.
      // The SPA is registerd with this id at the auth-serverß
      // clientId: 'finanicer-dashboard',
     responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    // scope: 'openid profile email',
    scope: 'openid profile email',
 
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};
 
