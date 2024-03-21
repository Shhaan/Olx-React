import React from 'react';
import './App.css';
import  {BrowserRouter, Route, Routes} from'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext';

function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Post><Home/></Post>}></Route>
        <Route path='/signup' element={ <Signup/>}></Route>
        <Route path='/login' element={ <Login/>}></Route>
        <Route path='/create' element={  <Create/>}></Route>
        <Route path='/viewproduct' element={<Post><View/></Post> }></Route>



        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
