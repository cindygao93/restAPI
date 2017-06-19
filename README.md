# restAPI for sending messages

## Description:
this API allows you to send messages as a user to another user using the app. Once authenticated, you can view your messages, send another user messages, and delete messages you have received.

## Implementation Architecture
This REST api uses the Express.js for the server, MongoDB for the database and Node.js as the framework for server side functionality. It maintains an M(V)C architecture for cleanliness and readability. All valid routes are found in api/routes along with it's corresponding valid HTTP requests. Mongoose is used to write query, and validate the mongoDB database. Database schemas are stored in api/models in addition to related schema functions. 

*Permissions:* Users may only view messages that they themselves received, they do not have access to all messages in the database. Likewise, they can only delete messages that were sent to them.


## Use Case Interaction
![Use Case 1](https://github.com/cindygao93/restAPI/blob/master/seq1.png)
![Use Case 2](https://github.com/cindygao93/restAPI/blob/master/seq2.png)


## Build, Deploy, Access App

To use this app, in terminal enter 'git clone: https://github.com/cindygao93/restAPI.git' in the folder of your choice. Follow the API documentation below to see how to use the web app.

## Rest API documentation
_currently just for running on local server_
Live web app can be viewed here: https://shrouded-bastion-77652.herokuapp.com/
but seems to throw error even though it runs fine on local server

**Creating a user:**
```
request 
method: POST
body params: 
    {username: "insert username here", password: "insert password here"}
route: /signup
```

**Viewing user received messages:**
```
method: GET
route: /messages
returns: json of messages
```

**Creating a message:**
```
method: POST
body: {message: "insert message", created_date: "optional", receiver: "id of receiptent user"}
route: /messages
```

**Deleting a message:**
```
-deletes message with id of @id
method: DELETE
route: /messages/@id
```

**Determining if specific message is palindrome:**
```
-determines if message with id of @id is a palindrome or not
method: GET
route: /messages/@id
returns: json with status and whether string is palindrome or not
```

**Logging out:**
```
method: GET
route: /logout
```



