var request = require('request')

var options = {
  method: 'delete',
  json: true, // Use,If you are sending JSON data
  url: "http://localhost:3000/tasks/594012f0a0c59b5ef4a7911e",
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