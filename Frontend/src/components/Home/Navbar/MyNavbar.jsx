import React from "react";
import Avatar, { genConfig } from 'react-nice-avatar'
import {
    Navbar,
    Typography,
    Tooltip
} from "@material-tailwind/react";

import {
    SunIcon,
    MoonIcon
} from "@heroicons/react/24/outline";


export default function MyNavbar(props) {
    const [openNav, setOpenNav] = React.useState(false);

    const { mode, setMode } = props

    
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const toggleMode = () => {
        if (mode === 'dark') {
            setMode("light")
        } else {
            setMode("dark")
        }
    }

    return (
        <>
            <Navbar className="sticky top z-10 h-max max-w-full rounded-none px-2 md:px-7 navStyle dark:bg-[#131d35] border-none outline-none text-white">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer"
                    >
                        <img className="w-40" src="https://res.cloudinary.com/dngfmzv2g/image/upload/v1688912173/chat-cord-high-resolution-logo-color-on-transparent-background_1_ggynko.png" alt="Chat Cord" />
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div onClick={toggleMode} className="theme">
                            <Tooltip className="bg-[#6366F1]" content="Theme" placement="bottom">
                                {mode === 'light' ? <MoonIcon className="h-6 w-6 cursor-pointer dark:text-white" /> : <SunIcon className="h-6 w-6 cursor-pointer dark:text-white" />}
                            </Tooltip>
                        </div>
                        <Avatar className="p-0.5 w-12 h-12" {...genConfig(`${localStorage.getItem('chatAppUser')}`)} />
                    </div>
                </div>
            </Navbar>
        </>
    );
}