export default class ItemsService {
  apiUrl;

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  async fetchAll() {
    return await fetch(`${this.apiUrl}`).then((res) => {
      return res.json();
    });
  }
}
