// JSON containing notifications for one student
var aStudent = {
    "name": "Alpha",
    "id": "01234567",
    "notifications": [
        {
            "className": "PSYC 1010 - Introduction to Psychology",
            "professorName": "Beta",
            "header": "Chapter 5 Quiz Graded",
            "category": "Quiz",
            "dueDate": "N/A",
            "markAsRead": "Unread",
            "timestamp": "2022-11-01 01:00:00.000"

        },
        {
            "className": "LIFE 2050 - Life Sceience II",
            "professorName": "Charlie",
            "header": "Corrections for Eyesight Lab",
            "category": "Paper",
            "dueDate": "N/A",
            "markAsRead": "Unread",
            "timestamp": "2022-11-01 01:00:00.000"
        },
        {
            "className": "COMP 4200 - Software Engineering I",
            "professorName": "Delta",
            "header": "Chapter 2 Discussion Board Post Assigned",
            "category": "Discussion",
            "dueDate": "2022-11-19",
            "markAsRead": "Unread",
            "timestamp": "2022-11-01 01:00:00.000"
        },
        {
            "className": "COMP 4040 - Analysis of Algorithms",
            "professorName": "Epsilon",
            "header": "Chapter 11 Reading Passed Out",
            "category": "Reading",
            "dueDate": "2022-12-01",
            "markAsRead": "Unread",
            "timestamp": "2022-11-30 01:00:00.000"
        }
    ]
}

// public functions
module.exports = {
    // DESCRIPTION: main public function that gets sent a data request and returns a json variable
    getData: async function (dataSlug) {
        const data = await getDataVirtualDatabase(dataSlug);
        return data;
    },
    setData: async function (dataSlug) {
        const data = await setDataVirtualDatabase(dataSlug);
        return data;
    },
}

async function getDataVirtualDatabase(dataSlug) {
    // if statements to determine request type
    if (dataSlug.requestType == "uniqueNotifications") { // this request will return a list of all notifications for the student
        return await uniqueNotifications();
    }
}
async function setDataVirtualDatabase(dataSlug) {
    // if statements to determine request type
    console.log("GOT HERE");
    if (dataSlug.requestType == "sendNotification") { // this request will return a list of all notifications for the student
        return await newNotification(dataSlug.dataGuy);
    }
}

async function uniqueNotifications() {
    try {
        var uniqueNotifications = aStudent.notifications;
    } catch (e) {
        console.error(e);
    }

    return uniqueNotifications;
}

async function newNotification(Notification) {
    try {
        // var uniqueNotifications = aStudent.notifications;
        var oldN = JSON.stringify(aStudent.notifications);
        var newN = JSON.stringify(Notification);
        var temp = ""
        for(var i = 0; i < (oldN.length-1); i++){
            temp = temp + oldN[i];
        }
        
        newN = temp + "," + newN + "]" ;
        newN = JSON.parse(newN);

        aStudent.notifications = newN;
        var newStudentA = aStudent.notifications;
    } catch (e) {
        console.error(e);
    }

    return newStudentA;
}

