# restAPI for sending messages

**Description:** 
this API allows you to send messages as a user to another user using the app. Once authenticated, you can view your messages, send another user messages, and delete messages you have received.

**Implementation Architecture:**
This REST api uses the Express.js for the server, MongoDB for the database and Node.js as the framework for server side functionality. It maintains an M(V)C architecture for cleanliness and readability. All valid routes are found in api/routes along with it's corresponding valid HTTP requests. Mongoose is used to write query, and validate the mongoDB database. Database schemas are stored in api/models in addition to related schema functions. 

*Permissions:* Users may only view messages that they themselves received, they do not have access to all messages in the database. Likewise, they can only delete messages that were sent to them.


**Use Case Interaction**


**Build, Deploy, Access App**

To use this app, in terminal enter 'git clone: https://github.com/cindygao93/restAPI.git' in the folder of your choice. Follow the API documentation below to see how to use the web app.

**Rest API documentation**
