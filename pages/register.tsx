'use client'

import '../styles/globals.css';
import React, {FormEvent, useState} from 'react'
import OwnerForm from '../app/components/OwnerForm'
import TenantForm from '../app/components/TenantForm'
import Image from 'next/image'

function Page() {
  const [showOwnerForm, setshowOwnerForm] = useState(false)
  const [showTenantForm, setshowTenantForm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleOwnerClick = () => {
    setshowOwnerForm(true)
  }
  const handleTenantClick = () => {
    setshowTenantForm(true)
  }
  const adminCheck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const adminPass = formData.get('adminPass')
    console.log(adminPass)
    try {
      const response = await fetch('https://victoriafloors2.onrender.com/adminCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminPass
        })
      })
      if(response.ok){
        setIsAdmin(true)
      } else {
        alert('Wrong admin password')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link> */}
        <div className='bg-black w-screen h-screen overflow-hidden'>
          <div className='text-white z-[1000] absolute w-screen h-screen'>
            <div className='w-[35%] h-[91%] absolute top-[5.3%] left-[10%] border-2 border-white shadow-lg rounded-[3vw] bg-opacity-75 bg-white overflow-auto'>
              <div className='ownerOrTenant flex flex-col gap-10 px-2 pt-8 text-black text-3xl font-[Roboto Condensed] font-semibold text-center duration-150 ease-linear'>
                {isAdmin && ( <>{!showOwnerForm && !showTenantForm && (
                  <>
                    <div>
                      <h1 className='text-4xl pt-28'>
                        Select Owner or Tenant: 
                      </h1>
                    </div>
                    <div className='flex-col flex gap-8 mx-auto select-none'>
                      <a onClick={handleOwnerClick} className='hover:bg-red-700 hover:text-red-200 hover:cursor-pointer hover:shadow-lg bg-red-100 duration-150 ease-linear w-fit p-5 rounded-full border-red-700 border-2'>
                        Owner
                      </a>
                      <a onClick ={handleTenantClick} className='hover:bg-red-700 hover:text-red-200 hover:cursor-pointer hover:shadow-lg bg-red-100 duration-150 ease-linear w-fit p-5 rounded-full border-red-700 border-2'>
                        Tenant
                      </a>
                    </div>
                  </>
                )}</>)}
                {!isAdmin && (
                  <>
                    <div>
                      <form onSubmit={adminCheck}>
                        <input type="text" placeholder='Enter the admin password' name='adminPass' className='rounded-3xl px-5 py-2 mt-[12vw]'/>
                        <button type='submit' className='bg-red-600 text-white p-3 rounded-3xl border-red-900 border-2 mt-5'>Submit</button>
                      </form>
                    </div>
                  </>
                )}
                {showOwnerForm && (
                  <OwnerForm/>
                )}
                {showTenantForm && (
                  <TenantForm/>
                )}
              </div>
              <div>

              </div>
            </div>
            <div className='w-[35%] h-screen absolute right-[10%] bg-[#f8c1a5e1] overflow-hidden'>
              <Image src="/rg.png" alt="rg_img" className='w-[100vw] scale-[200%] -translate-x-[5.5vw] translate-y-[12vw]' width={500} height={300}/>
            </div>
          </div>
            <Image width={500} height={300} src="/registerBg.jpg" alt="bg_img" className='w-screen object-cover blur-sm -z-[10000]'/>
        </div>
    </>
  )
}

export default Page
