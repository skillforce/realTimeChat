import Paper from '@mui/material/Paper';
import {Container, TextField, Button} from '@mui/material';
import s from './LongPolling.module.css';
import {Message} from './message/message';
import {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';

const {messageField} = s;


export const LongPolling = () => {
    const [messages, setMessages] = useState<{ message: string, id: number }[]>([])
    const [value, setValue] = useState<string>('')
    const instance = 'http://localhost:5000/messages';


    useEffect(() => {
        subscribe()
    }, [])


    const subscribe = async () => {
        try {
            const {data} = await axios.get(instance)
            setMessages(prev => [...prev, data])
            await subscribe()
        } catch (error) {
            setTimeout(() => {
                    subscribe()
                }
                , 500)
        }
    }


    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }


    const onClickSendBtnHandler = async () => {
        await axios.post(instance, {
            message: value,
            id: Date.now()
        })
    }


    return (
        <Container sx={{minHeight:'2000px'}} maxWidth="sm">
            <div>
                <Paper
                    sx={{
                        width: '600px', height: '300px', margin: '40px auto', display: 'flex',
                        justifyContent: 'center'
                    }}
                    elevation={3} children={<div className={messageField}>
                    <TextField
                        onChange={onChangeInputValue}
                        value={value}
                        sx={{marginTop: '80px', width: '85%'}}
                        id="outlined-required"
                        label="Enter your message"
                    />
                    <Button onClick={onClickSendBtnHandler} sx={{margin: '40px 0 0 73%'}} size={'medium'}
                            variant="contained">Send</Button>
                </div>}/>
            </div>
            {messages.map(t => <div key={t.id}><Message message={t.message}/></div>)}
        </Container>
    );
}
