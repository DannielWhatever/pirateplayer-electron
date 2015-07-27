var peerflix = require('peerflix');
var ipc = require('ipc');


module.exports = (function(){

    var _magnetLink;
    var _engine;
    var _urlStreaming;


    function initStreaming(magnetLink,e){
      _magnetLink = magnetLink;
      if (/^magnet:/.test(_magnetLink)) {
        //debiera comprobar que si existe un streaming lo cierre
        if(!_engine){
          console.log('tratar con esto');
        }
        startStreaming(e);
      } else {
        console.log('El link es incorrecto'); //no de encontró el magnet
      }
    }

    function startStreaming(e){
      var argv = setArguments();

			_engine = peerflix(_magnetLink, argv);

			_urlStreaming = 'http://localhost:' + argv.port;

			_engine.server.on('listening', function(){
				console.log('Emit streaming:listening');
        e.sender.send('streaming:listening', _urlStreaming);
			});
    }


    function setArguments(){
      return {
        _: [ _magnetLink ],
        c: 100,
        port: 8888
      };
    }

    return {
      initStreaming: initStreaming,
      urlStreaming: _urlStreaming
    };


}());



		/*fakeDirectDownload: function(){
			try{
				var urlStreaming = window.document.getElementById('video_player_html5').children[0].getAttribute('src');
				console.log(urlStreaming);
				open(urlStreaming);
			}catch(e){
				console.log(e);
			}

		}*/
