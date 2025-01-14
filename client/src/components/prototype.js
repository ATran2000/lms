import React, { useEffect, useState } from "react";

import Notification from "./notification";
import NotificationCard from "./NotificationCard";
import ClassDropdown from "./classDropdown";
import CategoryDropDown from "./categoryDropDown";

import {
  AdjustmentsHorizontalIcon,
  Bars4Icon,
  CalendarDaysIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ExclamationCircleIcon,
  FunnelIcon,
  InboxArrowDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

export default function Prototype() {
  //sets the JSON into a varible when it has been fetched
  //For all notif
  const [notif, setNotif] = useState();
  //For all notif
  const [curNotif, setCurNotifs] = useState();
  const [uniqueClasses, setClasses] = useState();
  const [searchInput = '', setSearchInput] = useState();


  async function getUniqueNotifications() {
    const dataSlug = {
      requestType: "uniqueNotifications",
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

//       let url;
//       switch(process.env.NODE_ENV) {
//         case 'production':
//           url = 'https://swelms.herokuapp.com';
//           break;
//         case 'development':
//         default:
//           url = 'http://localhost:8080';
//       }

      const response = await fetch("https://us-central1-swe-lms.cloudfunctions.net/app/api", options);
      const body = await response.json();
      var uniqueNotifications = body.message;

    return uniqueNotifications;
  }

  // I believe this is where we should get the unique notifications and replace static data
  useEffect(() => {
    // function to receive unique notifications from the server side
    async function getUniqueNotifications() {
      const dataSlug = {
        requestType: "uniqueNotifications",
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

      const response = await fetch("https://us-central1-swe-lms.cloudfunctions.net/app/api", options);
      const body = await response.json();
      var uniqueNotifications = body.message;

      return uniqueNotifications;
    }

    getUniqueNotifications().then((uniqueNotifications) => {
      setNotif(uniqueNotifications);
      setCurNotifs(uniqueNotifications);

      var unqClasses = [];
      outerLoop: for (var i = 0; i < uniqueNotifications.length; i++) {
        for (var j = 0; j < unqClasses.length; j++) {
          if (uniqueNotifications[i].className == unqClasses[j]) {
            continue outerLoop;
          }
        }
        unqClasses.push(uniqueNotifications[i].className);
      }

      setClasses(unqClasses);
    });
  }, []);

  var i = 0;
  function idGen() {
    i = i + 1;
    return "notifID" + String(i);
  }

  // Function filters by class type
  function classFilter(fClass) {
    var FilteredClasses = [];
    for (var i = 0; i < notif.length; i++) {
      if (notif[i].className == fClass) {
        FilteredClasses.push(notif[i]);
      }
    }
    console.log(FilteredClasses)
    setCurNotifs(FilteredClasses);
  }
  function dateFilter() {
    const sorted = [...notif].sort(function (a, b) {
      var _a = a
      var _b = b
      if (_a.dueDate === "") {
        _a.dueDate = "0"
      }
      if (_b.dueDate === "") {
        _b.dueDate = "0"
      }
      return (Date.parse(_a.dueDate) > Date.parse(_b.dueDate) ? 1 : Date.parse(_a.dueDate) < Date.parse(_b.dueDate) ? -1 : 0)
    })
    const sortedReversed = sorted.reverse()
    console.log(sortedReversed)
    setCurNotifs(sortedReversed)
  }


  function categoryFilter(cat) {
    // console.log(cat);
    var FilteredClasses = [];
    for (var i = 0; i < notif.length; i++) {
      if (notif[i].category == cat) {
        FilteredClasses.push(notif[i]);
      }
    }
    console.log(FilteredClasses)
    setCurNotifs(FilteredClasses);
  }

  function unreadFilter() {
    var FilteredClasses = [];
    for (var i = 0; i < notif.length; i++) {
      if (notif[i].markAsRead == "Unread") {
        console.log(notif[i])
        FilteredClasses.push(notif[i]);
      }
    }
    console.log(FilteredClasses)
    setCurNotifs(FilteredClasses);
  }

  function searchBarFilter(event) {
    event.preventDefault();
    // console.log(event.target.value)
    setSearchInput(event.target.value);

    // would rather just use searchInput value, but for some reason, it is 1 change behind event.target.value so event.target.value is used instead for precise search filtering
    if (event.target.value != '') {
      if (event.target.value.length > 0) {
        var FilteredClasses = [];
        notif.filter((notif) => {
          if (notif.header.toLowerCase().match(event.target.value.toLowerCase()) || notif.className.toLowerCase().match(event.target.value.toLowerCase())
            || notif.category.toLowerCase().match(event.target.value.toLowerCase()) || notif.dueDate.match(event.target.value.toLowerCase())) {
            FilteredClasses.push(notif);
          }
        })
      }
      setCurNotifs(FilteredClasses);
    } else {
      setCurNotifs(notif);
    }
  }

  function clearFilters() {
    setCurNotifs(notif);
  }

  return (
    <>
      <div id="sidebarContainer" className="w-full flex pb-16">
        <div className="w-[15%]">
          <p className="lg:flex justify-center mt-6 hidden text-2xl text-gray-500 font-semibold">
            Notifications
          </p>
          <div
            title="Filter by Class"
            className="mb-[-5px] hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-6 items-center text-sm text-gray-500"
          >
            {/* <p class="hidden lg:block text-gray-600">Filter By Class</p> */}
            <ClassDropdown classes={uniqueClasses} filterFunc={classFilter} />
          </div>
          <div
            title="Filter By Date"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500"
            onClick={dateFilter}
          >
            <CalendarDaysIcon
              className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            <button className="hidden lg:block text-gray-600">
              Filter By Date
            </button>
          </div>
          <div
            title="Category"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500"
          >
            <CategoryDropDown filterFunc={categoryFilter}></CategoryDropDown>
          </div>
          <div
            title="Unread"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-2 items-center text-sm text-gray-500"
            onClick={unreadFilter}
          >
            <InboxArrowDownIcon
              className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            <p className="hidden lg:block text-gray-600">View Unread Only</p>
          </div>
          <div
            title="Search"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500"
          >
            <MagnifyingGlassCircleIcon
              className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            <div class="mb-3 h-7 xl:w-40">
              <div class="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal 
                border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={searchBarFilter} value={searchInput}>
                </input>
                <span class="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 
                text-center whitespace-nowrap rounded" id="basic-addon2">
                </span>
              </div>
            </div>
          </div>
          <div
            title="Clear"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500"
            onClick={clearFilters}
          >
            <XCircleIcon
              className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            <p className="hidden lg:block text-gray-600">Clear Filters</p>
          </div>
        </div>
        <div id="notificationsContainer" className="w-[85%] h-[100%] overflow-y-scroll">
          {curNotif?.map((e) => (
            <NotificationCard
              key={idGen() + "inner"}
              isNew={e['markAsRead']}
              name={e["header"]}
              _class={e["className"]}
              type={e["category"]}
              due={e["dueDate"]}
              isRead={e["markAsRead"]}
              announcementMsg={e["announcement"]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
