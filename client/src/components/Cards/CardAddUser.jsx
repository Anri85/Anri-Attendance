import React, { useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const CardAddUser = () => {
    const axiosPrivate = useAxiosPrivate();

    // buat state untuk mennyimpan data type input, data type select dan data type file
    const [newUserData, setNewUserData] = useState({
        fullname: "",
        username: "",
        password: "",
        role: "Employee",
        position: "Employee",
        division: "Marketing",
        gender: "Male",
        images: "",
    });
    const [preview, setPreview] = useState();
    const [response, setResponse] = useState();

    // fungsi untuk menangani perubahan dalam inputan
    const handleChange = (e) => {
        // jika input bertype file maka masukan kedalam state images
        if (e.target.type === "file") {
            setNewUserData({ ...newUserData, images: e.target.files[0] });
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setPreview(imageURL);
        } else {
            // jika inputan bukan bertype file maka simpan kedalam state dengan menyesuaikan pasangan name dan valuenya
            setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
        }
    };

    // fungsi untuk memanggil api dan mengirimkan data pada backend
    const handleClick = async (e) => {
        e.preventDefault();
        if (newUserData.fullname !== "" && newUserData.username !== "" && newUserData.password !== "" && newUserData.images !== "") {
            if (window.confirm("This data is true?") === true) {
                // karena pengiriman data berbarengan dengan mengirim file maka data harus dirubah menjadi format form data
                const formData = new FormData();
                // lakukan looping untuk append kedalam formdata berdasarkan key dan value dari state newUserData
                for (let key in newUserData) {
                    formData.append(key.toString(), newUserData[key]);
                }
                try {
                    const result = await axiosPrivate.post("/users/create", formData);
                    setResponse({ ...response, message: result?.data?.message, status: result?.data?.status, statusCode: result?.status });
                } catch (error) {
                    setResponse({ ...response, message: error?.response?.data?.message, status: error?.response?.data?.status, statusCode: error?.response?.status });
                }
            }
        } else {
            setResponse({ message: "Please fill all the forms correctly", status: false, statusCode: 400 });
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add new user</h6>
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
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Employee Identity</h6>
                        <img
                            src={preview ? preview : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"}
                            alt="preview"
                            className="rounded-md ml-4 mb-3"
                            width={200}
                            height={200}
                        />
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                                        <div className="mt-1 flex items-center">
                                            <input
                                                type="file"
                                                name="images"
                                                onChange={handleChange}
                                                required
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Fullname
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Insert fullname..."
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Insert username..."
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Create password..."
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Employee Status</h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="role"
                                        onChange={handleChange}
                                        value={newUserData?.role}
                                    >
                                        <option defaultValue="Employee">Employee</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Super admin">Super admin</option>
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
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="position"
                                        onChange={handleChange}
                                        value={newUserData?.position}
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
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="division"
                                        onChange={handleChange}
                                        value={newUserData?.division}
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
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="gender">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="gender"
                                        onChange={handleChange}
                                        value={newUserData?.gender}
                                    >
                                        <option defaultValue="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <div className="px-4 py-6 text-left sm:px-6">
                                        <button
                                            type="submit"
                                            onClick={handleClick}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Save
                                        </button>
                                    </div>
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

export default CardAddUser;
