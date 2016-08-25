'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: {
        src: ['build', 'dist']
      }
    },
    base64: {
      dist: {
        files: {
          'build/web/on.mp3.base64': 'src/web/on.mp3',
          'build/web/off.mp3.base64': 'src/web/off.mp3',
          'build/web/favicon.png.base64': 'src/web/favicon.png'
        }
      }
    },
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed' // nested, compact, compressed or expanded
      },
      dist: {
        files: {
          'build/web/main.min.css': 'src/web/main.scss'
        }
      }
    },
    'string-replace': {
      dist: {
        files: {
          'build/web/main.js': 'src/web/main.js',
          'build/web/index.html': 'src/web/index.html'
        },
        options: {
          replacements: [{
            pattern: /<!-- @import (.*?) -->/ig,
            replacement: function (match, file) {
              return grunt.file.read(file);
            }
          }]
        }
      }
    },
    uglify: {
       dist: {
          options: {
            sourceMap: false,
            mangle: true,
            mangleProperties: false,
            beautify: false
          },
          files: {
             'build/web/main.min.js': 'build/web/main.js'
          }
       }
    },
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { removeAttrs: { attrs: ['xmlns'] } }
        ]
      },
      dist: {
        files: {
          'build/web/switch.min.svg': 'src/web/switch.svg',
          'build/web/finger.min.svg': 'src/web/finger.svg'
        }
      }
    },
    processhtml: {
      options: {
      },
      dist: {
        files: {
          'build/web/index.html': 'build/web/index.html'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/web/index.min.html': 'build/web/index.html',
          'dist/web/hello.min.html': 'src/web/hello.html'
        }
      }
    },
    compress: {
      dist: {
        options: {
          mode: 'gzip'
        },
        files: [
          { expand: true, src: ['dist/web/*.min.html'], ext: '.min.html.gz' }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/micropython', src: '*.py', dest: 'dist/micropython' },
          { expand: true, cwd: 'src/arduino', src: '*.py', dest: 'dist/arduino' }
        ]
      }
    },
    filesize: {
      base: {
        files: [
          { expand: true, cwd: 'dist', src: ['*.html','*.gz','*.py'] }
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'base64',
    'sass',
    'string-replace',
    'uglify',
    'svgmin',
    'processhtml',
    'htmlmin',
    'compress',
    'copy',
    'filesize'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
