import axios from "axios";

const accessToken = localStorage.getItem("SECRET_TOKEN");

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/",
    timeout: 1000,
    headers: {
        authorization: `Bearer ${accessToken}`,
    },
});

export default axiosInstance;

//pour faire la liaison avec backend bech manab9awech kol ma n3ayet lel api n3ayet lel url w nkteb requette kbira 