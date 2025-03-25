import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
// import { signOut } from "firebase/auth"; // Import signOut
import React from "react";
import { auth, db } from "../firebase";
import { deleteUser } from "firebase/auth";
// import firebase from "firebase/compat/app";

export default function UserInfo() {
    // const auth = getAuth();
    const [users, setUsers] = React.useState([]);
    // const user = user.uid;

    React.useEffect(() => {
        const fetchUsers = async () => {
            const userCollection = await getDocs(collection(db, "Users"));
            setUsers(
                userCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        };
        fetchUsers();
    }, [users]);

    const handleAction = async (id, status) => {
        await updateDoc(doc(db, "Users", id), { status });
        setUsers(
            users.map((user) => (user.id === id ? { ...user, status } : user))
        );
    };

    // delete users.id from firebase
    const handleDelete = async (id) => {
        const user = auth.currentUser;
        // const userId = id;

        // await deleteUser(userId);
        // await deleteUser();
        if (user && user.uid === id) {
            await deleteDoc(doc(db, "Users", id));
            await deleteUser(user);
        } else {
            alert(
                "This is not your account. You can only delete your account."
            );
        }

        // alert(`${users} has been deleted`);
        // console.log(users.id);
        // console.log(id);
    };

    return (
        <div className="relative overflow-hidden ml-20 mr-20">
            <h2 className="text-2xl font-semibold mb-4 text-center mt-10">
                User Management
            </h2>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nane
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Login
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                            <td className="px-6 py-3">{user.name}</td>
                            <td className="px-6 py-3">{user.email}</td>
                            <td className="px-6 py-3">
                                {user.lastLogin?.toDate().toLocaleString()}
                            </td>
                            <td className="px-6 py-3">{user.status}</td>
                            <td className="px-6 py-3">
                                {user.status === "active" ? (
                                    <button
                                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={() =>
                                            handleAction(user.id, "blocked")
                                        }
                                    >
                                        Block
                                    </button>
                                ) : (
                                    <button
                                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={() =>
                                            handleAction(user.id, "active")
                                        }
                                    >
                                        Unblock
                                    </button>
                                )}

                                <button
                                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
