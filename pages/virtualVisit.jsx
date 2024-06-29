'use client'

import React, { useEffect, useRef, useState } from 'react'
import { visitSrc } from '../app/constants/visitSrc'
import Disclaimer from '../app/components/Disclaimer';
// import './page.module.css'
import '../styles/globals.css';

function Page() {
    const canvasRef = useRef(null)
    const [showDisclaimer, setShowDisclaimer] = useState(true)
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameCount = 242;
        const images = [];
        const imageSeq = {
            frame: 0
        };
    
        // Preload images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = visitSrc[i];
            images.push(img);
        }
    
        const render = () => {
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Draw current frame
            scaleImage(images[imageSeq.frame], context);
        };
        
        const scaleImage = (img, ctx) => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        
        render();
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };
    
        // Set initial canvas size
        resizeCanvas();
    
        // Resize listener
        window.addEventListener('resize', resizeCanvas);
    
        // Scroll listener
        const handleScroll = () => {
            console.log('Scrolling');
            // Update frame based on scroll position
            const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const frameIndex = Math.floor(scrollFraction * frameCount);
            imageSeq.frame = Math.min(frameIndex, frameCount - 1); // Ensure frame doesn't exceed frameCount
            console.log('Frame index:', frameIndex);
            console.log('Current frame:', imageSeq.frame);
            render();
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect will run only once, similar to componentDidMount
    
    useEffect(() => {
        const disclaimerTimer = setTimeout(() => {
            setShowDisclaimer(false)
        }, 3000)

        return () => {
            clearTimeout(disclaimerTimer)
        }
    }, [])
    

    return (
        <>
            {showDisclaimer && (<Disclaimer/>)}
            {/* <Disclaimer /> */}
            <div className='h-[500vh] w-full overflow-hidden'>
                <canvas ref={canvasRef} className='fixed object-contain overflow-hidden'/>
            </div>
        </>
    ) 
}

export default Page