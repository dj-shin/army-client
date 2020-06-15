import React from 'react';
import { Letter } from '../models/letter';
import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';

export interface LetterViewDialogProps {
    letter: Letter | undefined;
    onClose: () => void;
}
export function LetterViewDialog(props: LetterViewDialogProps) {
    const { onClose, letter } = props;
    const open = letter !== undefined;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="letter-dialog-title" open={open}>
            {letter &&
            <React.Fragment>
                <DialogTitle id="letter-dialog-title">
                    {letter.title} - {letter.sender}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {letter.content}
                    </Typography>
                </DialogContent>
            </React.Fragment>}
        </Dialog>
    );
}
