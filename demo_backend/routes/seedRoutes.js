import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Account from '../models/accountModel.js';
import Cardd from '../models/carddModel.js';
import Check from '../models/checkModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  await Account.remove({});
  const createdAccounts = await Account.insertMany(data.accounts);
  await Cardd.remove({}); 
  const createdCardds = await Cardd.insertMany(data.cardds);
  await Check.remove({});
  const createdChecks = await Check.insertMany(data.checks);
  res.send({createdChecks,createdCardds, createdAccounts,createdProducts, createdUsers });
});
export default seedRouter;