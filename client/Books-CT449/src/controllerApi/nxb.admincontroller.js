import NXBService from "../services/admin/nxb.service";

const NXBControllerApi = {
  getNXB: async ()=>{
    return (await NXBService.getAll()).data;
  },
  deleteNXB: async (id)=>{
    return (await NXBService.delete(id));
  },
  updateNXB: async (id, data)=>{
    return (await NXBService.update(id, data));
  },
  getID: async (id)=>{
    return ((await NXBService.getID(id)));
  },
  addNXB: async (data)=>{
    return (await NXBService.createNXB(data));
  }
}
export default NXBControllerApi;
