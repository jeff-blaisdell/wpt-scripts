
'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$.tools = require('./gulp-wpttools');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var fs = require('fs');

var scripts = {};
var replaceVal = function(val) {
	var match = val.match(/\$\{(.*)\}/);
	var fileName = match[1];
	if (!scripts[fileName]) {
		var filePath = 'dist/scripts/' + fileName + '.js';
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
    .pipe($.jshint.reporter('fail'));
});

gulp.task('scripts', function () {
  return gulp.src('scripts/**/*.js')
  	.pipe($.tools()) // Will concat our tools.js file to each page's script.
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('pages', function () {
  return gulp.src('pages/**/*.wpt')
    .pipe($.replace(/\$\{.*\}/g, replaceVal))
    .pipe(gulp.dest('dist/pages'));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
  rimraf('dist', rimraf.bind({}, '.tmp', cb));
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('jshint', 'scripts', 'pages', cb);
});

