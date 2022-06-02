/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import Report from './pages/Report/Report';
import { setNavigateAction } from './redux/actions/NavigateAction';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate.js';
import UserTemplate from './templates/UserTemplate/UserTemplate';


function App() {
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavigateAction(navigate))
  }, [])
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<UserTemplate Component={Login} />} />
        <Route path='/login' element={<UserTemplate Component={Login} />} />
        <Route path='/register' element={<UserTemplate Component={Register} />} />
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/report" element={<HomeTemplate Component={Report} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
