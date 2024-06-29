import React from 'react'

interface nameType{
    name: String;
}
function InputBox({name}: nameType) {
  return (
    <input type='text' name={`${name}`} className='w-[95%] rounded-lg font-normal text-xl px-3 py-2 mb-2' id={`${name}`} placeholder={`${name}`}/>
  )
}

export default InputBox