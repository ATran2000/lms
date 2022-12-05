import React, { useEffect, useState } from "react";
import { Component, Fragment } from 'react'
import {
  BookOpenIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

var isRead = 'Unread';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function NotificationCard({ name, _class, type, due, isRead, announcementMsg }) {
  const [_isRead, setIsRead] = useState(isRead);

  function markAsRead() {
    setIsRead("Read");

    var _newN = {
      className: _class,
      professorName: "Beta",
      header: name,
      category: type,
      dueDate: due,
      markAsRead: "Read",
      timestamp: "2022-11-01 01:00:00.000",
      announcement: announcementMsg
    };
    console.log(_newN)
    updateNotifications(_newN).then((confMsg) => {
      console.log("confMSG")
      console.log(confMsg)
    })

  }

  async function updateNotifications(newData) {
    const dataSlug = {
      requestType: "updateNotification",
      dataGuy: newData,
      // requestType is the client's request (right now, it is uniqueNotifications which happens when going to home page to notification page)
      // i think could later be replaced by other client's requests such as sorts and filters
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSlug),
    };

    const response = await fetch("http://localhost:8080/api2", options);
    const body = await response.json();
    var uniqueNotifications = body.message;
    console.log("Got called");
    return uniqueNotifications;
  }

  // function sendData() {
  //   if (errMsgs.length === 0) {
  //     var _newN = {
  //       className: _class,
  //       professorName: "Beta",
  //       header: name,
  //       category: categoryRef.current.value,
  //       dueDate: due,
  //       markAsRead: _isRead,
  //       timestamp: "2022-11-01 01:00:00.000",
  //     };
  //     console.log(_newN)
  //     // changeNewN(_newN);
  //     btnClick(_newN).then((confMsg) => {
  //       console.log(confMsg);
  //     });

  //   }
  // }

  return (
    <div className="w-[100%] bg-white p-10 border-2 rounded-lg lg:flex lg:items-center lg:justify-between mb-3  ">
      <div className="min-w-0 flex-1">
        <div class="flex items-center">
          {
            _isRead == 'Unread' && <StarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" title="New Notification" />
          }
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {name}
          </h2>
        </div>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div title='Class Name' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <BookOpenIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {_class}
          </div>
          <div title='Category' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <PencilIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {type}
          </div>
          <div title='Due Date' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {due}
          </div>
        </div>
        <div className="text-gray-600 sm:truncate sm:text-sm sm:tracking-tight pt-3">
          {announcementMsg}
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4 ">
        {
          _isRead == 'Unread' &&
          <span className=" sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={markAsRead}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Mark as Read
            </button>
          </span>
        }

        <span className="ml-3  sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            View
          </button>
        </span>
      </div>
    </div>
  )
}

export default NotificationCard
