const cors = require('cors');
const Fuse = require('fuse.js');
const express = require('express');
const marc4js = require('marc4js');
const {
  Client,
  createAccount,
  argString
} = require('orbs-client-sdk');

const app = express();
const port = 5678;

const { publicKey } = createAccount();
const orbsClient = new Client('http://localhost:8080', 42, 'TEST_NET');

const authContractName = "AuthorityRecords";
const biblioContractName = "BibliographicRecords";

const searchOptions = {
  shouldSort: true,
  tokenize: true,
  includeScore: true,
  threshold: 0.3,
  location: 0,
  distance: 2,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    "_dataFields._subfields._data"
  ]
};

let bibliographicSearchIndex, authoritySearchIndex;

const listByType = async (contractName) => {
  const query = orbsClient.createQuery(
    publicKey,
    contractName,
    'list',
    []
  );
  const { outputArguments } = await orbsClient.sendQuery(query);
  return outputArguments[0].value.split(',').filter(el => !!el);
};

const getRecordByType = async (contractName, id) => {
  const query = orbsClient.createQuery(
    publicKey,
    contractName,
    'get',
    [argString(id)]
  );
  const { outputArguments } = await orbsClient.sendQuery(query);
  return JSON.parse(outputArguments[0].value);
};

const XMLtoJSON = (xml) => {
  return new Promise((resolve, reject) => {
    marc4js.parse(xml, {fromFormat: 'marcxml'}, (err, records) => {
      if (err) {
        reject(err);
      }
      resolve(records);
    })
  });
};

const corsOptions = {
  origin: ['http://localhost:4000']
};

app.use(cors(corsOptions));

app.get('/api/:type/list', async (req, res) => {
  const contractName = req.params['type'] === 'bibliographic' ? biblioContractName : authContractName;
  const list = await listByType(contractName);
  res.send(list);
});

app.post('/api/:type/index', async (req, res) => {
  const contractName = req.params['type'] === 'bibliographic' ? biblioContractName : authContractName;
  const list = await listByType(contractName);
  const records = await Promise.all(list.map(id => getRecordByType(contractName, id)));
  const recordsInJSON = await Promise.all(records.map(record => XMLtoJSON(record.Blob)));
  if (req.params['type'] === 'bibliographic') {
    bibliographicSearchIndex = new Fuse(recordsInJSON.flat(), searchOptions);
  } else {
    authoritySearchIndex = new Fuse(recordsInJSON.flat(), searchOptions);
  }
  res.json(recordsInJSON.length);
});

app.get('/api/:type/search', async (req, res) => {
  let results;
  const query = req.query['query'];
  if (req.params['type'] === 'bibliographic') {
    results = bibliographicSearchIndex.search(query);
  } else {
    results = authoritySearchIndex.search(query);
  }
  res.send(results);
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
