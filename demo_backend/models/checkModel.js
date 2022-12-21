import mongoose from 'mongoose';

const checkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Number, required: true },
    number: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Check = mongoose.model('Check', checkSchema);
export default Check;