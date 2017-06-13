var request = require('request')

var options = {
  method: 'post',
  body: {Created_date: Date.now, message: "i am a genius"}, // Javascript object
  json: true, // Use,If you are sending JSON data
  url: "http://localhost:3000/messages",
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