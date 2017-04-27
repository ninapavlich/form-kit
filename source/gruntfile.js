module.exports = function(grunt) {

    //configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
              options: {
                sassDir: "sass",
                cssDir: "compiled/compass",
                config: "config.rb"
              }
            },
        },

        concat_css: {
            options: {
              // Task-specific options go here. 
            },
            forms: {
              src: ["compiled/compass/*.css"],
              dest: "compiled/concat/formkit.css"
            },
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'compiled/concat/',
                src: ['*.css', '!*.min.css'],
                dest: 'compiled/min/',
                ext: '.min.css'
            }
        },      
        concat: {
            options: {
                separator: ';',
            },
            forms: {
                src: [
                    "js/vendor/*",
                    "js/widgets/*",
                    
                    "js/formkit.jqueryplugin.js"
                ],
                dest: "compiled/concat/formkit.js"
            }
        },

        uglify: {
            build: {
                files: {
                    'compiled/min/formkit.min.js': ['compiled/concat/formkit.js'],
                }
            }
        },
        copy: {
            vendor:{
                files: [
                    {
                        cwd: 'bower_components/chosen/',
                        src: 'chosen.jquery.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/chosen/',
                        src: 'chosen.css',
                        dest: 'compiled/compass/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/multiselect/js/',
                        src: 'jquery.multi-select.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/multiselect/css/',
                        src: 'multi-select.css',
                        dest: 'compiled/compass/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/parsleyjs/src/extra/validator/',
                        src: 'comparison.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/parsleyjs/src/extra/validator/',
                        src: 'dateiso.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/parsleyjs/src/extra/validator/',
                        src: 'luhn.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/parsleyjs/src/extra/validator/',
                        src: 'words.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/parsleyjs/dist/',
                        src: 'parsley.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    // {
                    //     cwd: 'bower_components/parsleyjs/dist/',
                    //     src: 'parsley.remote.js',
                    //     dest: 'js/vendor/',
                    //     expand: true
                    // },
                    {
                        cwd: 'bower_components/image-picker/image-picker/',
                        src: 'image-picker.css',
                        dest: 'compiled/compass/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/image-picker/image-picker/',
                        src: 'image-picker.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    // {
                    //     cwd: 'bower_components/datetimepicker/',
                    //     src: 'jquery.datetimepicker.css',
                    //     dest: 'compiled/compass/',
                    //     expand: true
                    // },
                    // {
                    //     cwd: 'bower_components/datetimepicker/',
                    //     src: 'jquery.datetimepicker.js',
                    //     dest: 'js/vendor/',
                    //     expand: true
                    // },
                    {
                        cwd: 'bower_components/bootstrap-datetimepicker/build/css/',
                        src: 'bootstrap-datetimepicker.min.css',
                        dest: 'compiled/compass/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap-datetimepicker/build/js/',
                        src: 'bootstrap-datetimepicker.min.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/rangeslider.js/dist/',
                        src: 'rangeslider.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/rangeslider.js/dist/',
                        src: 'rangeslider.css',
                        dest: 'compiled/compass/',
                        expand: true
                    },
                    // {
                    //     cwd: 'bower_components/jquery-ui/',
                    //     src: 'jquery-ui.js',
                    //     dest: 'js/vendor/',
                    //     expand: true
                    // },
                    {
                        cwd: 'bower_components/garlicjs/',
                        src: 'garlic.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    
                    {
                        cwd: 'bower_components/jquery-tag-editor/',
                        src: 'jquery.caret.min.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/jquery-tag-editor/',
                        src: 'jquery.tag-editor.js',
                        dest: 'js/vendor/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/jquery-tag-editor/',
                        src: 'jquery.tag-editor.css',
                        dest: 'compiled/compass/',
                        expand: true
                    }
                ]
            },
            scripts: {
                files:[{
                    expand: true,
                    cwd: 'compiled/concat/',
                    src: ['**/*.js'],
                    dest: '../dist/js/'
                },{
                    expand: true,
                    cwd: 'compiled/min/',
                    src: ['**/*.js'],
                    dest: '../dist/js/'
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: 'compiled/concat/',
                    src: ['**/*.css'],
                    dest: '../dist/css/'

                },{
                    expand: true,
                    cwd: 'compiled/min/',
                    src: ['**/*.css'],
                    dest: '../dist/css/'

                }]
            }
        },  


        watch: {
            scripts: {
                files: ['js/*.js', 'js/*/*.js'],
                tasks: ['concat', 'uglify', 'copy:scripts'],
                options: {
                    spawn: false
                },
            }, 
            
            css: {
                files: ['sass/*.scss', 'sass/*/*.scss'],
                tasks: ['compass','concat_css', 'cssmin:minify', 'copy:styles'],
                options: {
                    spawn: false
                }
            }
        }


    });


    
    // load plugins
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    
    // register tasks
    grunt.registerTask(
        'default',
        [
            'copy:vendor',
            'compass',
            'concat',
            'uglify',
            'copy:scripts',
            'concat_css',
            'cssmin:minify',
            'copy:styles',
            'watch'
        ]
    );
};