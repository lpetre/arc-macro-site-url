# arc-macro-site-url

Allows lambdas to discover the site's url via a SSM parameter

## Add to your project

```bash
npm i arc-macro-site-url
```

And add to your `.arc` file:

```arc
@app
testapp

@http
get /

@macros
arc-macro-site-url
```

## Query the site url

To use the absolute url you need to query it in your handler.

```bash
cd src/http/get-index 
npm i arc-macro-site-url
```

And then in the function code:

```javascript
let arc = require("@architect/functions")
let discovery = require('@lpetre/arc-macro-site-url/discovery')

async function req (req) {
  let site_url = await discovery()
  return {
    html: `<body><p>Welcome to <a href="${site_url}">${site_url}</a>!</p></body>`
  }
}

exports.handler = arc.http.async(req);
```

For a complete example see [arc-example-site-url](https://github.com/lpetre/arc-example-site-url)