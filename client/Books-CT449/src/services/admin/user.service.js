import createApiClient from "../api.service";

const api = createApiClient("/admin");

const UserService = {
  async getAll() {
    return (await api.get("/user")).data;
  },
  async createUserInfo(data) {
    return (await api.post("/adduser", data)).data;
  },
  async createUserAccount(data) {
    return (await api.post("/adduser/account", data)).data;
  },
  async get(id) {
    return (await api.get(`/user/${id}`)).data;
  },
  async getID(id) {
    return (await api.get(`/adduser/${id}`)).data;
  },
  async update(id, data) {
    return (await api.put(`user/edit/${id}`, data)).data;
  },
  async delete(id) {
    return (await api.delete(`user/${id}`)).data;
  },
};

export default UserService;
