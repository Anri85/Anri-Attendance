import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../../api/useAxiosPrivate";

// components
import CardStats from "../Cards/CardStats";
import { NETWORK_IP } from "../../utility/utils";

const useAuth = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData === null ? false : userData;
};

const HeaderStats = () => {
    const axiosPrivate = useAxiosPrivate();
    const isAuth = useAuth();

    const [facts, setFacts] = useState([]);
    const [stats, setStats] = useState();

    const callAPI = async () => {
        try {
            if (isAuth?.role === "Employee") {
                const result = await axios.get("https://api.api-ninjas.com/v1/facts?limit=1", { headers: { "X-Api-Key": "0tYWK1N4dt7EPbuGCQBN+A==8nrlDTPUBEFcgGM5" } });
                setFacts(result?.data);
            } else {
                const result = await axiosPrivate.get(`${NETWORK_IP}/api/attendance/analysis`);
                setStats(result?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <>
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">
                            {isAuth?.role === "Employee" && (
                                <div className="w-full lg:w-8/12 xl:w-6/12 px-4">
                                    <CardStats facts={facts} fullname={isAuth?.fullname} />
                                </div>
                            )}
                            {stats && (
                                <>
                                    <CardStats stats={stats} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderStats;
