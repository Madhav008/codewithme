
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";
import React,{useState} from 'react'
import Home from "./Pages/Home";
import MyLogin from "./Pages/MyLogin";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import './app.css'
import { Toaster } from 'react-hot-toast'
import InvitePage from "./Pages/InvitePage";
import QuestionsPage from "./Pages/QuestionsPage";
import CompilerPage from "./Pages/CompilerPage";
import AceEditors from "./components/AceEditor"

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch(`${process.env.REACT_APP_Backend_URL}/auth/login/success`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    setUser(resObject.user);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);
    
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
                    <Route path="/problem/:pid" element={<Home user={user}  />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <MyLogin />} />
                    <Route path="/logout" element={<MyLogin />} />
                    <Route path="/ide" element={<CompilerPage />} />
                    <Route path="/invite" element={<InvitePage />} />
                    <Route path="/ace" element={<AceEditors />} />

                    <Route exact path="/" element={<QuestionsPage />} />

                </Routes>

            </Router>
        </div>
    )
}

export default App



