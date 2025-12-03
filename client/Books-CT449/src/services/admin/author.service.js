import createApiClient from "../api.service";

const api = createApiClient("/admin");

const AuthorService = {
    async getAll() {
        return (await api.get("/authors")).data;
    },
    async createAuthor(data) {
        return (await api.post("/addauthor", data)).data;
    },
    async getID(id) {
        return (await api.get(`/authors/${id}`)).data;
    },
    async update(id, data) {
        return (await api.put(`authors/edit/${id}`, data)).data;
    },
    async delete(id) {
        return (await api.delete(`authors/${id}`)).data;
    },
};

export default AuthorService;
