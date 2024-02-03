import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../api/useAxiosPrivate";

import CardDetailUser from "../../components/Cards/CardDetailUser";
import ReactPaginate from "react-paginate";

const DetailUser = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [detailUser, setDetailUser] = useState();
    const [response, setResponse] = useState();
    const [page, setPage] = useState(0);
    const [limit] = useState(5);
    const [pages, setPages] = useState(0);

    // fungsi untuk mengambil detai user berdasarkan id
    const getUser = async (id) => {
        try {
            const response = await axiosPrivate.get(`/users/single/${id}?page=${page}&limit=${limit}`);
            setDetailUser(response?.data?.data);
            setPage(response?.data?.page);
            setPages(response?.data?.totalPage);
        } catch (error) {
            setResponse(error?.response?.data);
        }
    };

    useEffect(() => {
        getUser(id);
    }, [page]);

    // fungsi untuk merubah halaman
    const handlePageClick = ({ selected }) => {
        setPage(selected);
    };

    return (
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 xl:mb-0 px-4">
                <CardDetailUser detailUser={detailUser} response={response} setDetailUser={setDetailUser} setResponse={setResponse} id={id} attendance={detailUser?.attendance} />
                {detailUser?.attendance.length > 0 && (
                    <ReactPaginate
                        previousLabel={"← Back"}
                        nextLabel={"Next →"}
                        pageCount={pages}
                        onPageChange={handlePageClick}
                        containerClassName={"flex pl-0 rounded list-none flex-wrap"}
                        pageLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                        previousLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                        nextLinkClassName={"bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                        activeClassName={"bg-blue border-red-300 text-red-500 hover:bg-blue-200 items-center border text-sm font-medium"}
                    />
                )}
            </div>
        </div>
    );
};

export default DetailUser;
