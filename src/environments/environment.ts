// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//Local Path Link

// //General Service
// let BASE_PATH = "http://95ed440fe873.ngrok.io/";

// // Invoice Service Url
// let serviePath_1 ="http://2a088c457b03.ngrok.io/";

// // Biddind Service Url
// let serviePath_2 ="http://2a088c457b03.ngrok.io/";

// //Dashboard Service Url
// let dboardServPath1 ="http://f61c6d5fdccc.ngrok.io/";
// let dboardServPath2 ="http://f61c6d5fdccc.ngrok.io/";
// let dboardServPath3 ="http://f61c6d5fdccc.ngrok.io/";

//Local Path Link 





//General Service
let BASE_PATH = "http://localhost:8080/";

// Invoice Service Url 8080
let serviePath_1 = "http://2a088c457b03.ngrok.io/";

// Bidding Service Url 8081
let serviePath_2 = "http://2a088c457b03.ngrok.io/";

//Financier onboard path
let financierServicePath="http://localhost:8080/"

// Coriolis service path
let coriolisServicePath="http://localhost:3030/"

//Dashboard  Service Url
let dboardServerPath1 = "http://dboardServPath1/";
let getSumOfOpenFinBidding = "https://tradecomm-invoice.ffdcdev.fusionfabric.io/";
let dboardServerPath3 ="http://dboardServPath3/";
let dboardServerPath4 ="http://dboardServPath4/";
let dboardServerPath5 ="http://dboardServPath5/";
let dboardServerPath6 ="http://dboardServPath6/";


export const environment = {
  production: false,
  api_url: `${BASE_PATH}`,
  serviePath_1: `${serviePath_1}`,
  serviePath_2: `${serviePath_2}`,
  dboardServerPath1: `${dboardServerPath1}`,
  getSumOfOpenFinBidding: `${getSumOfOpenFinBidding}`,
  dboardServerPath3: `${dboardServerPath3}`,
  dboardServerPath4: `${dboardServerPath4}`,
  dboardServerPath5: `${dboardServerPath5}`,
  dboardServerPath6: `${dboardServerPath6}`,
  financierServicePath: `${financierServicePath}`,
  coriolisServicePath:`${coriolisServicePath}`,

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
      redirectUri: "http://localhost:4200",
      // clientId:  "Iccmarketplace", //local
      clientId:  "IccMarketplace", //live
 
      // clientId:"iccproject",
 
      // "credentials": {
      //   "secret": "c532d662-99cf-42b0-83ac-e9fee3f7a9d3"
      // } ,
  
      // URL of the SPA to redirect the user to after login
      // redirectUri: 'http://localhost:4200/finanicer-dashboard/',
    
      // The SPA's id.
      // The SPA is registerd with this id at the auth-serverß
      // clientId: 'finanicer-dashboard',
     responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    // scope: 'openid profile email',
    // scope: 'openid profile email',
    scope: 'openid profile email',
 
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error'; // Included with Angular CLI.
