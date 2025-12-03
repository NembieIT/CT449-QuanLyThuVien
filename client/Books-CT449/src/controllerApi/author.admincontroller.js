import AuthorService from "../services/admin/author.service";

const AuthorControllerApi = {
    getAuthor: async () => {
        return (await AuthorService.getAll()).data;
    },
    deleteAuthor: async (id) => {
        return (await AuthorService.delete(id));
    },
    updateAuthor: async (id, data) => {
        return (await AuthorService.update(id, data));
    },
    getID: async (id) => {
        return ((await AuthorService.getID(id)));
    },
    addAuthor: async (data) => {
        return (await AuthorService.createAuthor(data));
    }
}
export default AuthorControllerApi;
