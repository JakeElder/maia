import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Maia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <h1>Maia</h1>
        <div id="root"></div>
        <script src="http://localhost:8080/dist/app.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, (err) => {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000');
});
