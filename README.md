# arc-macro-site-url

Allows lambdas to discover the site's url via a SSM parameter

## Add to your project

```bash
npm i @lpetre/arc-macro-site-url
```

And add to your `.arc` file:

```arc
@app
testapp

@http
get /

@macros
lpetre/arc-marco-site-url
```

## Query the site url

To use the absolute url you need to query it in your handler.

```bash
cd src/http/get-index 
npm i @lpetre/arc-marco-site-url
```

And then in the function code:

```javascript
let discovery = require('@lpetre/arc-marco-site-url/discovery')

exports.handler = async function http(req) {
    ...
}
```