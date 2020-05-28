const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./expressFirebasePermissions.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://bolivia-covid19-data.firebaseio.com"
});

const app = express();
app.use(cors({ origin: true }));

const db = admin.firestore();


app.get("/home", (request, response) => {
   response.send("hello firebase from here");
});

app.get("/getDepartments", (request, response) => {
   (
       async () => {
          try {
             const collection = await db.collection("departments").get();
             let departments = [];

             collection.forEach( dep => {
                departments.push({
                    id: dep.id,
                    data: dep.data()
                });
             });

             return response.status(200).json(departments);
          } catch (e) {
             return res.status(500).send(e);
          }
       }
   )();
});

exports.app = functions.https.onRequest(app);