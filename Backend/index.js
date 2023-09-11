import express, { request, response } from "express";
import { PORT, Mongo_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import { Book } from "./Model/bookModel.js";
import cors from 'cors';




const app = express();

// Middleware for parsing request body

app.use(express.json());

//Middleware for handling CORS POLICY
 // Option 1 :  Allow all Origin
app.use(cors());
// Option 2 

app.use(cors(
  {
    origin :'https:localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
  }
))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(204).send("Welcome to Book Store");
});

app.use('/books',booksRoute);
mongoose
  .connect(Mongo_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
