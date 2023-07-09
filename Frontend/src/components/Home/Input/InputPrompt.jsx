import React, { useState,useContext } from "react";
import { Input, Button } from "@material-tailwind/react";
import socket from "../../socket/socket";
import UserContext from "../../../global/userContext";


export default function InputPrompt() {
    const [text, setText] = React.useState("");
    const onChange = ({ target }) => setText(target.value);

    function getFormattedDate() {
        const currentDate = new Date();

        const day = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
        const time = currentDate.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        return `${day} ${time}`;
    }

    const formattedDate = getFormattedDate();
    const context = useContext(UserContext)
    const { messages, setMessages } = context

    const sendMessage = () => {
        const message = {
            userName: localStorage.getItem("chatAppUser"),
            date : formattedDate,
            message : text,
        }
        setText('')
        socket.emit('send', message)
        setMessages([...messages, message])
    }
    
    return (

        <div className="main flex justify-center">
            <div className="fixed bottom-5 flex w-full max-w-[70%] navStyle outline-none border-none text-black dark:text-white" style={{border : "none"}}>
                <Input
                    label="*"
                    placeholder="    Write a Message"
                    type="text"
                    value={text}
                    size="md"
                    className="h-12 shadow-sm overflow-y-scroll outline-none "
                    onChange={onChange}
                    containerProps={{
                        className: "min-w-0 h-12 ",
                    }}
                    color="purple"
                />
                <Button
                    onClick={sendMessage}
                    size="sm"
                    color={text ? "blue" : "blue-gray"}
                    disabled={!text}
                    className="!absolute right-2 top-2 rounded bg-[#6366F1]"
                >
                    <i className="fa-solid fa-paper-plane"></i>
                </Button>
            </div>
        </div>
    );
}