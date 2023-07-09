import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../global/userContext";
import socket from "../socket/socket";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("chatAppEmail")) {
            navigate("/")
        }
    }, [])

    const context = useContext(UserContext)
    const { user, setUser } = context

    const [credentials, setCredentials] = useState({
        userName: "",
        email: ""
    })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const alertOption = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: props.mode,
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (credentials.userName.length < 3) return toast('Please enter a valid username !', alertOption)
        localStorage.setItem('chatAppEmail', credentials.email)
        localStorage.setItem('chatAppUser', credentials.userName)

        socket.emit('userDetails', {
            userName: localStorage.getItem("chatAppUser"),
            email: localStorage.getItem("chatAppEmail")
        })
        navigate('/')
    }


    return (
        <div className="flex justify-center dark:bg-[#0F172A] overflow-hidden h-full" style={{ height: "100vh" }}>
            <Card className="w-96 navStyle my-auto">
                <CardHeader
                    variant="gradient"
                    className="mb-4 grid h-28 place-items-center bg-[#6366F1]"
                >
                    <Typography variant="h3" color="white">
                        <div className="logo text-center flex justify-center">
                            <img className="w-28" src="https://res.cloudinary.com/dngfmzv2g/image/upload/v1688847417/chat-cord-website-favicon-white_lue00y.png" alt="" />
                        </div>
                    </Typography>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardBody className="flex flex-col gap-4">
                        <Typography className="text-center" variant="h3" color="white">
                            Join Now
                        </Typography>
                        <Input onChange={handleChange} name="userName" id="userName" value={credentials.userName} color="white" label="Username" type="text" size="lg" required />
                        <Input onChange={handleChange} name="email" id="email" value={credentials.email} color="white" label="Email" type="email" size="lg" required />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button type="submit" className="bg-[#6366F1]" fullWidth>
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <ToastContainer />
        </div >
    );
}