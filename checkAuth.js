var request = require('request')

var options = {
  method: 'post',
  body: {username: "bob", password: "password111"},
  json: true, // Use,If you are sending JSON data
  url: "http://localhost:3000/auth",
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