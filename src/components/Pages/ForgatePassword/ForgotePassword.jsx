import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function ForgotePassword() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Email has been sent. Please, check your mailbox.");
            })
            .catch((error) => {
                alert(error.message);
            });
        setEmail("");
        navigate("/login");
    };
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Forgot Password
                    </h1>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        for="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full 
                                    text-white bg-[#3b5998] hover:bg-[#3b5998]/90 
                                    focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 
                                    font-medium rounded-lg text-sm px-5 py-2.5 
                                    flex justify-center items-center text-center 
                                    dark:focus:ring-[#3b5998]/55 
                                    mt-4 mx-auto"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
