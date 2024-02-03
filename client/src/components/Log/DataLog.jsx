import React from "react";

const DataLog = ({ logs }) => {
    let dataLog = [];
    if (logs.length > 0) {
        dataLog = logs.map((log) => log.replace(/(\r\n|\n|\r)/gm, "").split("%"));
    }

    return (
        <div className="relative flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">Logger Record</h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <tbody>
                        {dataLog.length > 0 ? (
                            dataLog.map((log, i) => (
                                <tr key={i}>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[0]}</th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[1]}</th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[2]}</th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[3]}</th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">
                                        <button
                                            className={
                                                log[4] === "STATUS_CODE: 401" || log[4] === "STATUS_CODE: 500" || log[4] === "STATUS_CODE: 403"
                                                    ? "bg-red-700 rounded outline-none uppercase text-white"
                                                    : "bg-emerald-400 rounded outline-none uppercase text-white"
                                            }
                                            disabled
                                        >
                                            {log[4]}
                                        </button>
                                    </th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[5]}</th>
                                    <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">{log[6]}</th>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">No logs record available</th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataLog;
