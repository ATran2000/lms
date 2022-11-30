const express = require("express");
//var cors = require('cors');
const app = express();
//var path = require('path');

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

// EXPRESS CODE
// get cors working
//app.use(cors());

// set up listening on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
//app.use(express.static('public'));

// API CODE
//app.use(express.json({ limit: '1mb' }));

/*
//routing to build folder for index.html
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
  });
}
*/

/*
// API routing to virtual database
app.post('/api', async (request, response) => {
  console.log('I got a request to test!');
  console.log(request.body);
  // send request to virtual database, and get constructed object back
  const data = await virtualDatabase.getData(request.body);
  // return data
  response.json({
    status: 'success',
    message: data,
  });
  console.log("Returned data object!");
  console.log(data);
});
*/