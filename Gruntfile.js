// Generated on 2014-04-20 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'phonegap/www'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      images: '<%= yeoman.app %>/images/icons',
      appImages: '<%= yeoman.dist %>/images',
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall : {
      app: {
        src: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/',
        exclude: [
          '<%= yeoman.app %>/bower_components/jquery',
          '<%= yeoman.app %>/bower_components/fastclick',
          '<%= yeoman.app %>/bower_components/jquery.cookie',
          '<%= yeoman.app %>/bower_components/jquery-placeholder',
          '<%= yeoman.app %>/bower_components/foundation/js/foundation.js',
          '<%= yeoman.app %>/bower_components/angular-foundation/mm-foundation-tpls.js'
        ]
      },
      test: {
        src: 'karma.conf.js',
        exclude: [
          '<%= yeoman.app %>/bower_components/jquery',
          '<%= yeoman.app %>/bower_components/fastclick',
          '<%= yeoman.app %>/bower_components/jquery.cookie',
          '<%= yeoman.app %>/bower_components/jquery-placeholder',
          '<%= yeoman.app %>/bower_components/es5-shim/es5-shim.js',
          '<%= yeoman.app %>/bower_components/json3/lib/json3.min.js',
          '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
          '<%= yeoman.app %>/bower_components/foundation/js/foundation.js',
          '<%= yeoman.app %>/bower_components/angular-scenario/angular-scenario.js',
          '<%= yeoman.app %>/bower_components/angular-foundation/mm-foundation-tpls.js'
        ],
        devDependencies: true,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'.*\.js'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/es5-shim/*',
            'bower_components/json3/**/*',
            'images/{,*/}*.{webp}',
            'fonts/**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      imagesiOS: {
        expand: true,
        cwd: '<%= yeoman.app %>/images/ios',
        dest: 'phonegap/platforms/ios/Mintpal-Market/Resources/',
        src: [
          'icons/{,*/}*.{png,jpg}',
          'splash/{,*/}*.{png,jpg}'
        ]
      },
      imagesAndroid: {
        expand: true,
        cwd: '<%= yeoman.app %>/images/android',
        dest: 'phonegap/platforms/android/res/',
        src: [
          '{,*/}*.{png,jpg}',
          '!playstore-icon.png'
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    // Run Cordova commands to build mobile app
    shell: {
      phonegapBuild: {
        command: 'cd phonegap && cordova build',
        options: {
          stdout: true
        }
      },
      phonegapRun: {
        command: 'cd phonegap && cordova run ios',
        options: {
          stdout: true
        }
      }
    },
    /*rasterize: {
      your_target: {
      vector: '<%= yeoman.app %>/images/AppIcon.svg',
      raster: [
          { path: '<%= yeoman.app %>/images/icons/icon.png', width: 57 },
          { path: '<%= yeoman.app %>/images/icons/icon@2x.png', width: 114 },
          { path: '<%= yeoman.app %>/images/icons/icon-small.png', width: 29 },
          { path: '<%= yeoman.app %>/images/icons/icon-small@2x.png', width: 58 },
          { path: '<%= yeoman.app %>/images/icons/icon-40.png', width: 40 },
          { path: '<%= yeoman.app %>/images/icons/icon-40@2x.png', width: 80 },
          { path: '<%= yeoman.app %>/images/icons/icon-50.png', width: 50 },
          { path: '<%= yeoman.app %>/images/icons/icon-50@2x.png', width: 100 },
          { path: '<%= yeoman.app %>/images/icons/icon-60.png', width: 60 },
          { path: '<%= yeoman.app %>/images/icons/icon-60@2x.png', width: 120 },
          { path: '<%= yeoman.app %>/images/icons/icon-72.png', width: 72 },
          { path: '<%= yeoman.app %>/images/icons/icon-72@2x.png', width: 144 },
          { path: '<%= yeoman.app %>/images/icons/icon-76.png', width: 76 },
          { path: '<%= yeoman.app %>/images/icons/icon-76@2x.png', width: 152 },
          { path: '<%= yeoman.app %>/images/icons/icon-36-ldpi.png', width: 36 },
          { path: '<%= yeoman.app %>/images/icons/icon-48-mdpi.png', width: 48 },
          { path: '<%= yeoman.app %>/images/icons/icon-72-hdpi.png', width: 72 },
          { path: '<%= yeoman.app %>/images/icons/icon-96-xhdpi.png', width: 96 }
        ]
      }
    }*/
    favicons: {
      options: {
        androidHomescreen: true,
        appleTouchPadding: 0,
        windowsTile: false
      },
      icons: {
        src: 'app/images/AppIcon.png',
        dest: 'app/images/icons'
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'clean:appImages',
    'copy:imagesiOS',
    'copy:imagesAndroid',
    'shell:phonegapBuild'
  ]);

  grunt.registerTask('run', [
    'shell:phonegapRun'
  ]);

  grunt.registerTask('rasterize', [
    'clean:images',
    'favicons'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
