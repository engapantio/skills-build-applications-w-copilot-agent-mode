import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(model: Model<T>): Router {
  const router = Router();

  router
    .route('/')
    .get(async (_request, response) => {
      const records = await model.find().lean();
      response.json(records);
    })
    .post(async (request, response) => {
      const record = await model.create(request.body);
      response.status(201).json(record);
    });

  router
    .route('/:id')
    .get(async (request, response) => {
      const record = await model.findById(request.params.id).lean();
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    })
    .put(async (request, response) => {
      const record = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
        overwrite: true,
      });
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    })
    .patch(async (request, response) => {
      const record = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    })
    .delete(async (request, response) => {
      const record = await model.findByIdAndDelete(request.params.id);
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.status(204).end();
    });

  return router;
}
