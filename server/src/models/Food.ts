import mongoose, { Document, Types, Schema } from 'mongoose';

export interface AmountModel {
  total: number;
  unused: number;
  unit: string;
}

export interface FoodModel extends Document {
  id: string;
  user: Types.ObjectId;
  name: string;
  brand: string;
  icon: string;
  amount: AmountModel;
  purchasedDate: Date;
  expiredDate: Date;
  storage: Types.ObjectId;
  throwed: boolean;
}

const amountSchema = new Schema<AmountModel>({
  total: { type: Number, required: true },
  unused: { type: Number, required: true },
  unit: { type: String, required: true },
});

const foodSchema = new Schema<FoodModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    brand: String,
    icon: String,
    amount: amountSchema,
    purchasedDate: { type: Date, required: true },
    expiredDate: { type: Date, required: true },
    storage: { type: Schema.Types.ObjectId, ref: 'Storage' },
    throwed: Boolean,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Food = mongoose.model<FoodModel>('Food', foodSchema);

export default Food;
