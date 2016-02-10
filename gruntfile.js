module.exports = function(grunt) {
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
                     clean: {
                         build: ["build"],
                         release: ["dist"]
                     },                     
                     wiredep: {
                         
                         task: {
                             
                             // Point to the files that should be updated when 
                             // you run `grunt wiredep` 
                             src: [
                             'barcode-checkr.html',   // .html support... 
                             ],
                     
                     options: {
                         // See wiredep's configuration documentation for the options 
                         // you may pass: 
                         
                         // https://github.com/taptapship/wiredep#configuration 
                     }
                         }
                     },		
                     copy:{
                         html: {
                             src: './barcode-checkr.html',
                             dest: 'build/barcode-checkr.html'
                         }
                     },

useminPrepare: {
    html: '<%= pkg.name %>.html',
    options: {
        dest: 'build/',
    }
},
usemin: {
  html: 'build/<%= pkg.name %>.html',
  css: 'assets/vendor.css',
  js: 'assets/vendor.js',
},
    htmlmin: {
        options: {
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,           
        },
        file: {
            options: {
                collapseWhitespace: true
            },
            files: {
                src: ['<%= pkg.name %>-single.html'],
                dest: 'dist/',
                filter:{
                    cwd: 'build/'
                }
            }
        }
    },

                     comboall: {
                         main: {
                             files:[
                             {'build/<%= pkg.name %>-single.html': ['build/<%= pkg.name %>.html'],
                             }
                             ]
                         }
                     },
		    jsdoc : {
			dist : {
			    src: ['assets/*.js'],
			    options: {
				destination: 'doc'
			    }
			}
		    }
                     
    });
    // 2. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-combo-html-css-js');
    grunt.loadNpmTasks('grunt-htmlmin');
    grunt.loadNpmTasks('grunt-jsdoc');
    
    // 3. Where we tell Grunt what to do when we type “grunt” into the terminal.
    grunt.registerTask('doc',['jsdoc']);
    grunt.registerTask('dev',['clean','wiredep']);
    grunt.registerTask('min-assets',['clean','wiredep','copy:html','useminPrepare','concat','uglify','cssmin','usemin']);
    grunt.registerTask('single',['min-assets','comboall','htmlmin']);
    grunt.registerTask('default',['dev']);
    
};
