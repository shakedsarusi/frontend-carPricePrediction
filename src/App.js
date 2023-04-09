import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import Carrec from './pages/Carrec.jsx'
import Predictprice from './pages/Predictprice.jsx'

const App = () =>
{
  return(
    <div>
          <BrowserRouter>
          <Sidebar>
            <Routes>
                <Route path='/'element={<Dashboard/>}/>
                <Route path='/dashboard'element={<Dashboard/>}/>
                <Route path='/about'element={<About/>}/>
                <Route path='/carrec'element={<Carrec/>}/>
                <Route path='/predictprice'element={<Predictprice/>}/>
            </Routes>
          </Sidebar>
          </BrowserRouter>
        </div>
  )
}

export default App;
