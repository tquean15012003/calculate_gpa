import React from 'react'
import CalculateGPA from './CalculateGPA'
import GPAInformation from './GPAInformation'

export default function Home() {
  return (
    <div className="px-16 py-6 text-base" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <CalculateGPA />
      <GPAInformation />
    </div>
  )
}
