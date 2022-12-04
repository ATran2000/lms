import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { TagIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function CategoryDropDown({ filterFunc }) {
  const categories = ["Quiz", "Test", "Paper", "Discussion", "Reading", "Announcement"];
  var i = 0;
  function idGen() {
    i = i + 1;
    return "classDD" + String(i);
  }


  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium">
          <TagIcon title="Filter By Class" className="mr-1.5 h-7 w-7 flex-shrink-0 text-gray-600" aria-hidden="true" />
          <p class="mt-1 hidden lg:block text-gray-600">Filter By Category</p>
          {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="select-none absolute right-[-10] z-10000 mt-2 w-48 origin-top-right shadow-lg rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categories?.map((e) => (
              <Menu.Item key={idGen() + "Menu"}>
              {({ active }) => (
                <p onClick={event => filterFunc(event.target.innerText)} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>{e}</p>
              )}
            </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default CategoryDropDown;
