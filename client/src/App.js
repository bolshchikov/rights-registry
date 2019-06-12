import React from 'react';
import './App.css';
import Search from './Search';
import Registry from './Registry';

import {
  encodeHex,
  decodeHex,
  Client,
  createAccount
} from 'orbs-client-sdk/dist/index.es';

const SENDER_PUBLIC_KEY = 'sender_public_key';
const SENDER_PRIVATE_KEY = 'sender_private_key';

if (!localStorage.getItem(SENDER_PUBLIC_KEY)) {
  const sender = createAccount();
  localStorage.setItem(SENDER_PUBLIC_KEY, encodeHex(sender.publicKey));
  localStorage.setItem(SENDER_PRIVATE_KEY, encodeHex(sender.privateKey));
}

const publicKey = decodeHex(localStorage.getItem(SENDER_PUBLIC_KEY));
const privateKey = decodeHex(localStorage.getItem(SENDER_PRIVATE_KEY));

const orbsClient = new Client('http://localhost:8080', 42, 'TEST_NET');

function App() {
  return (
    <>
      <h1 className="title">Rights Registry</h1>
      <article className="content">
        <section>
          <Registry
            publicKey={publicKey}
            privateKey={privateKey}
            orbsClient={orbsClient}
            title="Bibliographic Records"
            contractName="BibliographicRecords"
          />
        </section>
        <hr />
        <section>
          <Registry
            publicKey={publicKey}
            privateKey={privateKey}
            orbsClient={orbsClient}
            title="Authority Records"
            contractName="AuthorityRecords"
          />
        </section>
        <section>
          <Search title="Bibliographic Records" type="bibliographic" />
        </section>
        <hr />
        <section>
          <Search title="Authority Records" type="authority" />
        </section>
      </article>
    </>
  );
}

export default App;
