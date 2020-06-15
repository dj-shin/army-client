import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
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

    const [isPublic, setPublic] = useState(false);
    const handleIsPublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublic(event.target.checked);
    };

    const sendLetter = () => {
        axios.post('/api/letter', {
            title,
            content,
            sender,
            isPublic,
        })
            .then(res => {
                console.log(res);
                setFetch(true);
                setTitle('');
                setContent('');
            })
            .catch(console.error);
    };

    return (
        <form>
            <Box display="flex" alignItems="flex-end">
                <TextField
                    value={title}
                    margin="normal"
                    onChange={handleTitleChange}
                    label="제목"
                />
                <TextField
                    value={sender}
                    margin="normal"
                    onChange={handleSenderChange}
                    label="작성자"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPublic}
                            onChange={handleIsPublicChange}
                            name="isPublic"
                            color="primary"
                        />
                    }
                    label="내용을 모두에게 공개"
                />
            </Box>
            <TextField
                value={content}
                onChange={handleContentChange}
                placeholder="재미있는 소식을 전해주세요"
                multiline
                margin="normal"
                variant="outlined"
                rows={2}
                rowsMax={100}
                fullWidth
            />
            <Button variant="contained" onClick={sendLetter}>보내기</Button>
        </form>
    );
};
