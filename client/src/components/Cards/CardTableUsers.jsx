import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../api/useAxiosPrivate";
import { NETWORK_IP } from "../../utility/utils";

const CardTableUsers = ({ color, users, response, setResponse, getAllUsers, setSearch }) => {
    const axiosPrivate = useAxiosPrivate();
    const userData = JSON.parse(localStorage.getItem("user"));

    const [checked, setChecked] = useState(new Array(users.length).fill(false));
    const [IDs, setIDs] = useState([]);

    // fungsi untuk melakukan penghapusan user (kecuali dirinya sendiri)
    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure will delete this user?") === true) {
                if (Array.isArray(id)) {
                    const result = await axiosPrivate.delete(`/users/delete/${id}`);
                    setResponse({ ...response, message: result?.data?.message, status: result?.data?.status });
                    setChecked([]);
                    setIDs([]);
                    getAllUsers();
                    return false;
                }
                const result = await axiosPrivate.delete(`/users/delete/${id}`);
                setResponse({ ...response, message: result?.data?.message, status: result?.data?.status });
                getAllUsers();
            }
            return false;
        } catch (error) {
            response({ ...response, message: error?.response?.data?.message, status: error?.response?.data?.status });
        }
    };

    // fungsi untuk merubah checkbox menjadi checked atau unchecked
    const checkedChange = (position, id) => {
        if (IDs.includes(id)) {
            const dataID = IDs.filter((ids) => ids !== id);
            setIDs(dataID);
        } else {
            IDs.push(id);
        }
        const updatedCheckedState = checked.map((item, index) => (index === position ? !item : item));
        setChecked(updatedCheckedState);
    };

    return (
        <>
            <div className={"relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded " + (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>Users Tables</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <form>
                                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring pl-10"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Fullname
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Role
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Division
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Position
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Gender
                                </th>
                                <th
                                    className={
                                        "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    {IDs.length > 0 ? (
                                        <button className="border-none outline-none focus:outline-none" onClick={() => handleDelete(IDs)}>
                                            <i className="fa fa-trash mr-2 bg-red-500 text-white active:bg-red-400 px-4 py-2 rounded outline-none"></i>
                                        </button>
                                    ) : (
                                        "Marked"
                                    )}
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? (
                                users.map((u, i) => (
                                    <tr key={u.id}>
                                        <td className="border-t-0 px-10 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                            <img src={`${NETWORK_IP}/images/${u.image_url}`} className="h-12 w-12 bg-white rounded-full border" alt="..."></img>{" "}
                                            <span className={"ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")}>{u.fullname}</span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{u.role}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{u.division}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{u.position}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{u.gender}</td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={() => checkedChange(i, u.id)}
                                                    type="checkbox"
                                                    value={checked[i]}
                                                    checked={checked[i]}
                                                    className="w-4 h-4 text-blue-600 bg-gray-700 rounded border-gray-500 focus:ring-blue-500 white:focus:ring-blue-600 white:ring-offset-gray-800 focus:ring-2 white:bg-gray-700 white:border-gray-600"
                                                    disabled={u.id === userData.id ? true : false}
                                                />
                                            </div>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <Link to={`/user/${u.id}`}>
                                                <i className="fa fa-info mr-2 bg-sky-500 text-white active:bg-sky-400 px-4 py-2 rounded outline-none"></i>
                                            </Link>
                                            <button
                                                className={
                                                    u.id === userData.id
                                                        ? "border-none outline-none focus:outline-none cursor-not-allowed"
                                                        : "border-none outline-none focus:outline-none"
                                                }
                                                onClick={() => handleDelete(u.id)}
                                                disabled={u.id === userData.id ? true : false}
                                            >
                                                <i className="fa fa-trash mr-2 bg-red-500 text-white active:bg-red-400 px-4 py-2 rounded outline-none"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

CardTableUsers.defaultProps = {
    color: "dark",
};

CardTableUsers.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTableUsers;
