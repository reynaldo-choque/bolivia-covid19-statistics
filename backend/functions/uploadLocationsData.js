const admin = require("firebase-admin");
const serviceAccount = require("./expressFirebasePermissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bolivia-covid19-data.firebaseio.com"
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "data");
const fileName = "locations.json";

const collection = fileName.substr(0, fileName.lastIndexOf("."));
console.log("collection", collection);

let locations = [];
fs.readFile(path.join(directoryPath, fileName), (err, data) => {
    if (err) throw err;
    let parsedData = JSON.parse(data);

    parsedData.data.graphicCoordinates.forEach(function (feature) {
        let s = feature.location.split("-");
        locations.push({
            "coordinates": feature.coordinates,
            "location": feature.location,
            "department": s[0],
            "municipality": s[1]
        });

        firestore
            .collection(collection)
            .add({
                "coordinates": feature.coordinates,
                "location": feature.location,
                "department": s[0],
                "municipality": s[1]
            })
            .then(function (docRef) {
                console.log("inserted", docRef);
                return null;
            }).catch(function (error) {
            console.log("fatal error", error);
        });

    });
});
