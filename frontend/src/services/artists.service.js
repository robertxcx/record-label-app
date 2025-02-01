import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "api";

class ArtistsService {
    async getAllArtists() {
        return await axios.get(`${API_URL}/artists`);
      }
    
      async getArtistById(artistId) {
        return await axios.get(`${API_URL}/artists/${String(artistId)}`);
      }
    
    
      async addArtist(artistToAdd) {
        return await axios.post(`${API_URL}/artists`, artistToAdd, {
          headers: authHeader(),
        });
      }
    
      async editArtist(artistId, artistToUpdate) {
        return await axios.put(
          `${API_URL}/artists/${String(artistId)}`,
          artistToUpdate,
          { headers: authHeader() }
        );
      }
    
      async deleteArtist(artistId) {
        return await axios.delete(`${API_URL}/artists/${String(artistId)}`, {
          headers: authHeader(),
        });
      }
    }

    export default new ArtistsService();