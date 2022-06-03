import React from 'react'
import PriorCGPA from './PriorCGPA'
import ThisSemesterCGPA from './ThisSemesterCGPA'

export default function CalculateGPA() {
    return (
        <>
            <PriorCGPA />
            <ThisSemesterCGPA />
        </>
    )
}
