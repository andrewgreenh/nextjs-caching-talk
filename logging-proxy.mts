import { createServer, request as requestHttp } from "node:http";
import { request as requestHttps } from "node:https";

let i = 0;
let lastCall = Date.now();

const server = createServer((req, res) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  const remoteUrl = url.searchParams.get("url");

  if (!remoteUrl) {
    setTimeout(() => {
      const durationSinceLastCallInS = (Date.now() - lastCall) / 1000;
      lastCall = Date.now();
      console.log(`Request ${i++} after ${durationSinceLastCallInS}s`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
    }, 500);
  } else {
    // If we have a remote URL, forward the request and proxy the response
    setTimeout(() => {
      const durationSinceLastCallInS = (Date.now() - lastCall) / 1000;
      lastCall = Date.now();
      console.log(`Request ${i++} after ${durationSinceLastCallInS}s to ${remoteUrl}`);

      const request = remoteUrl.startsWith("https") ? requestHttps : requestHttp;

      const proxyReq = request(remoteUrl, { method: req.method }, (remoteRes) => {
        res.writeHead(remoteRes.statusCode || 500, remoteRes.headers);
        remoteRes.pipe(res);
      });

      proxyReq.on("error", (err) => {
        console.error("Proxy request error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Proxy request failed" }));
      });

      proxyReq.end();
    }, 500);
  }
});

server.listen(3001);
