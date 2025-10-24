import UserService from "../services/admin/user.service";

const UserControllerApi = {
  getUser: async ()=>{
    return (await UserService.getAll()).data;
  },
  deleteUser: async (id)=>{
    return (await UserService.delete(id));
  },
  updateUser: async (id, data)=>{
    return (await UserService.update(id, data));
  },
  getID: async (id)=>{
    return (await UserService.getID(id));
  },
  adduserAccount: async (data)=>{
    return (await UserService.createUserAccount(data));
  },
  adduserInfo: async (data)=>{
    return (await UserService.createUserInfo(data));
  }
}
export default UserControllerApi;
