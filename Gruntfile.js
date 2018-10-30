module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    const mozjpeg = require('imagemin-mozjpeg');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'firefox >3 ', 'ie 8', 'ie 9']
            },
            dist: {
                src: 'css/style.css',
                dest: 'css/other.css'
            }
        },
        watch: {
            autoprefixer: {
                files: ['css/style.css'],
                tasks: ['autoprefixer', 'cssmin']
            },
            jshint: {
                files: ['js/**/*.js'],
                tasks: ['jshint', 'cssmin']
            }


        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/stylemin.min.css': ['css/other.css']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
        }
    });
    /*
        // Load the plugin that provides the "uglify" task.
        grunt.loadNpmTasks('grunt-contrib-uglify');

        // Load the plugin that provides the autoprefixer
        grunt.loadNpmTasks('grunt-autoprefixer');


        grunt.loadNpmTasks('grunt-contrib-cssmin');
        // Default task(s).
        grunt.registerTask('default', ['uglify']);

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
    */

    grunt.registerTask('default', ['watch']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('minify', ['newer:imagemin']);
};