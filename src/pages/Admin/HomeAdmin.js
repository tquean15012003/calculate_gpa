/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourseAction, getAllUserAction } from '../../redux/actions/AdminActions'
import { getRequestListAction } from '../../redux/actions/RequestAction'

export default function HomeAdmin() {

  const { courseList, userList } = useSelector(state => state.AdminReducer)

  const { requestList } = useSelector(state => state.RequestReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCourseAction())
    dispatch(getAllUserAction())
    dispatch(getRequestListAction())
  }, [])

  return (
    <div className="mt-16">
      <div className="">
        <div className="flex justify-center flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="text-red-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">{userList.length}</h2>
              <p className="leading-relaxed">User</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="text-red-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">{courseList.length}</h2>
              <p className="leading-relaxed">Course</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="text-red-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                <path d="M8 17l4 4 4-4m-4-5v9" />
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">{requestList.filter(request => request.isDone === "false").length}</h2>
              <p className="leading-relaxed">Pending request</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <div>
          <p>This is administrative interface for the GPA caculation website.</p>
          <p>To handle course-related work, please click <span className="font-bold">Course</span>.</p>
          <p>To handle user-related work, please click <span className="font-bold">User</span>.</p>
          <p>To review users' requests, please click <span className="font-bold">Request</span>.</p>
        </div>
      </div>
    </div>
  )
}
