import { Fragment } from 'react'
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
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function notification(props) {
  var readN = {
    className: props._class,
    professorName: "beta",
    header:  props.name,
    category: props.type,
    dueDate: props.due,
    markAsRead: "Read",
    timestamp: "2022-11-01 01:00:00.000",
  };
  async function updateRead(name) {
    const dataSlug = {
      requestType: "updateReadStatus",
      dataGuy: readN,
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

  return (
    <div className="w-[100%] bg-white p-10 border-2 rounded-lg lg:flex lg:items-center lg:justify-between mb-3  ">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {props.name}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div title='Class Name' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <BookOpenIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {props._class}
          </div>
          <div title='Category' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <PencilIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {props.type}
          </div>
          <div title='Due Date' className="hover:cursor-default mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {props.due}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4 ">
        <span className=" sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={updateRead}
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Mark as Read
          </button>
        </span>

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
