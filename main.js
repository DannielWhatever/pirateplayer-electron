/* jshint node:true */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

//1:17 hrs

startDevServer(electronApp);

function startDevServer(cb){
  new WebpackDevServer(webpack(config), {
      publicPath        : config.output.publicPath,
      hot               : true,
      historyApiFallback: true
    }
  ).listen(3000, 'localhost', function (err) {
    if (err){
        throw new Error(err);
    }
    console.log('Listening at localhost:3000');
    cb();
  });

}

var ipc = require('ipc');
var streaming = require('./app/app/Streaming.js');


function electronApp(){

  var app = require('app');
  var BrowserWindow = require('browser-window');

  var mainWindow = null;



  app.on('window-all-closed', app.quit);
  app.on('ready', function() {
    //BrowserWindow.addDevToolsExtension('/home/daniel/js/desktop/pirate-player2/react-devtools');
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadUrl('file://' + __dirname + '/public/index.html');
    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
      mainWindow = null;
    });

    ipc.on('streaming:start', function(event, arg) {
      console.log(arg);  // prints "ping"
      loadStreaming(event);
    });

  });

}


function loadStreaming(e){
  var magnetLink = 'magnet:?xt=urn:btih:9609f0336566953f3bf342241b25e2437f65b2c8';
  streaming.initStreaming(magnetLink,e);
}
