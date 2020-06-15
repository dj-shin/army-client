import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { LetterForm } from './components/LetterForm';
import { Box } from '@material-ui/core';
import { LetterList } from './components/LetterList';
import { Letter } from './models/letter';

const parseLetter = (response: any): Letter => {
    const letter = response;
    if (typeof response.completed === "string") {
        letter.completed = response.completed === "true";
    }
    return letter as Letter;
}

function App() {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [fetch, setFetch] = useState(true);

    useEffect(() => {
        if (fetch) {
            (async () => {
                const result = await axios.get('/api/letter');
                console.log(result.data);
                setLetters(result.data.map(parseLetter));
            })();
            setFetch(false);
        }
    }, [fetch]);

    const checkMark = String.fromCodePoint(0x2705);
    const crossMark = String.fromCodePoint(0x274C);

    return (
        <Box display="flex" height="100%" flexWrap="wrap" flexDirection="row">
            <Box minWidth="300px">
                <LetterList data={letters}/>
            </Box>
            <Box display="flex" flex={1} minWidth="400px">
                <LetterForm setFetch={setFetch}/>
            </Box>
            <Box width="500px">
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
                        좌측 편지 목록에서 {checkMark} 표시가 된 편지는 더캠프에 제대로 등록이 되었다는 뜻이고,
                        {crossMark} 표시가 되어있다면 편지가 등록되지 않았다는 의미이니
                        <a href="https://bit.ly/2MhynkC">육군훈련소</a>나 <a href="https://thecamp.or.kr/">더캠프</a>를
                        직접 사용해 보내주시면 감사드리겠습니다
                    </li>
                </ul>
            </Box>
        </Box>
    );
}

export default App;
