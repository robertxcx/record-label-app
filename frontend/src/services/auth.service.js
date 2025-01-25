import axios from "axios";
const API_URL = "authentication/";

class AuthService {
  async login(user) {
    return await axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("tokenResponse", JSON.stringify(response.data));
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("isAuth", true);
        }
        response.data.loggedInUserEmail = user.email;
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("tokenResponse");
    localStorage.removeItem("userEmail");
  }

  async register(user) {
    return await axios
      .post(API_URL + "register", {
        email: user.email,
        password: user.password,
        username: user.username,
      })
      .then((response) => {
        console.log(response);

        return response;
      });
  }
}

export default new AuthService();