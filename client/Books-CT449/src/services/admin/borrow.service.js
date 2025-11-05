import createApiClient from "../api.service";

const api = createApiClient("/admin");

const BorrowService = {
  async getAll() {
    return (await api.get("/borrow")).data;
  },
  async createBorrow(data) {
    return (await api.post("/addborrow", data)).data;
  },
  async getID(id) {
    return (await api.get(`/borrow/${id}`)).data;
  },
  async update(id, data) {
    return (await api.put(`borrow/edit/${id}`, data)).data;
  },
  async delete(id) {
    return (await api.delete(`borrow/${id}`)).data;
  },
};

export default BorrowService;
