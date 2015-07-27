import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {EventEmitter} from 'events';
import TorrentConstants from '../constants/TorrentConstants.jsx';

const CHANGE_EVENT = 'change';

let _torrent = {};

/**
* Create the Torrent item.
* @param {string} magnetLink - The magnet link of the Torrent
*/
function create(magnetLink) {
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _torrent = {
    id: id,
    magnetLink: magnetLink
  };
}

/**
* Update the Torrent item.
* @param {object} updates - An object literal containing only the data to be
* updated.
*/

function update(updates) {
  _torrent = Object.assign({}, _torrent, updates);
}

/**
* Clean the Torrent item.
*/
function clean() {
  _torrent = {};
}


class TorrentStore extends EventEmitter {
  /**
  * Tests whether the TORRENT item is load.
  * @return {boolean}
  */
  isSelected(){
    return _torrent && _torrent.magnetLink;
  }

  /**
  * Get the TORRENT object.
  * @return {object}
  */
  get(){
    return _torrent;
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  /**
  * @param {function} callback
  */
  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  }

  /**
  * @param {function} callback
  */
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

}

let _TorrentStore = new TorrentStore();

// Register callback to handle all updates
AppDispatcher.register( (action) => {
  let magnetLink;
  console.log(action);

  switch(action.actionType) {

    case TorrentConstants.TORRENT_CREATE:
      magnetLink = action.magnetLink.trim();
      if (magnetLink !== '') {
        create(magnetLink);
        _TorrentStore.emitChange();
      }
      break;

    case TorrentConstants.TORRENT_UPDATE_LINK:
      magnetLink = action.magnetLink.trim();
      if (magnetLink !== '') {
        update({magnetLink: magnetLink});
        _TorrentStore.emitChange();
      }
      break;

    case TorrentConstants.TORRENT_CLEAN:
      clean();
      _TorrentStore.emitChange();
      break;

    default:
      // no op
  }

});

export default _TorrentStore;
