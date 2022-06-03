import React from 'react'
import { useSelector } from 'react-redux';

export default function GPAInformation() {
    const { gradeRange } = useSelector(state => state.CourseReducer);

    const renderGradeRange = () => {
        return gradeRange.map((grade, index) => {
            return (
                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900" key={index}>
                    <td className="p-3">
                        <p className="mb-0">{grade.letterGrade}</p>
                    </td>
                    <td className="p-3">
                        <p className="mb-0">{grade.gradePoint.toFixed(2)}</p>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className="text-gray-100">
            <div className="mt-4 text-black">
                <p className="mb-0">This tool can be used to calculate your <span className="font-bold">Semester Grade Point Average (SGPA)</span> and <span className="font-bold">Cumulative Grade Point Average (CGPA)</span>.</p>
                <p className="mb-0">To calculate <span className="font-bold">SGPA</span> enter the <span className="font-bold">Course code</span> and the <span className="font-bold">Letter Grade</span> for the current semester into the <span className="font-bold">This semester</span> section, press the <span className="font-bold">Add</span> button to add the course into the table and then press the <span className="font-bold">Calculate GPA</span> button to display the results. </p>
                <p className="mb-0">To calculate <span className="font-bold">CGPA</span> at the end of the semester also enter the prior <span className="font-bold">Cumulative GPA</span> and the <span className="font-bold">Credits Earned</span> into the <span className="font-bold">Prior Cumulative GPA</span> section and then press the <span className="font-bold">Caculate GPA</span> button to display the results.</p>
                <p className="mb-0"><span className="text-red-900">&#42;</span>To add a <span className="font-bold">BDE</span> course, please key in BDE(Number of AUs) into <span className="font-bold">Course Code</span> field. For example, if you want to add 3 AUs BDE, you can key in <span className="font-bold">BDE3</span> into <span>Course Code</span> field.</p>
            </div>
            <div className="overflow-x-auto mt-4">
                <h2 className="font-bold text-base">Grade conversion table:</h2>
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <thead className="bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">Letter grade</th>
                            <th className="p-3">Grade point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderGradeRange()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
