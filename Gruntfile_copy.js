//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {
  // Инициализация конфига GruntJS
  grunt.initConfig({

    //Настройки различных модулей GruntJS, их нужно предварительно установить через менеджер пакетов npm, или добавить в файл package.json перед запуском npm install

    //Например проверка кода javascript с помощью утилиты jshint
//    jshint: {},

    //Склеивание файлов
//    concat: {}

   // Удаление всего внутри папки public, находящейся в текущем каталоге
   // при этом не удалять саму папку public      
//copy: {
//  main: {
//    expand: true,
//    src: ['index.html','images/*','bower_components/**'],
//    dest: 'public/',
//  },
//}      
      
   // Копирование из подпапки srcmylib всего содержимого с подкаталогами,в папку public
  copy: {
    main: {
//    expand: true,      
//    src: ['srcmylib/images/**','srcmylib/scripts/**','srcmylib/styles/**','srcmylib/templates/**','srcmylib/index.html'],
//    dest: 'public/'
        expand: true,
        cwd: 'srcmylib',
        src: ['**'],
        dest: 'public/'
    }
  }
      
  });

  //Загрузка модулей, которые предварительно установлены
    
//    grunt.loadNpmTasks('grunt-contrib-clean');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

  //Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
  // 'default' тут означает,что этот таск выполнится при запуске grunt без параметров
  grunt.registerTask('default', ['copy']);
};