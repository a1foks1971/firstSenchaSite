// Importing express and cors modules
const express = require("express");
const cors = require("cors"); // Import cors middleware
const app = express();

// Enable CORS for all origins (or configure specific domains)
app.use(cors()); // This will allow all domains to make requests to your server

// Example data
var data = [{
    id: 1001,
    calendarId: 1,
    startDate: "2023-02-18T03:00:00.000Z",
    endDate: "2023-02-18T04:00:00.000Z",
    title: "1",
    description: "Description 1"
}, {
    id: 1002,
    calendarId: 1,
    startDate: "2023-02-18T04:00:00.000Z",
    endDate: "2023-02-18T05:00:00.000Z",
    title: "2",
    description: "Description 2"
}, {
    id: 1003,
    calendarId: 1,
    startDate: "2023-02-08T15:00:00.000Z",
    endDate: "2023-02-08T16:00:00.000Z",
    title: '3',
    description: "Description 3"
}, {
    id: 2001,
    calendarId: 2,
    startDate: "2023-02-08T17:00:00.000Z",
    endDate: "2023-02-08T18:00:00.000Z",
    title: '4',
    description: "Description 4"
}, {
    id: 2002,
    calendarId: 2,
    startDate: "2023-02-28T13:00:00.000Z",
    endDate: "2023-02-28T14:00:00.000Z",
    title: '5',
    description: "Description 5"
}, {
    id: 2003,
    calendarId: 2,
    startDate: "2023-02-28T14:00:00.000Z",
    endDate: "2023-02-28T15:00:00.000Z",
    title: '6',
    description: "Description 6"
}, {
    id: 2004,
    calendarId: 2,
    startDate: "2023-02-01T14:00:00.000Z",
    endDate: "2023-02-01T15:00:00.000Z",
    title: '7',
    description: "Description 7"
}];

// /calendars endpoint
app.get("/calendars", (req, res) => {
    res.send([{
        "id": 1,
        "title": "Personal"
    }, {
        "id": 2,
        "title": "Work"
    }]);
});

// /delete endpoint using DELETE method
app.post("/delete", (req, res) => {
    // Logic to delete data (for now, just sending a confirmation message)
    res.send({ data: [{}], message: "Item deleted successfully" });
});

// /events endpoint to filter data by calendarId
app.get("/events", (req, res) => {
    var results = data.filter(function (rec) {
        if (rec.calendarId == req.query.calendar) {
            return rec;
        }
    });
    res.send(results);
});

// Server setup
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
