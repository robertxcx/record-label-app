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

  router.route("/albums/:artistId").post(auth, async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const albumsCollection = db.collection("albums");
      const albumToAdd = req.body;
      albumToAdd.artistId = artistId;
  
      if (
        albumToAdd.title === undefined ||
        albumToAdd.releaseYear === undefined 
      ) {
        return res.status(400).json({
          message:
            "Please provide the correct and complete data to create a album!",
        });
      }
  
      await albumsCollection.add(albumToAdd);
  
      return res.status(200).json(albumToAdd);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  router
    .route("/albums/:albumId")
    // GET one album
    .get(async (req, res) => {
      try {
        const albumId = req.params.albumId;
        const albumDocRef = db.collection("albums").doc(albumId);
        const albumDoc = await albumDocRef.get();
  
        if (albumDoc.exists === false) {
          return res.status(404).json({
            message: `The album with id {${albumId}} does not exist!`,
          });
        }
  
        return res.status(200).json(albumDoc.data());
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })
    .put(auth, async (req, res) => {
      try {
        const albumToUpdateId = req.params.albumId;
        const albumDocRef = db.collection("albums").doc(albumToUpdateId);
        const albumDoc = await albumDocRef.get();
        const albumToUpdate = req.body;
  
        if (
          albumToUpdate.title === undefined ||
          albumToUpdate.releaseYear === undefined
        ) {
          return res.status(400).json({
            message:
              "Please provide the correct and complete data to update a album!",
          });
        }
  
        if (albumDoc.exists === false) {
          return res.status(404).json({
            message: `The album with id {${albumToUpdateId}} does not exist!`,
          });
        }
  
        await albumDocRef.update(albumToUpdate);
  
        return res.status(200).json({
          message: `The album with id {${albumToUpdateId}} has been updated!`,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })
    .delete(auth, async (req, res) => {
      try {
        const albumId = req.params.albumId;
        const albumDocRef = db.collection("albums").doc(albumId);
        const albumDoc = await albumDocRef.get();
  
        if (albumDoc.exists === false) {
          return res.status(404).json({
            message: `The album with id {${albumId}} does not exist!`,
          });
        }
  
        await albumDocRef.delete();
  
        return res.status(200).json({
          message: `The album with id {${albumId}} has been deleted succesfully!`,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
    });
  
  module.exports = router;


