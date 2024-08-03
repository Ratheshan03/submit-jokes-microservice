# Submit Jokes Microservice (Nest.js)

This microservice enables users to submit new jokes. They can categorize their submission from an up-to-date list of joke types.

## Technologies Used

- Nest.js or Node.js (Express.js)
- MongoDB Atlas
- Docker
- Swagger

## Setup Instructions

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ratheshan03/deliver-jokes-microservices.git
   cd deliver-jokes-microservices
   ```

## Installation

```bash
$ npm install
```

````

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Env variables file example

MONGO_URI=mongodb+srv://
PORT=3001
MONGO_URI_USERNAME=
MONGO_URI_PASSWORD=

## Swagger API Documentation

Access the Swagger UI to explore the API documentation:
URL: http://localhost:3002/api

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
````
