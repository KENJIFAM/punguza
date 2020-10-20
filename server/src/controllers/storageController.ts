import express from 'express';
import { AuthRequest } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

/**
 * POST storage
 */
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const storage = await db.Storage.create({
      ...req.body,
      user: req.auth?.id,
    });
    const foundStorage = await db.Storage.findById(storage.id);
    res.status(200).json(foundStorage);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET ALL storages
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const user = (await db.User.findById(req.auth?.id).orFail()) as UserModel;
    const storages = await db.Storage.find({ user: user.id }).sort({ createdAt: 'asc' });
    return res.status(200).json(storages);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET storage by id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const storage = await db.Storage.findById(req.params.id);
    return res.status(200).json(storage);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH storage by id
 */
router.patch('/:id', async (req: AuthRequest, res, next) => {
  try {
    const storage = await db.Storage.findById(req.params.id);
    if (!storage) {
      return next({ status: 401, message: 'This storage does not exist!' });
    }
    if (!req.auth?.id || !storage.user.equals(req.auth?.id)) {
      return next({ status: 401, message: 'Not authorized to edit this storage!' });
    }
    const editedStorage = await db.Storage.findOneAndUpdate(
      { _id: storage?.id },
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json(editedStorage);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE storage by id
 */
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const storage = await db.Storage.findById(req.params.id);
    if (!storage) {
      return next({ status: 401, message: 'This storage does not exist!' });
    }
    if (!req.auth?.id || !storage.user.equals(req.auth?.id)) {
      return next({ status: 401, message: 'Not authorized to delete this storage!' });
    }
    await storage.remove();
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    return next(err);
  }
});

export default router;
