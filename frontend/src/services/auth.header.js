export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("tokenResponse"));
  console.log("Auth Header User:", user);
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }; // Adaugă 'Bearer ' înainte de token
  } else {
    console.error("Auth Header is undefined!");
    return {};
  }
}