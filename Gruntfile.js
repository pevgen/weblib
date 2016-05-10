//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {

  // глобальная переменная    
  var globalConfig = {
    src: 'srcmylib',
    dest: 'dev'
  };
        
  // Инициализация конфига GruntJS
  grunt.initConfig({
      
    // делаем так, что глобальная переменная становится видна внутри конфига  
    globalConfig: globalConfig,

    //Настройки различных модулей GruntJS, их нужно предварительно установить через менеджер пакетов npm, или добавить в файл package.json перед запуском npm install

   // Удаление всего внутри папки public, находящейся в текущем каталоге
   // при этом не удалять саму папку public      
   clean: {
    contents: ['public/*']
   },      
      
      
  // Копирование из подпапки srcmylib всего содержимого с подкаталогами,в папку public
  copy: {
    main: {
        expand: true,
        //cwd: 'srcmylib',
        cwd: '<%= globalConfig.src  %>',
        src: ['**'],
        dest: 'public/'
    },
      // Шрифты надо копировать отдельно из bootstrap и font-awesome; 
      // они ищутся в папке fonts, которая создаётся при копировании
      fonts: {
          files:[
              {
                  //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'public'
                }, {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'public'
                }
          ]
        }
  },  
      
    // Какие файлы обрабатывать для склейки usemin и в какую папку складывать 
    useminPrepare: {
        html: '<%= globalConfig.src  %>/index.html',
        options: {
            dest: 'public'
        }
    },

      
  // Concat
    concat: {
        options: {
            separator: ';'
        },
        // dist configuration is provided by useminPrepare
        dist: {}
    },
      // Uglify
    uglify: {
        // dist configuration is provided by useminPrepare
        dist: {}
    },
    cssmin: {
        dist: {}
    },      
      // Usemin
      // Replaces all assets with their revved version in html and css files.
      // options.assetDirs contains the directories for finding the assets
      // according to their relative paths
    usemin: {
        html: ['public/*.html'],
        options: {
            assetsDirs: ['public', 'public/styles']
        }
    }
//      ,      
//    watch: {
//        scripts: {
//            files: ['srcmylib/**/*.*'],
//            tasks: ['concat', 'uglify'],
//            options: {
//                spawn: false,
//            },
//        }
//    }      
  });

  //Загрузка модулей, которые предварительно установлены
//    grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');   
//  grunt.loadNpmTasks('grunt-contrib-watch');
// simple build task
   

  //Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
  // 'default' тут означает,что этот таск выполнится при запуске grunt без параметров
  grunt.registerTask('default', [
      'clean',
      'copy',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
//      ,'watch'  
  ]); 
};