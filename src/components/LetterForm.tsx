import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Checkbox, Collapse, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

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

    const titleError = () => {
        if (title === '') {
            return "제목을 적어주세요";
        }
        if (typeof title === "string" && title.length > 30) {
            return "제목은 30자를 초과할 수 없습니다";
        }
        return null;
    };
    const senderError = () => {
        if (sender === '') {
            return "이름을 적어주세요";
        }
        if (typeof sender === "string" && sender.length > 10) {
            return "이름은 10자를 초과할 수 없습니다";
        }
        return null;
    };

    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const sendLetter = () => {
        if (titleError() || senderError() || !title || !sender) {
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
                .catch(error => {
                    if (error.response) {
                        let message = '';
                        if (error.response.data && error.response.data.message) {
                            message = ` - ${error.response.data.message}`;
                        }
                        setOpen(true);
                        setErrorMessage(`응답: ${error.response.status}${message}`);
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        setErrorMessage(`응답 없음`);
                        console.log(error.request);
                    } else {
                        setErrorMessage(`요청 실패`);
                        console.log(error);
                    }
                    console.log(error.config);
                    setFetch(true);
                });
        }
    };

    return (
        <form>
            <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    편지를 전송하는데 실패했습니다 ({errorMessage})
                </Alert>
            </Collapse>
            <Box display="flex" alignItems="flex-end">
                <TextField
                    value={title || ''}
                    margin="normal"
                    onChange={handleTitleChange}
                    onFocus={handleTitleChange}
                    label="제목"
                    error={titleError() !== null}
                    helperText={titleError()}
                />
                <TextField
                    value={sender || ''}
                    margin="normal"
                    onChange={handleSenderChange}
                    onFocus={handleSenderChange}
                    label="작성자"
                    error={senderError() !== null}
                    helperText={senderError()}
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
