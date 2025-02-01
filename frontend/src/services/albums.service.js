import axios from "axios";

const API_URL = "api";

class AlbumsService {
    async getAllAlbums() {
      return await axios.get(`${API_URL}/albums`);
    }
}
export default new AlbumsService();