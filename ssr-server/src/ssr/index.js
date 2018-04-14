// require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../shop-frontend/build/asset-manifest.json');

function buildHtml({ html, preloadedState }) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/${manifest['app.css']}" rel="stylesheet">
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${preloadedState}
    </script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="https://service.iamport.kr/js/iamport.payment-1.1.2.js"></script>
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script type="text/javascript" src="/${manifest['vendor.js']}"></script>
    <script type="text/javascript" src="/${manifest['app.js']}"></script>
  </body>
  </html>`;
  }

  module.exports = async (ctx) => {
    try {
        const rendered = await render(ctx);
        ctx.body = buildHtml(rendered);
      } catch (e) {
        // 에러가 발생하면 일반 html 응답
        ctx.body = buildHtml({});
      }
  };


