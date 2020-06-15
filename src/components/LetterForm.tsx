import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

interface LetterFormProps {
    setFetch: Dispatch<SetStateAction<boolean>>
}
export const LetterForm: React.FunctionComponent<LetterFormProps> = (props) => {
    const { setFetch } = props;

    const [title, setTitle] = useState('');
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const [content, setContent] = useState('');
    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const [sender, setSender] = useState('');
    const handleSenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSender(event.target.value);
    };

    const sendLetter = () => {
        axios.post('/letter', {
            title: title,
            content: content,
            sender: sender,
        })
            .then(res => {
                console.log(res);
                setFetch(true);
            })
            .catch(console.error);
    };

    return (
        <form>
            <TextField
                value={title}
                onChange={handleTitleChange}
                placeholder="제목"
            />
            <TextField
                value={sender}
                onChange={handleSenderChange}
                placeholder="작성자"
            />
            <TextField
                value={content}
                onChange={handleContentChange}
                placeholder="재미있는 소식을 전해주세요"
                multiline
                rows={2}
                rowsMax={100}
                fullWidth
            />
            <Button variant="contained" onClick={sendLetter}>보내기</Button>
        </form>
    );
};
