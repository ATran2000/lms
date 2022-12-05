import React, { useEffect, useState } from "react";

import Notification from "./notification";
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

      const response = await fetch("http://localhost:8080/api", options);
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
    setCurNotifs(FilteredClasses);
  }

  //WIP
  function dateFilter() {
    const date = new Date();
    // date.getDate()
    var date1 = Date.parse("2022-11-16");
    var date2 = Date.parse("2022-11-17");
    // console.log(date2)
    // console.log(Date.parse("0"))
    if (date1 > date2) {
      // console.log("2022-11-19 > 2022-11-17");
      // console.log(date1 + " > " + date2);
    }
    var dateFilter = [];
    for (var i = 0; i < notif.length; i++) {
      dateFilter.push(notif[i]);
    }
    // console.log(dateFilter)

    for (var i = 0; i < dateFilter.length; i++) {
      // console.log(dateFilter)
      for (var j = 0; j < dateFilter.length - 1; j++) {
        // console.log(dateFilter[j + 1].dueDate + " < " + dateFilter[j].dueDate)
        // console.log(Date.parse(dateFilter[j + 1].dueDate) + " < " + Date.parse(dateFilter[j].dueDate))
        var d1 = Date.parse(dateFilter[j + 1].dueDate);
        var d2 = Date.parse(dateFilter[j].dueDate);

        if (d1 == NaN) {
          d1 = 946702800000;
        }
        if (d2 == NaN) {
          d2 = 946702800000;
        }
        if (d1 < d2) {
          // console.log("SWAP!")
          // [dateFilter[j+1], dateFilter[j]] = [dateFilter[j],dateFilter[j+1]]
          // console.log(dateFilter)
          var tmp = dateFilter[j + 1];
          dateFilter[j + 1] = dateFilter[j];
          dateFilter[j] = tmp;
          // console.log(dateFilter)
        }
      }
    }
    // console.log(dateFilter)
  }

  function categoryFilter(cat) {
    // console.log(cat);
    var FilteredClasses = [];
    for (var i = 0; i < notif.length; i++) {
      if (notif[i].category == cat) {
        FilteredClasses.push(notif[i]);
      }
    }
    setCurNotifs(FilteredClasses);
  }

  function unreadFilter(){
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

  function clearFilters(){
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
            title="Priority"
            className="hover:cursor-pointer flex ml-[0%] justify-center lg:justify-start lg:ml-[10%] mt-4 items-center text-sm text-gray-500"
          >
            <ExclamationCircleIcon
              className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            <p className="hidden lg:block text-gray-600">Filter by Priority</p>
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
            <p className="hidden lg:block text-gray-600">Search</p>
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
        <div id="notificationsContainer" className="w-[80%] mt-6">
          {curNotif?.map((e) => (
            <Notification
              key={idGen() + "inner"}
              isNew={e['markAsRead']}
              name={e["header"]}
              _class={e["className"]}
              type={e["category"]}
              due={e["dueDate"]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
