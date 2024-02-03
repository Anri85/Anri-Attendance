import React, { useState } from "react";

import useAxiosPrivate from "../../api/useAxiosPrivate";

// components
const CardSettings = ({ fullname, username, position, division, role, gender, setResponse }) => {
    const axiosPrivate = useAxiosPrivate();

    const [newData, setNewData] = useState({
        fullname: fullname,
        username: username,
        position: position,
        division: division,
        role: role,
        gender: gender,
    });

    // fungsi untuk menampung perubahan value pada form
    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    // fungsi untuk melakukan update user berdasarkan data baru
    const handleClick = async (e) => {
        e.preventDefault();
        if (newData.fullname !== "") {
            if (window.confirm("This data is true?") === true) {
                try {
                    const result = await axiosPrivate.put("/users/update/", newData);
                    setResponse(result?.data?.data);
                    window.location.reload();
                } catch (error) {
                    setResponse(error?.message?.data);
                }
            }
        } else {
            setResponse({ message: "The 'Fullname' column cannot be empty", status: false });
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                        <button
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            type="button"
                            onClick={handleClick}
                            disabled={newData?.role === "Employee" ? true : false}
                        >
                            Save Change
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.username}
                                        readOnly={true}
                                        id="username"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fullname">
                                        Fullname
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.fullname}
                                        onChange={handleChange}
                                        readOnly={newData?.role === "Employee" ? true : false}
                                        id="fullname"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Status Information</h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="position">
                                        Position
                                    </label>
                                    <select
                                        id="position"
                                        name="position"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.position}
                                        onChange={handleChange}
                                        disabled={newData?.role === "Employee" || newData?.role === "Admin" ? true : false}
                                    >
                                        <option defaultValue="Employee">Employee</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Chief">Chief</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="division">
                                        Division
                                    </label>
                                    <select
                                        id="division"
                                        name="division"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.division}
                                        onChange={handleChange}
                                        disabled={newData?.role === "Employee" || newData?.role === "Admin" ? true : false}
                                    >
                                        <option defaultValue="Employee">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Finnance">Finance</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.role}
                                        onChange={handleChange}
                                        disabled={newData?.role === "Employee" || newData?.role === "Admin" ? true : false}
                                    >
                                        <option defaultValue="Employee">Employee</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Super admin">Super admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="gender">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={newData?.gender}
                                        onChange={handleChange}
                                        disabled={newData?.role === "Employee" || newData?.role === "Admin" ? true : false}
                                    >
                                        <option defaultValue="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CardSettings;
