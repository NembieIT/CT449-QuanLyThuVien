import createApiClient from "../api.service";

const api = createApiClient("/admin");

const NXBService = {
  async getAll() {
    return (await api.get("/nxb")).data;
  },
  async createNXB(data) {
    return (await api.post("/addnxb", data)).data;
  },
  async getID(id) {
    return (await api.get(`/nxb/${id}`)).data;
  },
  async update(id, data) {
    return (await api.put(`nxb/edit/${id}`, data)).data;
  },
  async delete(id) {
    return (await api.delete(`nxb/${id}`)).data;
  },
};

export default NXBService;
