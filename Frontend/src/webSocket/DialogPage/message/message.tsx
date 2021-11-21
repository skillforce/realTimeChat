import {SnackbarContent} from '@mui/material';
import s from './message.module.css';

const{messTitle}=s;


type MessagePropsType = {
    message: string
    userName:string
}





export const Message = (props: MessagePropsType) => {
    const {message,userName} = props
    const correctMess = `${userName}: ${message}`

    return (
        <div className={messTitle}>
            <SnackbarContent
                message={correctMess}
            />
        </div>
    )
}