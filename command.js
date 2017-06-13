var request = require('request')

var options = {
  method: 'post',
  body: {name: "cleaning", Created_date: Date.now}, // Javascript object
  json: true, // Use,If you are sending JSON data
  url: "http://localhost:3000/tasks",
  headers: {
    // Specify headers, If any
  }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  }
  console.log(' Body :', body)

});