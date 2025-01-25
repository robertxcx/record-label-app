const { db } = require("./firebaseConfig");

async function testFirestore() {
  try {
    const testCollection = await db.collection("users").get();
    testCollection.forEach(doc => {
      console.log(doc.id, "=>", doc.data());
    });
    console.log(" Firestore connection successful!");
  } catch (error) {
    console.error(" Error connecting to Firestore:", error);
  }
}

testFirestore();