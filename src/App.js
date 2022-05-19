import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import NotFound from './pages/NotFound/NotFound';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate.js';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomeTemplate Component={Home} />} />
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
