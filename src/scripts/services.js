'use strict';

angular.module('webTest')

    .constant("baseURL","http://localhost:3000/")
        

    // service stub
    .service('aboutFactory', ['baseURL', function(baseURL) {
            
        
        this.aboutData = 
            {
                firstName: 'Имя 1',
                lastName: 'Фамилия 1'
            };
            
        this.getAboutData = function(){
            return this.aboutData;
        }
        
    }]) 


    // service stub
    .service('peopleFactory', ['baseURL','AuthService','$firebase','$firebaseObject','$firebaseArray', function(baseURL,$AuthService,$firebase,$firebaseObject,$firebaseArray) {
//        var myDataRef = new Firebase('https://g17axj6e4fm.firebaseio-demo.com/');        
//        myDataRef.push({name: 'Кто-то', text: 'что-то'});
            //var ref = new Firebase("https://g17axj6e4fm.firebaseio-demo.com/administration");
        //var ref = new Firebase("https://g17axj6e4fm.firebaseio-demo.com");
//        var ref = $AuthService.getRef();
        var ref = new Firebase("https://resplendent-torch-4805.firebaseio.com");        
        this.administration =  $firebaseArray(ref.child('administration'));
        
//ref.authWithPassword({
//  email    : "bobtony@firebase.com",
//  password : "correcthorsebatterystaple"
//}, function(error, authData) {
//  if (error) {
//    console.log("Login Failed!", error);
//  } else {
//    console.log("Authenticated successfully with payload:", authData);
//  }
//});        
        
        
  // download the data into a local object
//            var syncObject = $firebaseObject(ref);
        // download the data into a local object
//        var data = $firebaseObject(ref);        
//            $firebase(ref.child('rooms')).$asArray();    
        
//            this.administration =  $firebaseArray(ref.child('administration'));
        
//            [
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
    
/*        if ($AuthService.getMyAuth()) {
            console.log("Logged in as:", $AuthService.getMyAuth().uid);
            console.log('before get array')            
            this.administration =  $firebaseArray(ref.child('administration'));
            console.log('after get array')

        } else {
           console.log("Logged out");
        }
*/
        
        this.getAdministration = function(){
//            $AuthService.getMyAuth();
            return this.administration;
        }
        
        this.savePerson = function($newPerson){
           this.administration.$add($newPerson); 
        }
        
        this.removePerson = function($person){
            this.administration.$remove($person);
        }
        
    }]) 


.factory("AuthService", function ($firebaseAuth, $rootScope) {
  var ref = new Firebase("https://resplendent-torch-4805.firebaseio.com");
  var firebaseAuth = $firebaseAuth(ref);
    
  // now create the interface between firebase and your application
  var authService = {};
  
//  authService.getRef = function(){
//      return ref;
//  }    
    
  authService.logon = function(){      
    firebaseAuth.$authWithPassword(
      {
            email    : "lokhankin.2.0@mail.ru",
            password : "qwerty"
      })
      .then(function(authData) {
            console.log("Logged in as:", authData.uid);
        })
      .catch(function(error) {
        console.error("Authentication failed:", error);
      });      
  }
  
//  authService.getMyAuth = function() {
//      return firebaseAuth.$getAuth;
//  }
  
  return authService;
})
;                              
                                 