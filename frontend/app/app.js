
var app = angular.module('smsXpress', ['ui.router', 'ngMaterial']);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");

    $locationProvider.hashPrefix('');

    $stateProvider

        // .state('sobre', {
        //     url: '/sobre',
        //     templateUrl: './app/components/sobre/sobre.html',
        //     controller: 'sobreController',
        //     controllerAs: 'vm'
        // })
        //
        // .state('sms', {
        //     url: '/sms',
        //     templateUrl: './app/components/sms/sms.html',
        //     controller: 'smsController',
        //     controllerAs: 'vm'
        // })


        .state('home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: './app/components/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm'
                },

                'sobre@home': {
                    templateUrl: './app/components/sobre/sobre.html',
                    controller: 'sobreController',
                    controllerAs: 'vm'
                },

                'sms@home': {
                    templateUrl: './app/components/sms/sms.html',
                    controller: 'smsController',
                    controllerAs: 'vm'
                }
            }
        })

}]);
