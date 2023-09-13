const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("./models/Employee.js");
require("dotenv").config();

const app = express();
app.use(express.json()); // Use JSON body parsing middleware
app.use(
  cors({
    origin: ["https://myreact.cyclic.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./react-navigation/dist")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./react-navigation/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sp0ggxq.mongodb.net/employee?retryWrites=true&w=majority`
);
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("There token is Missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("There token is wrong");
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ email: req.email, name: req.name });
});

app.post("/Signin", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, name: user.name },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json("**Success");
          } else {
            return res.json("Password is Incorrect");
          }
        });
      } else {
        res.json("*Please first Signup no record found");
      }
    })
    .catch((err) => res.json(err));
});
app.post("/Signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("**Success");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running ");
});
