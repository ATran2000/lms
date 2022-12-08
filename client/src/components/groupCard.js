import React from 'react'

import link from './../images/link.webp'

export default function groupCard(props) {
  return (
    <>
        {/* <div class="mb-10 text-center">
            <img src={props.img} class="w-60 h-60 border-2 border-black rounded-full" />
            <a href={props.link} class="text-2xl">{props.name}</a>
            <p class="italic">{props.role}</p>
        </div> */}
        <div class="bg-white rounded-2xl h-fit py-5 w-80 text-center drop-shadow-md">
            <div class="flex justify-center mb-4">
                <img src={props.img} class="w-60 h-60 rounded-full" />
            </div>
                <a href={props.link} class="text-2xl" target="_blank">
                    <img src={link} class="w-4 h-4 mb-2 mr-2 inline"/>
                    {props.name}
                </a>
            <p class="italic">{props.role}</p>
            <p class="italic">{props.email}</p>
        </div>
    </>
  )
}
