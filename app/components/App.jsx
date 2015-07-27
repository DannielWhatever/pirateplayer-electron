import React from 'react';

import PPlayer from './PPlayer.jsx';
import QuickStart from './QuickStart.jsx';

export default class App extends React.Component {



    constructor(props){
      super(props);
    }
    /**
    * when TorrentSotre.magnetLink is changed, we sshould re render app, with another Component, like Player
    * and torrent like a prop
    */


    render() {
      let key = this.props.route;
      console.log(key);
      const route = {
        'player': PPlayer
      };
      let comp = route[key];
      console.log(comp);
      let Content = comp? comp : QuickStart;

        return (
          <div>
            <h1>PiratePlayer</h1>
            <Content/>
          </div>
        );
    }



}
