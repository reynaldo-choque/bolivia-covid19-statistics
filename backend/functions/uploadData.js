const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./expressFirebasePermissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bolivia-covid19-data.firebaseio.com"
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log("something went wrong", err);
        }
        console.log("ok", files);
        files.forEach(function (file) {
            console.log("it is ", path.join(directoryPath, file));
            var fileReader = require(path.join(directoryPath, file));
            var collection = file.substr(0, file.lastIndexOf("."));
            console.log("collection", collection);

            //adding valid date starting march 9th (collection was updated on may 28, iter is gonna vary, careful)
            var iter = 80;      //THIS CHANGE ALL THE TIME, CAREFUL !!!!!!!!!!
            fileReader.forEach(function (doc) {
                var date = new Date();
                date.setDate(date.getDate() - iter);
                doc.date = date;
                console.log(doc);
                iter = iter - 1;

                firestore
                    .collection(collection)
                    .add(doc)
                    .then(function (docRef) {
                        console.log("inserted", docRef);
                        return null;
                    }).catch(function (error) {
                    console.log("fatal error", error);
                });
            });
        })

    }
)
;

const db = admin.firestore();
