import React, { useEffect, useState, useRef } from "react";

function NotificationFrom({ btnClick, errMsgState }) {
  const classNameRef = useRef(null);
  const headerRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);

  function sendData() {
    var errMsgs = [];
    var date = dateRef.current.value;
    console.log(classNameRef.current.value.length)
    if (classNameRef.current.value.length < 1) {
      errMsgs.push("Please enter a valid classname!")
    }
    if (headerRef.current.value.length < 1) {
      errMsgs.push("Please enter a valid title!")
    }
    if (dateRef.current.value.length < 1) {
      errMsgs.push("Please enter a valid due date!")
    }
    if(errMsgs.length === 0) {
      var _newN = {
        className: classNameRef.current.value,
        professorName: "Beta",
        header: headerRef.current.value,
        category: categoryRef.current.value,
        dueDate: dateRef.current.value,
        markAsRead: "Unread",
        timestamp: "2022-11-01 01:00:00.000",
      };
      console.log(_newN)
      // changeNewN(_newN);
      btnClick(_newN).then((confMsg) => {
        console.log(confMsg);
      });
      errMsgs.push("Sucess!")
    }
    errMsgState(errMsgs)
    
  }

  return (
    <div className="grid grid-cols-1">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                id="className"
                ref={classNameRef}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="header" className="block text-sm font-medium text-gray-700">
                Header
              </label>
              <input
                type="text"
                name="header"
                id="header"
                ref={headerRef}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
  
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select ref={categoryRef} type="text" name="category">
              <option value="Homework">Homework</option>
              <option value="Quiz">Quiz</option>
              <option value="Exam">Exam</option>
              <option value="Paper">Paper</option>
              <option value="Discussion">Discussion</option>
              <option value="Reading">Reading</option>
              <option value="Announcement">Announcement</option>
            </select>
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                name="due"
                id="due"
                ref={dateRef}
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
              </input>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-center">
          <button
            onClick={sendData}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
  }



export default NotificationFrom;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
