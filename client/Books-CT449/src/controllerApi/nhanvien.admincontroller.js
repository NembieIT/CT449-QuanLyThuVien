import NVService from "../services/admin/nv.service";

const NVControllerApi = {
  getNV: async ()=>{
    return (await NVService.getAll()).data;
  },
  deleteNV: async (id)=>{
    return (await NVService.delete(id));
  },
  updateNV: async (id, data)=>{
    return (await NVService.update(id, data));
  },
  getID: async (id)=>{
    return (await NVService.getID(id));
  },
  addNV: async (data)=>{
    return (await NVService.createNV(data));
  }
}
export default NVControllerApi;
