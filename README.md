# OGIT

## Overview
Welcome to the OGIT (On-the-Go Interactive Tracker) repository. This project is designed to allow for users to track and pin memories on a live map, sharing their activities with others. 

## Getting Started

To get started with this project, follow these instructions:

### Prerequisites
Ensure you have the following installed on your machine
- [Node.js](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi) (recommended version 20.17.0)
- [Yarn](https://www.npmjs.com/package/yarn) 

### Installation
1. Clone the repository:
    ```bash
    git clone git@github.com/StevenCThaller/ogit.git
    ```
2. Navigate to the project directory:
   ```bash
   cd ogit
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Development Version
To start the development client and server and see the project in action, use:
```bash
yarn dev
```
This will start the development server and open your application in a web browser. The server will automatically reload the application as you make changes to the code.

### Available Scripts
In the project directory, you can run the following commands:

- `yarn install`: Install all dependencies.
- `yarn dev`: Start the development server with hot reloading.

### Configuration
Modify the following files:

#### /server/.env
<!-- - `GOOGLE_MAPS_CLIENT_ID` - retrieved from Google's developer console
- `GOOGLE_MAPS_CLIENT_SECRET` - retrieved from Google's developer console -->
- `PORT`* - your port of choice
- `JWT_SECRET`* - any randomized long string of characters
- `API_URL`* - whatever you wish to use as the API url

### /client/.env *optional for local development
- `VITE_GOOGLE_MAPS_API_KEY` - retrieved from Google's developer console
- `VITE_API_TARGET`* - the API's domain
- `VITE_API_URL`* - the API url




### License
This project is licensed under the MIT License.

### Contact
For any questions or support, please contact Cody Thaller at stevencthaller@gmail.com.

