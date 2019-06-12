import React, {useState} from 'react';
export default ({ title, contractName, orbsClient, publicKey, privateKey }) => {
  const [results, setResults] = useState();
  return (
    <>
      <h3>Search {title}</h3>
      <input type="text" placeholder="Enter query" />
      <button>Search</button>
      <button style={{float: 'right'}}>Rebuild Index</button>
      {results && <div>
        <h4>Results</h4>
      </div>}
    </>
  )
};