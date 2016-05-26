'use strict';

angular.module('library', ['ui.router','ngResource','firebase','ui.bootstrap','smart-table'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('home', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'templates/header.html'
                    },
                    'content': {
                        templateUrl : 'templates/content.html'
                    },
                    'readnow@home': {
                        templateUrl : 'templates/readnow.html',
                        controller : 'ListBookController'
                    },                    
                    'lastadded@home': {
                        templateUrl : 'templates/lastadded.html',
                        controller : 'ListBookController'
                    },

                    'listbook@home': {
                        templateUrl : 'templates/listbook.html',
                        controller : 'ListBookController'
                    },
                    
                    'footer': {
                        templateUrl : 'templates/footer.html',
                        controller  : 'StatisticController'
                    }
                }
            })
                    
            .state('allreviews', {
                url: "/allreviews",
                views: {
                    'header': {
                        templateUrl : 'templates/header.html'
                    },                    
                    'content': {
                        templateUrl : 'templates/allreviews.html',
                        controller : 'ListBookController'
                    },
                    'footer': {
                        templateUrl : 'templates/footer.html',
                        controller  : 'StatisticController'
                    }                    
                }
            })   
        
            .state('login', {
                url: "/login"
            })        
        
//
//            // route for login
//            .state('app.login', {
//                url:'/login',
//                views: {
//                    'content@': {
//                        templateUrl : 'templates/login.html',
//                        controller  : 'LoginController'          
//                    }
//                }
//            })
//        
        ;
        $urlRouterProvider.otherwise('/');
    })
;