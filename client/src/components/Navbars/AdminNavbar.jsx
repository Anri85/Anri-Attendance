import React from "react";

import logo from "../../assets/img/Anri_Logo_fix.png";

const AdminNavbar = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4">
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex mt-3">
                        <li className="inline-block relative">
                            <div className="items-center flex">
                                <img alt="user image" className="align-middle border-none" src={logo} />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
};

export default AdminNavbar;
