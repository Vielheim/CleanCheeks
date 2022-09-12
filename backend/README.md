## Architecture

```
Server Endpoints > Router > Controller + Mapper > Service > Data Access > DB
```

The routers define how the endpoints are handled. 
- They parse the data into a `Data Transfer Object` if needed. DTO defines what the object or data the frontend should pass to the backend
- Can be found in `src/api/data_transfer`

The routes call the Controllers to handle the request
- Controllers map the DTO into the `model` used by the Service layer (see `mapper`)
- It uses `Interfaces` to describe what is returned to the routers. Basically an interface of the `Model`

The controllers pass the data to the Service
- Service is just an abstraction between the controller and data access
- To hide the database from the api level

Data Access is where the Sequelize part happens
- Handles the CRUD of the `Model` with the database
- Each Model has an `Input` and `Output` interface. It ensures the data that we pass or return to the upper layers to be correct.