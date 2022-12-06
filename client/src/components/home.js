import React, { useEffect, useState } from "react";
import HomeCard from "./homeCard";
import ClassCardHome from "./classCardHome";
import "./home.css";

export default function Home() {
  const [classes, setClasses] = useState();

  var test = "";
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

      const response = await fetch("https://swelms.herokuapp.com/api", options);
      const body = await response.json();
      var uniqueNotifications = body.message;

      return uniqueNotifications;
    }

    getUniqueNotifications().then((uniqueNotifications) => {
      // console.log(uniqueNotifications);
      var uniqueClasses = [];
      outerLoop: for (var i = 0; i < uniqueNotifications.length; i++) {
        // console.log(uniqueNotifications[i].className);
        for (var j = 0; j < uniqueClasses.length; j++) {
          // console.log(uniqueClasses[j][0]);
          if (uniqueNotifications[i].className == uniqueClasses[j][0]) {
            uniqueClasses[j][1].push(uniqueNotifications[i].header);
            continue outerLoop;
          }
        }
        uniqueClasses.push([
          uniqueNotifications[i].className,
          [uniqueNotifications[i].header],
        ]);
      }
      // console.log(uniqueClasses);
      setClasses(uniqueClasses);
    });
  }, []);

  var i = 0;
  function idGen() {
    i = i + 1;
    return "homeID" + String(i);
  }

  return (
    <div className="grid grid-cols-3 gap-3 border m-10 justify-center">
      <div id="homeDiv1" className="mx-3">
        <HomeCard name="My Messages">
          <div className="homeBodyCard">
            <p>Courses with messages:</p>
            <p className="italic justify-self-center">
              You have no new unread messages!
            </p>
          </div>
        </HomeCard>
        <HomeCard name="My Announcements">
          <div className="homeBodyCard">
            <p className="italic justify-self-center">
              No Institution Announcements have been posted in the last 7 days.
            </p>
          </div>
        </HomeCard>
      </div>
      <div id="homeDiv1">
        <HomeCard name="My Courses">
          <div className="homeBodyCard">
            <p>Courses where you are: Student</p>
            {classes?.map((e) => (
              <ClassCardHome
                key={idGen()}
                ClassName={e[0]}
                Notification={e[1]}
              ></ClassCardHome>
            ))}
          </div>
        </HomeCard>
        <HomeCard name="UML Library Resources">
          <div className="homeBodyCard">
            <p>
              Search the UML Library Database{" "}
              <a href="https://www.uml.edu/library/">
                https://www.uml.edu/library/
              </a>
            </p>
            <p>
              A-Z Databases{" "}
              <a href="https://libguides.uml.edu/az.php">
                https://libguides.uml.edu/az.php
              </a>
            </p>
            <p>
              Research Guides{" "}
              <a href="https://libguides.uml.edu/">
                https://libguides.uml.edu/
              </a>
            </p>
            <p>
              FAQ’s{" "}
              <a href="https://uml.libanswers.com/search/">
                https://uml.libanswers.com/search/
              </a>
            </p>
            <p>
              Ask a Librarian –{" "}
              <a href="ask@uml.libanswers.com">ask@uml.libanswers.com</a>
            </p>
            <br></br>
            <p style={{ color: "rgb(12,81,255)" }}>
              *Students – Some courses on Blackboard will have direct links to
              library resources that you may need to login to access. If you are
              getting an error when trying to access direct links to database
              articles, please notify{" "}
              <a href="ask@uml.libanswers.com">ask@uml.libanswers.com</a> and
              they can assist.
            </p>
          </div>
        </HomeCard>
        <HomeCard name="My Organizations">
          <div className="homeBodyCard">
            <p className="italic justify-self-center">
              You are not currently participating in any organizations.
            </p>
          </div>
        </HomeCard>
      </div>
      <div id="homeDiv1" className="mx-3">
        <HomeCard name="Tech Support">
          <div className="homeBodyCard">
            <p className="italic justify-self-center">
              Tech Support is current down
            </p>
          </div>
        </HomeCard>
      </div>
    </div>
  );
}
