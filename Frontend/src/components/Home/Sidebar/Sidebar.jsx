import {
    List,
    ListItem,
    ListItemPrefix,
    Card,
    Tooltip
} from "@material-tailwind/react";

import {
    PowerIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar'
import socket from '../../socket/socket'

export default function Sidebar(props) {
    const { onlineUsers } = props
    const navigate = useNavigate()

    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem("chatAppUser")
        localStorage.removeItem("chatAppEmail")
        navigate('/login')
    }

    return (
        <div className="main">
            <Card className="w-36 m-0 p-0 rounded-none sidebar inline-block overflow-y-auto dark:bg-[#131d35] border-none">
                <List className="min-w-min my-6">
                    {onlineUsers.map((user, index) => {
                        return <Tooltip className="bg-[#6366F1]" content={`🔗 ${user.userName}`} placement="right">
                            <ListItem key={index} className="p-0 dark:hover:bg-[#1b2536e7] focus-within:dark:bg-[#1b2536e7]" style={{ display: "flex", justifyContent: "center" }}>
                            <ListItemPrefix className="py-3" style={{ display: "flex", justifyContent: "center", margin: "0px" }}>
                            <Avatar className="p-0.5 w-12 h-12" {...genConfig(`${user.userName}`)} />
                            </ListItemPrefix>
                        </ListItem></Tooltip>
                    })}

                    <hr className="my-2 mx-3 border-blue-gray-100" />
                    <Tooltip className="bg-[#6366F1]" content="Logout" placement="right">
                    <ListItem onClick={handleLogout} className="hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" style={{ display: "flex", justifyContent: "center" }}>
                        <ListItemPrefix className="py-3" style={{ display: "flex", justifyContent: "center", margin: "0px" }}>
                            <PowerIcon color="red" className="h-6 w-6" />
                        </ListItemPrefix>
                    </ListItem>
                    </Tooltip>
                </List>
            </Card>
        </div>
    );
}