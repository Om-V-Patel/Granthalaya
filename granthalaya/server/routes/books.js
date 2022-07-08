const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Book = require("../models/Book");

router.get("/allbooks", (req, res) => {
  Book.find()
    .then((books) => {
      res.json({ books });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.post("/createbook", (req, res) => {
  const { image, title, category, description, price, count } = req.body;
  if (!image || !title || !category || !description || !price || !count) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  const book = new Book({
    image,
    title,
    category,
    description,
    price,
    count,
  });
  book
    .save()
    .then((result) => {
      res.json({ book: result });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.post("/search-books", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  Book.find({ title: { $regex: userPattern } })
    .select("_id title")
    .then((book) => {
      res.json({ book });
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
