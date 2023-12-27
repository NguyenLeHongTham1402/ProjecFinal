import './App.css';
import {Provider} from 'react-redux'
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import store from './store';
import Home from './pages/Home';
import Admin from './pages/Admin'

function App() {
  return (
    <div> 
        {/* <React.StrictMode> */}
          <Provider store={store}>
            <BrowserRouter>  
              <Routes>
                <Route path='/*' element={<Home/>}/>
                <Route path='/admin/*' element={<Admin/>}/>
              </Routes>
            </BrowserRouter>
            </Provider>
        {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
