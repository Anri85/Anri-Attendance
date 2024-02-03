import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { NETWORK_IP } from "../../utility/utils";

const useAuth = () => {
    const userData = localStorage.getItem("user");
    return userData === null ? false : true;
};

const Login = () => {
    const isLogin = useAuth();

    const [response, setResponse] = useState({ message: "", status: "" });
    const [auth, setAuth] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth?.username !== "" && auth?.password !== "") {
            try {
                const result = await axios.post(`${NETWORK_IP}/api/user/authentication`, auth);
                localStorage.setItem("user", JSON.stringify(result?.data?.data));
                setResponse({ ...response, message: result?.data?.message, status: result?.data?.status });
                window.location.replace("/");
            } catch (error) {
                setResponse({ ...response, message: error?.response?.data?.message, status: error?.response?.data?.status });
            }
        }
        return false;
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log("Lupa password");
    };

    return isLogin ? (
        <Navigate to="/" />
    ) : (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        {response.status === false && (
                            <div className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 justify-center items-center rounded relative" role="alert">
                                <p className="font-bold text-center">{response.message}</p>
                                <button
                                    className="ml-2"
                                    onClick={() => {
                                        setResponse({ ...response, message: "", status: "" });
                                    }}
                                >
                                    <i className="fa fa-window-close bg-dark text-xl" aria-hidden="true"></i>
                                </button>
                            </div>
                        )}
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">Sign in with credentials</h6>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Username..."
                                            required={true}
                                            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password..."
                                            required={true}
                                            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blue-500 text-white text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 w-full"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            className="bg-red-500 text-white text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none mr-1 mt-1 w-full"
                                            type="submit"
                                            onClick={handleForgotPassword}
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
