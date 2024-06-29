'use client'

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Timeline from '../app/components/Timeline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../styles/globals.css';

// gsap.registerPlugin(ScrollTrigger);

function Page() {

  const router = useRouter()
  const handleProfileClick = () => {
    router.push('/viewProfile')    
  }
  const handleVirtualClick = () => {
    router.push('/virtualVisit')    
  }
  const handleRegisterClick = () => {
    router.push('/register')     
  }

  useEffect(() => {
    gsap.fromTo(
      '.scaling-image',
      { scale: 0.5, alpha: 0.5 }, 
      { scale: 1, duration: 2, ease: 'power2.out', alpha: 1 } 
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.rotating-image',
      { scale: 0.5, alpha: 0 }, 
      { scale: 1, duration: 2, ease: 'power2.out', alpha: 1 } 
    );
  }, []); 

  useEffect(() => {
    gsap.to(
      '.rotating-image', {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'linear',
      }
    )
  }, []); 

  return (
    <>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"></link> */}
      {/* <motion.div style={{x: mouse.x, y: mouse.y}} className='w-3 h-3 rounded-full bg-black z-[1000000000000000000000] absolute'></motion.div> */}
      <nav className='flex items-center justify-between pt-8 px-20 fixed z-[100000] w-screen overflow-hidden'>
        {/* <h1 className='text-3xl font-bold cursor-pointer'>LOGO</h1> */}
        <Image width={500} height={300} alt='' src='/vfsLogo.png' className='w-[15vw]'/>
        <ul className='flex gap-5 text-xl font-normal '>
          {/* <li className='cursor-pointer hover:font-semibold duration-100 ease-linear'>Home</li> */}
          <li onClick={handleRegisterClick} className='cursor-pointer hover:font-semibold duration-100 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold p-3 rounded-3xl border-2 border-black ease-linear hover:shadow-2xl hover:text-2xl'>Register</li>
          {/* <li className='cursor-pointer hover:font-semibold duration-100 ease-linear'>Contact</li> */}
        </ul>
      </nav>
      <div className='w-screen h-screen pt-16 overflow-hidden bg-[#ffe8df] fixed'>
        <Image width={500} height={300} alt='' src="/mandir.png" className='w-[72%] brightness-125 -right-[15vw] scaling-image z-[100] absolute'/>
        <div className='w-[50vw] overflow-hidden'>
          <Image width={500} height={300} alt='' src="/mantra.png"  className='w-[35%] z-[85] mx-auto rotating-image absolute right-[4.9vw]'/>
        </div>
        <Image width={500} height={300} alt='' src="/gradBg.png" className='absolute w-[90%] top-0 right-0'/>
        <div className='px-20 py-24 z-[100] absolute'>
          <h1 className='font-bold text-8xl'>
            Victoria Floors
          </h1>
          <h3 className='text-7xl font-bold pt-4 pl-2'>
            <span className='font-[Satisfy] text-[#ff6827] stroke-black'>
              Street&nbsp;
            </span>
            - 2
          </h3>
          <p className='text-2xl font-bold pl-2 pt-4'>
            Peer Muchalla, Zirakpur <br />
            160104
          </p>
          <div className="button-container">
            <button onClick={handleProfileClick} className='font-bold text-3xl p-5 border-2 border-black rounded-lg mr-8 ml-2 mt-6 cursor-pointer hover:text-4xl duration-150 ease-linear'>
              View Profile
            </button>
            <button onClick={handleVirtualClick} className='font-bold text-3xl p-5 border-2 border-black rounded-lg mr-8 ml-2 mt-6 cursor-pointer text-[#fff4ef] duration-150 bg-gradient-to-r from-orange-500 to-orange-700 hover:shadow-2xl hover:text-4xl'>
              Visit Virtually
            </button>
          </div>
        </div>
      </div>
      {/* <Timeline/> */}
    </>
  );
}

export default Page;
