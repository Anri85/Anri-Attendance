import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// views
import Dashboard from "./views/admin/Dashboard";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import CreateUser from "./views/admin/CreateUser";
import Attendance from "./views/admin/Attendance";
import DetailAttendance from "./views/admin/DetailAttendance";
import DetailUser from "./views/admin/DetailUser";
import Log from "./views/admin/Log";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

const useAuth = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData === null ? false : userData;
};

const App = () => {
    const isAuth = useAuth();
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route element={<Admin />}>
                        {isAuth.role === "Super admin" && (
                            <>
                                <Route path="/" element={<Attendance />} />
                                <Route path="/attendance" element={<Dashboard />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/create" element={<CreateUser />} />
                                <Route path="/users" element={<Tables />} />
                                <Route path="/user/:id" element={<DetailUser />} />
                                <Route path="/logs" element={<Log />} />
                            </>
                        )}
                        {isAuth.role === "Admin" && (
                            <>
                                <Route path="/" element={<Attendance />} />
                                <Route path="/attendance" element={<Dashboard />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/logs" element={<Log />} />
                            </>
                        )}
                        {isAuth.role === "Employee" && (
                            <>
                                <Route path="/" element={<Attendance />} />
                                <Route path="/settings" element={<Settings />} />
                            </>
                        )}
                        <Route path="/attendance/:id" element={<DetailAttendance />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
