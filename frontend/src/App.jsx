
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";
import React, { useState } from 'react'
import Home from "./Pages/Home";
import MyLogin from "./Pages/MyLogin";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import './app.css'
import { Toaster } from 'react-hot-toast'
import InvitePage from "./Pages/InvitePage";
import QuestionsPage from "./Pages/QuestionsPage";
import CompilerPage from "./Pages/CompilerPage";
import RoomPage from "./Pages/RoomPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setUserdata } from "./store/UserSlice";
import ChatComponent from "./components/Chat/ChatComponent";
import { PrivateRoutes } from "./components/PrivateRoute";
const App = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(fetchUser())
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
                    <Route path="/" element={user ? <QuestionsPage /> : <MyLogin />} />
                    <Route path="/login" element={<MyLogin />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/logout" element={<MyLogin />} />
                        <Route path="/ide" element={<CompilerPage />} />
                        <Route path="/invite" element={<InvitePage />} />
                        <Route path="/problem/:pid" element={<Home />} />
                        <Route exact path="/" element={<QuestionsPage />} />
                        <Route path="/room/:roomname" element={<RoomPage />} />
                        <Route path="/chat" element={<ChatComponent />} />
                    </Route>


                </Routes>

            </Router>
        </div>
    )
}
export default App



export const ProtectedRoutes = () => {
    return (
        <Routes>

        </Routes>
    )
}



