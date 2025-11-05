import BorrowService from "../services/admin/borrow.service";

const BorrowControllerApi = {
  getBorrow: async ()=>{
    return (await BorrowService.getAll());
  },
  deleteBorrow: async (id)=>{
    return (await BorrowService.delete(id));
  },
  updateBorrow: async (id, data)=>{
    return (await BorrowService.update(id, data));
  },
  getID: async (id)=>{
    return ((await BorrowService.getID(id)));
  },
  addBorrow: async (data)=>{
    return (await BorrowService.createBorrow(data));
  }
}
export default BorrowControllerApi;
