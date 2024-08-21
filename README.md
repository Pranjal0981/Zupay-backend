
```markdown
# Zupay Backend

## Overview

The Zupay backend is a RESTful API built with Express.js, providing functionality for user authentication, post management, and comment management. It uses MongoDB for data storage and integrates with various middleware for session management and security.

## Features

- **User Authentication**: Sign up, log in, and log out users.
- **Post Management**: Create, view, update, and delete posts.
- **Comment Management**: Add and fetch comments for posts.
- **Search Posts**: Filter posts by title.
- **Session Management**: Secure session handling with `express-session` and `connect-mongo`.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (Ensure you have a running MongoDB instance)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone 'https://github.com/Pranjal0981/Zupay-backend.git'
   cd Zupay-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configuration**

   Create a `.env` file in the root directory of your project with the following environment variables:

   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/zupay
   EXPRESS_SECRET=your-secret-key
   ```

   - `PORT`: Port on which the server will run.
   - `MONGO_URI`: MongoDB connection string.
   - `EXPRESS_SECRET`: Secret key for signing cookies.

## Running the Server

1. **Start the Server**

   Using npm:

   ```bash
   npm start
   ```

   This command starts the server and listens on the port specified in the `.env` file (default is 3001).

## API Endpoints

### User Routes

- **Sign Up**
  
  - `POST /user/signup`
  - **Body**: `{ email: String, password: String }`
  - **Description**: Creates a new user.

- **Log In**
  
  - `POST /user/login`
  - **Body**: `{ email: String, password: String }`
  - **Description**: Authenticates a user and returns a token.

- **Log Out**
  
  - `GET /user/logout`
  - **Description**: Logs out the user and clears session data.

- **Get Current User**
  
  - `POST /user/currentUser`
  - **Headers**: `{ Authorization: Bearer <token> }`
  - **Description**: Retrieves the current logged-in user’s information.

### Post Routes

- **Create Post**
  
  - `POST /post/create-post/:userId`
  - **Body**: `{ title: String, content: String }`
  - **Params**: `userId`
  - **Description**: Creates a new post for a user.

- **View All Posts**
  
  - `GET /post/view-posts`
  - **Description**: Retrieves all posts.

- **View Post by ID**
  
  - `GET /post/view-post/:id`
  - **Params**: `id`
  - **Description**: Retrieves a specific post by ID.

- **Update Post by ID**
  
  - `PUT /post/update-post/:id`
  - **Params**: `id`
  - **Body**: `{ title: String, content: String }`
  - **Description**: Updates a specific post by ID.

- **Delete Post by ID**
  
  - `DELETE /post/delete-post/:id`
  - **Params**: `id`
  - **Description**: Deletes a specific post by ID.

- **Search Posts**
  
  - `GET /post/search`
  - **Query**: `title=<search-term>`
  - **Description**: Searches posts by title.

- **Fetch Comments**
  
  - `GET /post/fetchComments/:postId`
  - **Params**: `postId`
  - **Description**: Fetches comments for a specific post.

- **Add Comment**
  
  - `POST /post/addComments/:postId/:userId`
  - **Params**: `postId`, `userId`
  - **Body**: `{ comment: String }`
  - **Description**: Adds a comment to a post.

## Middleware

- **Authentication Middleware**

  - Used in routes to ensure that the user is authenticated. It checks if the user is logged in and has a valid session.

## Development and Contributing

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   Edit files as necessary and test your changes.

3. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

4. **Push Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

   Go to the repository on GitHub and create a pull request for your branch.


## Contact

For questions or issues, please contact [pranjalshukla245@gmail.com](mailto:pranjalshukla245@gmail.com).
```