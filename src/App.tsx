import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LetterForm } from './components/LetterForm';
import {
    AppBar,
    Box,
    createStyles,
    CssBaseline,
    IconButton, Link,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core';
import { LetterList } from './components/LetterList';
import { Letter, parseLetter } from './models/letter';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        footer: {
            position: 'fixed',
            bottom: 0,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey.A100,
            width: '100%',
            textAlign: 'center'
        },
        footerText: {
            color: theme.palette.primary.contrastText,
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
            paddingBottom: theme.spacing(10),
        },
    }),
);

function App() {
    const classes = useStyles();
    const [letters, setLetters] = useState<Letter[]>([]);
    const [fetch, setFetch] = useState(true);

    useEffect(() => {
        if (fetch) {
            (async () => {
                const result = await axios.get('/api/letter');
                setLetters(result.data.map(parseLetter));
            })();
            setFetch(false);
        }
    }, [fetch]);

    const checkMark = String.fromCodePoint(0x2705);
    const crossMark = String.fromCodePoint(0x274C);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        편지 전달 서비스
                    </Typography>
                </Toolbar>
            </AppBar>
            <LetterList data={letters} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box display="flex" height="100%" flexWrap="wrap" flexDirection="row">
                    <Box display="flex" flex={1} minWidth="400px">
                        <LetterForm setFetch={setFetch}/>
                    </Box>
                    <Box display="flex" flex={1} minWidth="400px">
                        <div style={{ width: "100%" }}>
                            <h2>
                                편지 가이드
                            </h2>
                            <ul>
                                <li>
                                    이 사이트는 <a href="https://thecamp.or.kr/">더캠프</a>를 통해 인터넷 편지를 전달합니다
                                </li>
                                <li>
                                    편지를 보내면 자동으로 더캠프에 등록이 되고, 하루 정도 후에 편지가 출력되어 저에게 전달됩니다
                                </li>
                                <li>
                                    공식 API를 사용한 것이 아니기 때문에 이 사이트의 기능은 언제든지 막힐 수 있습니다
                                </li>
                                <li>
                                    좌측 편지 목록에서 {checkMark} 표시가 된 편지는 더캠프에 제대로 등록이 되었다는 뜻이고, {crossMark} 표시가 되어있다면 편지가 등록되지 않았다는 뜻이니 <a href="https://bit.ly/2MhynkC">육군훈련소</a>나 <a href="https://thecamp.or.kr/">더캠프</a>를 직접 사용해 보내주시면 감사드리겠습니다
                                </li>
                                <li>
                                    수정이나 삭제 기능은 구현되어 있지 않습니다. 작성된 편지는 저의 더캠프 계정으로 제출되므로 본인이 더캠프 계정이 있더라도 수정이나 삭제가 불가합니다
                                </li>
                                <li>
                                    <b>"내용을 모두에게 공개"</b>를 선택하면 이 페이지에서 누구나 편지의 내용을 볼 수 있습니다. 체크하지 않으면 저에게만 전달되고 공개되지 않습니다
                                </li>
                                <li>
                                    정 무슨 내용을 써주면 좋을지 모르겠다면 <a href="https://docs.google.com/document/d/13z_FXz4ygipWeMBWqYkmvvyV_h3MdUmw86dM5NfkZoc/edit?usp=sharing">내용 가이드</a>에서 골라주세요
                                </li>
                            </ul>
                        </div>
                    </Box>
                </Box>
            </main>
            <Box className={classes.footer}>
                <Link
                    href="https://github.com/dj-shin/army-client"
                >
                    <GitHubIcon fontSize="large" color="action"/>
                </Link>
                <Typography>
                    Inspired by <Link
                    className={classes.footerText}
                    href="https://calofmijuck.tistory.com/m/18?fbclid=IwAR16UKTjjr8xQA0g_ctkdOO9A4DdrCuEjdQLqJ7hXNNQg--IzFPaAPe9fM8">
                    calofmijuck
                </Link>
                </Typography>
            </Box>
        </div>
    );
}

export default App;
