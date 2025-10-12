import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
export default (baseURL) => {
    return axios.create({
        baseURL: `http://localhost:3001${baseURL}`,
        ...commonConfig,
    });
};