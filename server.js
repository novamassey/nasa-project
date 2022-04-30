const express = require("express");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const { useImperativeHandle } = require("react");

//value in .env will be access is server.js
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();

//take payload of POST request and put in req.body
app.use(express.json());

//for now an array of users, but can be  converted to use MongoDB
const users = [];

function upsert(array, item) {
  const index = array.findIndex((_item) => _item.email === item.email);
  if (index > -1) {
    array[index] = item;
  } else {
    array.push(item);
  }
}

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 3001}`
  );
});
