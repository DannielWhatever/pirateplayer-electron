import React from 'react';
import ipc from 'ipc';

import TorrentStore from '../stores/TorrentStore.jsx';



export default class PPlayer extends React.Component {

    constructor(props){
      super(props);
      this.state = {
          torrent: TorrentStore.get(),
          urlStreaming: ''
      };
      console.log(this.state);
      this._startStreaming.bind(this);

    }

    _startStreaming(){
      //let autoplay = false;
      ipc.send('streaming:start', 'ping');
      ipc.on('streaming:listening', (urlStreaming) => {
        console.log(urlStreaming);
        //let video = window.document.getElementById('video_player_html5');
        this.state.urlStreaming=urlStreaming;
        this.render();

      });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {

        return (
            <div className="row">
                  {this.state.torrent.magnetLink}
                  <video id="video_player_html5">
                    <source src={this.state.urlStreaming} />
                  </video>
            </div>
        );
    }

}
