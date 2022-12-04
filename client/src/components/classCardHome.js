import React, { useEffect, useState } from 'react';

function ClassCardHome({ ClassName, Notification }) {
    var i = 0;
    function idGen(){
        i = i + 1;
        return ("AncID" + String(i))
    }
    // console.log(Notification)
    return (
        <div className='m-1'>
            <p className='font-semibold text-[#188bbb]'>{ClassName}</p>
            <p className=''>Announcements:</p>
            {Notification?.map((e) => (
                <li className='ml-3' key={idGen()}>{e}</li>
            ))}
            <hr className='solid mt-1'></hr>
        </div>
    )
}

export default ClassCardHome