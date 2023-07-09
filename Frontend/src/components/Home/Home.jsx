import React, { useContext, useState, useEffect, useRef } from 'react'
import MyNavbar from './Navbar/MyNavbar'
import Sidebar from './Sidebar/Sidebar'
import InputPrompt from './Input/InputPrompt'
import Messages from './Message/Messages'
import { useNavigate } from "react-router-dom";
import UserContext from '../../global/userContext'
import socket from '../socket/socket'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {
    const context = useContext(UserContext)
    const { setUser, setMessages } = context
    const navigate = useNavigate()

    const [onlineUsers, setOnlineUsers] = useState([])
    const [userJoined, setUserJoined] = useState(false)

    const { mode, setMode } = props

    const alertOption = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: mode,
    }

    useEffect(() => {
        if (!localStorage.getItem("chatAppEmail")) {
            navigate("/login")
        }
    })

    useEffect(() => {
        socket.on('userJoined', (user) => {
            toast(`${user.userName} joined the chat`, alertOption)
            setOnlineUsers([...onlineUsers, user])
        })

        socket.on('userLeft', (restUsers, id) => {
            onlineUsers.forEach(element => {
                if (element.id === id) {
                    toast(`${element.userName} has left the chat`, alertOption)
                }
            });
            setOnlineUsers(restUsers)
        })
    },[onlineUsers])

    useEffect(() => {
        const handleOnlineUsers = (users) => {
            setUserJoined(true)
            setOnlineUsers(users)
        };

        socket.on('onlineUsers', handleOnlineUsers)
        return () => {
            socket.off();
        }
    }, [onlineUsers])


    return (
        <div>
            <section className="layout dark:bg-[#121b31]">
                <div className="header"><MyNavbar mode={mode} setMode={setMode} /></div>
                <div className="leftSide"><Sidebar onlineUsers={onlineUsers} /></div>
                <div className="body overflow-y-auto ">
                    <Messages />
                    <InputPrompt mode={mode} />
                    <ToastContainer />
                </div>
            </section>
        </div>
    )
}

export default Home
