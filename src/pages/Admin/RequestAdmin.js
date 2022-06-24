/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveRequestAction, getRequestListAction, rejectRequestAction } from '../../redux/actions/RequestAction'

export default function RequestAdmin() {

  const dispatch = useDispatch()

  const { requestList } = useSelector(state => state.RequestReducer)

  const renderRequestInfo = (request) => {
    const courseInfo = JSON.parse(request.data)
    return (
      <>
        <p className="leading-relaxed text-base"><span className="font-bold">Sent by: </span>{request.sentBy}</p>
        {request.resBy !== "" ? <p className="leading-relaxed text-base"><span className="font-bold">Processed by: </span>{request.resBy}</p> : ""}
        <p className="leading-relaxed text-base"><span className="font-bold">Course code: </span>{courseInfo.courseCode}</p>
        <p className="leading-relaxed text-base"><span className="font-bold">Course name: </span>{courseInfo.courseName}</p>
        <p className="leading-relaxed text-base"><span className="font-bold">No. AU: </span>{courseInfo.noAU}</p>
      </>
    )

  }

  const renderPendingRequestList = () => {
    return requestList.filter(request => request.isDone === "false").slice(0).reverse().map((request, index) => {
      return (
        <div className="py-4 px-5" key={index}>
          <div className="flex items-center lg:w-4/5 mx-auto border-b-2 pb-10 mb-10 border-white sm:flex-row flex-col">
            <div className="w-3/5 sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-xl font-bold title-font mb-2">Add course request</h2>
              {renderRequestInfo(request)}
            </div>
            <div className="flex">
              <button onClick={() => {
                dispatch(approveRequestAction(request.id))
              }} className="flex space-x-3 mr-3 items-center px-5 py-5 bg-green-500 hover:bg-green-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={() => {
                dispatch(rejectRequestAction(request.id))
              }} className="flex space-x-3 items-center px-5 py-5 bg-red-500 hover:bg-red-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )
    })
  }

  const renderProcessedRequestList = () => {
    return requestList.filter(request => request.isDone === "true").slice(0).reverse().map((request, index) => {
      return (
        <div className="py-4 px-5" key={index}>
          <div className="flex items-center lg:w-4/5 mx-auto border-b-2 pb-10 mb-10 border-white sm:flex-row flex-col">
            <div className="w-3/5 sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-xl font-bold title-font mb-2">Add course request</h2>
              {renderRequestInfo(request)}
            </div>
            <div>
              {request.isApproved === "false" ? <h3 className="text-red-500">Rejected</h3> : <h3 className="text-green-500" rel="noreferrer">Approved</h3>}
            </div>
          </div>
        </div>
      )
    })
  }

  useEffect(() => {
    dispatch(getRequestListAction())
  }, [])

  return (
    <div style={{ backgroundColor: "rgb(240,240,240)" }}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Pending Request</h1>
        {renderPendingRequestList()}
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Processed Request</h1>
        {renderProcessedRequestList()}
      </div>
    </div>)
}
