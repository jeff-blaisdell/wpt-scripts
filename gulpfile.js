
'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var fs = require('fs');
var reload = browserSync.reload;

var scripts = {};
var replaceVal = function(val) {
	var match = val.match(/\$\{(.*)\}/);
	var fileName = match[1];
	if (!scripts[fileName]) {
		var filePath = 'dist/' + fileName + '.js';
		var script = fs.readFileSync(filePath);
		scripts[fileName] = script;
	}

	return scripts[fileName];
};

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src('scripts/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('pages', function () {
  return gulp.src('scripts/**/*.wpt')
    .pipe($.replace(/\$\{.*\}/g, replaceVal))
    .pipe(gulp.dest('dist'));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
  rimraf('dist', rimraf.bind({}, '.tmp', cb));
});


// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('jshint', 'scripts', 'pages', cb);
});

