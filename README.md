# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Fuel Price Tracking Frontend

The repository houses the frontend code for Fuel Price Tracking web application. The application is designed to track and manage fuel prices at various locations and provide users with real-time updates on fuel costs.

### Overview

Fuel Price Tracking is a full-stack web application consisting of both frontend (client-side) and backend(server-side) components. The frontend, found in this repository, handles user interactions, renders fuel price pages and communicates with the backend api.

### Features

The frontend of the Fuel Price Tracking system serves as a robust tool designed to deliver essential information regarding gas station price reviews and management. It offers:
 - Table: showing best fuel prices as well as providing gas type (e.g. 95, 98, Diesel) as well as address from the specific station
 - Dropdown lists: option of efficient specific fuel price filtering according to the address or gas type/
 - Price Updating Modals:  these modals provide a responsive and comprehensive tool for editing selected fuel prices. Users can input prices in a specific format, receive notifications, and benefit from an automatic update feature that ensures the latest date is always reflected accurately.
 - Toast Notifications: these notifications serve as a user-friendly feedback mechanism, informing the user about the success or failure of an action (e.g. updating fuel price in the database).

### Technologies Used:
- Node.js
- React
- Redux
- Axios
- Bootstrap
- React Toastify

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the project dependencies specified in the `package.json` file. This command is necessary before running the app for the first time or after pulling changes that may have introduced new dependencies.

Running this command ensures that all required libraries and packages are downloaded and installed in the `node_modules` folder. It reads the dependency information from `package.json` and installs the specified versions, providing a consistent environment for development.

Before starting the app or contributing to the project, it's recommended to run `npm install` to make sure you have all the required dependencies. The repository does not contain the `node_modules`, it contains a large number of files and it's common practise to exclude it from version control system.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
