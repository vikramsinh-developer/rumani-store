# Rumani Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Builds the app and publishes the build output to the `gh-pages` branch.

## GitHub Pages Deployment

To publish the app on GitHub Pages (and avoid the README-only page):

1. Update the `homepage` field in `package.json` if you forked the repo.
2. Push to `main` (or run `npm run deploy` locally) to publish the build output to the `gh-pages` branch.
3. In GitHub repo **Settings → Pages**, set **Source** to `Deploy from a branch` and select:
	- **Branch:** `gh-pages`
	- **Folder:** `/ (root)`

If GitHub Pages is set to `main` / `(root)`, GitHub will render the repository content and you may only see `README.md`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
