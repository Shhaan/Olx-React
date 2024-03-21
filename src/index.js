import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Firebasecontext } from './store/Firebasecontext';
import  firebase  from './firebase/Config';
ReactDOM.render(
<Firebasecontext.Provider value={{firebase}}>
<App />
</Firebasecontext.Provider>

, document.getElementById('root'));
