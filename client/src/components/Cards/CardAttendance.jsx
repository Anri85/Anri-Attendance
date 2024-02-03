import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardAttendance = ({ attendance, setQuery, exportsAttendance }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <>
            <div className="relative flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">Employee Attendance</h3>
                        </div>
                        <div className="relative inline-block text-left">
                            {openDropdown && (
                                <div
                                    className="absolute right-0 z-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex="-1"
                                >
                                    <div role="none">
                                        <div className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                                            <input
                                                id="attended"
                                                type="radio"
                                                value={["status", "Attended"]}
                                                name="default-radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <label htmlFor="attended" className="ml-2 w-full text-sm font-medium text-gray-700">
                                                Attended
                                            </label>
                                        </div>
                                        <div className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                            <input
                                                id="unattended"
                                                type="radio"
                                                value={["status", "Unattended"]}
                                                name="default-radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <label htmlFor="unattended" className="ml-2 w-full text-sm font-medium text-gray-700">
                                                Unattended
                                            </label>
                                        </div>
                                        <div className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                            <input
                                                id="today"
                                                type="radio"
                                                value={["date", new Date().toISOString().split("T")[0]]}
                                                name="default-radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <label htmlFor="today" className="ml-2 w-full text-sm font-medium text-gray-700">
                                                Today
                                            </label>
                                        </div>
                                        <div className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                                            <input
                                                id="nothing"
                                                type="radio"
                                                name="default-radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                onClick={() => setQuery("nothing")}
                                            />
                                            <label htmlFor="nothing" className="ml-2 w-full text-sm font-medium text-gray-700">
                                                Default
                                            </label>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                type="button"
                                                className="text-gray-800 block w-full px-4 py-2 text-left text-sm focus:outline-none outline-none"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="menu-item-3"
                                                onClick={() => setOpenDropdown((prev) => !prev)}
                                            >
                                                <i className="fa fa-window-close bg-dark text-right text-xl mr-2" aria-hidden="true"></i>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none text-center inline-flex items-center mr-2 mb-1 focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                                onClick={exportsAttendance}
                            >
                                Exports
                            </button>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none text-center inline-flex items-center mr-6 mb-1 focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setOpenDropdown((prev) => !prev)}
                            >
                                Filter
                                <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Attendance ID
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Employee Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Date
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Check In
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Check Out
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Status
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Working Hour
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.length > 0 ? (
                                attendance.map((a) => (
                                    <tr key={a.id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{a.id}</th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{a.fullname}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {new Date(a.date).toDateString()}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{a.time_in}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{a.time_out ? a.time_out : "-"}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            <button
                                                className={
                                                    a.status === "Attended"
                                                        ? "bg-lime-300/100 px-3 py-1 rounded outline-none uppercase text-white cursor-not-allowed"
                                                        : "bg-sky-300/100 px-3 py-1 rounded outline-none uppercase text-white cursor-not-allowed"
                                                }
                                                disabled
                                            >
                                                {a.status}
                                            </button>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {a.number_of_working_hours ? a.number_of_working_hours : "-"}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button
                                                className="bg-sky-500 text-white active:bg-sky-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                <Link to={`/attendance/${a.id}`}>
                                                    <i className="fa fa-info mr-2 text-sm"></i> Info
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">No attendance available</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CardAttendance;
