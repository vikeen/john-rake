module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);
    
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    johnrake: {
        paths: {
            root: './content/themes/john-rake'
        }
    },
    watch: {
      sass: {
        files: ['<%= johnrake.paths.root %>/assets/**/*.scss'],
        tasks: ['sass:build'],
        options: {
            spawn: false
        },
      }
    },
    copy: {
        build: {
            files: {
                    '<%= johnrake.paths.root %>/assets/css/vendor/pure.css': './node_modules/purecss/build/pure.css'
            }
        }
    },
    sass: {
        build: {
            files: {
                '<%= johnrake.paths.root %>/assets/css/screen.css': '<%= johnrake.paths.root %>/assets/css/screen.scss',
            }
        }
    },
    uglify: {
      build: {
        files: [{
            expand: true,
            cwd: '<%= johnrake.paths.root %>/assets/js',
            dest: '<%= johnrake.paths.root %>/assets/js',
            src: [
                '**/*.js',
                '!**/*.min.js'
            ],
            ext: '.min.js'
        }]
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['copy:build', 'sass:build', 'uglify:build']);

};