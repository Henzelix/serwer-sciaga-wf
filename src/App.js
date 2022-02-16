import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [initResult, setInitResult] = useState([]);
  const [result, setResult] = useState([]);

  const initResultRef = useRef();
  initResultRef.current = initResult;

  const resultRef = useRef();
  resultRef.current = result;

  const fetchDefaultJSON = () => {
    fetch("json/default.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("dodwania");
        setInitResult(data)
        setResult(data)
        console.log(initResultRef.current);
        sendResultToJSONBin();
      });
  }

  const sendResultToJSONBin = async () => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    req.open("PUT", "https://api.jsonbin.io/b/620c4bfdca70c44b6e998099", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", "$2b$10$b7TzO1HogbIlivNj/dPOZObD/VxWVwgw5ad4rE/Zh3rbvtrLE3dKG");
    req.send(JSON.stringify(resultRef.current));
  }

  const searchGifs = async (name) => {
    console.log(resultRef.current.filter(item => item.name.includes(name.trim().toLowerCase())));
    setResult(initResultRef.current.filter(item => item.name.includes(name.trim().toLowerCase())));
    sendResultToJSONBin();
  }

  useEffect(() => {
    fetchDefaultJSON();
  }, []);

  return (
    <main>
      <div id='wrapper'>
        <h1>Serwer karate</h1>
        <input type="text" name="search" id="search" onChange={e=>{ searchGifs(e.currentTarget.value) }} />
        <div id='list'>
          {
            resultRef.current!=null ?
              resultRef.current.map((item) => {
                return <div className='tile' key={item.name}>
                  <img className='image' src={item.url} alt={item.name} />
                  <h2 className='text'>{item.name}</h2>
                </div>
              })
            :
              <h1>nie ma nic</h1>
          }
        </div>
      </div>
    </main>
  );
}

export default App;
