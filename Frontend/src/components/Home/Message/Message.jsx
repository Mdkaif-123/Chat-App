import React from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Card,
    Typography,
} from "@material-tailwind/react";
import Avatar, { genConfig } from 'react-nice-avatar'

function Message(props) {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
    const time = (props.time).split(" ")[0]
    return (
        <div>
            <Card className="w-full border-none rounded-none shadow-none bg-[#f6f6f6] dark:bg-[#0F172A]">
                <List>
                    <ListItem className='p-0 md:p-3 dark:hover:bg-[#1b2536e7] focus-within:dark:bg-[#1b2536e7]'>
                        <ListItemPrefix>
                        <Avatar className="p-0.5 w-10 h-10" {...genConfig(`${props.name}`)} />
                        </ListItemPrefix>
                        <div >
                            <Typography className="dark:text-white" variant="h6" color="blue-gray">
                                {props.name} ❄️ <span>{time === day ? " Today " + (props.time).split(" ")[1]+ " " + (props.time).split(" ")[2] :props.time }</span>
                            </Typography>
                            <Typography className="font-normal dark:text-white"  variant="small" color="gray">
                                {props.message} 
                            </Typography>
                        </div>
                    </ListItem>
                </List>
            </Card>
        </div>
    )
}

export default Message
