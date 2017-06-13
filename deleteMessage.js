var request = require('request')

var options = {
  method: 'delete',
  json: true, // Use,If you are sending JSON data
  url: "http://localhost:3000/messages/594026c504011e644246940f",
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