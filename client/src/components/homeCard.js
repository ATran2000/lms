import React from 'react'


function homeCardHeader(props) {
  return (
    <div className='flex border rounded grid grid-cols-1 my-3'>
      <div className='flex border-b bg-[#f8f8f8] justify-left font-semibold p-1 px-3 w-full'>
        <p>{props.name}</p>
      </div>
      <div className='flex justify-left p-3 w-full'>
        {props.children}
      </div>
    </div>

  )
}

export default homeCardHeader
