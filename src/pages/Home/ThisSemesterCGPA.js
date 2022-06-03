import React, { useState } from 'react'
import { useFormik } from 'formik';
import { addCourseAction, dropCourseAction, resetCalculateAction } from '../../redux/actions/CourseAction';
import { useDispatch, useSelector } from 'react-redux';

export default function ThisSemesterCGPA() {

    const { courseList, gradeRange, priorCGPA } = useSelector(state => state.CourseReducer);

    const [showResult, setShowResult] = useState(false)

    const [priorSem, setPriorSem] = useState({
        CGPA: 0,
        creditsEarned: 0
    })

    const [thisSem, setThisSem] = useState({
        gradePoint: 0,
        creditsEarned: 0,
    })

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            courseCode: "",
            grade: ""
        },
        onSubmit: async (values) => {
            await dispatch(addCourseAction(values, gradeRange))
            formik.setFieldValue("courseCode", "")
            formik.setFieldValue("grade", "")
        }
    })

    const updateResult = () => {
        setPriorSem({
            CGPA: Number(priorCGPA.CGPA),
            creditsEarned: Number(priorCGPA.creditsEarned)
        })

        const gradePoint = courseList.reduce((total, course) => {
            return Number(total) + Number(course.gradePoint) * Number(course.noAU)
        }, 0)
        const creditsEarned = Number(courseList.reduce((total, course) => {
            return Number(total) + Number(course.noAU)
        }, 0))
        setThisSem({
            gradePoint,
            creditsEarned
        })
        setShowResult(true)
    }

    const renderCourseList = () => {
        if (courseList.length === 0) {
            return <></>
        }
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">Course code</th>
                            <th className="p-3">Course name</th>
                            <th className="p-3">No. AUs</th>
                            <th className="p-3">Letter grade</th>
                            <th className="p-3">Grade point</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList.map((course, index) => {
                            return (
                                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900" key={index}>
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
                                        <p className="mb-0">{course.letterGrade}</p>
                                    </td>
                                    <td className="p-3">
                                        <p className="mb-0">{course.gradePoint.toFixed(2)}</p>
                                    </td>
                                    <td className="p-3">
                                        <p onClick={() => {
                                            dispatch(dropCourseAction(course.id))
                                        }} className="mb-0 cursor-pointer text-xl text-red-600 hover:text-red-400">
                                            <i className="fa fa-times"></i>
                                        </p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    const renderCalculateGPA = () => {
        let curValidity = false
        const curCredit = Number(thisSem.creditsEarned)
        const curGradePoint = Number(thisSem.gradePoint)
        const curGPA = Number(curGradePoint / curCredit)
        if (thisSem.creditsEarned !== 0) {
            curValidity = true
        }

        let priorValidity = false
        let priorValidity_2 = true
        const priorCredit = Number(priorSem.creditsEarned)
        const priorGPA = Number(priorSem.CGPA)
        const priorGradePoint = Number(priorCredit * priorGPA)

        if (priorCredit === 0 && priorGPA === 0 && curValidity) {
            priorValidity = true
            priorValidity_2 = false
        }
        if (!isNaN(priorCredit) && !isNaN(priorGPA) && !(priorCredit === 0 || priorGPA === 0)) {
            priorValidity = true
        }

        let totalValidity = false
        if (priorValidity && curValidity) {
            totalValidity = true
        }
        const totalCredit = Number(Number(priorCredit) + Number(curCredit))
        const totalGradePoint = Number(Number(priorGradePoint) + Number(curGradePoint))
        const CGPA = Number(totalGradePoint / totalCredit)

        return (
            <div className={`overflow-x-auto mt-4 text-base ${showResult ? "" : "hidden"} ${priorValidity || curValidity ? "" : "hidden"}`}>
                <h1 className="font-bold text-xl mb-0">Results:</h1>
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3"></th>
                            <th className="p-3">Credits</th>
                            <th className="p-3">Grade points</th>
                            <th className="p-3">GPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={`border-b border-opacity-20 border-gray-700 bg-gray-900 ${priorValidity ? "" : "hidden"} ${priorValidity_2 ? "" : "hidden"}`}>
                            <td className="p-3">
                                <p className="mb-0 text-lg font-bold">At the beginning of this semester</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{priorCredit}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{priorGradePoint.toFixed(2)}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{priorGPA.toFixed(2)}</p>
                            </td>
                        </tr>
                        <tr className={`border-b border-opacity-20 border-gray-700 bg-gray-900 ${curValidity ? "" : "hidden"}`}>
                            <td className="p-3">
                                <p className="mb-0 text-lg font-bold">This semester</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{curCredit}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{curGradePoint.toFixed(2)}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{curGPA.toFixed(2)}</p>
                            </td>
                        </tr>
                        <tr className={`border-b border-opacity-20 border-gray-700 bg-gray-900 ${totalValidity ? "" : "hidden"}`}>
                            <td className="p-3">
                                <p className="mb-0 text-lg font-bold">Total</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{totalCredit}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{totalGradePoint.toFixed(2)}</p>
                            </td>
                            <td className="p-3">
                                <p className="mb-0">{CGPA.toFixed(2)}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


    return (
        <div className="mt-4">
            <form className="flex flex-col md:flex-row justify-start items-center mr-auto lg:mr-0" onSubmit={formik.handleSubmit}>
                <div className="font-bold mb-0 md:mr-2 mr-auto">
                    This semester:
                </div>
                <div className="mr-auto flex flex-col md:flex-row justify-start items-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center">
                        <input onChange={formik.handleChange} value={formik.values.courseCode} className="mr-2 mt-2 md:mt-0 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="courseCode" id="courseCode" type="text" placeholder="Course code" />
                        <input onChange={formik.handleChange} value={formik.values.grade} className="mr-2 mt-2 md:mt-0 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="grade" id="grade" type="text" placeholder="Letter grade" />
                    </div>
                    <button className="inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded mr-auto md:mr-0 mt-2 md:mt-0" type="submit">
                        Add
                    </button>
                </div>
            </form>
            <div className="text-gray-100 mt-4">
                {renderCourseList()}
                <div className="mt-4">
                    <button onClick={() => {
                        updateResult()
                    }} className="inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded mr-2 mt-2 md:mt-0" type="submit">
                        Calculate GPA
                    </button>
                    <button onClick={async () => {
                        await dispatch(resetCalculateAction())
                        formik.setFieldValue("courseCode", "")
                        formik.setFieldValue("grade", "")
                        setShowResult(false)
                    }} className="inline-block bg-black text-white font-bold py-2 px-6 rounded mr-2 mt-2 md:mt-0" type="submit">
                        Reset
                    </button>
                </div>
                {renderCalculateGPA()}
            </div>
        </div>
    )
}