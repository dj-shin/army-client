import React from 'react';
import {
    createStyles,
    List,
    ListItem,
    ListItemText,
    Theme,
    Tooltip,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Letter } from '../models/letter';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tooltip: {
            fontSize: theme.typography.pxToRem(15),
        },
    }),
);

interface LetterListProps {
    data: Letter[];
}
export const LetterList: React.FunctionComponent<LetterListProps> = (props) => {
    const classes = useStyles();
    const checkMark = String.fromCodePoint(0x2705);
    const crossMark = String.fromCodePoint(0x274C);
    return (
        <List dense={false}>
            {props.data.map(data => (
                <Tooltip
                    key={data._id}
                    title={
                        <Typography
                            className={classes.tooltip}
                        >
                            From {data.sender}
                        </Typography>
                    }
                >
                    <ListItem
                        key={data._id}
                    >
                        <ListItemText
                            primary={`${data.title} ${data.completed ? checkMark : crossMark}`}
                        />
                    </ListItem>
                </Tooltip>
            ))}
        </List>
    );
}
