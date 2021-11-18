## JSONPlaceholder

[JSONPlaceholder](http://jsonplaceholder.typicode.com/ "JSONPlaceholder") is a simple fake REST API for testing and prototyping.

[JSONPlaceholder](http://jsonplaceholder.typicode.com/ "JSONPlaceholder") is powered by JSON Server.

### Setup Your Project:
Before installing dependencies, initialize a new NPM project:

> mkdir api-test-js && cd api-test-js
npm init

### Install Necessary Dependencies:
> npm install mocha chai --save-dev

This should install Mocha and Chai in your project.

### Setup Your Tests:

Create a new test.js file in your root folder to begin writing your API tests. For this tutorial was used [https://jsonplaceholder.typicode.com/](http://jsonplaceholder.typicode.com/ "https://jsonplaceholder.typicode.com/") website to test the APIs. JSONPlaceholder provides fake REST APIs for testing and prototyping and works perfectly for the examples here.


### Routes
All HTTP methods are supported. You can use http or https for the requests.

>GET	 /posts
>GET	 /posts/1
>GET	 /posts/1/comments
> GET  /posts?userId=<...>&title=<...>
>GET	 /comments?postId=1
>GET  /posts/1/comments
>GET  /albums/1/photos
>GET  /users/1/albums
>GET  /users/1/todos
>GET  /users/1/posts
>POST /posts
>POST /users/1/todos
>POST /users/1/albums
>PUT	 /posts/1
>PUT  /users/1/posts
>PATCH	/posts/1
>DELETE	/posts/1


### RUN tests:

>1) open cmd -> .\node_modules\.bin\_mocha test.js
2) To run tests, head over to the package.json  file and update the test script to use the mocha command:

>"scripts":{
   "test":"mocha"
 }

Now, you can run test by doing npm test in your root folder.

### Conclusion:
That is a short introduction on the basics of API testing and getting started with API test automation using JavaScript.
