import React from "react";
import PropTypes from "prop-types";

const CardStats = ({ facts, stats, fullname }) => {
    return (
        <>
            {facts && (
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">Welcome Back, {fullname}!</h5>
                                <p className="mt-3">Did you know? {facts[0]?.fact}</p>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-amber-700">
                                    <i className="fa fa-coffee"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {stats && (
                <>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-3">Total Users</h5>
                                        <span className="font-semibold text-lg text-blueGray-700">{stats?.data?.users} Users</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-teal-300">
                                            <i className="fa fa-users"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-3">Total Absence Time In</h5>
                                        <span className="font-semibold text-xl text-blueGray-700">{stats?.data?.absences} Absence</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className={"text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lime-500"}>
                                            <i className="fa fa-address-card-o"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-3">Total Complete Absence</h5>
                                        <span className="font-semibold text-xl text-blueGray-700">{stats?.data?.completed} Absence</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className={"text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-sky-500"}>
                                            <i className="fa fa-check-square-o"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-3">Not Doing Absence</h5>
                                        <span className="font-semibold text-xl text-blueGray-700">{stats?.data?.withoutExp} Users</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-700">
                                            <i className="fa fa-exclamation-triangle"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

CardStats.defaultProps = {
    statSubtitle: "Traffic",
    statTitle: "350,897",
    statArrow: "up",
    statPercent: "3.48",
    statPercentColor: "text-emerald-500",
    statDescripiron: "Since last month",
    statIconName: "far fa-chart-bar",
    statIconColor: "bg-red-500",
};

CardStats.propTypes = {
    statSubtitle: PropTypes.string,
    statTitle: PropTypes.string,
    statArrow: PropTypes.oneOf(["up", "down"]),
    statPercent: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: PropTypes.string,
    statDescripiron: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};

export default CardStats;
