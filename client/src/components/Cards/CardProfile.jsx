import React, { useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { NETWORK_IP } from "../../utility/utils";

// components
import CardModal from "./CardModal";

const CardProfile = ({ fullname, division, position, image_url, setResponse, response }) => {
    const axiosPrivate = useAxiosPrivate();

    const [data, setData] = useState({ fullname: fullname, division: division, position: position, profile: image_url });
    const [showDropdown, setShowDropdown] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState();

    // fungsi untuk menampung perubahan file pada form
    const handleChange = (e) => {
        setData({ ...data, images: e.target.files[0] });
        const imageURL = URL.createObjectURL(e.target.files[0]);
        setPreview(imageURL);
    };

    // fungsi untuk melakukan upload gambar berdasarkan userid yang sedang login
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("images", data?.images);
            const result = await axiosPrivate.post("/users/upload", formData);
            setResponse({ message: result?.data?.message, status: result?.data?.status, statusCode: result?.status });
        } catch (error) {
            setResponse({ message: error?.response?.data?.message, status: error?.response?.data?.status, statusCode: 400 });
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <img
                                    alt="profile"
                                    src={preview ? preview : `${NETWORK_IP}/images/${data?.profile}`}
                                    className="shadow-xl rounded-full h-40 w-48 align-middle border-none absolute -m-16 -ml-20 lg:-ml-20 mr-8 max-w-150-px"
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 text-center mt-20">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="p-3 text-center mt-5">
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setShowDropdown((prev) => !prev)}
                                    >
                                        Change profile{" "}
                                        <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <br />
                                    {showDropdown && (
                                        <div className="inline-flex mt-3 justify-center w-36 bg-gray-100 rounded divide-gray-400 shadow gray:bg-gray-400">
                                            <div role="none">
                                                <div className="flex px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                                    <input id="upload" type="file" name="images" className="hidden" onChange={handleChange} required={true} />
                                                    <label htmlFor="upload" className="w-full text-sm font-medium text-gray-700 hover:cursor-pointer">
                                                        Select File
                                                    </label>
                                                </div>
                                                {preview ? (
                                                    <>
                                                        <hr />
                                                        <div className="flex px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                                            <button
                                                                className="rounded-md bg-indigo-600 flex content-center text-gray-700 py-1 px-2 text-sm text-white font-medium focus:outline-none"
                                                                onClick={handleUpload}
                                                            >
                                                                Upload
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <hr />
                                                        <div className="flex px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                                            <button
                                                                className="rounded-md flex content-center text-gray-700 bg-transparent py-1 px-2 text-sm font-medium focus:outline-none"
                                                                onClick={() => setOpenModal(true)}
                                                            >
                                                                Take picture
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{data?.fullname}</h3>
                        <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                            {data?.position} - At Anri85
                        </div>
                        <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            {data?.division} - At Anri85
                        </div>
                    </div>
                </div>
            </div>
            {openModal && (
                <>
                    <CardModal setOpenModal={setOpenModal} IDattendance={undefined} setResponse={setResponse} response={response} />
                </>
            )}
        </>
    );
};

export default CardProfile;
