'use strict';

angular.module('library')

///////////////////////////////////////////////////////////////////////////////////////////
//        Контроллер со статистикой
//
////////////////////////////////////////////////////////////////////////////////////////////
.controller('StatisticController', ['$scope', 'bookService', function ($scope, bookService) {


    $scope.countStat = function () {
        $scope.allBooksCount = bookService.getBooks().length;

        $scope.booksCount2015 = bookService.getBooks().filter(function (obj) {
            if (obj.readYear === 2015) {
                return true;
            } else {
                return false;
            }
        }).length;

        $scope.booksCount2016 = bookService.getBooks().filter(function (obj) {
            if (obj.readYear === 2016) {
                return true;
            } else {
                return false;
            }
        }).length;

    };

    // Вызывается после первой загрузки массива
    bookService.getBooks().$loaded($scope.countStat);


    // Вызывается при каждом изменении массива
    bookService.getBooks().$watch(function (event) {
        console.log(event);
        $scope.countStat();
    });

}])

///////////////////////////////////////////////////////////////////////////////////////////
//        Контроллер для авторизации
//
////////////////////////////////////////////////////////////////////////////////////////////
.controller("AuthController", ['$scope', 'Auth2', 'backupService', function ($scope, Auth2, backupService) {


    //       $scope.provider = '';
    $scope.isLogin = function () {
        return Auth2.isAuth();
    };


    $scope.login = function (provider) {
        Auth2.login(provider);
    };

    $scope.logout = function () {
        Auth2.logout();
    };

    $scope.loadData = function () {
        backupService.loadData();
    };

    }])

/////////////////////////////////////////////////////////////////////////////////////////////////
//  Контроллер для работы
//      со списком книг
/////////////////////////////////////////////////////////////////////////////////////////////////
.controller('ListBookController', ['$scope', 'LIB_CONFIG', 'genreService', 'bookService', 'stateService', 'Auth2', function ($scope, LIB_CONFIG, genreService, bookService, stateService, Auth2) {
    $scope.genres = genreService.getGenres();
    $scope.books = bookService.getBooks();
    $scope.myData = $scope.books;

    $scope.isLogin = function () {
        return Auth2.isAuth();
    };

    // Поле для выбранного жанра
    $scope.selectedGenre = "";
    // поле для поиска по библиотека
    //        $scope.searchInBooksText = "";


    // ф-ция для фильтрации списка в выбранном tab-е
    $scope.select = function (setGenre) {
        $scope.selectedGenre = setGenre;
    };

    // функция для выделения (active) выбранного tab-а
    $scope.isSelected = function (selectedGenre) {
        //           console.log('$scope.selectedGenre=' + $scope.selectedGenre + '; selectedGenre=' + selectedGenre); 
        return ($scope.selectedGenre === selectedGenre);
    };


    //remove to the real data holder
    $scope.removeItem = function (book) {
        if (confirm('Удалить книгу : [' + book.title + '] ?')) {
            bookService.removeBook(book);
        }
    };

    // Установить состояние "Прочитал"
    $scope.setStateReadFinish = function (book) {
        if (confirm('Прочитал [' + book.title + '] ?')) {
            book.state = LIB_CONFIG.finishedReadingState;
            book.readYear = new Date().getFullYear();
            bookService.updateBook(book);
            // запускаем событие вверх
            $scope.$emit('booksEdited', 'Data to send');
        }
    };

    // Установить состояние "Читаю сейчас"
    $scope.setStateReadNow = function (book) {
        if (confirm('Начать читать [' + book.title + '] ?')) {
            book.state = LIB_CONFIG.nowReadingState;
            bookService.updateBook(book);
        }
    };



    //remove to the real data holder
    //        $scope.removeItem = function (book) {
    //            if (confirm('Удалить книгу : [' + book.title + '] ?')) {
    //                bookService.removeBook(book);
    //            }
    //        }        

    }])


//////////////////////////////////////////////////////////////////////////////////////
//       Контроллер для работы
//       с формой отдельной книги
///////////////////////////////////////////////////////////////////////////////////////
.controller('OneBookController', ['$scope', 'bookService', 'stateService', '$uibModal', function ($scope, bookService, stateService, $uibModal) {


    //        $scope.newBook = {
    //            title : '',
    //            author: '',
    //            state: 'Не прочитана',               
    //            addDate: new Date().toISOString(),                
    //            genre: 'Художественная',
    //            webDescriptionLink: '',
    //            webDownloadLink: ''
    //        };

    /////////////////////////////////////////////////////////////////////
    //      Функция показа модального окна Добавления новой книги
    /////////////////////////////////////////////////////////////////////
    $scope.showAddForm = function (size) {

        var modalInstance = $uibModal.open({
            //      animation: $scope.animationsEnabled,
            templateUrl: 'templates/onebookform.html',
            controller: 'AddModalBookForm',
            size: size,
            resolve: {
                // это параметр, передаваемый в модальное окно                     
                //                    newBookIn: function () {
                //                        return $scope.newBook;
                //                    }
            }
        });

        modalInstance.result.then(
            // Если выбран close(newBook) в контроллере ModalInstanceCtrl (тот что указан в open())
            // newBookResult - значение параметра newBook, переданного в методе close(newBook)
            function (newBookResult) {
                //                    $scope.newBook = newBookResult;
                // добавить новую книгу-объект в список
                bookService.addNewBook(newBookResult);
            }, // Если выбран dismiss() в контроллере ModalInstanceCtrl (тот что указан в open())
            function () {
                //$log.info('Modal dismissed at: ' + new Date());
                console.log('!!! not select'); // Если не выбран select
            });
    };


    /////////////////////////////////////////////////////////////////////
    //      Функция показа модального окна Редактирования книги
    /////////////////////////////////////////////////////////////////////        
    $scope.showEditForm = function (book) {

        $scope.editBook = book;
        console.log('!!! $scope.editBook/title = ' + $scope.editBook.title);

        var modalInstance = $uibModal.open({
            //      animation: $scope.animationsEnabled,
            templateUrl: 'templates/onebookform.html',
            controller: 'EditModalBookForm',
            //                size: size,           
            resolve: {
                // это параметр, передаваемый в модальное окно                     
                editBook: function () {
                    return $scope.editBook;
                }
            }
        });

        modalInstance.result.then(
            // Если выбран close(newBook) в контроллере ModalInstanceCtrl (тот что указан в open())
            // newBookResult - значение параметра newBook, переданного в методе close(newBook)
            function (updatedBook) {
                //                    $scope.newBook = newBookResult;
                //                    console.log('Before updatedBook.state='+ updatedBook.state);
                //                    console.log("updatedBook.$id =  " + updatedBook.$id); 
                // добавить новую книгу-объект в список
                bookService.updateBook(updatedBook);
                //                    $scope.$parent.gridOptions.data = $scope.$parent.books;
                //                    console.log('After update $scope.$parent.books='+ $scope.$parent.books.length);

            }, // Если выбран dismiss() в контроллере ModalInstanceCtrl (тот что указан в open())
            function () {
                //$log.info('Modal dismissed at: ' + new Date());
                console.log('!!! not select'); // Если не выбран select
            });
    };


    }])

//////////////////////////////////////////////////////////////
// Это контроллер, обрабатывающий события и т.п. в модальном окне ввода новой книги;
//
// $uibModalInstance - сервис библиотеки ui.bootstrap
// 
//////////////////////////////////////////////////////////////
.controller('AddModalBookForm', ['$scope', '$uibModalInstance', 'genreService', 'stateService', function ($scope, $uibModalInstance, genreService, stateService) {

    $scope.oneBook = {
        id: new Date().getTime(),
        title: '',
        author: '',
        state: 'Не прочитана',
        addDate: new Date().toISOString(),
        genre: 'Художественная',
        publishYear: '',
        readYear: '',
        webDescriptionLink: '',
        webDownloadLink: '',
        reviewText: ''
    };

    $scope.genres = genreService.getGenres();
    $scope.states = stateService.getReadStates();


    $scope.ok = function () {
        $uibModalInstance.close($scope.oneBook);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    }])

//////////////////////////////////////////////////////////////
// Это контроллер, обрабатывающий события и т.п. в модальном окне ввода новой книги;
//
// $uibModalInstance - сервис библиотеки ui.bootstrap
// editBook - объект-значение-параметр, передаваемый из вызываемого контроллера (здесь OneBookController) 
//             в вызове $uibModal.open(...), в поле resolve
// 
// 
//////////////////////////////////////////////////////////////

.controller('EditModalBookForm', ['$scope', '$uibModalInstance', 'editBook', 'genreService', 'stateService', function ($scope, $uibModalInstance, editBook, genreService, stateService) {


    // clone object
    // иначе из-за ссылки на editBook и связывания в angular, сразу меняется содержимое editBook
    // получается: выбор а затем cancel всё-равно изменяет объект
    $scope.oneBook = JSON.parse(JSON.stringify(editBook));

    //        console.log("editBook =  " + editBook.$id);  
    //       console.log("$scope.oneBook =  " + $scope.oneBook.$id); 

    $scope.genres = genreService.getGenres();
    $scope.states = stateService.getReadStates();

    $scope.ok = function () {

        // Обновить время прочтения
        if ($scope.oneBook.state === 'Прочитал') {
            $scope.oneBook.readYear = new Date().getFullYear();
        }
        $uibModalInstance.close($scope.oneBook);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    }])

//////////////////////////////////////////////////////////////////////////////////////
//       Контроллер для работы
//       с формой заметок (review) на книгу
///////////////////////////////////////////////////////////////////////////////////////
.controller('ReviewBookController', ['$scope', 'bookService', 'stateService', '$uibModal', function ($scope, bookService, stateService, $uibModal) {


    /////////////////////////////////////////////////////////////////////
    //      Функция показа модального окна Редактирования книги
    /////////////////////////////////////////////////////////////////////        
    $scope.showEditForm = function (book) {

        $scope.editBook = book;
        console.log('!!! $scope.editBook/title = ' + $scope.editBook.title);

        var modalInstance = $uibModal.open({
            //      animation: $scope.animationsEnabled,
            templateUrl: 'templates/review.html',
            controller: 'ReviewModalBookForm',
            //                size: size,           
            resolve: {
                // это параметр, передаваемый в модальное окно                     
                editBook: function () {
                    return $scope.editBook;
                }
            }
        });

        modalInstance.result.then(
            // Если выбран close(newBook) в контроллере ModalInstanceCtrl (тот что указан в open())
            // newBookResult - значение параметра newBook, переданного в методе close(newBook)
            function (updatedBook) {
                //                    $scope.newBook = newBookResult;
                //                    console.log('Before updatedBook.state='+ updatedBook.state);
                //                    console.log("updatedBook.$id =  " + updatedBook.$id); 
                // добавить новую книгу-объект в список
                bookService.updateBook(updatedBook);
                //                    $scope.$parent.gridOptions.data = $scope.$parent.books;
                //                    console.log('After update $scope.$parent.books='+ $scope.$parent.books.length);

            }, // Если выбран dismiss() в контроллере ModalInstanceCtrl (тот что указан в open())
            function () {
                //$log.info('Modal dismissed at: ' + new Date());
                console.log('!!! not select'); // Если не выбран select
            });
    };

    }])

.controller('ReviewModalBookForm', ['$scope', '$uibModalInstance', 'editBook', 'genreService', 'stateService', function ($scope, $uibModalInstance, editBook, genreService, stateService) {

    // clone object
    // иначе из-за ссылки на editBook и связывания в angular, сразу меняется содержимое editBook
    // получается: выбор а затем cancel всё-равно изменяет объект
    $scope.oneBook = JSON.parse(JSON.stringify(editBook));


    $scope.ok = function () {
        $uibModalInstance.close($scope.oneBook);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    }]);