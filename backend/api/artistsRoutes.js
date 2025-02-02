const router = require("express").Router();
const { db } = require("../firebaseConfig");
const generateData = require("../chancescript");
const auth = require("../middleware/middleware");

router.route("/artists").get(async(req, res) => {
    console.log("1");
    try{
    const artistsCollection =  db.collection("artists");
    let artistsDocRef = await artistsCollection.get();
    let response = [];

    if(artistsDocRef.docs.length === 0) {

        const artistsArray = Array.from({length:55}, generateData.generateArtist);

        artistsArray.forEach(async (artist) => {
            await artistsCollection.add(artist);
        });

        response = artistsArray;
    } else {
        artistsDocRef = await artistsCollection.get();
        artistsDocRef.forEach((artistsDoc) => {
            const artistsDocData = artistsDoc.data();
            artistsDocData.artistId = artistsDoc.id;
            response.push(artistsDocData);
        });
    }
    return res.status(200).json(response);
} catch (err) {
  console.log(err);
  return res.status(500).json(err);
}
})
.post(auth, async (req, res) => {
    try {
        const artistsCollection = db.collection("artists");
        const artistsToAdd = req.body;

        if (
            artistsToAdd.name === undefined || artistsToAdd.genre === undefined || artistsToAdd.country === undefined
        ) {
            return res.status(400).json({
                message: "Add all the data necessary to create an artist"
            });
        }
        await artistsCollection.add(artistsToAdd);
        return res.status(200).json(artistsToAdd);
    } catch (err) {return res.status(500).json(err);}
});

router
  .route("/artists/:artistId")
  .get(async (req, res) => {
    try {
      const artistId = req.params.artistId;

      const artistDocRef = db.collection("artists").doc(artistId);
      const artistDoc = await artistDocRef.get();

      if (artistDoc.exists === false) {
        return res.status(404).json({
          message: `The artist with id {${artistId}} does not exist`,
        });
      }

      res.status(200).json(artistDoc.data());
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .put(auth, async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const artistDataToUpdate = req.body;

      const artistDocRef = db.collection("artists").doc(artistId);
      const artistDoc = await artistDocRef.get();

      if (artistDoc.exists === false) {
        return res.status(404).json({
          message: `The artist with id {${artistId}} does not exist!`,
        });
      }

      if (
        artistDataToUpdate.name === undefined ||
        artistDataToUpdate.genre === undefined ||
        artistDataToUpdate.country === undefined 
      ) {
        return res.status(400).json({
          message: `Please provide all the information to update an artist`,
        });
      }

      await artistDocRef.update(artistDataToUpdate);

      return res.status(200).json({
        message: `The artist with id {${artistId}} has been updated!`,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const artistId = req.params.artistId;

      const artistsCollection = db.collection("artists");
      const artistDocRef = artistsCollection.doc(artistId);

      const albumsCollection = db.collection("albums");
      const albumsDocRef = await albumsCollection
        .where("artistId", "==", artistId)
        .get();

      if (albumsDocRef.empty === false) {
        albumsDocRef.docs.forEach(async (albumDoc) => {
      
          await albumsCollection.doc(albumDoc.id).delete();
        });
      }

      await artistDocRef.delete();

      return res.status(200).json({
        message: `The artist with id {${artistId}} deleted succesfully alongisde all its albums!`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  router.route("/artists/:artistId/albums").get(async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const artistCollection = db.collection("artists");
      const artistDocRef = artistCollection.doc(artistId);
      const artistDoc = await artistDocRef.get();
  
      if (artistDoc.exists === false)
        return res.status(404).json({
          message: `The artist with id {${artistId}} does not exist!`,
        });
  
      const albumsCollection = db.collection("albums");
      const albumsDocRef = await albumsCollection
        .where("artistId", "==", `${artistId}`)
        .get();
  
      if (albumsDocRef.empty)
        return res
          .status(200)
          .json({ message: "This artist did not register any albums yet!" });
  
      let response = [];
  
      albumsDocRef.forEach((albumDoc) => {
        const albumDocData = albumDoc.data();
        albumDocData.albumId = albumDoc.id;
  
        response.push(albumDocData);
      });
  
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
module.exports = router;
