# shipsavvy
#### Instructions to start app
`1- npm i`<br>
`2- npm start`<br>
tested on node `v16.14.2` <br>

## Project Structure / Details
* the main focus is the project structure, so it can be extended to a complete application
    * seperate folders for components, containers, routes, constants, herlpers, utils, and services  
    * seperate route components ( protected/ auth routes )
    * using `React.lazy` to render a dynamic import as a regular component
    * support for multiple browser tabs
* `axios` is used for services
    * extended its usability by using `interceptors` ( for adding jwt to request )
    * response is verified for each request and app responds accordingly
* using `material ui` v4 components
* using `Formik` and `Yup` for form handling and validations
* using `contextapi` for user details
* proper error handling, processing/loaders for each request
* using `react-router-dom`



### Tasks
* login using username & password
* view/edit user profile
* view customer details
* view customer addresses
* view address details
* add new customer address
* view customer address details

 
