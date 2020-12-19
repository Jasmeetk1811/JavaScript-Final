# Project Starter files

## Includes:

- API
  - User CRUD (Create, Read, Update, Delete)
  - Session Authentication
    - Passport Local strategy
    - Passport JWT strategy
  - Error handling
  - Mongoose configuration
  - All required node packages
    - dotenv
    - express
    - express-session
    - cors
    - mongoose
    - body-parser
    - jsonwebtoken
    - passport
    - passport-jwt
    - passport-local
    - passport-local-mongoose
- Client
  - User CRUD components
  - Authentication components
  - Shared navigation component
    - Helper for using React Router DOM Link component with React Bootstrap component
  - Global provider for across application variable store
  - Notification provider for across application message system
  - User provider for across application user access
  - All required node packages
    - axios
    - bootstrap
    - react
    - react-bootstrap
    - react-dom
    - react-router-dom
    - react-scripts
    - styled-components

---
## Installation

### API
```shell
npm install
```

> To run:
```shell
npm run dev
```

> Add your .env file with your Atlas Cloud MongoDB credentials
```json
DB_URI="mongodb+srv://comp-2068.efkcg.mongodb.net/<database name>?retryWrites=true&w=majority"
DB_USER="<database username>"
DB_PASS="<database password>"
```
> Replace **\<config option\>** with the corresponding data

### Client
```shell
yarn
```

> To run:
```shell
yarn start
```

> When you are ready to deploy you will need to build it first:
```shell
yarn build
```