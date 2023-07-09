import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import socket from '../../socket/socket'
import UserContext from '../../../global/userContext'
import ScrollToBottom from 'react-scroll-to-bottom';

function Messages(props) {
    const context = useContext(UserContext)
    const { messages, setMessages } = context

    const [onlineUsers, setOnlineUsers] = useState([])
    const [userJoined, setUserJoined] = useState(false)

    useEffect(() => {
        socket.on('receive', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {

        const handleOnlineUsers = (users) => {
            setUserJoined(true)
            console.log(users)
            setOnlineUsers(users)
        };

        socket.on('onlineUsers', handleOnlineUsers)

        return () => {
            socket.off();
        }
    }, [onlineUsers]);


    return (
        <div className="main ">
            <div className='w-full h-full bg-[#f6f6f6] pb-24 overflow-y-scroll dark:bg-[#0F172A]' style={{ height: "90vh", overflowY: "auto" }}>
                <ScrollToBottom >
                    {messages.length <= 0 ? <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_96bovdur.json" background="transparent" speed="1" style={{ maxWidth: "500px", maxHeight: "500px", margin: "0 auto" }} loop autoplay></lottie-player> :
                        messages.map((message, index) => {
                            return <Message key={index} name={`${message.userName}`} time={`${message.date}`} message={`${message.message}`} />
                        })
                    }
                </ScrollToBottom>
            </div>
        </div>
    )
}

export default Messages
