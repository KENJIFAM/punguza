import express from 'express';
import { AuthRequest } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

/**
 * POST food
 */
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const food = await db.Food.create({
      ...req.body,
      user: req.auth?.id,
    });
    const foundFood = await db.Food.findById(food.id).populate('storage', 'id name user');
    res.status(200).json(foundFood);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET ALL foods
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const user = (await db.User.findById(req.auth?.id).orFail()) as UserModel;
    const foods = await db.Food.find({ user: user.id })
      .sort({ createdAt: 'desc' })
      .populate('storage', 'id name user');
    return res.status(200).json(foods);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET food by id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const food = await db.Food.findById(req.params.id).populate('storage', 'id name user');
    return res.status(200).json(food);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH food by id
 */
router.patch('/:id', async (req: AuthRequest, res, next) => {
  try {
    const food = await db.Food.findById(req.params.id);
    if (!food) {
      return next({ status: 401, message: 'This food does not exist!' });
    }
    if (!req.auth?.id || !food.user.equals(req.auth?.id)) {
      return next({ status: 401, message: 'Not authorized to edit this food!' });
    }
    const editedFood = await db.Food.findOneAndUpdate(
      { _id: food?.id },
      { $set: req.body },
      { new: true },
    ).populate('storage', 'id name user');
    return res.status(200).json(editedFood);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE food by id
 */
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const food = await db.Food.findById(req.params.id);
    if (!food) {
      return next({ status: 401, message: 'This food does not exist!' });
    }
    if (!req.auth?.id || !food.user.equals(req.auth?.id)) {
      return next({ status: 401, message: 'Not authorized to delete this food!' });
    }
    await food.remove();
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    return next(err);
  }
});

export default router;
