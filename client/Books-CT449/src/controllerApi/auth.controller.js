import AuthService from "../services/auth.service";

const AuthControllerApi = {
  login: async (data)=>{
    return (await AuthService.login(data)).data;
  },
  register: async (data)=>{
    return (await AuthService.register(data));
  },
  loginAD: async (data)=>{
    return (await AuthService.loginAD(data));
  },
  loginNV: async (data)=>{
    return (await AuthService.loginNV(data));
  }
}
export default AuthControllerApi;
