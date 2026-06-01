const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Intercepts the response to remove the iframe blocking headers
function onProxyRes(proxyRes, req, res) {
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
}

// Routes all traffic to the official platform
app.use('/', createProxyMiddleware({
    target: 'https://now.gg',
    changeOrigin: true,
    onProxyRes: onProxyRes,
    cookieDomainRewrite: ""
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
