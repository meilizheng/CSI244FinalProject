CSI244FinalProject
Description
This project is aimed at creating a bookbuddy API.

Part 1: Setting up the Environment
To initialize the Node.js environment and install necessary packages, follow these steps:

Create directories for screenshots and the API:

bash
Copy code
mkdir screenshots
mkdir userapi
cd userapi
Initialize Node.js and install required packages:

bash
Copy code
npm init -y
npm install express mongoose cors jsonwebtoken bcrypt dotenv
Step 1: Create a Mongo Collection for the Application
Navigate to MongoDB Atlas and log in.
Click on "collections" and create a new database called bookbuddyapi.
Create a new collection called books.
Step 2: Install dotenv Package
Install the dotenv package, which will load environment variables from a .env file into process.env in application:

bash
Copy code
npm install dotenv
Step 3: Create a .env File
In the root of the project directory, create a file named .env.
Open the .env file in VS Code.
Add MongoDB connection string and token secret as environment variables in the file.
Step 4: Ensure .env is in .gitignore
To prevent sensitive information from being pushed to the Git repository, add the following entries to .gitignore file:

bash
Copy code
.env
node_modules/
Part 2: Building the Application
Create a new file named server.js in the root folder of bookbuddyapi.
Step 1: Create the Model
The Model represents the data structure of the application. Define the schema and model for books in models/book.js.

Step 2: Building a Controller
Implement the logic for handling CRUD operations in controllers/bookController.js.

Step 3: Setting Up the Routes
Define application routes in routes/bookRoutes.js.

Step 4: Initializing Express and MongoDB
Set up Express and connect to MongoDB in server.js.

Part 3: Connect to server using Postman
Once server is set up and running, I can connect to it using Postman to test the API endpoints.
