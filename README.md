# Punguza (CS-E4400 - Design of WWW Services Project)

Punguza is a web application that tries to reduce food waste from a consumer perspective. The application lets you keep track of food items you consume, how the foods you have at your home expire, and to get notified when a food item is going to expire.

## Team members

Khoa Pham
Joel Bergström
Fengyu Li

## How to start

Run server and client in 2 different terminals.

### Requirements

- Node version >= 12
- Internet connection for fetching data.

### Server

1. From root folder, `cd server`.
2. Create a `.env` file, then add your MongoDB URI and a random JWT secret key as follow:

```
MONGODB_URI=<YOUR-MONGODB-URI>
SECRET_KEY=<any-string>
```

3. Install the required packages with `yarn install` or `npm install`.
4. Start the dev server with `yarn dev` or `npm run dev`.

### Client

1. From root folder, `cd client`.
2. Install the required packages with `yarn install` or `npm install`.
3. Start the dev server with `yarn start` or `npm start`.
4. Open any browser and enter `localhost:3000`.

## Demo

Check it out here: https://punguza.appspot.com

![Demo](demo.gif)
