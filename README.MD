# Frontend Task Essentially AI

## Dependencies (packages)

1. Used react-router-dom for implementing dynamic routing
2. Used redux-toolkit for creating redux store and handling the global state
3. Used tailwind-css for more efficiency , consitency and for sytling the components faster
4. Used nodemon as dev dependency for backend server as it restarts automatically and monitor the application

## Frontend End Part

### Components

1. Two components are used for handling the user data and displaying the results as per the query enter by the user
2. In App.js the using dynamic routing the component is rendered
3. The component **FormPage** is taking user entry from a **Form** and storing the data in local state stored in key value pair. On Submission of the form a funtion expression is called **onFormSubmit** which is invoking the **fetchData** function to get response from the backend API. The **fetchData** function is validating the Form details and making a _POST_ req to the backend API _/api/fetchStockData_. After the complete Success of the API call it is dispatching an action to save the res to the global state.
   As per the response from **fetchData** the **onFormSubmit** is handling the navigation. If the res is a succesful one then it navigates to the **StockDetails** page for the Stock details.
4. The component **StockDetails** is used for Displaying the data stored in the global state. The **useSelector** hook is used for extracting the state from redux store

### utils

1. **store** is used as Redux store for storing the states
2. **stockSlice** is used for creating reducer to handle the actions
3. Contains 2 actions **reset** and **getStockData** used for reset the state and getting the data to the state.
4. We wrapped the redux store in App.js inside **Provide** tag so that the store is globally available to all the components

### assets

1. Contains a **Spinner** gif which is used in **Spinner** component
2. This component is rendered only at the time when the **stockDetails** page is loading

## Backend

1. In backend the POST route at **/api/fetchStockData** is taking the data coming from the _request body_
2. Using the data from the req body it is calling the _Polygon API_ and getting the details of the stock entered by the user.
3. It is also handling the response from the _Polygon API_, if the response is successful it is sending the Response code and the Resposne data
4. In case of an unsuccessful response it is sending the _error message_ and the relevant response code
