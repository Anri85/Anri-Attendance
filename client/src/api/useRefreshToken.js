import authAxios from ".";

// fungsi untuk mendapatkan access_token baru berdasarkan refresh_token
const useRefreshToken = () => {
    const newAccessToken = async () => {
        // lakukan panggilan API untuk mendapatkan access_token baru
        const response = await authAxios.put("/user/authentication");
        return response?.data?.access_token;
    };

    return newAccessToken;
};

export default useRefreshToken;
