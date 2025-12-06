import createApiClient from "./api.service";

const api = createApiClient('/');

const UserClientService = {
  async getTTUser(id) {
    return (await api.get("/inform", { params: { id } })).data;
  },
  async addTTUser(data) {
    return (await api.post("/inform", data)).data;
  },
  async updateTTUser(data) {
    return (await api.put("/inform", data)).data;
  },
  async getAllBook() {
    return (await api.get("/trangchu")).data;
  },
  async getBookID(id) {
    return (await api.get(`/borrow/${id}`)).data;
  },
  async updateBook(id, data) {
    return (await api.post(`/updateBook/${id}`, data)).data;
  },
  async addBorrow(data) {
    return (await api.post("/borrow", data)).data;
  },
  async getTacgia() {
    return (await api.get("/category/authors")).data;
  },
  async getNXB() {
    return (await api.get("/category/nxb")).data;
  },
  async getBorrowByIDUser(id) {
    return (await api.get(`/trangchu/borrow/${id}`)).data;
  },
  async AuthenticateBorrowPage() {
    return (await api.get('/borrow')).data;
  },
  async AuthenticateFavPage() {
    return (await api.get('/favorite')).data;
  }
};

export default UserClientService;
