// app/server.js
const express = require('express');
const { createServer: createViteServer } = require('vite');

const app = express();

async function createApp() {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
  });

  app.use(vite.middlewares);

  // Define your API routes or other Express middleware here
  // ...

  // Fallback to Vite's index.html for non-API routes
  app.get('*', async (req, res) => {
    const url = req.originalUrl;
    const template = await vite.transformIndexHtml(url, '');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  });

  return { app, vite };
}

createApp().then(({ app }) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});