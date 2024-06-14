CSI244FinalProject
Description
This project is aimed at creating a bookbuddy API.

This Node.js application utilizes Express.js and MongoDB (via Mongoose) to build a RESTful API for managing books, authors, users, and posts. It incorporates user authentication using JSON Web Tokens (JWTs) and includes CRUD operations for each entity, ensuring secure access and data management.
4 models:
The User model is a Mongoose model that defines the structure for storing user information in a MongoDB database. This model includes fields for the user's name, email, and password, with appropriate validation rules.
Schema Definition
The userSchema includes the following fields:
•	name: A required string field representing the user's name.
•	email: A required string field representing the user's email address. This field must be unique across all user documents in the collection.
•	password: A required string field representing the user's password. This field has custom validation to ensure it meets specific security criteria.
Fields
1.	name
o	Type: String
o	Required: Yes
o	Description: The user's full name.
2.	email
o	Type: String
o	Required: Yes
o	Unique: Yes
o	Description: The user's email address. This field must be unique for each user.
3.	password
o	Type: String
o	Required: Yes
o	Validation: The password must meet the following criteria:
	Contains at least one digit.
	Contains at least one lowercase letter.
	Contains at least one uppercase letter.
	Contains at least one special character.
	Has a minimum length of 6 characters.
o	Custom Error Message: If the password does not meet the validation criteria, the following error message is shown: ${props.value} is not a valid password!

Author model:
The Author model is a Mongoose model that defines the structure for storing author information in a MongoDB database. This model includes fields for the author's name, biography, nationality, and email, with appropriate validation rules.
Schema Definition
The authorSchema includes the following fields:
•	name: A required string field representing the author's name.
•	biography: A required string field representing the author's biography.
•	nationality: A required string field representing the author's nationality.
•	email: A required string field representing the author's email address. This field must be unique across all author documents in the collection.
Fields
1.	name
o	Type: String
o	Required: Yes
o	Description: The author's full name.
2.	biography
o	Type: String
o	Required: Yes
o	Description: A brief biography of the author.
3.	nationality
o	Type: String
o	Required: Yes
o	Description: The nationality of the author.
4.	email
o	Type: String
o	Required: Yes
o	Unique: Yes
o	Description: The author's email address. This field must be unique for each author.
Book model:
The Book and Review models are Mongoose models that define the structure for storing book and review information in a MongoDB database. The Review model is embedded within the Book model, allowing each book document to contain multiple review documents directly within it.
Review Schema Definition
The reviewSchema includes the following fields:
•	text: A required string field representing the content of the review.
•	datePosted: A date field representing when the review was posted. The default value is the current date and time.
•	likes: A number field representing the number of likes the review has received. The default value is 0.
Review Schema Fields
1.	text
o	Type: String
o	Required: Yes
o	Description: The content of the review.
2.	datePosted
o	Type: Date
o	Default: Date.now
o	Description: The date and time when the review was posted.
3.	likes
o	Type: Number
o	Default: 0
o	Description: The number of likes the review has received.
Book Schema Definition
The bookSchema includes the following fields:
•	title: A required string field representing the book's title.
•	description: A required string field representing the book's description.
•	isbn: An optional string field representing the book's ISBN. This field is sparse, allowing for unique but nullable values.
•	genre: A required string field representing the book's genre.
•	author: A required reference to the Author model.
•	user: A required reference to the User model.
•	datePosted: A date field representing when the book was posted. The default value is the current date and time.
•	likes: A number field representing the number of likes the book has received. The default value is 0.
•	reviews: An array of embedded reviewSchema documents representing the reviews of the book.
Book Schema Fields
1.	title
o	Type: String
o	Required: Yes
o	Description: The title of the book.
2.	description
o	Type: String
o	Required: Yes
o	Description: A brief description of the book.
3.	isbn
o	Type: String
o	Sparse: Yes
o	Description: The International Standard Book Number (ISBN) of the book. This field is optional and allows for unique but nullable values.
4.	genre
o	Type: String
o	Required: Yes
o	Description: The genre of the book.
5.	author
o	Type: mongoose.Schema.Types.ObjectId
o	Ref: "Author"
o	Required: Yes
o	Description: A reference to the Author model.
6.	user
o	Type: mongoose.Schema.Types.ObjectId
o	Ref: "User"
o	Required: Yes
o	Description: A reference to the User model.
7.	datePosted
o	Type: Date
o	Default: Date.now
o	Description: The date and time when the book was posted.
8.	likes
o	Type: Number
o	Default: 0
o	Description: The number of likes the book has received.
9.	reviews
o	Type: [reviewSchema]
o	Description: An array of embedded review documents
TokenBlacklist model:
The TokenBlacklist model is a Mongoose model that defines the structure for storing blacklisted tokens in a MongoDB database. This model is typically used to manage tokens that have been invalidated or revoked, such as JWTs (JSON Web Tokens) used for authentication. Tokens in this collection are automatically deleted after 24 hours.
Schema Definition
The tokenBlacklistSchema includes the following fields:
•	token: A required string field representing the blacklisted token.
•	createdAt: A date field representing when the token was blacklisted. The default value is the current date and time. This field is set to automatically expire and delete documents 24 hours after creation.
Fields
1.	token
o	Type: String
o	Required: Yes
o	Description: The blacklisted token.
2.	createdAt
o	Type: Date
o	Default: Date.now
o	Expires: 24 hours
o	Description: The date and time when the token was blacklisted. Documents in this collection will automatically be deleted 24 hours after their creation.
•	mongoose: MongoDB object modeling tool.
•	bcrypt: Library to hash passwords securely.
•	jsonwebtoken (jwt): Implementation of JSON Web Tokens for user authentication.
4 Controller:
User Controller Functions
1. User Registration (register)
Handles user registration by creating a new user if the email doesn't already exist in the database. Passwords are securely hashed before storing.
•	Endpoint: POST /api/register
•	Request Body: { name, email, password }
•	Response: { user: { _id, name, email, password } }
2. Get All Users (getAllUsers)
Fetches all users from the database.
•	Endpoint: GET /api/users
•	Response: Array of user objects
3. Get User by Email (getUser)
Fetches a user by their email.
•	Endpoint: GET /api/users/:email
•	Response: User object matching the email
4. Delete User by ID (deleteUser)
Deletes a user by their ID.
•	Endpoint: DELETE /api/users/:id
•	Response: { message: "User deleted" }
5. User Login (login)
Authenticates user credentials (email and password) and generates a JWT token for authorization.
•	Endpoint: POST /api/login
•	Request Body: { email, password }
•	Response: JWT token in the auth-token header
6. User Logout (logout)
Invalidates the JWT token by adding it to the token blacklist.
•	Endpoint: POST /api/logout
•	Request Header: auth-token containing the JWT token
•	Response: "Logged out successfully"

These controller functions handle user registration, login, retrieval, deletion, and logout operations in a Node.js application using Express and Mongoose. They ensure secure storage of passwords, JWT-based authentication, and effective management of user data.
Book Controller
This documentation provides an overview of the controller functions implemented for managing books in a Node.js application using Express and Mongoose. The functions cover CRUD operations for books, retrieving books by author or user, managing reviews, and handling errors effectively.
Dependencies
•	mongoose: MongoDB object modeling tool for Node.js.
•	Book Model: Defined in ../models/book.js (Assumed to follow a specified schema).
Controller Functions
1. Create a Book (createBook)
Creates a new book based on data received in the request body and saves it to the database.
•	Endpoint: POST /api/books
•	Request Body: JSON object representing the book data
•	Response: JSON object of the created book with HTTP status 200
2. Get All Books (getAllBooks)
Retrieves all books from the database.
•	Endpoint: GET /api/books
•	Response: Array of book objects
3. Get Book by ID (getBook)
Retrieves a single book by its ID.
•	Endpoint: GET /api/books/:id
•	Response: JSON object of the book with HTTP status 200
4. Update Book by ID (updateBook)
Updates a book's information based on its ID.
•	Endpoint: PUT /api/books/:id
•	Request Body: JSON object with fields to update
•	Response: JSON object of the updated book with HTTP status 200
5. Delete Book by ID (deleteBook)
Deletes a book from the database based on its ID.
•	Endpoint: DELETE /api/books/:id
•	Response: JSON object with message indicating successful deletion
6. Get Books by Author ID (getBooksByAuthor)
Retrieves all books written by a specific author.
•	Endpoint: GET /api/books/author/:authorId
•	Response: Array of book objects written by the specified author
7. Get Books by User ID (getBooksByUser)
Retrieves all books associated with a specific user.
•	Endpoint: GET /api/books/user/:userId
•	Response: Array of book objects associated with the specified user
8. Get Reviews of a Book (getReviews)
Retrieves only the reviews of a book based on its ID.
•	Endpoint: GET /api/books/reviews/:id
•	Response: Array of review objects associated with the specified book
9. Add Review to a Book (addReview)
Adds a new review to a book based on its ID.
•	Endpoint: POST /api/books/reviews/:id
•	Request Body: JSON object representing the review to add
•	Response: JSON object of the updated book with the added review
Usage
These controller functions provide endpoints to create, retrieve, update, and delete books, as well as manage reviews associated with books. They handle errors gracefully and ensure efficient interaction with the MongoDB database using Mongoose. Developers can integrate these functions into their Node.js applications to manage book-related operations effectively.
Author Controller 
This documentation outlines the controller functions used to manage authors in a Node.js application using Express and Mongoose. The functions handle CRUD operations for authors, allowing creation, retrieval, update, and deletion of author records in a MongoDB database.
Dependencies
•	mongoose: MongoDB object modeling tool for Node.js.
•	Author Model: Defined in ../models/author.js (Assumed to follow a specified schema).
Controller Functions
1. Create Author (createAuthor)
Creates a new author based on data received in the request body and saves it to the database.
•	Endpoint: POST /api/authors
•	Request Body: JSON object representing the author data
•	Response: JSON object of the created author with HTTP status 201
2. Get All Authors (getAllAuthors)
Retrieves all authors from the database.
•	Endpoint: GET /api/authors
•	Response: Array of author objects
3. Get Author by ID (getAuthor)
Retrieves a single author by its ID.
•	Endpoint: GET /api/authors/:id
•	Response: JSON object of the author with HTTP status 200
4. Update Author by ID (updateAuthor)
Updates an author's information based on its ID.
•	Endpoint: PUT /api/authors/:id
•	Request Body: JSON object with fields to update
•	Response: JSON object of the updated author with HTTP status 200
5. Delete Author by ID (deleteAuthor)
Deletes an author from the database based on its ID.
•	Endpoint: DELETE /api/authors/:id
•	Response: JSON object with message indicating successful deletion
Usage
These controller functions provide endpoints to create, retrieve, update, and delete authors. They handle errors gracefully and ensure efficient interaction with the MongoDB database using Mongoose. Developers can integrate these functions into their Node.js applications to manage author-related operations effectively.
Routers:
routes are essential in Node.js applications to define the API endpoints, specify how incoming requests are processed, and structure the overall application logic for handling HTTP interactions effectively.
•  Handle different types of requests (GET, POST, etc.) at specific URLs.
•  Implement CRUD operations (Create, Read, Update, Delete) for resources.
•  Enforce security, validation, and other middleware functionalities.
•  Organize code for better readability, maintainability, and scalability.
Server
This documentation provides an overview of setting up a Node.js server using Express.js to handle API routes and interact with MongoDB via Mongoose. It includes environment configuration, middleware setup, route imports, and server initialization.
Dependencies
•	express: Web framework for Node.js.
•	mongoose: MongoDB object modeling tool for Node.js.
•	dotenv: Loads environment variables from a .env file into process.env.
•	cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
Environment Variables
Environment variables are loaded from a .env file using dotenv.config(). These variables include:
•	MONGO_URL: MongoDB URI for connecting to the database.
•	PORT: Port number for the server to listen on. Defaults to 3000 if not specified in the environment.
Middleware Setup
Middleware functions are used to process incoming requests before they reach the route handlers. Key middleware includes:
•	express.json(): Parses incoming request bodies in JSON format.
•	cors(): Enables Cross-Origin Resource Sharing (CORS) for API requests from different origins.
Route Imports
Route modules define the API endpoints and are imported into the main server file (app.js):
•	bookRoutes: Handles CRUD operations for books (./routes/bookRoutes.js).
•	authorRoutes: Handles CRUD operations for authors (./routes/authorRoutes.js).
•	userRoutes: Handles user-related operations (./routes/userRoutes.js).
•	postRoutes: Handles post-related operations (./routes/postsRoutes.js).
Usage
This setup allows developers to build and run a Node.js server that handles API requests for CRUD operations on books, authors, users, and posts. Each route module (bookRoutes, authorRoutes, userRoutes, postRoutes) defines specific endpoints and uses controller functions to interact with MongoDB via Mongoose. Developers can extend the application by adding more routes and functionalities as needed.
Authentication Middleware Documentation
This documentation describes a middleware function designed to verify JSON Web Tokens (JWTs) sent via the auth-token header in HTTP requests. It ensures authenticated access to protected routes by verifying the token's validity and attaching decoded user information to the request object (req.user).
Dependencies
•	jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWTs).
Middleware Function Overview
The middleware function intercepts incoming HTTP requests, extracts the JWT from the auth-token header, verifies its authenticity using a secret key (process.env.TOKEN_SECRET), and grants access to the protected route if the token is valid.
Functionality
1.	Token Retrieval: Extracts the JWT from the auth-token header of the HTTP request.
2.	Token Verification: Uses jsonwebtoken.verify() to verify the authenticity of the token against the TOKEN_SECRET stored in environment variables (process.env.TOKEN_SECRET).
3.	Successful Verification: If the token is valid, decodes the payload and attaches it to req.user, allowing subsequent middleware or route handlers access to authenticated user information.
4.	Invalid Token Handling: If verification fails (e.g., expired token, incorrect secret), sends a 400 status response with "Invalid token".
5.	Missing Token Handling: If no token is provided in the request header, sends a 401 status response with "Access denied".


