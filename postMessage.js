var request = require('request')

var options = {
  method: 'post',
  body: {Created_date: Date.now, message: "i am a genius", receiver: "594398ebeab1448131962108"}, // Javascript object
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