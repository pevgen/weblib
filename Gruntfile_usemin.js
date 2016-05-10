//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {
  // Инициализация конфига GruntJS
  grunt.initConfig({

    //Настройки различных модулей GruntJS, их нужно предварительно установить через менеджер пакетов npm, или добавить в файл package.json перед запуском npm install

    // Какие файлы обрабатывать для склейки usemin и в какую папку складывать 
    useminPrepare: {
        html: 'src/index.html',
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
// simple build task
   

  //Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
  // 'default' тут означает,что этот таск выполнится при запуске grunt без параметров
  grunt.registerTask('default', [
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
  ]); 
};