const Chance = require("chance");
const chance = new Chance();


const generateArtist = () => {
  const nameStartWords = ["John", "Jane", "Michael", "Emily", "David", "Sophia", "William", "Olivia"];
  const nameEndWords = ["Smith", "Johnson", "Brown", "Taylor", "Davis", "Jackson", "Harris", "Wilson"];

  const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "R&B", "Jazz", "Classical", "Country"];
  const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Italy", "Spain"];

  return {
    name: `${chance.pickone(nameStartWords)} ${chance.pickone(nameEndWords)}`,
    genre: chance.pickone(genres),
    country: chance.pickone(countries),
  };
};

const generateAlbum = () => {
  const titleStartWords = ["The", "Dark", "Lost", "Golden", "Silent"];
  const titleEndWords = ["Nights", "Dreams", "Echoes", "Shadows", "Stories"];

  return {
    title: `${chance.pickone(titleStartWords)} ${chance.pickone(titleEndWords)}`,
    releaseYear: chance.year({ min: 2005, max: 2025 }),
    tracks: Array.from({ length: chance.integer({ min: 5, max: 15 }) }, () => generateTrack()),
  };
};

const generateTrack = () => {
  const titleStartWords = ["Intro", "Verse", "Chorus", "Bridge", "Outro"];
  const titleEndWords = ["1", "2", "3", "4", "5"];

  return {
    title: `${chance.pickone(titleStartWords)} ${chance.pickone(titleEndWords)}`,
    duration: chance.integer({ min: 180, max: 360 }), // Duration in seconds
  };
};

module.exports = { generateArtist, generateAlbum };
  