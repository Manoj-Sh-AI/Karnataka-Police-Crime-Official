import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql";
import bodyParser from "body-parser";
import path from "path";
import fileupload from "express-fileupload";

// init server
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "github100",
  database: "project_db",
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0JWDwlVK0JLQq9VpuXTt0bAqeKjLGCj8",
  authDomain: "criminal-record-website.firebaseapp.com",
  projectId: "criminal-record-website",
  storageBucket: "criminal-record-website.appspot.com",
  messagingSenderId: "1065412683317",
  appId: "1:1065412683317:web:17344873ec0da9eb8fb37c",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(fileupload());

//rout
//home rout
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "public" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, number, tac } = req.body;

  //form validation
  if (name.length < 3) {
    res.json({ alert: "name must be 3 letters long" });
  } else if (!email.length) {
    res.json({ alert: "Enter your email" });
  } else if (password.length < 3) {
    res.json({ alert: "Password must be 8 characters long" });
  } else if (number.length < 10) {
    res.json({ alert: "Invalid number, please enter valid one" });
  } else if (!tac) {
    res.json({ alert: "You must agree for terms and condition" });
  } else {
    // store data in db
    const users = collection(db, "users");

    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "email already exists" });
      } else {
        // encrypt the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;

            // set the doc
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.json({ alert: "Fill all the inputs" });
  }
  const users = collection(db, "users");

  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "Email does not exist" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "Password is incorrect" });
        }
      });
    }
  });
});

app.get("/second", (req, res) => {
  res.sendFile("/second_login.html", { root: "public" });
});

app.post("/second", (req, res) => {
  var dept_email = req.body.dept_email;
  var passwd = req.body.passwd;
  connection.query(
    "select * from second_login where dept_email = ? and passwd = ?",
    [dept_email, passwd],
    function (error, results, fields) {
      if (results.length <= 0) {
        res.redirect("/second_login.html");
      } else {
        res.redirect(
          "https://apps.powerapps.com/play/e/default-867ebaf4-f8aa-4b55-986e-c961f197a5f3/a/cb000a64-1cb8-40b0-b14c-831b29255dfd?tenantId=867ebaf4-f8aa-4b55-986e-c961f197a5f3&hidenavbar=true"
        );
      }
    }
  );
});

app.get("/contact", (req, res) => {
  res.sendFile("/contact_us.html", { root: "public" });
});
app.post("/contact", (req, res) => {
  var Victim_Number = req.body.Victim_Number;
  var Name = req.body.Name;
  var Age = req.body.Age;
  var Gender = req.body.Gender;
  var Date_Of_Murder = req.body.Date_Of_Murder;
  var Address = req.body.Address;
  var District = req.body.District;
  var Reason = req.body.Reason;
  var Position = req.body.Position;
  var Weapon_used = req.body.Weapon_used;

  //form validation
  if (!Victim_Number.length) {
    
    res.json({'alert' : 'Victim_Number is required.'});
  } else if (Name.length < 3) {
    
    res.json({'alert' : 'Name is required.'});
  } else if (!Age.length) {
    
    res.json({'alert' : "Enter the age of victim"});
  } else if (!Gender.length) {
    alert("Enter the gender of victim");
    // res.json({'alert' : "Enter the gender of victim"});
  } else if (!Date_Of_Murder.length) {
    alert("Enter the date of murder");
    // res.json({'alert' : "Enter the date of murder"});
  } else if (!Address.length) {
    alert("Enter the location of victim where victim died");
    // res.json({'alert' : "Enter the location of victim where he/she died"});
  } else if (!District.length) {
    alert("Enter the district of victim where victim died");
    // res.json({'alert' : "Enter the district of victim where he/she died"});
  } else if (!Reason.length) {
    alert("Enter the motive of death");
    // res.json({'alert' : "Enter the motive of death"});
  } else if (!Position.length) {
    alert("Enter the coordinates of the victim");
    // res.json({'alert' : "Enter the coordinates of the victim"});
  } else if (!Weapon_used.length) {
    alert("Enter the wepon used to kill");
    // res.json({'alert' : "Enter the wepon used to kill"});
  }

  connection.connect(function (error) {
    if (error) throw error;
    var sql = "INSERT INTO victim VALUES ?";
    var values = [
      [
        Victim_Number,
        Name,
        Age,
        Gender,
        Date_Of_Murder,
        Address,
        District,
        Reason,
        Position,
        Weapon_used,
      ],
    ];
    connection.query(sql, [values], (error, result) => {
      if (error) throw error;
      res.redirect("/");
      //location.replace("/index.html");
    });
  });
});

//when login is successfull
app.get("/index", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("listning port 3000");
});

//404 rout
// app.get("/404", (req, res) => {
//     res.sendFile("404.html", {root: "Testing-Website"})
// })
