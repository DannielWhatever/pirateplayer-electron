import React from 'react';

import {Button} from 'react-bootstrap';

import TorrentActions from '../actions/TorrentActions.jsx';
import TorrentStore from '../stores/TorrentStore.jsx';


export default class QuickStart extends React.Component {

    constructor(props){
      super(props);
      this._goPlayer = this._goPlayer.bind(this);
    }


    render() {

        return (
            <div className="row">
                <div className="col-xs-5 col-xs-offset-3">
                  <input type="text" id="magnetLink" />
                </div>
                <div className="col-xs-1">
                  <Button bsStyle="success" onClick={this._goPlayer}>
                    Cargar
                  </Button>
                </div>
            </div>
        );
    }

    _goPlayer(){
      TorrentActions.create( document.getElementById('magnetLink').value );
      location.hash = '#player';
    }

}
