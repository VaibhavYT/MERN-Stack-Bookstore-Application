import express, { request, response } from "express";
import { PORT, Mongo_URL } from "./config.js";
import mongoose from "mongoose";

import { Book } from "./Model/bookModel.js";
const app = express();

// Middleware for parsing request body

app.use(express.json());


app.get("/", (request, response) => {
  console.log(request);
  return response.status(204).send("Welcome to Book Store");
});

// Route for Save a new Book

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

  // Route to get All Books

  app.get('/books', async(request,response)=>{
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count : books.length,
        data: books
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  // Route to get one Book by id

  app.get('/books/:id', async(request,response)=>{
    try {
      const {id} = request.params;

      const books = await Book.findById(id);
      return response.status(200).json();
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

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
