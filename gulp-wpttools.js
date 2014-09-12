var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var tools = fs.readFileSync('scripts/tools.js');
var PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'gulp-wpttools';

function toolStream() {
  var stream = through();
  stream.write(tools);
  return stream;
}

// plugin level function (dealing with files)
function gulpWptTools() {
  if (!tools) {
    throw new PluginError(PLUGIN_NAME, 'Missing web page test tooling!');
  }

  tools = new Buffer(tools); // allocate ahead of time

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {

    if (file.isStream()) {
      // define the streamer that will transform the content
      var streamer = toolStream();
      // catch errors from the streamer and emit a gulp plugin error
      streamer.on('error', this.emit.bind(this, 'error'));
      // start the transformation
      file.contents = file.contents.pipe(streamer);
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([tools, file.contents]);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = gulpWptTools;
