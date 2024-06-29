'use client'

import '../styles/globals.css';
import React, { MouseEvent, useEffect, useState } from 'react'
import { flats1, flats2 } from '../app/constants/flats'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [flatNumberSelected, setFlatNumberSelected] = useState('')

  const handleFlatSelection = (e: MouseEvent<HTMLButtonElement>) => {
    const flatNumber = e.currentTarget.value
    setFlatNumberSelected(flatNumber)
  }

  useEffect(() => {
    if (flatNumberSelected) {
      router.push(`/adminSideDashboard/${flatNumberSelected}`)
    }
  }, [flatNumberSelected, router])
  
  const groupedFlats1 = flats1.reduce((acc, flat) => {
    const match = flat.match(/\d+/)
    if (match) {
      const flatNumber = match[0]
      if (!acc[flatNumber]) {
        acc[flatNumber] = []
      }
      acc[flatNumber].push(flat)
    }
    return acc
  }, {} as { [key: string]: string[] })

  const groupedFlats2 = flats2.reduce((acc, flat) => {
    const match = flat.match(/\d+/)
    if (match) {
      const flatNumber = match[0]
      if (!acc[flatNumber]) {
        acc[flatNumber] = []
      }
      acc[flatNumber].push(flat)
    }
    return acc
  }, {} as { [key: string]: string[] })

  return (
    <>
      <div className='w-screen h-screen p-5 bg-[#ffe8df]'>
        <div className='text-5xl font-bold ml-[30vw] text-[#573525]'>Welcome to Admin Portal</div>
        {/* {flats.map((item, index) => (
          <>
            <div className='flex flex-col w-fit'>
              <button 
              onClick={handleFlatSelection} 
              value={item} 
              className='border-2 border-black p-5' 
              key={index}
              >
              {item}
              </button>
            </div>
          </>
        ))} */}
        <div className='w-fit h-fit p-8'>
          <div className='flex'>
            {Object.keys(groupedFlats2).map((key, index) => (
              <div key={index} className='flex flex-col m-2'>
                {groupedFlats2[key].map((flat, idx) => (
                  <button 
                  onClick={handleFlatSelection} 
                  value={flat} 
                  className='border-2 border-black p-5 m-1' 
                  key={idx}
                  >
                    {flat}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className='flex'>
            {Object.keys(groupedFlats1).map((key, index) => (
              <div key={index} className='flex flex-col m-2'>
                {groupedFlats1[key].map((flat, idx) => (
                  <button 
                  onClick={handleFlatSelection} 
                  value={flat} 
                  className='border-2 border-black p-5 m-1' 
                  key={idx}
                  >
                    {flat}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
