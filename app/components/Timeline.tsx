import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'

function Timeline() {
  return (
    <>
        <div className='w-full h-fit z-[1000] overflow-hidden absolute'>
            {/* <div className='w-full h-screen'></div> */}
            <div className='w-full h-screen bg-[#c0ffa2] rounded-t-[5vw] mt-[100vh]'>
                {/* <VerticalTimeline lineColor='#000'>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--event"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="2011 - 2021"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        visible = {true}
                    >
                        <h3 className="vertical-timeline-element-title">Event Title</h3>
                        <p className='text-black'>
                            Event description goes here.
                        </p>
                    </VerticalTimelineElement> */}
                    {/* <VerticalTimelineElement visible={true}>
                        fgfgfg
                    </VerticalTimelineElement>
                </VerticalTimeline> */}
            </div>
        </div>
    </>
  )
}

export default Timeline
