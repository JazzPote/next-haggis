# Next-Haggis "counter" example

## Setup

First, make sure you have built and linked `next-haggis`, in the repository root folder by running:

```
yarn build
yarn link
```

Then, in `counter-app/`, run:

```
nvm use 14.15
yarn
yarn link next-haggis
yarn dev
```

Access the app on `localhost:3000`
