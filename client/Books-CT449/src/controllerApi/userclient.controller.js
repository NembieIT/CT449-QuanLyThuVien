import UserClientService from "../services/user.service";

const UserClientControllerApi = {
  getTTUser: async (id)=>{
    return (await UserClientService.getTTUser(id));
  },
  addTTUser: async (data)=>{
    return (await UserClientService.addTTUser(data));
  },
  updateTTUser: async (data)=>{
    return (await UserClientService.updateTTUser(data));
  },
}
export default UserClientControllerApi;
