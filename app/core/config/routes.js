export default ["$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'HomeCtrl',
      template: require('../modules/home/home.jade'),
    });
}];
