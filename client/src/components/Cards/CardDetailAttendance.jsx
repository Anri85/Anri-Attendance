import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAxiosPrivate from "../../api/useAxiosPrivate";
import { NETWORK_IP } from "../../utility/utils";

const CardDetailAttendance = () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();

    const [detailAttendance, setDetailAttendance] = useState();
    const [response, setResponse] = useState();

    // fungsi mendapatkan detail attendance
    const getDetailAttendance = async () => {
        try {
            const result = await axiosPrivate.get(`/attendance/list/detail/${id}`);
            setDetailAttendance(result?.data?.data);
            if (result?.data?.data?.attendance_image_out === "" && result?.data?.data?.status === "Unattended") {
                setResponse({ ...response, status: false, message: "This attendance was edited by admin, please more careful next time!" });
            }
        } catch (error) {
            setResponse(error?.response?.data);
        }
    };

    // fungsi handle change dengan menambahkan prevStatus untuk komparasi pada backend
    const handleChange = (e) => {
        setDetailAttendance({ ...detailAttendance, [e.target.name]: e.target.value, ["prevStatus"]: detailAttendance?.status });
    };

    // seorang super admin atau admin dapat mengedit sebuah attendance
    const handleClick = async (e) => {
        e.preventDefault();
        // jika terdapat prevStatus artinya status attendance telah dirubah dan akan menggenerate time_out secara otomatis
        if (window.confirm("This data is true?") === true) {
            if (detailAttendance?.prevStatus) {
                try {
                    const result = await axiosPrivate.put(`/attendance/update/${id}`, {
                        status: detailAttendance?.status,
                        time_in: detailAttendance?.time_in,
                        time_out: detailAttendance?.time_out,
                        attendance_image_out: detailAttendance?.attendance_image_out,
                        workingHours: detailAttendance?.number_of_working_hours,
                        prevStatus: detailAttendance?.prevStatus,
                    });
                    setResponse(result?.data);
                } catch (error) {
                    setResponse(error?.response?.data);
                }
            }
            return false;
        }
    };

    useEffect(() => {
        getDetailAttendance();
    }, []);

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            {detailAttendance && (
                <>
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h2 className="text-lg font-large leading-6 text-gray-900">Attendance Information</h2>
                            <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                type="button"
                                onClick={handleClick}
                                disabled={userData?.role === "Employee" ? true : false}
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Attendance Information</h6>
                            <hr className="mt-6 border-b-1 border-blueGray-300 mb-3" />
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="status">
                                            Attendance Image In
                                        </label>
                                        <img src={`${NETWORK_IP}/attendance/time_in/${detailAttendance?.attendance_image_in}`} className="rounded-md" alt="attendance in" />
                                    </div>
                                </div>
                                {detailAttendance?.attendance_image_out !== "" && (
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="status">
                                                Attendance Image Out
                                            </label>
                                            <img src={`${NETWORK_IP}/attendance/time_out/${detailAttendance?.attendance_image_out}`} className="rounded-md" alt="attendance out" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="status">
                                            Status
                                        </label>
                                        {userData?.role === "Employee" ? (
                                            <input
                                                id="status"
                                                name="status"
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={detailAttendance?.status}
                                                readOnly={userData?.role === "Employee" ? true : false}
                                            />
                                        ) : (
                                            <select
                                                id="status"
                                                name="status"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={detailAttendance?.status}
                                                onChange={handleChange}
                                                disabled={detailAttendance?.status === "Unattended" ? true : false}
                                            >
                                                <option defaultValue="Attended">Attended</option>
                                                <option value="Unattended">Unattended</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="time_in">
                                            Time In
                                        </label>
                                        <input
                                            id="time_in"
                                            name="time_in"
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailAttendance?.time_in}
                                            onChange={handleChange}
                                            readOnly={userData?.role === "Employee" ? true : false}
                                        />
                                    </div>
                                </div>
                                {detailAttendance?.time_out !== "" && (
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="time_out">
                                                Time Out
                                            </label>
                                            <input
                                                id="time_out"
                                                name="time_out"
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={detailAttendance?.time_out}
                                                onChange={handleChange}
                                                readOnly={userData?.role === "Employee" ? true : false}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="date">
                                            Date
                                        </label>
                                        <input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={new Date(detailAttendance?.date).toISOString().split("T")[0]}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                {detailAttendance?.number_of_working_hours && (
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="hour">
                                                Working Hour
                                            </label>
                                            <input
                                                id="hour"
                                                name="hour"
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={detailAttendance?.number_of_working_hours}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fullname">
                                            User ID
                                        </label>
                                        <input
                                            id="fullname"
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailAttendance?.user_id}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fullname">
                                            Fullname
                                        </label>
                                        <input
                                            id="fullname"
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailAttendance?.fullname}
                                            readOnly={true}
                                        />
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
                                            value={detailAttendance?.division}
                                            disabled={true}
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
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="position">
                                            Position
                                        </label>
                                        <select
                                            id="position"
                                            name="position"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={detailAttendance?.position}
                                            disabled={true}
                                        >
                                            <option defaultValue="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Chief">Chief</option>
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
                                            value={detailAttendance?.role}
                                            disabled={true}
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
                                            value={detailAttendance?.gender}
                                            disabled={true}
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

export default CardDetailAttendance;
