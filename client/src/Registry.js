import React, { useState } from 'react';
import './Registry.css';
import { encodeHex, argString } from 'orbs-client-sdk/dist/index.es';

export default ({ title, contractName, orbsClient, publicKey, privateKey }) => {
  const [currentId, setCurrentId] = useState('');
  const [currentFile, setCurrentFile] = useState('');
  const [receipt, setReceipt] = useState();

  const readFile = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = ev => {
        resolve(ev.target.result);
      };
      reader.readAsBinaryString(file);
    });
  };

  const extractId = file => {
    const { index } = /\.[^.\\/:*?"<>|\r\n]+$/.exec(file.name);
    const id = file.name.substring(0, index);
    return id;
  };

  const fileHandler = async file => {
    setCurrentId(extractId(file));
    const content = await readFile(file);
    setCurrentFile(content);
  };

  const registerFile = async () => {
    const [tx] = orbsClient.createTransaction(
      publicKey,
      privateKey,
      contractName,
      'register',
      [argString(currentId), argString(currentFile)]
    );
    const receipt = await orbsClient.sendTransaction(tx);
    const txHash = encodeHex(receipt.txHash);
    if (receipt.executionResult !== 'SUCCESS') {
      return Promise.reject(receipt.outputArguments[0].value);
    }
    const timestamp = receipt.outputArguments[0].value;
    const signer = encodeHex(receipt.outputArguments[1].value);
    setReceipt({
      txHash,
      timestamp: Number(timestamp),
      signer
    });
  };
  return (
    <>
      <h3>{title}</h3>
      <div>
        <input
          readOnly
          type="text"
          placeholder="Document id"
          value={currentId}
        />
      </div>
      <div>
        <input type="file" onChange={ev => fileHandler(ev.target.files[0])} />
      </div>
      <div className="actions">
        <button onClick={registerFile}>Register</button>
      </div>
      {receipt && (
        <table className="details">
          <tbody>
            <tr>
              <td>Tx Hash:</td>
              <td>{receipt.txHash}</td>
            </tr>
            <tr>
              <td>Signed by:</td>
              <td>{receipt.signer}</td>
            </tr>
            <tr>
              <td>Timestamp:</td>
              <td>
                {new Date(receipt.timestamp * 1000).toLocaleString('en-gb', {
                  hour12: false,
                  timeZone: 'UTC',
                  timeZoneName: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                })}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
