/*global module:false*/
module.exports = function(grunt) {
  var defaults = ['jshint', 'mocha', 'mochaTest'],
    jsFiles = ['*.js', 'lib/**/*.js', 'test/**/*.js'];

  // Project configuration.
  var pkg = require('./package.json');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: jsFiles,
      options: {
        boss: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true
      }
    },
    mocha: {
      index: ['test.html']
    },
    mochaTest: {
      files: ['test/server_test.js']
    },
    watch: {
      files: jsFiles,
      tasks: defaults
    },
    buildcontrol: {
      options: {
        dir: '.',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:micjamking/peak.git',
          branch: 'server'
        }
      },
      heroku: {
        options: {
          remote: 'git@heroku.com:glacial-chamber-5485.git',
          branch: 'master',
          tag: pkg.version
        }
      }
    }
  });

  // default tasks
  grunt.registerTask('default', defaults);

  grunt.registerTask('deploy', ['buildcontrol']);

  // Buildcontrol
  grunt.loadNpmTasks('grunt-build-control');
  // JSHint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  // client tests
  grunt.loadNpmTasks('grunt-mocha');
  // server tests
  grunt.loadNpmTasks('grunt-mocha-test');
};
