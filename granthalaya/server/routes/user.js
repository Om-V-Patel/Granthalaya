const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport =require("nodemailer-sendgrid-transport");
const {SENDGRID_API}= require('../config/keys')
const transporter =nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:SENDGRID_API
  }
}))













router.post("/getaddress", (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(422).json({ error: "Not able to find address" });
  }
  User.findOne({ _id: _id }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Not able to find your address" });
    }
    return res.json({
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      address: savedUser.address,
    });
  });
});

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password, address } = req.body;
  if (!email || !password || !firstName || !lastName || !address) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          firstName,
          lastName,
          address,
        });

        user
          .save()
          .then((user) => {


transporter.sendMail({
  to:user.email,
  from:"ompatelgranthalaya@gmail.com",
  subject:"WELCOME TO ગ્રંથાલય ",
  html:`
  <a href="https://res.cloudinary.com/ompatel/image/upload/v1657184712/granthalaya%20images/images%20for%20granthalaya/emil-widlund-xrbbXIXAWY0-unsplash_hfpz8p.jpg"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="700" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/79fcb911943930ef/3241d9b2-ea40-4dd7-9250-72658b157c3e/768x391.jpg"></a>
  <table>
  <tr>
        <td style="padding:0px 0px 0px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: inherit; font-family: inherit"><span style="font-family: &quot;arial black&quot;, helvetica, sans-serif; color: #d89816; font-size: 24px">WELCOME TO GRANTHALAYA!</span></h1><div></div></div></td>
      </tr>
      <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">Thank you for joining our program.</span></div><div></div></div></td>
        </tr>
      </tbody>

      <tr>
        <td style="padding:10px 20px 10px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #d89816; font-size: 18px">OUR</span><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 30px; color: #d89816"> </span><span style="font-family: &quot;times new roman&quot;, times, serif; color: #d89816; font-size: 18px">SERVICE</span></div><div></div></div></td>
      </tr>
      <tr>
        <td style="padding:12px 20px 18px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: left"><span style="font-family: arial, helvetica, sans-serif; color: #b21c1c">GRANTHALAYA&nbsp;</span>&nbsp;<span style="color: #333333; font-family: &quot;Segoe UI&quot;, &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">&nbsp;is a meta-search engine for comparing books prices and know availability across all popular Indian book stores.</span>&nbsp;</div><div></div></div></td>
      </tr>
      <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 10px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="233" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/79fcb911943930ef/3910fa6e-a8f5-4dfe-aa32-09f58118ca55/1080x498.jpg">
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;" width="280" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/79fcb911943930ef/751b63b2-f79d-46d0-b17d-7e4a94a92942/902x408.jpg">
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td style="padding:10px 0px 0px 0px; line-height:12px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">Ranip,Ahemdabad-382480.</div><div></div></div></td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td style="padding:0px 0px 20px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 1px 0px;" bgcolor="#939598"></td>
              </tr>
            </tbody>
          </table>
   
   
        `
  

})





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

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, firstName, lastName, email, password } = savedUser;
          res.json({
            token,
            user: { _id, firstName, lastName, email, password },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  });
});

module.exports = router;
