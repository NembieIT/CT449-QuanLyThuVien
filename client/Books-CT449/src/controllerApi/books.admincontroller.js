import BookService from "../services/admin/book.service";

const BookControllerApi = {
  getBook: async ()=>{
    return (await BookService.getAll()).data;
  },
  deleteBook: async (id)=>{
    return (await BookService.delete(id));
  },
  updateBook: async (id, data)=>{
    return (await BookService.update(id, data));
  },
  getID: async (id)=>{
    return ((await BookService.getID(id)));
  },
  addBook: async (data)=>{
    return (await BookService.createBook(data));
  }
}
export default BookControllerApi;
