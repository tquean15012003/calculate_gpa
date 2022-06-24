/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInToReportAction } from '../../redux/actions/UserActions'
import * as Yup from 'yup';
import { getRequestListSentByAction, sendRequestAction } from '../../redux/actions/RequestAction';

export default function Report() {

  const dispatch = useDispatch()

  const { requestListSentBy } = useSelector(state => state.RequestReducer)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseCode: "",
      courseName: "",
      noAU: ""
    },
    validationSchema: Yup.object({
      courseCode: Yup.string()
        .required('Required!'),
      courseName: Yup.string()
        .required('Required!'),
      noAU: Yup.number()
        .required('Required!')
        .test(
          'Is Integer?',
          'Must be an integer!',
          (value) => Number.isInteger(value) === true
        )
        .test(
          'Is positive?',
          'Must be greater than 0!',
          (value) => value > 0
        )
    }),
    onSubmit: (values) => {
      dispatch(sendRequestAction(values))
      formik.setFieldValue("courseCode", "")
      formik.setFieldValue("courseName", "")
      formik.setFieldValue("noAU", "")
    }
  })

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


  const renderPendingRequestListSentBy = () => {
    return requestListSentBy.filter(request => request.isDone === "false").slice(0).reverse().map((request, index) => {
      return (
        <div className="py-4 px-5" key={index}>
          <div className="flex items-center lg:w-4/5 mx-auto border-b-2 pb-10 mb-10 border-white sm:flex-row flex-col">
            <div className="w-3/5 sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-xl font-bold title-font mb-2">Add course request</h2>
              {renderRequestInfo(request)}
            </div>
            <div>
              <h3 className="text-yellow-500">Pending review</h3>
            </div>
          </div>
        </div>
      )
    })
  }

  const renderProcessedRequestListSentBy = () => {
    return requestListSentBy.filter(request => request.isDone === "true").slice(0).reverse().map((request, index) => {
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
    dispatch(isLoggedInToReportAction())
    dispatch(getRequestListSentByAction())
  }, [])

  return (
    <div style={{ backgroundColor: "rgb(240,240,240)" }}>
      <div>
          <form className="border-2 border-white rounded p-4 mt-3 flex flex-col text-black" onSubmit={formik.handleSubmit}>
            <h1 className="mb-4 font-bold text-2xl">Request to add a course</h1>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Code<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={formik.handleChange} value={formik.values.courseCode} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseCode" id="courseCode" type="text" placeholder="Course code" />
              {formik.touched.courseCode && formik.errors.courseCode ? (
                <div className="text-red-900">{formik.errors.courseCode}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Name<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={formik.handleChange} value={formik.values.courseName} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseName" id="courseName" type="text" placeholder="Course name" />
              {formik.touched.courseName && formik.errors.courseName ? (
                <div className="text-red-900">{formik.errors.courseName}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                No. AU<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={formik.handleChange} value={formik.values.noAU} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="noAU" id="noAU" type="text" placeholder="No. AU" />
              {formik.touched.noAU && formik.errors.noAU ? (
                <div className="text-red-900">{formik.errors.noAU}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <button type="submit" className="px-3 py-2 bg-yellow-500 rounded font-bold text-white">Send request</button>
            </div>
          </form>
        </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Pending Request</h1>
        {renderPendingRequestListSentBy()}
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Processed Request</h1>
        {renderProcessedRequestListSentBy()}
      </div>
    </div>
  )
}
