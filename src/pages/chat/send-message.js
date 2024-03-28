// import all the required libraries

import React, { useState } from 'react';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input } from 'reactstrap';
import { IoSend } from "react-icons/io5";

// design send message component
const SendMessage = ({ socket, username, room }) => {

    // store the current message using useState hook
    const [message, setMessage] = useState('');

    // function called when send message button is clicked
    const sendMessage = () => {
        if (message !== ' ') {
            const __createdtime__ = Date.now();
            // socket emits send message event
            socket.emit('send_message', { username, room, message, __createdtime__ });
            setMessage('');
        }
    }

    const handleEnter = (event) => {
        if(event.key === 'Enter') {
            const __createdtime__ = Date.now();
            // socket emits send message event
            socket.emit('send_message', { username, room, message, __createdtime__ });
            setMessage('');
        }
    }

    // this page displays text field for message along with the button to send message
    return (
        <div >
            <div className={styles.send_message_inner}>
                <Input className={styles.inputText}
                    type='text'
                    placeholder='type something....'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={handleEnter}
                />
                <Button className={styles.sendBtn} onClick={sendMessage}><IoSend /></Button>
            </div>
        </div>
    );
}

export default SendMessage;