import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerAction } from '../../redux/actions/UserActions';

export default function Register() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      email: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required!')
        .min(8, 'Username must contain at least 8 characters!')
        .max(50, 'Username must contain at most 8 characters!'),
      password: Yup.string()
        .required('Required!')
        .min(8, 'Password must contain at least 8 characters!')
        .max(50, 'Password must contain at most 50 characters!!')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, "Password must be a mix of letters, numbers and special characters"),
      passwordConfirmation: Yup.string()
        .required('Required!')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
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
        .matches(/(6|8|9)\d{7}/g, "Phone number must be a Singapore phone number"),
    }),
    onSubmit: (values) => {
      dispatch(registerAction(values))
    }
  })

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col text-black" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
          Username<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="username" id="username" type="text" placeholder="Username" />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-900">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
          Password<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="password" id="password" type="password" placeholder="******************" />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-900">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="passwordConfirmation">
          Password confirmation<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.passwordConfirmation} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="******************" />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
          <div className="text-red-900">{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
          Name<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="name" id="name" type="text" placeholder="Name" />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-900">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
          Email<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="email" id="email" type="text" placeholder="Email" />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-900">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="phoneNumber">
          Phone number<span className="text-red-900">&#42;</span>
        </label>
        <input onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="phoneNumber" id="phoneNumber" type="text" placeholder="Phone number" />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-900">{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div className="flex items-center justify-between mb-6">
        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded mr-3" type="submit">
          Register
        </button>
        <button className="bg-black text-white font-bold py-2 px-6 rounded" type="button">
          <Link to="/" className="text-white inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Back to login
          </Link>
        </button>
      </div>
      <div className="flex justify-center items-center text-2xl font-bold">
        <Link to="/home" href="">Continue without register</Link>
      </div>
    </form>
  )
}
