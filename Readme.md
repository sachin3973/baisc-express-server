# Express Server for User Management

This project is a simple Express server for managing user data. It provides endpoints for getting all users and updating a user by ID.

## Description

The server is built with Node.js and Express. It uses a JSON file (`MOCK_DATA.json`) as a mock database to store user data. The server provides two main endpoints:

- `GET /users`: Returns all users from the `MOCK_DATA.json` file.
- `PATCH /users/:id`: Updates a user by ID in the `MOCK_DATA.json` file.
- `GET /user/:id`: Returns the user with the given ID from the `MOCK_DATA.json` file.
- `POST /users`: Creates a user and writes that user object into the `MOCK_DATA.json` file.
- `DELETE /users/:id`: Deletes the user with ID and updated the `MOCK_DATA.json` file.

## Key Learning Outcomes

1. Learned how to set up a basic Express server.
2. Gained experience with Express routing and handling HTTP requests.
3. Learned how to read from and write to a JSON file in Node.js.
4. Gained understanding of how to use the `fs` module for file operations.
5. Learned how to use the spread operator to update properties of an object.

## How to Run

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `node index.js` to start the server.

## Future Improvements

- Add more CRUD operations (Create, Delete).
- Implement error handling and validation.
- Replace the JSON file with a real database.
- Adopting the Typescript for better developer experience.
- Add some test cases
