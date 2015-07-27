import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import TorrentConstants from '../constants/TorrentConstants.jsx';

let TorrentActions = {

 /**
  * @param  {string} magnetLink
  */
 create: (magnetLink) => {
   AppDispatcher.dispatch({
     actionType: TorrentConstants.TORRENT_CREATE,
     magnetLink: magnetLink
   });
 },

 /**
  * @param  {string} magnetLink
  */
 updateLink: (magnetLink) => {
   AppDispatcher.dispatch({
     actionType: TorrentConstants.TORRENT_UPDATE_LINK,
     magnetLink: magnetLink
   });
 },

 /**
  * Clean the Torrent store
  */
 clean: () => {
   AppDispatcher.dispatch({
     actionType: TorrentConstants.TORRENT_CLEAN
   });
 }


};

export default TorrentActions;
