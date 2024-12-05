# CREDENTIALS

## Regular User
Please register a new user then use that for login. Or use these regular user credentials:

email: ry@mail.com
password: 1234qwer

## Admin User
email: admin@mail.com
password: 1234qwer

# API Documentation

## Authentication

Token-Based Authentication: Some endpoints require a valid JWT token.

Header Format:

	Authorization: Bearer <token>

Obtain the token by logging in (/users/login).

## Endpoints

### Users

#### Register a New User

URL: /users/register

Method: POST

Description: Create a new user account.

Request Body:

	{
	  "email": "user@example.com",
	  "username": "yourUsername",
	  "password": "yourPassword"
	}

Response:

201 Created

	{
	  "message": "User registered successfully"
	}

#### Login a User

URL: /users/login

Method: POST

Description: Authenticate a user and receive a JWT token.

Request Body:

	{
	  "email": "user@example.com",
	  "password": "yourPassword"
	}

Response:

200 OK

	{
	  "message": "Login successful",
	  "token": "JWT token string",
	  "user": {
	    "id": "userId",
	    "username": "yourUsername",
	    "isAdmin": false
	  }
	}

### Posts

#### Get All Posts

URL: /posts/

Method: GET

Description: Retrieve all blog posts.

Response:

200 OK

	[
	  {
	    "_id": "postId",
	    "title": "Post Title",
	    "content": "Post Content",
	    "author": {
	      "_id": "authorId",
	      "username": "authorUsername"
	    },
	    "createdAt": "timestamp",
	    "updatedAt": "timestamp"
	  },
	  // ... more posts
	]

#### Get a Post by ID

URL: /posts/:id

Method: GET

Description: Retrieve a single post by its ID.

URL Parameters:

id: The ID of the post.
Response:

200 OK

	{
	  "_id": "postId",
	  "title": "Post Title",
	  "content": "Post Content",
	  "author": {
	    "_id": "authorId",
	    "username": "authorUsername"
	  },
	  "createdAt": "timestamp",
	  "updatedAt": "timestamp"
	}

#### Create a New Post

URL: /posts/

Method: POST

Description: Create a new blog post.

Headers:
Authorization: Bearer <token>

Request Body:

	{
	  "title": "New Post Title",
	  "content": "New Post Content"
	}

Response:

201 Created

	{
	  "_id": "newPostId",
	  "title": "New Post Title",
	  "content": "New Post Content",
	  "author": "authorId",
	  "createdAt": "timestamp",
	  "updatedAt": "timestamp"
	}

#### Update a Post

URL: /posts/:id

Method: PUT

Description: Update an existing post.

Headers:

	Authorization: Bearer <token>

URL Parameters:

id: The ID of the post to update.

Request Body:

	{
	  "title": "Updated Title",     // Optional
	  "content": "Updated Content"  // Optional
	}

Response:

200 OK

	{
	  "_id": "postId",
	  "title": "Updated Title",
	  "content": "Updated Content",
	  "author": "authorId",
	  "createdAt": "timestamp",
	  "updatedAt": "timestamp"
	}

#### Delete a Post

URL: /posts/:id

Method: DELETE

Description: Delete a post (Admin only).

Headers:

	Authorization: Bearer <token>

URL Parameters:

id: The ID of the post to delete.

Response:

200 OK

	{
	  "message": "Post deleted successfully"
	}

### Comments

#### Get Comments for a Post

URL: /comments/post/:postId

Method: GET

Description: Retrieve all comments for a specific post.

URL Parameters:

postId: The ID of the post.

Response:

200 OK

	[
	  {
	    "_id": "commentId",
	    "content": "Comment Content",
	    "author": {
	      "_id": "authorId",
	      "username": "authorUsername"
	    },
	    "post": "postId",
	    "createdAt": "timestamp",
	    "updatedAt": "timestamp"
	  },
	  // ... more comments
	]

#### Add a Comment to a Post

URL: /comments/post/:postId

Method: POST

Description: Add a new comment to a post.

Headers:

	Authorization: Bearer <token>

URL Parameters:

postId: The ID of the post to comment on.

Request Body:

	{
	  "content": "Your comment"
	}

Response:

201 Created

	{
	  "_id": "newCommentId",
	  "content": "Your comment",
	  "author": "authorId",
	  "post": "postId",
	  "createdAt": "timestamp",
	  "updatedAt": "timestamp"
	}

#### Delete a Comment

URL: /comments/:commentId

Method: DELETE

Description: Delete a comment (Admin only).

Headers:

	Authorization: Bearer <token>

URL Parameters:

commentId: The ID of the comment to delete.

Response:

200 OK

	{
	  "message": "Comment deleted successfully"
	}

