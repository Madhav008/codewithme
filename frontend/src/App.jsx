
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";
import React from 'react'
import Home from "./Pages/Home";
import MyLogin from "./Pages/MyLogin";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import './app.css'
import { Toaster } from 'react-hot-toast'
import InvitePage from "./Pages/InvitePage";
import QuestionsPage from "./Pages/QuestionsPage";
import CompilerPage from "./Pages/CompilerPage";

const App = () => {
    // const [user, setUser] = useState(null);

    useEffect(() => {
        // const getUser = () => {
        //     fetch("http://192.168.1.123:5000/auth/login/success", {
        //         method: "GET",
        //         credentials: "include",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Credentials": true,
        //         },
        //     })
        //         .then((response) => {
        //             if (response.status === 200) return response.json();
        //             throw new Error("authentication has been failed!");
        //         })
        //         .then((resObject) => {
        //             setUser(resObject.user);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // };
        // getUser();
    }, []);
    const user = {
        displayName: 'Madhav',

    }
    return (
        <div >
            <div>
                <Toaster
                    position="top-right" toastOptions={{ success: { theme: { primary: '#4aed88', }, }, }}
                ></Toaster>
            </div>
            <Router>
                <Navbar user={user} />

                <Routes>
                    <Route path="/home" element={<Home user={user} isIde={true} />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <MyLogin />} />
                    <Route path="/logout" element={<MyLogin />} />
                    <Route path="/ide" element={<CompilerPage />} />
                    <Route path="/invite" element={<InvitePage />} />
                    <Route exact path="/" element={<QuestionsPage />} />
                </Routes>

            </Router>
        </div>
    )
}

export default App



