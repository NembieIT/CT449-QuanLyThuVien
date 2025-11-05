import createApiClient from "../api.service";

const api = createApiClient("/admin");

const BookService = {
  async getAll() {
    return (await api.get("/books")).data;
  },
  async createBook(data) {
    return (await api.post("/addbook", data)).data;
  },
  async getID(id) {
    return (await api.get(`/books/${id}`)).data;
  },
  async update(id, data) {
    return (await api.put(`books/edit/${id}`, data)).data;
  },
  async delete(id) {
    return (await api.delete(`books/${id}`)).data;
  },
};

export default BookService;
