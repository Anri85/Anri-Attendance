import axios from "axios";
import { NETWORK_IP } from "../utility/utils";

const token = JSON.parse(localStorage.getItem("user"));

// buat konfigurasi sehingga axios dapat mengirimkan token pada headers
const authAxios = axios.create({
    baseURL: `${NETWORK_IP}/api`,
    headers: {
        Refresh_Token: token?.refresh_token,
        Content_Type: "multipart/form-data",
    },
});

export default authAxios;
