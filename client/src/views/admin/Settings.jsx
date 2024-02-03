import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../api/useAxiosPrivate";

// components
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";

const Settings = () => {
    const axiosPrivate = useAxiosPrivate();

    const [detailUser, setDetailUser] = useState();
    const [response, setResponse] = useState();

    const getUserDetail = async () => {
        try {
            const result = await axiosPrivate.get("/users/single/");
            setDetailUser(result?.data?.data);
        } catch (error) {
            setResponse(error?.resoponse?.data);
        }
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        {response && (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div
                                            className={
                                                response?.status === false
                                                    ? "flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                                    : "flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                            }
                                            role="alert"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <div>
                                                <span className="font-medium">Warning!</span> {response?.message}
                                            </div>
                                            <button className="ml-2" onClick={() => setResponse()}>
                                                <i className="fa fa-window-close bg-dark text-xl" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        )}
                    </div>
                    {detailUser && (
                        <CardSettings
                            fullname={detailUser?.fullname}
                            username={detailUser?.username}
                            position={detailUser?.position}
                            division={detailUser?.division}
                            role={detailUser?.role}
                            gender={detailUser?.gender}
                            setResponse={setResponse}
                        />
                    )}
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    {detailUser && (
                        <CardProfile
                            fullname={detailUser?.fullname}
                            division={detailUser?.division}
                            position={detailUser?.position}
                            image_url={detailUser?.image_url}
                            setResponse={setResponse}
                            response={response}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Settings;
