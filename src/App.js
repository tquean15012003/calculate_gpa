/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CourseAdmin from './pages/Admin/CourseAdmin';
import HomeAdmin from './pages/Admin/HomeAdmin';
import RequestAdmin from './pages/Admin/RequestAdmin';
import UserAdmin from './pages/Admin/UserAdmin';
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import Report from './pages/Report/Report';
import { setNavigateAction } from './redux/actions/NavigateAction';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
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
        {/*User interface*/}
        <Route path='/' element={<UserTemplate Component={Login} />} />
        <Route path='/login' element={<UserTemplate Component={Login} />} />
        <Route path='/register' element={<UserTemplate Component={Register} />} />
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/report" element={<HomeTemplate Component={Report} />} />
        <Route path="*" element={<NotFound />} />

        {/*Administrative Interface*/}
        <Route path="/homeadmin" element={<AdminTemplate Component={HomeAdmin} />} />
        <Route path="/courseadmin" element={<AdminTemplate Component={CourseAdmin} />} />
        <Route path="/useradmin" element={<AdminTemplate Component={UserAdmin} />} />
        <Route path="/requestadmin" element={<AdminTemplate Component={RequestAdmin} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
