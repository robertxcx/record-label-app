export default function authHeader() {

    let user = JSON.parse(localStorage.getItem("tokenResponse"));
  
    if (user && user.token) {
      return { Authorization: user.token };
    } else {
      return {};
    }
  }