import jwtAxios from "axios";

const jwtAuthAxios = jwtAxios.create({
  // baseURL:  `http://192.168.1.146:8081/api/`, //local
  baseURL: `http://localhost:8001/`, //local
  headers: {
    'Content-Type': 'application/json',
  },
});


export default jwtAuthAxios;