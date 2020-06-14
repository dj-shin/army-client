import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [content, setContent] = useState<any[]>([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch) {
      const fetchData = async () => {
        const result = await axios.get('/letter');
        console.log(result.data);
        setContent(result.data);
      };
      
      fetchData();
      setFetch(false);
    }
  }, [fetch]);

  const addLetter = () => {
    axios.post('/letter', {
      title: '제목',
      content: '내용내용',
    })
    .then(res => {
      console.log(res);
      setFetch(true);
    })
    .catch(console.error);
  };

  const contentList = content.map(data => {
    return (<p key={data._id}>{data._id}: {data.title}, {data.content}</p>);
  });

  return (
    <div className="App">
      <button onClick={addLetter}>Add letter</button>
      {contentList}
    </div>
  );
}

export default App;
