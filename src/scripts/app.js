'use strict';

angular.module('webTest', ['ui.router','ngResource','firebase'])

    // your Firebase data URL goes here, no trailing slash
    .constant('FBURL', 'https://angularfire-seed-dev.firebaseio.com')

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'templates/header.html'
                    },
                    'content': {
                        templateUrl : 'templates/home.html'
                    },
                    'footer': {
                        templateUrl : 'templates/footer.html',
                        controller  : 'AboutController'
                    }
                }

            })
        
            // route for the volonteers page
            .state('app.volonteers', {
                url:'/volonteers',
                views: {
                    'content@': {
                        templateUrl : 'templates/volonteers.html',
                        controller  : 'AboutController'          
                    }
                }
            })
            // route for the administration page
            .state('app.administration', {
                url:'/administration',
                views: {
                    'content@': {
                        templateUrl : 'templates/administration.html',
                        controller  : 'PeopleController'          
                    }
                }
            })

            // route for login
            .state('app.login', {
                url:'/login',
                views: {
                    'content@': {
                        templateUrl : 'templates/login.html',
                        controller  : 'LoginController'          
                    }
                }
            })
        
        ;
        $urlRouterProvider.otherwise('/');
    })
;