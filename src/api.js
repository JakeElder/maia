import express from 'express';
import bodyParser from 'body-parser';
import * as Route from 'route-api';

const api = express();

api.use(bodyParser.json());

api.post('/route', (req, res) => {
  Route.create(req.body).then(
    id => res.send({ id }),
    () => res.status(500).end()
  );
});

api.put('/routes/:id', (req, res) => {
  Route.update(req.params.id, req.body).then(
    () => res.status(200).end(),
    () => res.status(500).end()
  );
});

export default api;
