const router = require("express").Router();
const { db } = require("../firebaseConfig");
const generateData = require("../chancescript");
const auth = require("../middleware/middleware");

router.route("/albums").get(async (req, res) => {
    try {
      const artistsCollection = db.collection("artists");
      const artistsDocRef = await artistsCollection.get();
  
      const albumsCollection = db.collection("albums");
      let albumsDocRef = await albumsCollection.get();
      let response = [];
  
   
      if (albumsDocRef.docs.length === 0) {
        const artistsArray = artistsDocRef.docs;
  
        const albumsArray = Array.from({ length: 100 }, generateData.generateAlbum);
  
  
        let randomNumber = 0;
        let loopIndex = 0;
  
        while (loopIndex < albumsArray.length) {
  
          randomNumber =
            Math.floor(Math.random() * artistsArray.length - 1) + 1;
            albumsArray[loopIndex].artistId = artistsArray[randomNumber].id;
  
          loopIndex++;
        }
  
        albumsArray.forEach(async (album) => {
          await albumsCollection.add(album);
        });
  
        response = albumsArray;
      } else {
        albumsDocRef = await albumsCollection.get();
  
        albumsDocRef.forEach((albumsDoc) => {
          const albumsDocData = albumsDoc.data();
          albumsDocData.albumId = albumsDoc.id;
  
          response.push(albumsDocData);
        });
      }
  
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  });