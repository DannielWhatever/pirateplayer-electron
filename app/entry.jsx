import React from 'react';

import App from './components/App.jsx';


/** init App and Router **/
let route = '/';
React.render(<App route={route} />,document.getElementById('example'));

window.addEventListener('hashchange', (e)=>{
  console.log(e);
  React.render(<App route={window.location.hash.substr(1)} />,document.getElementById('example'));
});
