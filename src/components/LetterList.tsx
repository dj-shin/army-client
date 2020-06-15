import React from 'react';
import {
    createStyles, Divider, Drawer, Hidden,
    List,
    ListItem,
    ListItemText,
    Theme,
    Tooltip,
    Typography, useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Letter } from '../models/letter';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        tooltip: {
            fontSize: theme.typography.pxToRem(15),
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface LetterListProps {
    data: Letter[];
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}
export const LetterList: React.FunctionComponent<LetterListProps> = (props) => {
    const { mobileOpen, handleDrawerToggle } = props;
    const classes = useStyles();
    const theme = useTheme();

    const checkMark = String.fromCodePoint(0x2705);
    const crossMark = String.fromCodePoint(0x274C);
    const groups = props.data.reduce((groups, elem) => {
        const date = elem.createdAt.toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(elem);
        return groups;
    }, {} as { [date: string]: Letter[] });
    const drawer = Object.keys(groups).map(date => {
        const group = groups[date];
        return (
            <React.Fragment key={date}>
                <Divider/>
                <List dense={false}>
                    <ListItem>
                        <ListItemText secondary={date}/>
                    </ListItem>
                    {group.map(data => (
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
            </React.Fragment>
        );
    })
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}
