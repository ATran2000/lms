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
  }

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
