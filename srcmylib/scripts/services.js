'use strict';

angular.module('library')

//    .constant("baseURL","https://resplendent-torch-4805.firebaseio.com/library")

    .constant("LIB_CONFIG",{
        "baseURL": "https://resplendent-torch-4805.firebaseio.com/library",
        "finishedReadingState": "Прочитал",
        "nowReadingState": "Читаю сейчас"
     })
        

    // service stub
    .service('aboutFactory', ['LIB_CONFIG', function(LIB_CONFIG) {
            
        
        this.aboutData = 
            {
                firstName: 'Имя 1',
                lastName: 'Фамилия 1'
            };
            
        this.getAboutData = function(){
            return this.aboutData;
        };
        
    }]) 

    //
    // Фабрика для объекта аутентификации
    //
//    .factory("Auth", ['LIB_CONFIG', '$firebaseAuth', function(LIB_CONFIG, $firebaseAuth){
//       var ref = new Firebase(LIB_CONFIG.baseURL);
//	   return $firebaseAuth(ref);
//    }])


    //
    // Фабрика для объекта аутентификации
    //
    .service("Auth2", ['LIB_CONFIG', '$firebaseAuth', function(LIB_CONFIG, $firebaseAuth){
       var ref = new Firebase(LIB_CONFIG.baseURL);
	   var auth = $firebaseAuth(ref);                
       var isLogin  = false;

	   auth.$onAuth(function(authData){
//		  this.authData = authData;
		  if(authData) {
              isLogin = true;
              console.log('Авторизовались:' + authData);
		  }
		  
	   });
        
        
        this.login = function(provider) {
           auth.$authWithOAuthPopup(provider,  { scope: 'email' })
		      .catch(function(error){
                 isLogin = false;
			     console.error('Ошибка авторизации:' + error);
		      })
	     };
        
	   this.logout = function() {           
		  auth.$unauth();
          isLogin = false;
          console.log('Выход из авторизации');
	   };
       
        
        this.isAuth = function(){
            return isLogin;
        }
        
    }])


// Сервис для сохранения полных бэкапов БД (json из firebase)
.service('backupService', ['LIB_CONFIG','$http', function(LIB_CONFIG,$http) {
    var dbLibraryRef = new Firebase(LIB_CONFIG.baseURL); // связь с БД        
    
    
    this.downloadURI = function (uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
    
    
    this.loadData = function(){
        dbLibraryRef.once("value", function(snapshot) {  // получить snapshot данных
            var data = snapshot.exportVal();             // получить json-объект с данными библиотеки
//            console.log('load data + \n ' + data);
//            console.log('load data + \n ' + JSON.stringify(data));
            
            // сохранение в файл
            var blob1 = new Blob([JSON.stringify(data)], {type: "application/json"});
            var url  = URL.createObjectURL(blob1);
            
            var link = document.createElement("a");
            link.download = 'library.data.backup.' + new Date().toISOString() + '.json';
            link.href = url;
            link.click();
                        
            
        });      
    }
}])
    

// Жанры литературы
//.service('genreService', ['baseURL', function(baseURL) {
.service('genreService', ['LIB_CONFIG','$firebaseObject','$firebaseArray', function(LIB_CONFIG,$firebaseObject,$firebaseArray) {
            
     var ref = new Firebase(LIB_CONFIG.baseURL + "/genres"); // связь с БД

     this.genres =  $firebaseArray(ref);                // получение связки с массивом, если есть 

//    this.genres = [
//            {
//                genre: 'Художественная'
//            },
//            {   
//                genre: 'Научно-популярная'
//            },
//            {
//                genre: 'Работа.Техническая'
//            },
//            {
//                genre: 'Работа.Управление'
//            },
//            {
//                genre: 'Психология'
//            },
//            {
//                genre: 'История.Религия'
//            }            
//            ];
    
        this.getGenres = function(){
            return this.genres;
        }
        
    }]) 

// Жанры литературы
//.service('stateService', ['baseURL', function(baseURL) {
.service('stateService', ['LIB_CONFIG','$firebaseObject','$firebaseArray', function(LIB_CONFIG,$firebaseObject,$firebaseArray) {
  
    var ref = new Firebase(LIB_CONFIG.baseURL + "/states"); // связь с БД

    this.states =  $firebaseArray(ref);                // получение связки с массивом, если есть 

    
//        this.states = [
//            {
//                state: 'Не прочитана'
//            },
//            {   
//                state: 'Прочитал'
//            },
//            {
//                state: 'Отложена'
//            },
//            {
//                state: 'Читаю сейчас'
//            }            
//            ];
    
        this.getReadStates = function(){
            return this.states;
        }
        
    }]) 

// Сервис работы с данными книг
.service('bookService', ['LIB_CONFIG', '$firebaseObject','$firebaseArray',function(LIB_CONFIG,$firebaseObject,$firebaseArray) {

     var ref = new Firebase(LIB_CONFIG.baseURL + "/books"); // связь с БД

     this.books =  $firebaseArray(ref);                // получение связки с массивом, если есть 
        
/*
    this.books = [
            {   
                id: 1,
                title : 'Название книги 1',
                author: 'Автор 1',
                state: 'Не прочитана',               
                addDate: new Date().toISOString(),                
                genre: 'Художественная',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            },
            {
                id: 2,
                title : 'Книга, которую читаю сейчас',
                author: 'Автор книги, которую читаю',
                state: 'Читаю сейчас',               
                addDate: new Date(2014,10,30).toISOString(),                
                genre: 'Психология',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            },
            {
                id: 3,
                title : 'Название книги 3',
                author: 'Автор 3',
                state: 'Отложена',               
                publishYear: 2015,
                readYear: 2016,
                addDate: new Date().toISOString(),                
                genre: 'Психология',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            },
            {
                id: 4,
                title : 'Название книги 4',
                author: 'Автор 4',
                state: 'Не прочитана',               
                publishYear: 2015,                
                addDate: new Date().toISOString(),                
                genre: 'Художественная',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            },
            {
                id: 5,
                title : 'Недавно добавленная книга',
                author: 'Автор новой книги',
                state: 'Не прочитана',               
                publishYear: 2015,                
                addDate: new Date(2016,3,14).toISOString(),                
                genre: 'Психология',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            },
            
            {
                id: 6,
                title : 'Название книги 5',
                author: 'Автор 5',
                state: 'Прочитал',               
                publishYear: 2015,
                readYear: 2016,
                addDate: new Date(2011,10,30).toISOString(),                
                genre: 'Работа.Управление',
                webDescriptionLink: '',
                webDownloadLink: '',
                reviewText: ''
            }
            
            ];
*/    
        this.getBooks = function(){
            return this.books;
        };

        this.addNewBook = function(newBook){            
//            this.books.push(newBook);
            this.books.$add(newBook);
        };
    
        this.removeBook = function(bookKey){            
  //          this.books.push(newBook);
            // remove an item from the list
            this.books.$remove(bookKey);            
        };
    

        this.updateBook = function(updatedBook){

            
//            console.log('!!! Before updatedBook.state=' + updatedBook.state);

            
//             this.books.$getRecord(updatedBook.$id).update(updatedBook);            
            var item = this.books.$getRecord(updatedBook.$id);
            item.state = updatedBook.state;
            item.title = updatedBook.title;
            item.author = updatedBook.author;
            item.genre = updatedBook.genre;
            item.webDescriptionLink = updatedBook.webDescriptionLink;
            item.webDownloadLink = updatedBook.webDownloadLink;
            item.publishYear = updatedBook.publishYear;
            item.reviewText = updatedBook.reviewText;
            
            
            this.books.$save(item).then(function() {
                // data has been saved to our database
                console.log('!!! then item.state=' + item.state);
            });
            
//            this.removeBook(item);
//            this.addNewBook(updatedBook);
            
            // change a message and save it
            
//            for (var i = 0, len = this.books.length; i < len; i++) {
//               if (this.books[i].id === updatedBook.id) {
//                   this.books.splice(i,1);
//                   this.books.push(updatedBook);                     
//            console.log('!!! Push() updatedBook.state=' + updatedBook.state);
//            console.log('!!! Push() updatedBook.id =' + updatedBook.id);
//                   return;
//               }
                
                
            
            
        };
    
    }]) 

;                              
                                 