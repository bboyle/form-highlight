'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			files: [ 'dist' ]
		},
		// production pipeline tasks
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': [ 'src/<%= pkg.name %>.js' ]
				}
			},
		},
		// code quality tasks
		qunit: {
			src: [ 'test/**/*.html' ],
			compat: {
				options: {
					urls: [
						'http://localhost:8000/test/activeClass.html?jquery=1.4.4',
						'http://localhost:8000/test/activeClass.html?jquery=1.7.2',
						'http://localhost:8000/test/activeClass.html?jquery=1.9.1'
					]
				}
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: [ 'src/**/*.js' ]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: [ 'test/*.js' ]
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: [ 'jshint:src', 'qunit' ]
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: [ 'jshint:test', 'qunit' ]
			},
		},
		// local server
		connect: {
			qunit: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task.
	grunt.registerTask( 'test', [ 'jshint', 'qunit:src' ]);
	grunt.registerTask( 'uat', [ 'connect', 'qunit:compat' ]);
	grunt.registerTask( 'produce', [ 'clean', 'uglify' ]);
	grunt.registerTask( 'default', [ 'test', 'uat', 'produce' ]);

};
