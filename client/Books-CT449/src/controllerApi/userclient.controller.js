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
  getBookID: async (id) => {
    return (await UserClientService.getBookID(id));
  },
  updateBook: async (id, data) => {
    return (await UserClientService.updateBook(id, data));
  },
  addBorrow: async (data) => {
    return (await UserClientService.addBorrow(data));
  },
  getTacgia: async () => {
    return (await UserClientService.getTacgia());
  },
  getNXB: async () => {
    return (await UserClientService.getNXB());
  },
  getBorrowByIDUser: async (id) => {
    return (await UserClientService.getBorrowByIDUser(id));
  },
  AuthenticateBorrowPage: async () => {
    return (await UserClientService.AuthenticateBorrowPage());
  },
  AuthenticateFavPage: async () => {
    return (await UserClientService.AuthenticateFavPage());
  }
}
export default UserClientControllerApi;
