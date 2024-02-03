import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import CardModal from "./CardModal";

const CardEmployeeAttendance = ({ myAttendance, isAttendToday, response, setResponse }) => {
    const [openModal, setOpenModal] = useState(false);
    const [IDattendance, setIDAttendance] = useState();

    // fungsi untuk membuat attendance
    const createAttendance = async (attendanceId) => {
        setIDAttendance(attendanceId);
        setOpenModal(true);
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
            },
            (error) => {
                console.log(error);
            },
            { maximumAge: 60000, timeout: 2000, enableHighAccuracy: true }
        );
    };

    const registerServiceWorker = () => {
        return navigator.serviceWorker.register("/sw.js");
    };

    const askUserPermission = async () => {
        return await Notification.requestPermission();
    };

    const notification = () => {
        const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
        const text = "Take a look at this brand new t-shirt!";
        const title = "New Product Available";
        const options = {
            body: text,
            icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
            vibrate: [200, 100, 200],
            tag: "new-product",
            image: img,
            badge: "https://spyna.it/icons/android-icon-192x192.png",
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }],
        };
        navigator.serviceWorker.ready.then((serviceWorker) => {
            serviceWorker.showNotification(title, options);
        });
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded">
                {response?.statusCode === 404 && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
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
                                    <button
                                        className="ml-2"
                                        onClick={() => {
                                            setResponse({ ...response, message: "", status: "", statusCode: "" });
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
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">Your Attendance List</h3>
                        </div>
                        <div className={isAttendToday ? "hidden" : "relative w-full px-4 max-w-full flex-grow flex-1 text-right"}>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => createAttendance("")}
                                disabled={isAttendToday}
                            >
                                Create Attendance
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
                            {myAttendance.length > 0 ? (
                                myAttendance.map((a) => (
                                    <tr key={a.id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{a.id}</th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{a.fullname}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {new Date(a.date).toDateString()}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{a.time_in}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {a.time_out ? (
                                                a.time_out
                                            ) : (
                                                <button className="bg-red-500/100 px-3 py-1 rounded outline-none text-white uppercase" onClick={() => createAttendance(a.id)}>
                                                    <i className="fa fa-external-link"></i> Go Home
                                                </button>
                                            )}
                                        </td>
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
            {openModal && (
                <>
                    <CardModal setOpenModal={setOpenModal} IDattendance={IDattendance} setResponse={setResponse} response={response} />
                </>
            )}
        </>
    );
};

export default CardEmployeeAttendance;
