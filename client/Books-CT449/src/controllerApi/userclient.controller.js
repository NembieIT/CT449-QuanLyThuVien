import UserClientService from "../services/user.service";

const UserClientControllerApi = {
  getTTUser: async (id) => {
    return (await UserClientService.getTTUser(id));
  },
  addTTUser: async (data) => {
    return (await UserClientService.addTTUser(data));
  },
  updateTTUser: async (data) => {
    return (await UserClientService.updateTTUser(data));
  },
  getAllBook: async () => {
    return (await UserClientService.getAllBook());
  },
  addBorrow: async (data) => {
    return (await UserClientService.addBorrow(data));
  },
  getTacgia: async () => {
    return (await UserClientService.getTacgia());
  },
  getNXB: async () => {
    return (await UserClientService.getNXB());
  }
}
export default UserClientControllerApi;
