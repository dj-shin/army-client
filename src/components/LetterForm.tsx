import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import axios from 'axios';

interface LetterFormProps {
    setFetch: Dispatch<SetStateAction<boolean>>
}
export const LetterForm: React.FunctionComponent<LetterFormProps> = (props) => {
    const { setFetch } = props;

    const [title, setTitle] = useState<string | null>(null);
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const [content, setContent] = useState('');
    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const [sender, setSender] = useState<string | null>(null);
    const handleSenderChange = (event: any) => {
        setSender(event.target.value);
    };

    const [isPublic, setPublic] = useState(false);
    const handleIsPublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublic(event.target.checked);
    };

    const sendLetter = () => {
        if (!title || !sender) {
            if (!title) {
                setTitle('');
            }
            if (!sender) {
                setSender('');
            }
        } else {
            axios.post('/api/letter', {
                title,
                content,
                sender,
                isPublic,
            })
                .then(res => {
                    console.log(res);
                    setFetch(true);
                    setTitle(null);
                    setContent('');
                })
                .catch(console.error);
        }
    };

    return (
        <form>
            <Box display="flex" alignItems="flex-end">
                <TextField
                    value={title || ''}
                    margin="normal"
                    onChange={handleTitleChange}
                    onFocus={handleTitleChange}
                    label="제목"
                    error={title === ''}
                    helperText={title === '' && "제목을 적어주세요"}
                />
                <TextField
                    value={sender || ''}
                    margin="normal"
                    onChange={handleSenderChange}
                    onFocus={handleSenderChange}
                    label="작성자"
                    error={sender === ''}
                    helperText={sender === '' && "이름을 적어주세요"}
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
