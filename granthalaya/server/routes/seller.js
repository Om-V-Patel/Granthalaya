const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/order", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).json({ error: "Please provide id" });
  }
  Seller.findOne({ _id: id }).then((savedSeller) => {
    if (!savedSeller) {
      return res.status(422).json({ error: "Not able to find seller" });
    }
    // console.log(savedSeller);
    const { order } = savedSeller;
    res.json({ order });
  });
});

router.get("/allsellers", (req, res) => {
  Seller.find()
    .then((sellers) => {
      res.json({ sellers });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.put("/saveorder", (req, res) => {
  // console.log(req.body.order);
  Seller.findByIdAndUpdate(
    req.body._id,
    {
      $push: { order: req.body.order },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      // console.log("hi" + result);
      res.json(result);
    }
  });
});

router.put("/selectorder", (req, res) => {
  // console.log(req.body);
  Seller.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { order: req.body.order[0] },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      // console.log("hi" + result);
      res.json(result);
    }
  });
});

router.post("/signupseller", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  Seller.findOne({ email: email })
    .then((savedSeller) => {
      if (savedSeller) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const seller = new Seller({
          email,
          password: hashedpassword,
          firstName,
          lastName,
        });

        seller
          .save()
          .then((seller) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            // console.log(err);
          });
      });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.post("/signinseller", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Seller.findOne({ email: email }).then((savedSeller) => {
    if (!savedSeller) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedSeller.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedSeller._id }, JWT_SECRET);
          const { _id, firstName, lastName, email, password } = savedSeller;
          res.json({
            token,
            seller: { _id, firstName, lastName, email, password },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
