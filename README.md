# CS3216 Assignment 3: CleanCheeks

## Our Application

### Frontend Website

Our application is accessible at https://clean-cheeks.vercel.app

### Backend

Our backend documentation is available at https://cleancheeks-backend.onrender.com/api/v1/docs/

The endpoints themselves are accessible at https://cleancheeks-backend.onrender.com

## Setup

### Development server ports

| Service  | Port |
| -------- | ---- |
| Frontend | 3000 |
| Backend  | 8000 |

### Frontend

1.  Create a `.env` file in `/frontend` to store app credentials. Refer to [frontend/.env.sample](frontend/.env.sample) for more info.
2.  Install npm packages using `npm i`.
3.  Run the react app using `npm start`.

**Note:**
It would be better to start the backend service before starting the frontend app since it relies on the data there.

### Backend

1. Create a `.env` file in `/backend` to store app credentials. Refer to [backend/.env.sample](backend/.env.sample) for more info.
2. Install npm packages using `npm i`.
3. Run `npm run db:create` to create the `postgres` database on your local machine.
4. There are two ways to run the backend service
    1. For first-time initialisation, run `npm start`. This runs all the database commands to clear and populate the database. You can also run this if you want to reset the database to its initial state.
    2. For subsequent initialisations, run `npm run deploy` to start the backend service.

**Note:**
The API endpoint can be found at http://localhost:8000/api/v1/

## Members

| Name                | Matric No. | Contributions     |
| ------------------- | ---------- | ----------------- |
| Keane Chan Jun Yu   | A0205678W  | Full Stack        |
| Wu Peirong          | A0199926E  | Full Stack        |
| Tan Su Yin          | A0205369B  | Full Stack, UI/UX |
| Terence Ho Wei Yang | A0196511E  | Full Stack        |
