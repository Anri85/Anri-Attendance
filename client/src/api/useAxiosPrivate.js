import { useEffect } from "react";
import authAxios from ".";
import useRefreshToken from "./useRefreshToken";

const token = JSON.parse(localStorage.getItem("user"));

// fungsi untuk melakukan panggilan pada API yang membutuhkan token
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        // buat request interceptor pada header berisi access token
        const requestIntecept = authAxios.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token?.access_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // buat response interceptor untuk mengetahui response dari backend
        const responseIntercept = authAxios.interceptors.response.use(
            (response) => response,
            async (err) => {
                const prevRequest = err?.config;
                // jika error response dari backend memiliki statusCode 401 dan belum pernah mengirimkan request sebelumnya artinya access_token expired
                if (err?.response?.status === 401 && !prevRequest?.sent) {
                    // maka ulangi request dengan menggunakan access_token yang baru dari fungsi useRefreshtoken
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    // pasangkan access_token yang baru pada header dan lakukan request ulang
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return authAxios(prevRequest);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            authAxios.interceptors.request.eject(requestIntecept);
            authAxios.interceptors.response.eject(responseIntercept);
        };
    }, [refresh]);

    return authAxios;
};

export default useAxiosPrivate;
