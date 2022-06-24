/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAdminAction, getAllUserAction, setSearchUserAdminAction, updateUserAdminAction } from '../../redux/actions/AdminActions'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import _ from 'lodash'

export default function UserAdmin() {

  const { userList, searchUserList } = useSelector(state => state.AdminReducer)

  console.log(userList)

  const dispatch = useDispatch()

  const data = (searchUserList.length > 0) ? searchUserList : userList

  const [page, setPage] = useState(1)

  const [isUpdate, setIsUpdate] = useState(false)

  const updateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      email: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required('Required!'),
      name: Yup.string()
        .required('Required!')
        .max(50, 'Name must contain at most 50 characters!!'),
      email: Yup.string()
        .required('Required!')
        .email('Invalid email!'),
      phoneNumber: Yup.string()
        .required('Required!')
        .min(8, 'Phone number must have exactly 8 numbers!')
        .max(8, 'Phone number must have exactly 8 numbers!')
        .matches(/(6|8|9)\d{7}/, "Phone number must be a Singapore phone number"),
    }),
    onSubmit: (values) => {
      dispatch(updateUserAdminAction(values))
      setIsUpdate(false)
      updateFormik.setFieldValue("id", "")
      updateFormik.setFieldValue("email", "")
      updateFormik.setFieldValue("name", "")
      updateFormik.setFieldValue("phoneNumber", "")
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

    return pageList;
  }

  const renderUserList = () => {
    if (userList.length === 0 && searchUserList.length === 0) {
      return <></>
    }
    return (
      <div>
        {/*Splitting page*/}
        <div className="flex items-start justify-start flex-wrap">
          {renderPage()}
        </div>
        {/*Update form*/}
        <div>
          <form className={`${isUpdate ? "" : "hidden"} border-2 border-white rounded p-4 mt-3 flex flex-col text-black`} onSubmit={updateFormik.handleSubmit}>
            <h1 className="mb-4 font-bold text-2xl">Update user form</h1>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                Username<span className="text-red-900">&#42;</span>
              </label>
              <input disabled onChange={updateFormik.handleChange} value={updateFormik.values.username} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="username" id="username" type="text" placeholder="Username" />
              {updateFormik.touched.username && updateFormik.errors.username ? (
                <div className="text-red-900">{updateFormik.errors.username}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
                Name<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.name} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="name" id="name" type="text" placeholder="Name" />
              {updateFormik.touched.name && updateFormik.errors.name ? (
                <div className="text-red-900">{updateFormik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                Email<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.email} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="email" id="email" type="email" placeholder="Email" />
              {updateFormik.touched.email && updateFormik.errors.email ? (
                <div className="text-red-900">{updateFormik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone number<span className="text-red-900">&#42;</span>
              </label>
              <input onChange={updateFormik.handleChange} value={updateFormik.values.phoneNumber} onBlur={updateFormik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="phoneNumber" id="phoneNumber" type="text" placeholder="Phone number" />
              {updateFormik.touched.phoneNumber && updateFormik.errors.phoneNumber ? (
                <div className="text-red-900">{updateFormik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <button type="submit" className="px-3 py-2 bg-yellow-500 rounded font-bold text-white">Update user</button>
            </div>
          </form>
        </div>
        {/*User list*/}
        <div className="mt-3 overflow-x-auto text-white">
          <table className="text-xs w-full">
            <colgroup>
              <col className="w-1/12" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className='w-1/12' />
              <col className="" />
            </colgroup>
            <thead className="bg-gray-700">
              <tr className="text-left">
                <th className="p-3">No.</th>
                <th className="p-3">Username</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone number</th>
                <th className="p-3">Type</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.slice((page - 1) * 10, page * 10).map((user, index) => {
                return (
                  <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900" key={index}>
                    <td className="p-3">
                      <p className="mb-0">{(page - 1) * 10 + index + 1}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{user.username}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{user.name}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{user.email}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{user.phoneNumber}</p>
                    </td>
                    <td className="p-3">
                      <p className="mb-0">{_.capitalize(user.type)}</p>
                    </td>
                    <td className="p-3">
                      <button onClick={() => {
                        setIsUpdate(!isUpdate)
                        if (user.id !== updateFormik.values.id && isUpdate === true) {
                          setIsUpdate(true)
                        }
                        updateFormik.setFieldValue("id", user.id)
                        updateFormik.setFieldValue("username", user.username)
                        updateFormik.setFieldValue("name", user.name)
                        updateFormik.setFieldValue("email", user.email)
                        updateFormik.setFieldValue("phoneNumber", user.phoneNumber)
                      }} className="mb-0 mr-6 text-xl text-green-600 hover:text-green-400">
                        <i className="fa fa-upload"></i>
                      </button>
                      <button onClick={() => {
                        if (window.confirm("Click Oke to delete!") === true) {
                          dispatch(deleteUserAdminAction(user.id))
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
    dispatch(getAllUserAction())
  }, [])

  return (
    <div className="mt-5">
      <input onFocus={() => {
        setPage(1)
      }} onChange={(e) => {
        dispatch(setSearchUserAdminAction(e.target.value))
      }} className="mr-2 mt-2 md:mt-0 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="searchUser" id="searchUser" type="search" placeholder="Search username..." />
      <div className="mt-3">
        {renderUserList()}
      </div>
    </div>
  )
}
