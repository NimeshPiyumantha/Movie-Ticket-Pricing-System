import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
// });

const api = axios.create({
  baseURL: "https://ec2-54-88-109-152.compute-1.amazonaws.com/api/v1",
});

export { api };
