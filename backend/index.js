import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./Routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for Handling CORS Policy
// Option 1
app.use(cors());

// Option 2
// app.use(
//     cors({
//         origin: "http://localhost/3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
// }))

app.get("/", (request, response) => {
  console.log(response);
  return response.status(234).send("Welcome to MERN stack tutorial");
});

app.use('/books', booksRoute);

// When the app is connected to database it will begin to listen on port 5555
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`The app is listen to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
