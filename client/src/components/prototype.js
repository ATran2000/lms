import React, { useEffect } from 'react';

import Notification from './notification'
import ClassDropdown from './classDropdown'

import { AdjustmentsHorizontalIcon, Bars4Icon, CalendarDaysIcon, EnvelopeIcon, EnvelopeOpenIcon, ExclamationCircleIcon, FunnelIcon, InboxArrowDownIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, TagIcon } from '@heroicons/react/20/solid'

export default function Prototype() {
  // I believe this is where we should get the unique notifications and replace static data 
  useEffect(() => {
    // function to receive unique notifications from the server side
    async function getUniqueNotifications() {
      const dataSlug = {
        requestType: "uniqueNotifications"
        // requestType is the client's request (right now, it is uniqueNotifications which happens when going to home page to notification page)
        // i think could later be replaced by other client's requests such as sorts and filters
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSlug)
      }

      const response = await fetch('http://localhost:8080/api', options);
      const body = await response.json();
      var uniqueNotifications = body.message;

      return uniqueNotifications;
    }

    getUniqueNotifications().then(uniqueNotifications => {
      console.log(uniqueNotifications);
    });
  }, [])

  return (
    <>
        <div id="sidebarContainer" class="w-full h-[90vh] flex bg-slate-300">
            <div class="w-[15%] bg-slate-200 border-r-2 border-gray-400">
              <p class="lg:flex justify-center mt-6 hidden text-2xl text-gray-500 font-semibold">Notifications</p>
              <div className="mb-[-5px] hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-6 items-center text-sm text-gray-500">
                {/* <p class="hidden lg:block text-gray-600">Filter By Class</p> */}
                <ClassDropdown />
              </div>
              <div title="Filter By Date" className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500">
                <CalendarDaysIcon className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
                <p class="hidden lg:block text-gray-600">Filter By Date</p>
              </div>
              <div title="Priority" className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500">
                <ExclamationCircleIcon className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
                <p class="hidden lg:block text-gray-600">Filter by Priority</p>
              </div>
              <div title="Category" className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500">
                <TagIcon className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
                <p class="hidden lg:block text-gray-600">Filter by Category</p>
              </div>
              <div title="Priority" className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500">
                <InboxArrowDownIcon className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
                <p class="hidden lg:block text-gray-600">View Unread Only</p>
              </div>
              <div title="Search" className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500">
                <MagnifyingGlassCircleIcon className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
                <p class="hidden lg:block text-gray-600">Search</p>
              </div>
            </div>
            <div id="notificationsContainer" class="w-[85%]">
              <div class="">
                  <Notification isNew={false} name="Chapter 5 Quiz Graded" class="PSYC 1010 - Introduction to Psychology" type="Quiz" due="N/A" />
              </div>
              <div class="">
                  <Notification isNew={false} name="Corrections for Eyesight Lab" class="LIFE 2050 - Life Science II" type="Paper" due="N/A" />
              </div>
              <div class="">
                  <Notification isNew={false} name="Chapter 2 Discussion Board Post Assigned" class="COMP 4200 - Software Engineering I" type="Discussion" due="November 19th, 2022" />
              </div>
              <div class="">
                  <Notification isNew={true} name="Chapter 11 Reading Passed Out" class="COMP 4040 - Analysis of Algorithms" type="Reading" due="December 1st, 2022" />
              </div>
            </div>
        </div>
    </>
  )
}
