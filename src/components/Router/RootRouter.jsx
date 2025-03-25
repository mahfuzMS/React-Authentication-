import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/login/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/ErrorPage";
import UserInfo from "../Pages/UserInfo";
import Root from "../Pages/Root";
import ForgotePassword from "../Pages/ForgatePassword/ForgotePassword";
import ProtectedRoute from "../Route/ProtectedRoute";

const RootRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "registration",
                element: <Registration />,
            },
            {
                path: "userinfo",
                element: (
                    <ProtectedRoute>
                        <UserInfo />
                    </ProtectedRoute>
                ),
            },
            {
                path: "forgotePassword",
                element: <ForgotePassword />,
            },
        ],
    },
]);

export default RootRouter;
