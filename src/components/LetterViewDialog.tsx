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

    const body = letter ? letter.content.split('\n').map((v, idx) => (
      <Typography gutterBottom key={idx}>{v}</Typography>
    )) : undefined;

    return (
        <Dialog onClose={handleClose} aria-labelledby="letter-dialog-title" open={open}>
            {letter &&
            <React.Fragment>
                <DialogTitle id="letter-dialog-title">
                    {letter.title} - {letter.sender}
                </DialogTitle>
                <DialogContent dividers>
                    {body}
                </DialogContent>
            </React.Fragment>}
        </Dialog>
    );
}
