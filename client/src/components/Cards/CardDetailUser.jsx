import React from "react";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../api/useAxiosPrivate";
import { NETWORK_IP } from "../../utility/utils";

const CardDetailUser = ({ detailUser, response, setDetailUser, setResponse, id, attendance }) => {
    const axiosPrivate = useAxiosPrivate();

    // saat super admin melakukan update terhadap user lain
    const handleClick = async (e) => {
        e.preventDefault();
        if (window.confirm("This data is true?") === true) {
            try {
                const result = await axiosPrivate.put(`/users/update/${id}`, {
                    fullname: detailUser?.fullname,
                    position: detailUser?.position,
                    division: detailUser?.division,
                    role: detailUser?.role,
                    gender: detailUser?.gender,
                });
                setResponse(result?.data);
            } catch (error) {
                setResponse(error?.response?.data);
            }
        }
    };

    // fungsi untuk menangani perubahan inputan
    const handleChange = (e) => {
        setDetailUser({ ...detailUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-blueGray-100 border-0">
            {detailUser && (
                <>
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h2 className="text-lg font-large leading-6 text-gray-900">User Information</h2>
                            <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                type="button"
                                onClick={handleClick}
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <img
                                        src={`${NETWORK_IP}/images/${detailUser?.image_url}`}
                                        alt=""
                                        className="flex-shrink-0 object-cover rounded-md dark:bg-gray-500 aspect-square"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fullname">
                                            Fullname
                                        </label>
                                        <input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailUser?.fullname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailUser?.username}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="position">
                                            Position
                                        </label>
                                        <select
                                            id="position"
                                            name="position"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailUser?.position}
                                            onChange={handleChange}
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
                                            value={detailUser?.division}
                                            onChange={handleChange}
                                        >
                                            <option defaultValue="Marketing">Marketing</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
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
                                            value={detailUser?.role}
                                            onChange={handleChange}
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
                                            value={detailUser?.gender}
                                            onChange={handleChange}
                                        >
                                            <option defaultValue="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Attendance Record</h6>
                            {detailUser?.attendance.length > 0 && (
                                <>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-12/12 px-4">
                                            <div className="block w-full overflow-x-auto">
                                                <table className="items-center w-full bg-gray-200 rounded-md border-collapse">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Attendance ID
                                                            </th>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Date
                                                            </th>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Status
                                                            </th>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Time In
                                                            </th>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Time Out
                                                            </th>
                                                            <th className="px-6 bg-blueGray-300 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {attendance.map((da) => (
                                                            <tr key={da.id}>
                                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                    {da.id}
                                                                </th>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {new Date(da.date).toDateString()}
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                    <button
                                                                        className={
                                                                            da.status === "Attended"
                                                                                ? "bg-lime-300/100 px-3 py-1 rounded outline-none uppercase text-white cursor-not-allowed"
                                                                                : "bg-sky-300/100 px-3 py-1 rounded outline-none uppercase text-white cursor-not-allowed"
                                                                        }
                                                                        disabled
                                                                    >
                                                                        {da.status}
                                                                    </button>
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{da.time_in}</td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {da.time_out ? da.time_out : "-"}
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <button
                                                                        className="bg-sky-500 text-white active:bg-sky-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                    >
                                                                        <Link to={`/attendance/${da.id}`}>
                                                                            <i className="fa fa-info mr-2 text-sm"></i> Info
                                                                        </Link>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </form>
                    </div>
                </>
            )}
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
                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                                <button
                                    className="ml-2"
                                    onClick={() => {
                                        setResponse();
                                    }}
                                >
                                    <i className="fa fa-window-close bg-dark text-xl" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </div>
    );
};

export default CardDetailUser;
