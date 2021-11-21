import Paper from '@mui/material/Paper';
import {Alert, Button, Container, TextField} from '@mui/material';
import s from './WebSocket.module.css';
import {Message} from './message/message';
import {ChangeEvent, useRef, useState} from 'react';


const {messageField} = s;


export const WebSock = () => {
    const [messages, setMessages] = useState<{ message: string, id: number, event: string, date: Date, userName: string }[]>([])
    const [value, setValue] = useState<string>('')
    const instance = 'http://localhost:5000/messages';
    const socket = useRef<any>();
    const [connected, setConnected] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('')


    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const onChangeUserNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserName(e.currentTarget.value)
    }


    const onClickSendBtnHandler = async () => {
        const mess = {
            userName: userName,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(mess))
        setValue('')
    }

    const onConnect = () => {
        socket.current = new WebSocket('ws://localhost:5000');
        socket.current.onopen = () => { //отработает во время подключения
            setConnected(true);
            const message = {
                event: 'connection',
                userName: userName,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))//передаем на сервер сформированный объект
            console.log('Socket start')
        }

        socket.current.onmessage = (event: any) => { //отработает когда получим сообщение
            const mess = JSON.parse(event.data);
            setMessages(prev => [mess, ...prev])
        }

        socket.current.onclose = () => { //отработает когда подключение закрылось
            console.log('Socket close')
        }
        socket.current.onerror = () => { //отработает когда произойдет некая ошибка
            console.log('some socket error')
        }
    }


    if (!connected) {
        return (
            <Paper
                sx={{
                    width: '600px', height: '300px', margin: '40px auto', display: 'flex',
                    justifyContent: 'center'
                }}
                elevation={3} children={<div className={messageField}>
                <TextField
                    onChange={onChangeUserNameValue}
                    value={userName}
                    sx={{marginTop: '80px', width: '85%'}}
                    id="outlined-required"
                    label="Enter your user name"
                />
                <Button onClick={onConnect} sx={{margin: '40px 0 0 0'}} size={'medium'}
                        variant="contained">Log in</Button>
            </div>}/>
        )
    }


    return (
        <Container sx={{minHeight: '2000px'}} maxWidth="sm">
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
            {messages.map(t => t.event === 'connection' ?
                <Alert severity="success">User {t.userName} is online currently</Alert>
                : <div key={t.id}><Message userName={t.userName} message={t.message}/></div>)}
        </Container>
    );
}
