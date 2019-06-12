const express = require('express');
const { Client, createAccount } = require('orbs-client-sdk');
const app = express();
const port = 5678;

const { publicKey } = createAccount();
const orbsClient = new Client('http://localhost:8080', 42, 'TEST_NET');

const authContractName = "AuthorityRecords";
const biblioContractName = "BibliographicRecords";

app.get('/ping', (req, res) => res.send('pong'));

app.get('/api/:type/list', async (req, res) => {
  const contractName = req.params['type'] === 'bibliographic' ? biblioContractName : authContractName;
  const query = orbsClient.createQuery(
    publicKey,
    contractName,
    'list',
    []
  );
  const { outputArguments } = await orbsClient.sendQuery(query);
  const list = outputArguments[0].value.split(',').filter(el => !!el);
  res.send(list);
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
