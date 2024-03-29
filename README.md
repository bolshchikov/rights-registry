# Orbs Starter Kit
> Your starting point to build application on Orbs Network.

## Quick start
* Click on [`Use this template`](https://github.com/orbs-network/orbs-starter-kit/generate)
* Clone the resulted repo
* `cd <your-repo-name>`
* `npm install`
* `npm run gamma:start`
* `npm run contract:deploy`
* `npm run start`

## Prerequisites
* [Docker for desktop](https://www.docker.com/products/docker-desktop)
* [Go language](https://golang.org/doc/install) (Optional)

## Wired Parts
* Smart Contract example (Counter)
* `orbs-contract-sdk`
* Client side application based on react
* `orbs-client-sdk`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run gamma:start`

Starts gamma server inside the docker on port `8080` and `Prism`. `Prism` is Orbs block explorer available on `http://localhost:3000`.

### `npm run gamma:stop`

Stops previous launched docker processes.

### `npm run contract:deploy`

Deploys the contract (counter) from `contracts` folder to the running local blockchain on virtual chain 42.

### `npm run lint`

Runs prettier to do automatic linting of JavaScript files.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about Gamma server and gamma-cli, read [gitbook](https://orbs.gitbook.io/contract-sdk).
