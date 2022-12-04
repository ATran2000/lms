import React, { useEffect, useState, useRef } from "react";

function NotificationFrom({ btnClick }) {
  const classNameRef = useRef(null);
  const headerRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);

  function sendData() {
    var _newN = {
      className: classNameRef.current.value,
      professorName: "Beta",
      header: headerRef.current.value,
      category: categoryRef.current.value,
      dueDate: dateRef.current.value,
      markAsRead: "Unread",
      timestamp: "2022-11-01 01:00:00.000",
    };
    // changeNewN(_newN);
    btnClick(_newN).then((confMsg) => {
      console.log(confMsg);
    });
  }

  return (
    <div className="grid grid-cols-1">
      <form className="grid grid-cols-2 flex border justify-center">
        <div className="grid grid-cols-1 justify-items-end p-1 m-1">
          <label>Class Name:</label>
          <label>Header:</label>
          <label>Category:</label>
          <label>Due Date:</label>
        </div>
        <div className="grid grid-cols-1 justify-start p-1 m-1">
          <input ref={classNameRef} type="text" name="className" />
          <input ref={headerRef} type="text" name="header" />
          <input ref={categoryRef} type="text" name="category" />
          <input ref={dateRef} type="date" name="dueDate" />
        </div>
      </form>
      <button className="border" onClick={sendData}>
        Send Notification
      </button>
    </div>
  );
}

export default NotificationFrom;
