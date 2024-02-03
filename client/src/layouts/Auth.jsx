import React from "react";

// components
import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views
import Login from "../views/auth/Login";

// background
import background from "../assets/img/register_bg_2.png";

const Auth = () => {
    return (
        <>
            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: "url(" + background + ")",
                        }}
                    ></div>
                    <Login />
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
};

export default Auth;
