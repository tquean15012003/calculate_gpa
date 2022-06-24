/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseAdminAction, deleteCourseAdminAction, getAllCourseAction, setSearchCourseAdminAction, updateCourseAdminAction } from '../../redux/actions/AdminActions'
import * as Yup from 'yup';

export default function CourseAdmin() {

  const { courseList, searchCourseList } = useSelector(state => state.AdminReducer)

  const data = (searchCourseList.length > 0) ? searchCourseList : courseList

  const [page, setPage] = useState(1)

  const [isCreate, setIsCreate] = useState(false)

  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch()

  const createFormik = useFormik({
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
      dispatch(addCourseAdminAction(values))
      setIsCreate(false)
      createFormik.setFieldValue("courseCode", "")
      createFormik.setFieldValue("courseName", "")
      createFormik.setFieldValue("noAU", "")
    }
  })

  const updateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseCode: "",
      courseName: "",
      noAU: "",
      id: "",
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
      dispatch(updateCourseAdminAction(values))
      setIsUpdate(false)
      updateFormik.setFieldValue("id", "")
      updateFormik.setFieldValue("courseCode", "")
      updateFormik.setFieldValue("courseName", "")
      updateFormik.setFieldValue("noAU", "")
    }
  })

  const renderPage = () => {
    let pageList = []
    let i
    for (i = 1; i < (data.length / 10) + 1; i++) {
      const index = i
      pageList.push(
        <button onClick={() => {
          setPage(index)
        }} className="mr-2 py-2 px-3 border-2 bg-white" key={index}>{index}</button>
      )
    }
    pageList.push(
      <button onClick={() => {
        setIsCreate(!isCreate)
      }} className="mr-2 py-2 px-3 border-2 bg-white" key={i + 1}>+</button>
    )
    return pageList;
  }

  const renderCourseList = () => {
    if (courseList.length === 0 && searchCourseList.length === 0) {
      return <></>
    }
    return (
      <div>
        {/*Splitting page*/}
        <div className="flex items-start justify-start flex-wrap">
          {renderPage()}
        </div>
        {/*Create form*/}
        <div>
          <form className={`${isCreate ? "" : "hidden"} border-2 border-white rounded p-4 mt-3 flex flex-col text-black`} onSubmit={createFormik.handleSubmit}>
            <h1 className="mb-4 font-bold text-2xl">Create a new course form</h1>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Code<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={createFormik.handleChange} value={createFormik.values.courseCode} onBlur={createFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseCode" id="courseCode" type="text" placeholder="Course code" />
              {createFormik.touched.courseCode && createFormik.errors.courseCode ? (
                <div className="text-red-900">{createFormik.errors.courseCode}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Name<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={createFormik.handleChange} value={createFormik.values.courseName} onBlur={createFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseName" id="courseName" type="text" placeholder="Course name" />
              {createFormik.touched.courseName && createFormik.errors.courseName ? (
                <div className="text-red-900">{createFormik.errors.courseName}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                No. AU<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={createFormik.handleChange} value={createFormik.values.noAU} onBlur={createFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="noAU" id="noAU" type="text" placeholder="No. AU" />
              {createFormik.touched.noAU && createFormik.errors.noAU ? (
                <div className="text-red-900">{createFormik.errors.noAU}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <button type="submit" className="px-3 py-2 bg-yellow-500 rounded font-bold text-white">Add course</button>
            </div>
          </form>
        </div>
        {/*Update form*/}
        <div>
          <form className={`${isUpdate ? "" : "hidden"} border-2 border-white rounded p-4 mt-3 flex flex-col text-black`} onSubmit={updateFormik.handleSubmit}>
            <h1 className="mb-4 font-bold text-2xl">Update course form</h1>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Code<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.courseCode} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseCode" id="courseCode" type="text" placeholder="Course code" />
              {updateFormik.touched.courseCode && updateFormik.errors.courseCode ? (
                <div className="text-red-900">{updateFormik.errors.courseCode}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                Course Name<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.courseName} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseName" id="courseName" type="text" placeholder="Course name" />
              {updateFormik.touched.courseName && updateFormik.errors.courseName ? (
                <div className="text-red-900">{updateFormik.errors.courseName}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="courseCode">
                No. AU<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.noAU} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="noAU" id="noAU" type="text" placeholder="No. AU" />
              {updateFormik.touched.noAU && updateFormik.errors.noAU ? (
                <div className="text-red-900">{updateFormik.errors.noAU}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <button type="submit" className="px-3 py-2 bg-yellow-500 rounded font-bold text-white">Update course</button>
            </div>
          </form>
        </div>
        {/*Course list*/}
        <div className="mt-3 overflow-x-auto text-white">
          <table className="text-xs w-full">
            <colgroup>
              <col className="w-1/12" />
              <col className="w-1/5" />
              <col className="w-5/12" />
              <col className='w-1/8' />
              <col className="" />
            </colgroup>
            <thead className="bg-gray-700">
              <tr className="text-left">
                <th className="p-3">No.</th>
                <th className="p-3">Course code</th>
                <th className="p-3">Course name</th>
                <th className="p-3">No. AUs</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.slice((page - 1) * 10, page * 10).map((course, index) => {
                return (
                  <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900" key={index}>
                    <td className="p-3">
                      <p className="mb-0">{(page - 1) * 10 + index + 1}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{course.courseCode}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{course.courseName}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{course.noAU}</p>
                    </td>
                    <td className="p-3">
                      <button onClick={() => {
                        setIsUpdate(!isUpdate)
                        if (course.id !== updateFormik.values.id && isUpdate === true){
                          setIsUpdate(true)
                        }
                        updateFormik.setFieldValue("id", course.id)
                        updateFormik.setFieldValue("courseCode", course.courseCode)
                        updateFormik.setFieldValue("courseName", course.courseName)
                        updateFormik.setFieldValue("noAU", course.noAU)
                      }} className="mb-0 mr-6 text-xl text-green-600 hover:text-green-400">
                        <i className="fa fa-upload"></i>
                      </button>
                      <button onClick={() => {
                        if (window.confirm("Click Oke to delete!") === true) {
                          dispatch(deleteCourseAdminAction(course.id))
                        }
                      }} className="mb-0 text-xl text-red-600 hover:text-red-400">
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    )
  }

  useEffect(() => {
    dispatch(getAllCourseAction())
  }, [])

  return (
    <div className="mt-5">
      <input onFocus={() => {
        setPage(1)
      }} onChange={(e) => {
        dispatch(setSearchCourseAdminAction(e.target.value))
      }} className="mr-2 mt-2 md:mt-0 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="searchCourse" id="searchCourse" type="search" placeholder="Search course name..." />
      <div className="mt-3">
        {renderCourseList()}
      </div>
    </div>
  )
}
