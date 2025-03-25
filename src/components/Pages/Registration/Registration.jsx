import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Registration() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            window.alert("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                // user.name,
                user.email,
                user.password
            );
            const newUser = userCredential.user;

            await setDoc(doc(db, "Users", newUser.uid), {
                name: user.name,
                email: user.email,
                lastLogin: serverTimestamp(),
                status: "active",
            });

            // Sign out the user after registration to prevent auto-login
            await signOut(auth);

            window.alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            window.alert(error.message);
            console.log(error);
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://cdn-icons-png.flaticon.com/128/1055/1055685.png"
                            alt="logo"
                        />
                        Registration here
                    </h1>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your Name
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Mahfuz Hasan"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            onChange={handleChange}
                                            name="password"
                                            value={user.password}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        <button
                                            className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            onChange={handleChange}
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        <button
                                            className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 me-2 mb-6  mt-10"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <NavLink
                                        to={"/login"}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Login here
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
