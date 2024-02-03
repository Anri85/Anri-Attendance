import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import useAxiosPrivate from "../../api/useAxiosPrivate";
import DataLog from "../../components/Log/DataLog";

const Log = () => {
    const axiosPrivate = useAxiosPrivate();
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    // fungsi untuk mengambil data log
    const getLogs = async () => {
        try {
            const response = await axiosPrivate.get("/logs");
            setLogs(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLogs();
    }, []);

    // pengaturan untuk menampilkan data perhalaman
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentPageData = logs.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(logs.length / PER_PAGE);

    // fungsi untuk merubah halaman
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    return (
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 xl:mb-0 px-4">
                <DataLog logs={currentPageData} />
                <ReactPaginate
                    previousLabel={"← Back"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex pl-0 rounded list-none flex-wrap"}
                    pageLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                    previousLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                    nextLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                    activeClassName={"bg-blue border-red-300 text-red-500 hover:bg-blue-200 items-center border text-sm font-medium"}
                />
            </div>
        </div>
    );
};

export default Log;
