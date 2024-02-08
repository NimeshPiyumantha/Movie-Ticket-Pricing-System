import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
// });

const api = axios.create({
  baseURL: "https://44.206.228.28:8000/api/v1",
});

export { api };
