import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { LetterForm } from './components/LetterForm';
import { Box } from '@material-ui/core';

function App() {
  const [letters, setLetters] = useState<any[]>([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch) {
      (async () => {
        const result = await axios.get('/letter');
        console.log(result.data);
        setLetters(result.data);
      })();
      setFetch(false);
    }
  }, [fetch]);

  const letterList = letters.map(data => {
    return (<p key={data._id}>{data.title} : {data.sender}</p>);
  });

  return (
    <Box display="flex" flex={1} flexWrap="wrap" flexDirection="row">
      <Box flex={1}>
        {letterList}
      </Box>
      <Box flex={4}>
          <LetterForm setFetch={setFetch}/>
      </Box>
    </Box>
  );
}

export default App;
