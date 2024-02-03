import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";

// components
import CardTableUsers from "../../components/Cards/CardTableUsers";
import ReactPaginate from "react-paginate";

const Tables = () => {
    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState({ message: "", status: "" });
    const [search, setSearch] = useState();
    const [page, setPage] = useState(0);
    const [limit] = useState(5);
    const [pages, setPages] = useState(0);

    const axiosPrivate = useAxiosPrivate();

    // fungsi untuk mengambil list user
    const getAllUsers = async (search) => {
        try {
            if (search !== undefined) {
                const result = await axiosPrivate.get(`/users/list/?fullname=${search}&page=${page}&limit=${limit}`);
                setUsers(result?.data?.data);
                setPage(result?.data?.page);
                setPages(result?.data?.totalPage);
            } else {
                const result = await axiosPrivate.get(`/users/list/?page=${page}&limit=${limit}`);
                setUsers(result?.data?.data);
                setPage(result?.data?.page);
                setPages(result?.data?.totalPage);
            }
        } catch (error) {
            setResponse(error?.response?.data);
        }
    };

    useEffect(() => {
        getAllUsers(search);
    }, [page, search]);

    // fungsi untuk merubah halaman
    const handlePageClick = ({ selected }) => {
        setPage(selected);
    };

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTableUsers color="dark" users={users} response={response} setResponse={setResponse} getAllUsers={getAllUsers} setSearch={setSearch} />
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
                </div>
            </div>
        </>
    );
};

export default Tables;
