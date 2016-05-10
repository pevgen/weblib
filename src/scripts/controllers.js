'use strict';

angular.module('webTest')

    // controller stub
    .controller('AboutController', ['$scope', 'aboutFactory', function($scope, aboutFactory) {
        $scope.aboutData = aboutFactory.getAboutData();                                          
            //$scope.leaders = corporateFactory.getLeaders();                                    
    }])

    .controller('PeopleController', ['$scope', 'peopleFactory', 'AuthService', function($scope, peopleFactory, $AuthService) {
        $AuthService.logon();
        
        
        $scope.administration = peopleFactory.getAdministration();                                          
        $scope.newPerson = {};
        
        $scope.removePerson = function($person){
            if (confirm("Удалить ?")) {
              peopleFactory.removePerson($person);
            }          
        };
        
        $scope.addNewPerson = function(){
          //$scope.administration.push($scope.newPerson);
          peopleFactory.savePerson($scope.newPerson);
          $scope.newPerson = {};
        }
          
//            $scope.administration = [
//            {
//                firstName: 'Вася',
//                lastName: 'Пупкин',
//                post:'Президент'
//            },
//            {
//                firstName: 'Клава',
//                lastName: 'Карапузова',
//                post:'Администратор'
//            },
//            {
//                firstName: 'Петя',
//                lastName: 'Васечкин',
//                post:'Директор'
//            }
//        ];
        
          
    }])

.controller('LoginController', ['$scope', function($scope) {
    
    $scope.login = function(){
        console.log('Username: [' + $scope.username + ']; Password: [' + $scope.password + ']');
    }
    
}])


;