import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "api";

class AlbumsService {
    async getAllAlbums() {
      return await axios.get(`${API_URL}/albums`);
    }
    async getAlbumsOfArtist(artistId) {
      return await axios.get(`${API_URL}/artists/${String(artistId)}/albums`);
    }
  
    async getAlbumById(albumId) {
      return await axios.get(`${API_URL}/albums/${String(albumId)}`);
    }
  
    async addAlbum(artistId, albumToAdd) {
      return await axios.post(`${API_URL}/albums/${artistId}`, albumToAdd, {
        headers: authHeader(),
      });
    }
  
    async editAlbum(albumId, albumToUpdate) {
      return await axios.put(`${API_URL}/albums/${String(albumId)}`, albumToUpdate, {
        headers: authHeader(),
      });
    }
  
    async deleteAlbum(albumId) {
      return await axios.delete(`${API_URL}/albums/${String(albumId)}`, {
        headers: authHeader(),
      });
    }
}
export default new AlbumsService();