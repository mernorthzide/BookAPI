#System

Programming Language: Node.js<br />
Database: MongoDB <br />
Server: Heroku <br />
Source Control: Git<br />
<br />
#API Information
<br />
#Model

title: String <br />
author: String <br />
genre: String <br />
read: Boolean, default: false <br />
timestamp: Number <br />
history: Arry Object<br />
<br />
#Requests

Method: GET <br />
Endpoint: /books <br />
Comment: finds all books<br />
<br />
Method: GET <br />
Endpoint: /books/:bookId <br />
Comment: find book by id<br />
<br />
Method: GET <br />
Endpoint: /books/:bookId?timestamp=0000000000 <br />
Comment: find book by id and get book information from timestamp<br />
<br />
Method: POST <br />
Endpoint: /books <br />
Header: Content-Type: application/json <br />
Comment: creates a new book<br />
<br />
Method: PUT <br />
Endpoint: /books/: <br />
Header: Content-Type: application/json <br />
Comment: update book by id<br />
<br />
Method: PATCH <br />
Endpoint: /books/:bookId <br />
Header: Content-Type: application/json <br />
Comment: update book by id (for partial modifications)<br />
<br />
Method: DELETE <br />
Endpoint: /books/:bookId <br />
Comment: deletes book by id<br />
<br />
powered by : Jumpon Dumkham (Mern)
