/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { TOKEN, USER } from '../../../utils/settings/config';

export default function HomeHeader() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { navigate } = useSelector(state => state.NavigateReducer);

  const logOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    navigate("/", { replace: false })
    window.location.reload(); 
  }

  const renderUserInfo = () => {
    const userJSON = localStorage.getItem(USER);
    if (userJSON) {
      const user = JSON.parse(userJSON);
      return (
        <>
          <h1 className="mb-0 mr-4 text-xl">Hello {user.name}!</h1>
          <button onClick={() => { logOut() }} className="inline-block text-xl font-bold text-black hover:text-white duration-300" >
            <i className="fa fa-sign-out-alt lg:hidden inline"></i> Log out
          </button>
        </>
      )
    } else {
      return (
        <>
          <button onClick={() => {
            navigate("/login", { replace: false })
            window.location.reload();
          }} className="mr-4 inline-block text-xl font-bold text-black hover:text-white duration-300" >
            <i className="fa fa-sign-out-alt lg:hidden inline"></i> Log in
          </button>
        </>
      )
    }
  }

  const renderLogin = () => {
    const userJSON = localStorage.getItem(USER);
    if (userJSON) {
      return (
        <>
          <button onClick={() => { logOut() }} className="text-lg text-black font-bold block mt-0 text-left duration-300 hover:text-white lg:hidden px-4 py-2 rounded lg:bg-green-400 mr-2 group hover:bg-yellow-400">
            <i className="fa fa-sign-out-alt lg:hidden inline"></i> Log out
          </button>
        </>
      )
    } else {
      return (
        <>
          <button onClick={() => {
            window.location.reload();
            navigate("/login", { replace: false })
          }} className="text-lg text-black font-bold block mt-0 text-left duration-300 hover:text-white lg:hidden px-4 py-2 rounded lg:bg-green-400 mr-2 group hover:bg-yellow-400">
            <i className="fa fa-sign-out-alt lg:hidden inline"></i> Log in
          </button>
        </>
      )
    }
  }

  return (
    <nav className="bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-between flex-wrap py-6 px-16 text-black">
      <div onClick={() => { navigate("/home", { replace: false }) }} className="cursor-pointer flex items-center flex-no-shrink text-white mr-6">
        <span className="font-semibold text-2xl tracking-tight">Calculate GPA</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => {
          setNavbarOpen(!navbarOpen);
        }} className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 ${navbarOpen ? "" : "hidden"}`}>
        <div className="text-sm lg:flex-grow flex lg:block flex-col">
          <button onClick={() => { navigate("/home", { replace: false }) }} className="text-lg text-black font-bold block mt-0 text-left duration-300 hover:text-white lg:inline-block px-4 py-2 rounded lg:bg-green-400 mr-2 group hover:bg-yellow-400">
            <i className="fa fa-home lg:hidden inline"></i> Home
          </button>
          <button onClick={() => { navigate("/report", { replace: false }) }} className="text-lg text-black font-bold block mt-0 text-left duration-300 hover:text-white lg:inline-block px-4 py-2 rounded lg:bg-green-400 mr-2 group hover:bg-yellow-400">
            <i className="fa fa-exclamation-triangle lg:hidden inline"></i> Report
          </button>
          {renderLogin()}
        </div>
        <div className="hidden lg:flex justify-end items-center">
          {renderUserInfo()}
        </div>
      </div>
    </nav>

  )
}
