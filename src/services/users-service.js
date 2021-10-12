import axios from "axios";

export default class UsersService {
  basePath = "http://localhost:3000";
  // récupération des données sous form JSON
  fetchAll() {
    return axios.get(`${this.basePath}/data`).then((res) => {
      return res.data;
    });
  }
}
