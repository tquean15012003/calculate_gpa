/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isAdminAction } from '../../redux/actions/UserActions'
import { USER } from '../../utils/settings/config'
import AdminFooter from './AdminFooter/AdminFooter'
import AdminSideBar from './AdminSideBar/AdminSideBar'

export default function AdminTemplate(props) {

    const { Component } = props

    const user = JSON.parse(localStorage.getItem(USER))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isAdminAction())
    }, [])

    return (
        <div className="grid grid-cols-4">
            <AdminSideBar />
            <div className="col-span-3" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                <div className="h-full flex flex-col items-stretch">
                    <div className="container px-4 my-4">
                        <h1 className="text-2xl text-center">Hi <span className="font-bold">{user.name}!</span></h1>
                        <Component />
                    </div>
                    <AdminFooter />
                </div>
            </div>
        </div>
    )
}