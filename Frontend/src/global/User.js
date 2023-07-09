import React, { useState } from 'react'
import UserContext from "./userContext";

function UserState(props) {

    const [user, setUser] = useState({
        userName: "",
        email: "",
        id: ""
    })

    const [messages, setMessages] = useState([])

    return (
        <UserContext.Provider value={{ user, setUser, messages, setMessages }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
