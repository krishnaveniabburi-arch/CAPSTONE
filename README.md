Patient Care Portal
I created patient portal login webpage using MongoDB,express,React and node
FUll-Stack web application designed to mangae and streamline patient care records
this project features node.js Express RESTful API interface connected to a MongoDB DB layer along side an interactive reactive
frontend built on Vite
i did set up Backend and frontend

Backend  implements a RESTFULL API configuration by Node.jsand the express routing layer 

CRUD--Integration Route handlersexpoise all four transactional resource states CREATE, READ, UPDATE, DELETE.
created patient management routes

GET/API/PATIENTS-FETCHES ALL ACTIVE PATIENTS FROM mONGOdb TO RENDER DYNAMICALLY ON THE DASHBOARD.JSX VIEW
GET/API/PATIENTS/:ID retrieves detailed information for a singlr page patientused by patientdetails.jsx Editpatient.jsx.
http://localhost:3000/api/patients/6a756147d943eab2d48ed473
POST/api/patients
http://localhost:3000/api/patients
creates and inserts a new transactional patient record using data submitted from the AddPatient.jsx from VIEW and i added link from my thunderclient testing.
PUT/api/patients/:id
updates fields of an existing patient resourcs profile matching the provided ID.
DELETE-clears a patient profile record perminently from the DB collection.

aUTHENTICATION &AUTHORIZATION - platform secures acess via tokenized verification middleware .
users submit validation profiles to obtain an encrypted  JSON web Token which must ne passed in the authorization  header of subsequent requests ti VIEW, UPDATE,OR CLEAR protected.
FRONTEND--DEVELOPMENT user workspace is rendered asynchronously via a singlrpage app using REACT and styled via responsive  CSS.
PAGErENDERING-built react-router-dom for multipage experience with in a singlepage congigurations.
implemented standard React HOOKS (usestate,useeffect, usecontext) to track variables and handle local component states.
API-- communicate explicitly with biult node/express server endpoints using network drivers FETCH.
apPLICATION VIEWS--creates 5 views
Login.jsx-secure acess gateway and session management
DASHBOARD.JSX-s
when trying to login page user credentials need to enter and used middleware to authenticate and used jwt token and i installed jwt token and got the secretkey stored in the .env file.
once log in is successfull we can see the Addpatient and Dasboard 
once open the add patient page can add details and check the dashboard and database created on mongoose 
i can see my data on backend database mongoose and on my page Dashboard successfully added.
Testing CRUD
tested post route to get token 
POST Request
http://localhost:3000/api/patients/login

{
  "_id": "6a749458f7d2598e50ec6bbf",
  "email": "admin@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzQ5NDU4ZjdkMjU5OGU1MGVjNmJiZiIsImlhdCI6MTc4NjA3MTYyNywiZXhwIjoxNzg4NjYzNjI3fQ.zQwQK25C0Md0GfQOXQAEXurd6D-leM3DxTPxi5I5d0o"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzQ5NDU4ZjdkMjU5OGU1MGVjNmJiZiIsImlhdCI6MTc4NjA3NjMyNiwiZXhwIjoxNzg4NjY4MzI2fQ.mB2PkmxutPKFiMI4s4FtnJKUh0AGARE8QLY_gEbvmr0"

GET request 
tested using url and enter headers and token to get the 
http://localhost:3000/api/patients/6a756147d943eab2d48ed473
got the patient details using by id

POST Request 
http://localhost:3000/api/patients
i did post request gave json body and auth token to get Post request and got  the patient deatails response  