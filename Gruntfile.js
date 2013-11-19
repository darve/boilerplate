module.exports = function(grunt) {


	/* Grunt config
  /* ========================= */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    /* Linting!
    /* ========================= */
		jshint: {
      files: ['assets/js/*.js', '!assets/js/prod/main.min.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      afterconcat: ['assets/js/*.js', '!assets/js/prod/main.min.js']
    },

    
    /* Concatenation!
    /* ========================= */
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'assets/js/*.js',
        dest: 'assets/js/prod/main.min.js'
      }
    },

    
    /* Minification!
    /* ========================= */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'assets/js/prod/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

		
		/* Compass configuration!
    /* ========================= */    
    compass: {
		  dist: {
		    options: {
		    	sassDir: 'scss',
		    	cssDir: 'assets/css',
		      config: 'config.rb'
		    }
		  }
		},
		

		/* Watch task!
    /* ========================= */    
    watch: {
    	sass: {
    		files: ['scss/**/*.scss'], 
    		tasks: ['compass:dist']
    	},
      files: ['assets/js/*.js', '!assets/js/prod/main.min.js'],
      tasks: ['jshint']
    }
  });


  /* Register the tasks we want grunt to actually use
  /* ========================= */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  /* Running GRUNT without any parameters will run the following tasks
  /* ========================= */
  grunt.registerTask('default', [ 'jshint', 'concat', 'uglify', 'compass:dist' ]);

};