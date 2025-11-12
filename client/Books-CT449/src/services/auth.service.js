import createApiClient from "./api.service";

const api = createApiClient("/auth");

const AuthService = {
  async login(data) {
    return (await api.post("/login",data)).data;
  },
  async register(data) {
    return (await api.post("/register", data)).data;
  },
  async loginAD(data){
    return (await api.post("/admin/login",data)).data;
  },
  async loginNV(data){
    return (await api.post("/nhanvien/login",data)).data;
  }
};

export default AuthService;
