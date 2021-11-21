import {SnackbarContent} from '@mui/material';
import s from './message.module.css';

const {messTitle} = s;


type MessagePropsType = {
    message: string
}


export const Message = (props: MessagePropsType) => {
    const {message} = props
    return (
        <div className={messTitle}>
            <SnackbarContent
                message={message}
            />
        </div>
    )
}