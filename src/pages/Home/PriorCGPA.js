import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCGPAAction, setCreditsEarned } from '../../redux/actions/CourseAction';

export default function PriorCGPA() {
    const { priorCGPA } = useSelector(state => state.CourseReducer);

    const dispatch = useDispatch();

    return (
        <div className="flex flex-col lg:flex-row justify-start items-center">
            <div className="font-bold mr-auto lg:mr-4">
                Prior Cumulative GPA <span className="font-normal">(optional):</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-start items-center mr-auto lg:mr-0">
                <div className="sm:mr-2 mt-2 lg:mt-0">
                    <input value={priorCGPA.CGPA} onChange={(e) => {
                        dispatch(setCGPAAction(e.target.value))
                    }} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="priorCumulativeGPA" id="priorCumulativeGPA" type="text" placeholder="Prior Cumulative GPA" />
                </div>
                <div className="sm:mr-2 mt-2 lg:mt-0">
                    <input value={priorCGPA.creditsEarned} onChange={(e) => {
                        dispatch(setCreditsEarned(e.target.value))
                    }} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="creditsEarned" id="creditsEarned" type="text" placeholder="Credits earned" />
                </div>
            </div>
        </div>
    )
}
