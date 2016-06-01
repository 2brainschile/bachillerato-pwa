require('./vendor')();

angular.module('bachillerato', [
  'ngSanitize',
  'ui.router',
  'angularRipple',
  require('./config').name,
  require('./controllers').name,
  require('./services').name
])
;

var config = {
  apiKey: "AIzaSyCth7slgSbouqIiwpTMjmLdZIEJs1aSK58",
  authDomain: "bachillerato-pwa.firebaseapp.com",
  databaseURL: "https://bachillerato-pwa.firebaseio.com",
  storageBucket: "bachillerato-pwa.appspot.com",
};
firebase.initializeApp(config);
