/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { isLoggedInAction, loginAction } from '../../redux/actions/UserActions';

export default function Login() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required!'),
      password: Yup.string()
        .required('Required!')
    }),
    onSubmit: (values) => {
      dispatch(loginAction(values))
    }
  })

  useEffect(() => {
    dispatch(isLoggedInAction());
  }, [])
  
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col text-black" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
          Username<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="username" id="username" type="text" placeholder="Username" />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-900">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-6">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
          Password<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="password" id="password" type="password" placeholder="******************" />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-900">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="flex items-center justify-between mb-6">
        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded mr-3" type="submit">
          Sign In
        </button>
        <button className="bg-black text-white font-bold py-2 px-6 rounded" type="button">
          <Link to="/register" className="text-white inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Create account
          </Link>
        </button>
      </div>
      <div className="flex justify-center items-center text-2xl font-bold">
        <Link to="/home" href="">Continue without login</Link>
      </div>
    </form>
  )
}
