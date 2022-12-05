import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import NotificationFrom from "./NotificationFrom";

function ProfessorMode() {
  // const [newNotification, setnewNotification] = useState();
  const [errMsg, setErrMsg] = useState([]);
  const [errStyle, setErrStyle] = useState();
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
  var errCss = {
    display: "none"
  }
  if(errMsg?.length === 0){
    errCss = {
      display: "none"
    }
  } else {
    if (errMsg[0] === "Sucess!") {
      errCss = {
        display: "grid",
        backgroundColor: "rgb(190 242 100)"
      }
    } else {
      errCss = {
        display: "grid",
        backgroundColor: "rgb(252 165 165)"
      }
    }
  }
  
  
  return (
    <div className="w-full justify-center h-full flex grid grid-cols-1">
      <div className="flex justify-center m-10">
        <NotificationFrom
          btnClick={sendNotifications}
          errMsgState={setErrMsg}
        ></NotificationFrom>
      </div>
      <div className="grid grid-cols-1 flex justify-self-center m-5 p-5 shadow sm:rounded-md w-auto" style={errCss}>
        {errMsg?.map((e) => (
          <p className="justify-self-center">{e}</p>
        ))}
      </div>
    </div>
  );
}

export default ProfessorMode;
