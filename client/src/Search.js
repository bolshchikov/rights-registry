import axios from 'axios';
import React, { useState } from 'react';

export default ({ title, type }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const rebuildIndex = () =>
    axios.post(`http://localhost:5678/api/${type}/index`);

  const search = async () => {
    const {data} = await axios.get(`http://localhost:5678/api/${type}/search`, {
      params: {
        query
      }
    });

    setResults(data.map(curr => ({
      id: curr.item._controlFields[0]._data,
      score: curr.score
    })));
  };
  
    return (
    <>
      <h3>Search {title}</h3>
      <input
        type="text"
        placeholder="Enter query"
        value={query}
        onChange={ev => setQuery(ev.target.value)}
      />
      <button onClick={search}>Search</button>
      <button style={{ float: 'right' }} onClick={rebuildIndex}>
        Rebuild Index
      </button>
      {results && (
        <div>
          <h4>Results</h4>
          <ul>
            {results.map((res, idx) => <li key={idx}>{res.id}.xml</li>)}
          </ul>
        </div>
      )}
    </>
  );
};
