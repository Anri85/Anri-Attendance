import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";

import CardAttendance from "../../components/Cards/CardAttendance";
import ReactPaginate from "react-paginate";
import axios from "axios";

// components
const Dashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const [query, setQuery] = useState("nothing");
    const [page, setPage] = useState(0);
    const [limit] = useState(5);
    const [pages, setPages] = useState(0);

    const axiosPrivate = useAxiosPrivate();

    // fungsi mengambil attendance list (keseluruhan)
    const getAllAttendance = async () => {
        try {
            const result = await axiosPrivate.get(`/attendance/list/${query}?page=${page}&limit=${limit}`);
            setAttendance(result?.data?.data);
            setPage(result?.data?.page);
            setPages(result?.data?.totalPage);
        } catch (error) {
            console.log(error?.response?.data);
        }
    };

    const exportsAttendance = async () => {
        try {
            const result = await axiosPrivate.get("/attendance/exportpdf");
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllAttendance();
    }, [query, page]);

    // fungsi untuk merubah halaman
    const handlePageClick = ({ selected }) => {
        setPage(selected);
    };

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 xl:mb-0 px-4">
                    <CardAttendance attendance={attendance} setQuery={setQuery} exportsAttendance={exportsAttendance} />
                    {attendance.length > 0 && (
                        <ReactPaginate
                            previousLabel={"← Back"}
                            nextLabel={"Next →"}
                            pageCount={pages}
                            onPageChange={handlePageClick}
                            containerClassName={"flex pl-0 rounded list-none flex-wrap"}
                            pageLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                            previousLinkClassName={
                                "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            }
                            nextLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                            activeClassName={"bg-blue border-red-300 text-red-500 hover:bg-blue-200 items-center border text-sm font-medium"}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
