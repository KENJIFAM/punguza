import express from 'express';
import { AuthRequest } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

router.get('/', async (req: AuthRequest, res, next) => {
  try {
    if (!req.auth?.id) {
      return next({ status: 401, message: 'Unauthorized error: private profile' });
    }
    const user = (await db.User.findById(req.auth.id).orFail()) as UserModel;
    const { id, email, name } = user;
    res.status(200).json({ id, email, name });
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH user by id
 */
router.patch('/', async (req: AuthRequest, res, next) => {
  try {
    if (!req.auth?.id) {
      return next({ status: 401, message: 'Unauthorized error: private profile' });
    }
    const updatedUser = await db.User.findOneAndUpdate(
      { _id: req.auth.id },
      { $set: req.body },
      { new: true },
    );
    const { id, email, name } = updatedUser as UserModel;
    res.status(200).json({ id, email, name });
  } catch (err) {
    return next(err);
  }
});

export default router;
