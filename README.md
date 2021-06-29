# Next-Haggis

## Setup

```
yarn && yarn build
```

If you want to test your build, then run here:

```
yarn link
```

And in the project tha consumes next-haggis:

```
yarn link next-haggis
```

## Usage example

Here is an example of a route handler for an `/ice-cream` endpoint

```javascript
import { RouteHandler } from 'next-haggis';

let iceCreams = {
  1: { flavours: ['chocolate'], type: 'cone' },
  2: { flavours: ['chocolate'], type: 'waffle' },
  3: { flavours: ['vanilla, chocolate'], type: 'bowl' },
  4: { flavours: ['vanilla, strawberry'], type: 'waffle' },
};

class Handler extends RouteHandler {
  get(req, res) {
    return res.json(iceCreams);
  }

  post(req, res) {
    const { iceCreams: newIceCreams } = req.body;

    iceCreams = { ...iceCreams, ...newIceCreams };

    return res.json(iceCreams);
  }
}

export default new Handler();
```

## Middlewares

Next-Haggis enables http-verb-specific middlewares.
For example, you might want to log your routes.
Just create your middleware with `createMiddleware`, and decorate your desired routes with it.

```javascript
import { RouteHandler, createMiddleware } from 'next-haggis';

const loggerMiddleware = createMiddleware((req, res, next) => {
  console.log(`In handler for method ${req.method} on route ${req.path}`);
  return next(req, res);
});

let iceCreams = {
  1: { flavours: ['chocolate'], type: 'cone' },
  2: { flavours: ['chocolate'], type: 'waffle' },
  3: { flavours: ['vanilla, chocolate'], type: 'bowl' },
  4: { flavours: ['vanilla, strawberry'], type: 'waffle' },
};

class Handler extends RouteHandler {
  @loggerMiddleware
  get(req, res) {
    return res.json(iceCreams);
  }

  @loggerMiddleware
  post(req, res) {
    const { iceCreams: newIceCreams } = req.body;

    iceCreams = { ...iceCreams, ...newIceCreams };

    return res.json(iceCreams);
  }
}

export default new Handler();
```

### Custom middlewares

You can customise your middlewares with extra arguments.
For example, let's say you wanted to customise the logger message:

```javascript
const customLoggerMiddleware = createMiddleware(
  (req, res, next, customMessage) => {
    console.log(customMessage);
    return next(req, res);
  }
);

class Handler extends RouteHandler {
  @customLoggerMiddleware('Hey this is a custom message')
  get(req, res) {
    return res.json(iceCreams);
  }
}
```

## Configurable NextHaggis instance

By configuring an instance of NextHaggis, your app handles requests the same across all routes.
For example, you can customise the message when the method doesn't exist for the route:

`ApiHandler.js`

```javascript
import NextHaggis from 'next-haggis';

const ApiHandler = new NextHaggis({
  methodMissingHandler: (req, res) => {
    return res
      .status(404)
      .send(`You forgot to implement method ${req.method}!`);
  },
});

export default ApiHandler;
```

`pages/api/ice-creams.js`

```javascript
import ApiHandler from 'utils/ApiHandler';

const iceCreams = {};

class Handler extends ApiHandler {
  get(req, res) {
    return res.json(iceCreams);
  }
}

export default Handler;
```
