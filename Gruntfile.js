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
  grunt.registerTask('default', ['uglify']);

};