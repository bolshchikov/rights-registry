import React from 'react';
import './App.css';
import Registry from './Registry';

function App() {
  return (
    <>
      <h1 className="title">Rights Registry</h1>
      <article className="content">
        <section>
          <Registry
            title="Bibliographic Records"
            contractName="BibliographicRegistry"
          />
        </section>
        <hr />
        <section>
          <Registry
            title="Authority Records"
            contractName="AuthorityRegistry"
          />
        </section>
      </article>
    </>
  );
}

export default App;
