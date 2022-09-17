# CS3216 Assignment 3

## Setup

### Development server ports

| Service  | Port |
| -------- | ---- |
| Frontend | 3000 |
| Backend  | 8000 |

### Frontend

1. Install npm packages using `npm i`.
2. Run the react app using `npm start`.

### Backend

1. Create a `.env` file in `/backend` to store credentials for postgres. Refer to [backend/.env.sample](backend/.env.sample) for more info.
2. Install npm packages using `npm i`.
3. Run `npm run db:create` to create the `postgres` database on your local machine.
4. There are two ways to run the backend service
    1. For first-time initialisation, run `npm run clean-start`. This runs all the database commands to clear and populate the database. You can also run this if you want to reset the database to its initial state.
    2. For subsequent initialisations, run `npm start` to start the backend service.

**Note:**
The API endpoint can be found at http://localhost:8000/api/v1.

## Members

| Name                | Matric No. | Contributions |
| ------------------- | ---------- | ------------- |
| Keane Chan Jun Yu   | A0205678W  |               |
| Wu Peirong          | A0199926E  |               |
| Tan Su Yin          | A0205369B  |               |
| Terence Ho Wei Yang | A0196511E  |               |
