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
  async getAllBook(){
    return (await api.get("/trangchu")).data;
  },
  async addBorrow(data){
    return (await api.post("/borrow", data)).data;
  }
};

export default UserClientService;
