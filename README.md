# Book Rating API

Welcome to the Book Rating API, a NEST JS project implementing a backend API for book rating. Users can add books, describe their authors, and rate other books. The project includes user authorization and utilizes GraphQL for efficient data queries.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Yarn](https://yarnpkg.com/) for managing dependencies.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/alyona-shirpal/nest-typegraph-ql-api.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd nest-typegraph-ql-api
    ```

3. **Install dependencies:**

    ```bash
    yarn install
    ```

### Configuration

1. **Set up Environment Variables:**

   Create a `.env` file in the root of your project and configure the necessary environment variables. You might need variables for database connection, authentication, etc.

   Example `.env` file:

    ```env
    DB_CONNECTION=sqlite3
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```

### Usage

1. **Start the server:**

    ```bash
    yarn start
    ```

2. **Explore the GraphQL API:**

   Open your browser and navigate to `http://localhost:3000/graphql` to interact with the GraphQL playground. Here, you can execute queries and mutations to interact with the API.

### User Authorization

The API includes user authorization to ensure secure access to certain functionalities. Make sure to include the necessary authentication headers in your requests.


### Contributing

Feel free to contribute to the development of this project. Create a fork, make your changes, and submit a pull request.


