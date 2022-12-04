import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import NotificationFrom from "./NotificationFrom";

function ProfessorMode() {
  // const [newNotification, setnewNotification] = useState();
  async function sendNotifications(newData) {
    const dataSlug = {
      requestType: "sendNotification",
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

  return (
    <div className="w-full h-full flex">
      <div className="flex w-5/6 justify-center m-10">
        <NotificationFrom
          btnClick={sendNotifications}
        ></NotificationFrom>
      </div>
    </div>
  );
}

export default ProfessorMode;
