import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
// });

const api = axios.create({
  baseURL: "http://54.198.57.212:8000/api/v1",
});

export { api };
