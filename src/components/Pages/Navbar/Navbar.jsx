import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// import { useAuth } from "../../context/AuthContext ";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
    const navigate = useNavigate();
    // const [user, loading] = useAuthState(auth); // Firebase hook to track authentication state
    const [user, loading] = useAuthState(auth);

    // React.useEffect(() => {
    //     console.log("User:", user);
    //     console.log("Loading:", loading);
    // }, [user, loading]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect after logout
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink
                        to="/"
                        className="text-2xl font-semibold dark:text-white"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/userinfo"
                        className="text-gray-900 text-xl dark:text-white hover:text-blue-500 transition"
                    >
                        User Info
                    </NavLink>

                    <div className="flex space-x-4">
                        {loading ? (
                            <span className="text-gray-500">Loading...</span>
                        ) : user ? (
                            <button
                                onClick={handleLogout}
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            <div className="pt-10"></div>
        </>
    );
}
