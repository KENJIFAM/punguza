import express from 'express';
import db from '../models';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({ status: 400, message: 'Missing email or password!' });
    }
    const user = await db.User.findOne({ email });
    if (!user) {
      return next({ status: 401, message: 'No user existed with this email!' });
    }
    const isMatch = await user.validatePassword(password, next);
    if (!isMatch) {
      return next({ status: 401, message: 'Incorrect password!' });
    }
    const token = await user.generateJwt(next);
    const { id, name } = user;
    return res.status(200).json({ user: { id, email, name }, token });
  } catch (err) {
    return next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const token = await user.generateJwt(next);
    const { id, email, name } = user;
    await db.Storage.create({ name: 'Fridge', user: id });
    await db.Storage.create({ name: 'Freezer', user: id });
    await db.Storage.create({ name: 'Pantry', user: id });
    return res.status(200).json({ user: { id, email, name }, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Email is existed!';
    }
    return next({ status: 400, message: err.message });
  }
});

export default router;
