import createApiClient from "../api.service";

const api = createApiClient("/admin");

const UserService = {
  async getAll() {
    return (await api.get("/nhanvien")).data;
  },
  async createNV(data) {
    return (await api.post("/addnv", data)).data;
  },
  async getID(id) {
    return (await api.get(`/nhanvien/${id}`)).data;
  },
  async update(id, data) {
    return (await api.put(`nhanvien/edit/${id}`, data)).data;
  },
  async delete(id) {
    return (await api.delete(`nhanvien/${id}`)).data;
  },
};

export default UserService;
