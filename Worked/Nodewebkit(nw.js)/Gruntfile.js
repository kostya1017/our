


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    currentBuild: null,
	concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['jss/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      main: {
        options: {
          banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
        },
        dist: {
          files: {
            'public/<%= pkg.name %>.min.js' : ['bibliotheque.js']
          }
        }
      },
	  qunit: {
		files: ['index.html']
		},
      integration: {
        options: {},
        files: {
          "build/<%= currentBuild %>/polymer-nw-example.min.js": ["build/<%= currentBuild %>/polymer-nw-example.js"],
          "build/<%= currentBuild %>/platform.min.js": ["build/<%= currentBuild %>/platform.js"]
        }
      },
      standalone: {
        files: {
          "build/<%= currentBuild %>/index.min.js": ["bibliotheque.js"],
          "build/<%= currentBuild %>/platform.min.js": ["build/<%= currentBuild %>/platform.js"]
        }
      }
    },
	browserify: {
            
			
    },
	serve: {
		
	},
	
    exec: {
      standalone: {
        command: "vulcanize index.html -o build/<%= currentBuild %>/index.html",
		
        stdout: true,
        stderr: true
      },
      integration: {
        command: "vulcanize --csp -i index.html -o build/<%= currentBuild %>/polymer-nw-example.html",
        stdout: true,
        stderr: true
      }
    },
  nwjs: {
    options: {
        platforms: ['win64'],
        buildDir: '_tmp/desktop1', // Where the build version of my NW.js app is saved
    },
     src: ["build/desktop-standalone/**"] // Your NW.js app
   },
   
	 nodewebkit: {
      options: {
        version: "v0.12.3",
        build_dir: "_tmp/desktop",
        mac: false,
        win64: false,
        win32: true,
        linux32: false,
        linux64: false,		
        keep_nw: true
      },
      src: ["install/**"]
    },
    replace: {
      integration: {
        src: ["build/<%= currentBuild %>/polymer-nw-example.html"],
        dest: "build/<%= currentBuild %>/polymer-nw-example.html",
        replacements: [
          {
            from: "../components/platform",
            to: ""
          }, {
            from: "../components/",
            to: ""
          }, {
            from: "polymer-nw-example.js",
            to: "polymer-nw-example.min.js"
          }
        ]
      },
      desktopPost: {
        src: ["build/<%= currentBuild %>/index.html"],
        overwrite: true,
        replacements: [
          {
            from: "../../components/",
            to: ""
          }, {
            from: "../components/",
            to: ""
          }, {
            from: '<script src="polymer/polymer.js"></script>',
            to: '<script src="polymer.js"></script>'
          }, {
            from: '<script src="platform/platform.js"></script>',
            to: '<script src="platform.js"></script>'
          }
        ]
      },
      standalone: {
        src: ["build/<%= currentBuild %>/platform.js"],
        dest: "build/<%= currentBuild %>/platform.js",
        replacements: [
          {
            from: "global",
            to: "fakeGlobal"
          }
        ]
      }
    },
    copy: {
      integration: {
        files: [
          {
            src: "components/platform/platform.js",
            dest: "build/<%= currentBuild %>/platform.js"
          }
        ]
      },
      standalone: {
        files: [
          {
            src: 'components/platform/platform.js.map',
            dest: 'build/<%= currentBuild %>/platform.js.map'
          }, {
            src: 'components/platform/platform.js',
            dest: 'build/<%= currentBuild %>/platform.js'
          }, {
            src: "components/polymer/polymer.js",
            dest: "build/<%= currentBuild %>/polymer.js"
          }
        ]
      },
      desktop: {
        files: [
          {
            src: "package.json",
            dest: "build/<%= currentBuild %>/package.json"
          }, {
            src: ['demo-data/**'],
            dest: 'build/<%= currentBuild %>/'
          }
        ]
      },
      desktopFinal: {
        files: [
          {
            expand: true,
            src: ['_tmp/desktop/releases/polymer-nw-example/linux64/polymer-nw-example/**'],
            dest: 'build/<%= currentBuild %>/'
          }
        ]
      }
    },	
    rename: {
      desktopFinal: {
        src: '_tmp/desktop/releases/polymer-nodewebkit-example/linux64',
        dest: 'build/<%= currentBuild %>/'
      }
    },
    htmlmin: {
      integration: {
        options: {},
        files: {
          "build/integration/polymer-nw-example.html": "build/integration/polymer-nw-example.html"
        }
      }
    },
    clean: {
      integration: ["build/<%= currentBuild %>"],
      postIntegration: ["build/<%= currentBuild %>/platform.js", "build/<%= currentBuild %>/polymer-nw-example.js"],
      standalone: ["build/<%= currentBuild %>"],
      postStandalone: ["build/<%= currentBuild %>/platform.js", "build/<%= currentBuild %>/index.js"],
      desktop: ["build/<%= currentBuild %>"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-rename");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-node-webkit-builder");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-serve");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks('grunt-nw-builder');
  
  grunt.registerTask("core", ["browserify", "uglify:main","serve"]);
  grunt.registerTask('build', 'Build polymer-nw-example for the chosen target/platform etc', (function(_this) {
    return function(target, subTarget) {
      var minify, platform, postClean;
      if (target == null) {
        target = 'browser';
      }
      if (subTarget == null) {
        subTarget = 'standalone';
      }
      minify = grunt.option('minify');
      platform = grunt.option('platform');
      console.log("target", target, "sub", subTarget, "minify", minify, "platform", platform);
      grunt.config.set("currentBuild", target + "-" + subTarget);
      _this.task.run("clean:" + subTarget);
      _this.task.run("copy:" + subTarget);
      _this.task.run("exec:" + subTarget);
      _this.task.run("replace:" + subTarget);
      if (minify) {
        _this.task.run("uglify:" + subTarget);
        postClean = subTarget[0].toUpperCase() + subTarget.slice(1).toLowerCase();
        _this.task.run("clean:post" + postClean);
      }
      if (target === 'desktop') {
        _this.task.run("replace:desktopPost");
        _this.task.run("copy:desktop");
        return _this.task.run("nodewebkit");
      }
    };
  })(this));
};