/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TOKEN, USER } from '../../../utils/settings/config'

export default function AdminSideBar() {

    const { requestList } = useSelector(state => state.RequestReducer)

    const { navigate } = useSelector(state => state.NavigateReducer)

    const noRequest = requestList.filter(request => request.isDone === "false").length

    return (
        <aside className="col-span-1 w-full min-h-screen" aria-label="Sidebar">
            <div className="overflow-y-auto h-full py-4 px-3 bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <Link to='/homeadmin' href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <svg className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
                            <span className="ml-3">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/courseadmin' className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" /><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Course</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/useradmin' className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">User</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/requestadmin' className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Request</span>
                            <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium rounded-full bg-blue-900 text-blue-200">{noRequest}</span>
                        </Link>
                    </li>
                    <li>
                        <a onClick={() => {
                            localStorage.removeItem(TOKEN);
                            localStorage.removeItem(USER);
                            navigate("/login", { replace: false })
                            window.location.reload();
                        }} className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <i className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white fa fa-sign-out-alt"></i>
                            <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
