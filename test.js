/*
*   {JSON} Placeholder
*   Free fake API for testing and prototyping.
*/

var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

describe("Test 'jsonplaceholder' - Free API for testing and prototyping", () => {
    
    /**
     * Test the GET route - GET	/posts?userId=<id>&title=<title> 
    */
     testCase('Test the GET route - GET /posts?userId=<id>&title=<title>', () => {
        it("it should GET post by userId (1) and title ('nesciunt quas odio') ", (done) => {
          const userId = 1;
          const title = 'nesciunt quas odio' 
          chai.request('https://jsonplaceholder.typicode.com')
              .get('/posts?userId=' + userId + '&title=' + title)
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('id');
                    response.body[0].should.have.property('title');
                    response.body[0].should.have.property('body');
                    response.body[0].should.have.property('id').equal(5);
                    response.body[0].should.have.property('title').equal('nesciunt quas odio');
                    response.body[0].should.have.property('body').equal('repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque')
                  done();
              });
        });

        it("it expect GET post by userId (1) and title ('magnam facilis autem') ", (done) => {
            const userId = 1;
            const title = 'magnam facilis autem' 
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userId=' + userId + '&title=' + title)
                .end((err, response) => {
                      expect(response.statusCode).to.equal(200);
                      expect(response.body).to.be.a('array');
                      expect(response.body).to.be.a('array').to.have.lengthOf(1);
                      expect(response.body[0]).to.have.property('id');
                      expect(response.body[0]).to.have.property('title');
                      expect(response.body[0]).to.have.property('body');
                      expect(response.body[0]).to.have.property('id').to.equal(7);
                      expect(response.body[0]).to.have.property('title').to.deep.include('magnam facilis autem');
                      expect(response.body[0]).to.have.property('body').to.deep.include('dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas');
                    done();
                });
          });

        it("it assert GET post by userId (1) and title ('dolorem dolore est ipsam') ", (done) => {
            const userId = 1;
            const title = 'dolorem dolore est ipsam' 
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userId=' + userId + '&title=' + title)
                .end((err, response) => {
                      expect(response.statusCode).to.equal(200);
                      assert.typeOf(response.body, 'array');
                      assert.lengthOf(response.body, 1);
                      assert.match(response.body[0]['id'], /^8/, 'regexp matches');
                      assert.match(response.body[0]['title'], /^dolorem/, 'regexp matches');
                      assert.match(response.body[0]['body'], /^dignissimos aperiam dolorem/, 'regexp matches');
                    done();
                });
          });

        it("It should not GET a post by wrong ID (123) or/and wrond title ('apiapiapiapiapi') => (empty array)", (done) => {
            const userId = 123;
            const title = 'apiapiapiapiapi' 
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userId=' + userId + '&title=' + title)
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.to.be.empty;
                    done();
                });
            });
    });

    /**
     * Test the GET route - GET	/posts
    */
    testCase('Test the GET route - GET /posts', () => {
        it('it should GET all posts', (done) => {
          chai.request('https://jsonplaceholder.typicode.com')
              .get('/posts')
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.equal(100);
                  done();
              });
        });

        it('it should NOT GET all posts', (done) => {
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/post') 
                .end((err, response) => {
                        response.should.have.status(404);
                    done();
                });
            });
    });

    /**
     * Test the GET {by id} route - GET	/posts/1  
    */
    testCase('Test the GET {by id} route - GET /posts/1', () => {
        it('It should GET a post by ID = 1', (done) => {
            const postID = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts/' + postID)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('id').equal(1);
                    done();
                });
        });
        
        it('It should not GET a post by wrong ID ', (done) => {
            const postID = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts/' + postID)
                .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

     /**
     * Test the GET {by id} route - GET	/posts?userId=1 
    */
    testCase('Test the GET {by userId} route - GET /posts?userId=1 ', () => {
        it('It should GET all posts by userID = 1', (done) => {
            const userId = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userId=' + userId)
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(10);
                    done();
                });
        });
        
        it('It should not GET any posts by wrong userID (empty array)', (done) => {
            const userId = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userId=' + userId)
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the GET {by id} route - GET	/posts/1/comments
    */
      testCase('Test the GET all comments route - GET /posts/1/comments ', () => {
        it('It should GET all comments for post = 1', (done) => {
            const postId = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts/'+ postId + '/comments')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body[0].should.have.property('id');
                        response.body[0].should.have.property('name');
                        response.body[0].should.have.property('email');
                        response.body[0].should.have.property('body');
                        response.body[0].should.have.property('id').equal(1);
                        response.body[0].should.have.property('postId').equal(1)
                        response.body[0].should.have.property('email').equal('Eliseo@gardner.biz');
                        response.body[0].should.have.property('body').include('laudantium enim quasi');
                    done();
                });
        });
        
        it('It should not GET any comments not existing post', (done) => {
            const postId = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts/'+ postId + '/comments')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the GET {by id} route - GET	/albums/1/photos
    */
     testCase('Test the GET all photos route - GET /albums/1/photos ', () => {
        it('It should GET photos for album = 1', (done) => {
            const albumId = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/albums/'+ albumId + '/photos')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body[0].should.have.property('id');
                        response.body[0].should.have.property('albumId');
                        response.body[0].should.have.property('title');
                        response.body[0].should.have.property('url');
                        response.body[0].should.have.property('thumbnailUrl');
                        response.body[0].should.have.property('id').equal(1);
                        response.body[0].should.have.property('albumId').equal(1)
                        response.body[0].should.have.property('title').equal('accusamus beatae ad facilis cum similique qui sunt');
                        response.body[0].should.have.property('url').include('https://via.placeholder.com/600/92c952');
                        response.body[0].should.have.property('thumbnailUrl').include('https://via.placeholder.com/150/92c952');
                    done();
                });
        });
        
        it('It should not GET any photos for not existing album', (done) => {
            const albumId = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/albums/'+ albumId + '/photos')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the GET {by id} route - GET	/users/1/albums
    */
     testCase('Test the GET all user albums route - GET /users/1/albums', () => {
        it('It should GET all user albums for user = 1', (done) => {
            const userID = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ userID + '/albums')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body[0].should.have.property('id');
                        response.body[0].should.have.property('userId');
                        response.body[0].should.have.property('title');
                        response.body[0].should.have.property('id').equal(1);
                        response.body[0].should.have.property('userId').equal(1)
                        response.body[0].should.have.property('title').equal('quidem molestiae enim');
                    done();
                });
        });
        
        it('It should not GET any user albums not existing user', (done) => {
            const userID = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ userID + '/albums')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the GET {by id} route - GET	/users/1/todos
    */
     testCase('Test the GET all user albums route - GET /users/1/todos', () => {
        it('It should GET all todos for user = 1', (done) => {
            const postId = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ postId + '/todos')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body[0].should.have.property('id');
                        response.body[0].should.have.property('userId');
                        response.body[0].should.have.property('title');
                        response.body[0].should.have.property('completed');
                        response.body[0].should.have.property('id').equal(1);
                        response.body[0].should.have.property('userId').equal(1)
                        response.body[0].should.have.property('title').equal('delectus aut autem');
                        response.body[0].should.have.property('completed').equal(false);
                    done();
                });
        });
        
        it('It should not GET any todos not existing user', (done) => {
            const postId = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ postId + '/todos')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the GET {by id} route - GET	/users/1/posts
    */
      testCase('Test the GET all user albums route - GET /users/1/posts', () => {
        it('It should GET all user posts for user = 1', (done) => {
            const userID = 1;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ userID + '/posts')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body[0].should.have.property('id');
                        response.body[0].should.have.property('userId');
                        response.body[0].should.have.property('title');
                        response.body[0].should.have.property('body');
                        response.body[0].should.have.property('id').equal(1);
                        response.body[0].should.have.property('userId').equal(1)
                        response.body[0].should.have.property('title').include('sunt aut facere repellat provident');
                        response.body[0].should.have.property('body').include('quia et suscipit');
                    done();
                });
        });
        
        it('It should not GET any user posts not existing user', (done) => {
            const userID = 123;
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/users/'+ userID + '/posts')
                .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        response.body.length.should.be.equal(0);
                        response.body.should.to.be.empty;
                    done();
                });
        });
    });

    /**
     * Test the POST route - POST /posts  
    */
    testCase('Test the POST route - POST /posts ', () => {
        it('It should POST a new post', (done) => {
            const postNew = {
                userId: '101',
                title: 'title for new post #101',
                body: 'text for new post #101'
            };
            chai.request('https://jsonplaceholder.typicode.com')
                .post('/posts')
                .send(postNew)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.should.be.json;
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('id').equal(101);
                    response.body.should.have.property('userId').equal('101');
                    response.body.should.have.property('title').include('new post #101');
                    response.body.should.have.property('body').include('text for new post #101');
                    done();
                });
        });
    });

    /**
     * Test the POST {by id} route - POST /users/1/todos
    */
     testCase('Test the POST new user todos route - POST /users/1/todos', () => {
        it('It should POST new user todos for user = 1', (done) => {
            const userId = 1;
            const todosNew = {
                userId: '101',
                title: 'title for new todos #201',
                completed: true
            };
            chai.request('https://jsonplaceholder.typicode.com')
                .post('/users/'+ userId + '/todos')
                .send(todosNew)
                .end((err, response) => {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.should.be.json;
                        response.body.should.have.property('id');
                        response.body.should.have.property('userId');
                        response.body.should.have.property('title');
                        response.body.should.have.property('completed');
                        response.body.should.have.property('id').equal(201);
                        response.body.should.have.property('userId').equal('1')
                        response.body.should.have.property('title').equal('title for new todos #201');
                        response.body.should.have.property('completed').equal(true);
                    done();
                });
        });
    });    

    /**
     * Test the POST {by id} route - POST /users/1/albums
    */
      testCase('Test the POST new user albums route - POST /users/1/albums', () => {
        it('It should GET all user albums for user = 1', (done) => {
            const userID = 1;
            const albumNew = {
                userId: '101',
                title: 'title for new album #101',
            };
            chai.request('https://jsonplaceholder.typicode.com')
                .post('/users/'+ userID + '/albums')
                .send(albumNew)
                .end((err, response) => {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.should.be.json;
                        response.body.should.have.property('id');
                        response.body.should.have.property('userId');
                        response.body.should.have.property('title');
                        response.body.should.have.property('id').equal(101);
                        response.body.should.have.property('userId').equal('1')
                        response.body.should.have.property('title').equal('title for new album #101');
                    done();
                });
        });
    });
    
    /**
     * Test the PUT route - PUT /posts/1  
    */
    testCase('Test the PUT route - PUT /posts/1 ', () => {
        it('It should PUT aN existing post', (done) => {
            const postID = 1
            const postPUT = {
                userId: '1',
                title: 'Changed title for new post #1',
                body: 'Changed text for new post #1'
            };
            chai.request('https://jsonplaceholder.typicode.com')
                .put('/posts/' + postID)
                .send(postPUT)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.should.be.json;
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('id').equal(1);
                    response.body.should.have.property('userId').equal('1');
                    response.body.should.have.property('title').include('Changed title');
                    response.body.should.have.property('body').include('Changed text');
                    done();
                });
        });
    });
    
    /**
     * Test the PATCH route - PATCH /posts/1  
    */
    testCase('Test the PATCH route - PATCH /posts/1', () => {
        it('It should PATCH an existing post', (done) => {
            const postID = 1
            const postPATCH = {
                title: 'Changed double title for old post #1',
            };
            chai.request('https://jsonplaceholder.typicode.com')
                .patch('/posts/' + postID)
                .send(postPATCH)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.should.be.json;
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('id').equal(1);
                    response.body.should.have.property('title').include('Changed double title');
                    done();
                });
        });
    });

    /**
     * Test the DELETE route - DELETE /posts/1 
    */
    testCase('Test the DELETE route - DELETE /posts/1 ', () => {
        it('It should DELETE am existing post with ID = 1', (done) => {
            const postID = 1
            chai.request('https://jsonplaceholder.typicode.com') 
                .delete('/posts/'+ postID)
                .end((err, response) => {
                    response.should.have.status(200); 
                    response.should.be.json;
                    response.body.should.be.a('object');
                    done();
                });
        });
    });
});